// Deriva empresas y relaciones del ecosistema a partir de datos REALES
// (proyectos + oportunidades de D1). No usa datos de ejemplo.
import { MiningProject } from '../types/project';
import { CommercialOpportunity } from '../types/opportunity';
import { MiningCompany, EcosystemRelation, CompanyRole, Actor, CompanyKeyContact } from '../types/company';

const slug = (s: string) =>
  String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const mapRole = (raw: string): { role: CompanyRole; relation: EcosystemRelation['relationType'] } => {
  const r = String(raw || '').toLowerCase();
  if (r.includes('epcm')) return { role: 'EPCM', relation: 'epcm' };
  if (r.includes('matriz')) return { role: 'Grupo Empresarial / Matriz', relation: 'socio' };
  if (r.includes('socio') || r.includes('financia')) return { role: 'Socio Inversionista', relation: 'socio' };
  return { role: 'Titular Minero', relation: 'titular' }; // Titular, Mandante, Propietario
};

export function buildEcosystem(
  projects: MiningProject[],
  opportunities: CommercialOpportunity[],
  actors: Actor[] = []
): { companies: MiningCompany[]; relations: EcosystemRelation[] } {
  const companies = new Map<string, MiningCompany>();
  const relations: EcosystemRelation[] = [];
  const seenRel = new Set<string>();

  const add = (name: string, role: CompanyRole, project: MiningProject | undefined, relation: EcosystemRelation['relationType'], label: string) => {
    const id = `comp-${slug(name)}`;
    let c = companies.get(id);
    if (!c) {
      c = {
        id,
        name,
        countryOrigin: 'No informado',
        primaryRole: role,
        supportedRoles: [role],
        website: '',
        description: 'Empresa detectada en proyectos monitoreados por el Radar. Perfil ampliado pendiente de verificación.',
        participatingProjectsCount: 0,
        relatedProjectIds: [],
        contracts: [],
        keyContacts: [],
        verifiedSources: [],
        tier: /codelco|bhp/i.test(name) ? 'Tier 1 Global' : 'Especialista Local',
      };
      companies.set(id, c);
    }
    if (!c.supportedRoles.includes(role)) c.supportedRoles.push(role);
    if (project) {
      if (!c.relatedProjectIds.includes(project.id)) {
        c.relatedProjectIds.push(project.id);
        c.participatingProjectsCount = c.relatedProjectIds.length;
      }
      project.informationSources.forEach((s) => {
        if (!c!.verifiedSources.includes(s)) c!.verifiedSources.push(s);
      });
      const key = `${project.id}|${id}|${relation}`;
      if (!seenRel.has(key)) {
        seenRel.add(key);
        relations.push({
          sourceId: project.id, sourceName: project.name, sourceType: 'project',
          targetId: id, targetName: name, targetType: 'company',
          relationType: relation, label,
        });
      }
    }
  };

  const byId = new Map(projects.map((p) => [p.id, p]));

  for (const o of opportunities) {
    const project = byId.get(o.relatedProjectId);
    for (const ic of o.involvedCompanies || []) {
      const { role, relation } = mapRole(ic.role);
      add(ic.name, role, project, relation, ic.role);
    }
  }
  for (const p of projects) {
    if (p.epcmCompany && !/no identificado|no informado/i.test(p.epcmCompany)) {
      add(p.epcmCompany, 'EPCM', p, 'epcm', 'EPCM');
    }
  }

  // Actores clave: se asignan a la empresa titular del proyecto (o a la que coincida por nombre).
  const INFLUENCE: Record<string, CompanyKeyContact['influenceLevel']> = {
    decisor: 'Decisor Clave',
    compras: 'Gestor Contratos',
    tecnico: 'Evaluador Técnico',
    influenciador: 'Evaluador Técnico',
  };
  const tokens = (n: string) =>
    slug(n).split('-').filter((t) => t.length > 2 && !['chile', 'division', 'compania', 'minera', 'scm', 'spa', 'sa', 'del', 'los', 'las'].includes(t));
  const all = [...companies.values()];
  for (const a of actors) {
    const aTokens = tokens(a.company);
    const byProject = all.filter(
      (c) => c.supportedRoles.includes('Titular Minero') && a.projectIds.some((pid) => c.relatedProjectIds.includes(pid))
    );
    const nameMatch = (c: MiningCompany) => tokens(c.name).some((t) => aTokens.includes(t));
    let targets = byProject.filter(nameMatch);
    if (!targets.length) targets = byProject.length ? byProject : all.filter(nameMatch);
    const contact: CompanyKeyContact = {
      name: a.fullName,
      role: a.jobTitle || 'Cargo no informado',
      department: a.company,
      linkedinOrProfile: a.linkedinUrl,
      email: a.email,
      emailStatus: a.emailStatus,
      phone: a.phone,
      influenceLevel: INFLUENCE[a.decisionRole] || 'Evaluador Técnico',
    };
    for (const c of targets.slice(0, 1)) {
      if (!c.keyContacts.some((k) => k.name === contact.name)) c.keyContacts.push(contact);
    }
  }
  return { companies: all, relations };
}
