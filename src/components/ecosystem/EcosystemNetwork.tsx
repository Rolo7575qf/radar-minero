import React, { useState } from 'react';
import { MiningProject } from '../../types/project';
import { MiningCompany, EcosystemRelation } from '../../types/company';
import {
  Network,
  Building2,
  Pickaxe,
  Briefcase,
  Layers,
  ArrowRight,
  Filter,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

interface EcosystemNetworkProps {
  projects: MiningProject[];
  companies: MiningCompany[];
  relations: EcosystemRelation[];
  onSelectProject: (p: MiningProject) => void;
  onSelectCompany: (c: MiningCompany) => void;
}

export const EcosystemNetwork: React.FC<EcosystemNetworkProps> = ({
  projects,
  companies,
  relations,
  onSelectProject,
  onSelectCompany,
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('proj-centinela-2');

  const activeProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  // Filtramos las relaciones asociadas al proyecto seleccionado o a sus actores
  const projectRelations = relations.filter(
    (r) => r.sourceId === activeProject.id || r.sourceName.includes(activeProject.name)
  );

  // Empresas vinculadas directamente
  const titular = companies.find(
    (c) => c.name === activeProject.ownerCompany || activeProject.ownerCompany.includes(c.name)
  );
  const epcm = companies.find(
    (c) => activeProject.epcmCompany && activeProject.epcmCompany.includes(c.name)
  );
  const contratistas = companies.filter((c) =>
    activeProject.keyContractors?.some((kc) => kc.includes(c.name))
  );

  return (
    <div className="space-y-6">
      {/* Top Controller */}
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-white">
              Mapa de Relaciones del Ecosistema Minero
            </h2>
            <p className="text-xs text-slate-400">
              Visualización: Proyecto → Titular → EPCM → Contratistas Principales → Proveedores
            </p>
          </div>
        </div>

        {/* Project Selector */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <label className="text-xs font-semibold text-slate-300">Explorar Proyecto:</label>
          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-bold text-white focus:outline-none focus:border-indigo-400"
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.country})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Visual Workflow Map (Proyecto -> Titular -> EPCM -> Contratistas) */}
      <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl space-y-6">
        <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
          <span className="font-semibold uppercase tracking-wider text-[11px] text-indigo-400">
            Cadena de Contratación & Decisiones B2B
          </span>
          <span className="font-mono text-[11px] text-slate-500">
            CAPEX: US$ {activeProject.capexEstimatedMillionsUSD.toLocaleString()}M · {activeProject.stage}
          </span>
        </div>

        {/* Flow Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch">
          {/* Nodo 1: PROYECTO */}
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1">
              <Pickaxe className="w-3.5 h-3.5" /> 1. Proyecto Minero
            </span>
            <div
              onClick={() => onSelectProject(activeProject)}
              className="flex-1 p-4 rounded-xl bg-amber-950/20 border-2 border-amber-500/50 hover:bg-amber-950/30 transition cursor-pointer flex flex-col justify-between group shadow-lg"
            >
              <div>
                <span className="text-[10px] font-mono text-amber-300 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                  {activeProject.mainMineral} · {activeProject.country}
                </span>
                <h3 className="text-sm font-extrabold text-white mt-2 group-hover:text-amber-300 transition">
                  {activeProject.name}
                </h3>
                <p className="text-[11px] text-slate-400 mt-1">
                  {activeProject.region}
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-amber-900/40 text-[11px] text-amber-400 flex items-center justify-between">
                <span>Ver Ficha Proyecto</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Nodo 2: MANDANTE / TITULAR */}
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 mb-2 flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" /> 2. Titular Mandante
            </span>
            {titular ? (
              <div
                onClick={() => onSelectCompany(titular)}
                className="flex-1 p-4 rounded-xl bg-cyan-950/20 border-2 border-cyan-500/50 hover:bg-cyan-950/30 transition cursor-pointer flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                    {titular.tier}
                  </span>
                  <h3 className="text-sm font-extrabold text-white mt-2 group-hover:text-cyan-300 transition">
                    {titular.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                    {titular.description}
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-cyan-900/40 text-[11px] text-cyan-400 flex items-center justify-between">
                  <span>{titular.keyContacts.length} decisores</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ) : (
              <div className="flex-1 p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-center text-center text-xs text-slate-400">
                <span className="font-bold text-slate-300">{activeProject.ownerCompany}</span>
                <span className="text-[11px] text-slate-500 mt-1">Titular en prospección</span>
              </div>
            )}
          </div>

          {/* Nodo 3: GESTOR EPCM / INGENIERÍA */}
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 mb-2 flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5" /> 3. Firma EPCM / Ingeniería
            </span>
            {epcm ? (
              <div
                onClick={() => onSelectCompany(epcm)}
                className="flex-1 p-4 rounded-xl bg-purple-950/20 border-2 border-purple-500/50 hover:bg-purple-950/30 transition cursor-pointer flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <span className="text-[10px] font-mono text-purple-300 bg-purple-950 px-2 py-0.5 rounded border border-purple-800">
                    Líder de Procura & Vendor List
                  </span>
                  <h3 className="text-sm font-extrabold text-white mt-2 group-hover:text-purple-300 transition">
                    {epcm.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {epcm.countryOrigin} · Gestión integral de contratos de montaje
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-purple-900/40 text-[11px] text-purple-400 flex items-center justify-between">
                  <span>Ver contactos EPCM</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ) : (
              <div className="flex-1 p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-center text-center text-xs text-slate-400 p-4">
                <span className="font-bold text-amber-300">{activeProject.epcmCompany || 'Por adjudicar'}</span>
                <span className="text-[11px] text-slate-500 mt-1">Oportunidad de inserción en Vendor List</span>
              </div>
            )}
          </div>

          {/* Nodo 4: CONTRATISTAS Y PROVEEDORES */}
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" /> 4. Contratistas & Especialistas
            </span>
            <div className="flex-1 space-y-2 flex flex-col justify-start">
              {contratistas.length > 0 ? (
                contratistas.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => onSelectCompany(c)}
                    className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/40 hover:bg-emerald-950/30 transition cursor-pointer group text-xs"
                  >
                    <div className="font-bold text-white group-hover:text-emerald-300 transition">
                      {c.name}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {c.primaryRole}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center text-xs text-slate-400">
                  <span className="font-semibold text-slate-300">
                    {activeProject.keyContractors?.join(', ') || 'Licitaciones abiertas'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Explicación de la Relación */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
          <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-300 shrink-0 mt-0.5">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-white text-xs">
              Estrategia de Acceso Comercial Recomendada:
            </h4>
            <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
              Para vender suministros o servicios en <strong>{activeProject.name}</strong>, la decisión técnica de homologación recae en <strong>{activeProject.epcmCompany || activeProject.ownerCompany}</strong>. Abordar al Director de Adquisiciones de Fluor/Ausenco con casos de éxito técnicos antes de que se publique la solicitud formal de cotización (RFQ).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
