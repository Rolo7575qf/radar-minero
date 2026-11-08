import React, { useState, ReactNode } from 'react';
import { MiningProject, MineralType, MiningStage } from '../../types/project';
import { Badge } from '../common/Badge';
import { SectionHeader } from '../common/SectionHeader';
import { detectCategories, serviceLabel } from '../../data/serviceCatalog';
import {
  Pickaxe,
  Search,
  Filter,
  DollarSign,
  Calendar,
  Building2,
  ChevronRight,
  TrendingUp,
  MapPin,
  Clock,
  Star,
  Bell
} from 'lucide-react';

interface ProjectListProps {
  projects: MiningProject[];
  onSelectProject: (project: MiningProject) => void;
  selectedCountry: string;
  viewToggle?: ReactNode;
  providerServices: string[];
  onOpenProfile: () => void;
  followedIds: string[];
  onToggleFollow: (id: string) => void;
}

export const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  onSelectProject,
  selectedCountry,
  viewToggle,
  providerServices,
  onOpenProfile,
  followedIds,
  onToggleFollow,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMineral, setSelectedMineral] = useState<string>('Todos');
  const [selectedStage, setSelectedStage] = useState<string>('Todas');
  const [selectedType, setSelectedType] = useState<string>('Todos');
  const [onlyMyRubro, setOnlyMyRubro] = useState(false);
  const [onlyFollowed, setOnlyFollowed] = useState(false);

  // Servicios que el proyecto probablemente demanda (hipótesis por palabras clave del texto público)
  const projectText = (p: MiningProject) =>
    [p.name, p.productiveCapacity || '', ...(p.history || []).slice(0, 8).map((h) => `${h.signalTitle} ${h.changeDescription}`)].join(' ');
  const projectNeeds = (p: MiningProject) => detectCategories(projectText(p));
  const matchedServices = (p: MiningProject) => projectNeeds(p).filter((c) => providerServices.includes(c));

  const MINERALS = ['Todos', 'Cobre', 'Litio', 'Tierras Raras', 'Oro', 'Molibdeno', 'Hierro', 'Polimetálico'];
  const TYPES = ['Todos', 'EIA', 'DIA'];

  const filteredProjects = projects.filter((p) => {
    const matchesCountry = selectedCountry === 'Todos' || p.country === selectedCountry;
    const matchesMineral =
      selectedMineral === 'Todos' ||
      p.mainMineral === selectedMineral ||
      (p.mainMineral && p.mainMineral.toLowerCase().includes(selectedMineral.toLowerCase()));
    const matchesStage = selectedStage === 'Todas' || p.stage === selectedStage;
    const matchesType = selectedType === 'Todos' || p.submissionType === selectedType;
    const q = (searchTerm || '').toLowerCase();
    const matchesSearch =
      String(p.name || '').toLowerCase().includes(q) ||
      String(p.ownerCompany || '').toLowerCase().includes(q) ||
      String(p.region || '').toLowerCase().includes(q) ||
      String(p.epcmCompany || '').toLowerCase().includes(q);

    const matchesRubro = !onlyMyRubro || providerServices.length === 0 || matchedServices(p).length > 0;
    const matchesFollow = !onlyFollowed || followedIds.includes(p.id);

    return matchesCountry && matchesMineral && matchesStage && matchesType && matchesSearch && matchesRubro && matchesFollow;
  });

  const totalCapex = filteredProjects.reduce(
    (acc, p) => acc + (p.capexEstimatedMillionsUSD || 0),
    0
  );

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Cartera monitoreada"
        title="Proyectos con huellas públicas"
        description="Cada proyecto con su etapa, su inversión declarada y el historial de hitos con fuente y fecha."
        stats={[
          { value: filteredProjects.length, label: 'Proyectos' },
          { value: (totalCapex / 1000).toLocaleString('es-CL', { maximumFractionDigits: 1 }), label: 'US$ mil MM' },
        ]}
      />

      {viewToggle}

      {/* Filters Bar */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {/* Search box */}
          <div className="relative sm:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar proyecto, titular, EPCM o región..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Mineral selector */}
          <div>
            <select
              value={selectedMineral}
              onChange={(e) => setSelectedMineral(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
            >
              <option value="Todos">Mineral: Todos</option>
              {MINERALS.filter((m) => m !== 'Todos').map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* Type selector */}
          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
            >
              <option value="Todos">Tipo de presentación: EIA / DIA</option>
              <option value="EIA">EIA (Estudio de Impacto Ambiental)</option>
              <option value="DIA">DIA (Declaración de Impacto Ambiental)</option>
            </select>
          </div>
        </div>

        {/* Mi rubro y seguimiento */}
        <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center gap-2">
          <button
            onClick={() => (providerServices.length === 0 ? onOpenProfile() : setOnlyMyRubro((v) => !v))}
            className={`px-3 py-1.5 rounded-full text-[11px] font-semibold border transition ${
              onlyMyRubro && providerServices.length > 0
                ? 'bg-amber-400 text-slate-950 border-amber-400'
                : 'bg-slate-950 text-slate-300 border-slate-700 hover:border-amber-400/70'
            }`}
            title={
              providerServices.length
                ? 'Muestra solo proyectos que probablemente demandan: ' + providerServices.map(serviceLabel).join(', ')
                : 'Defina primero los servicios que ofrece'
            }
          >
            {providerServices.length === 0 ? 'Definir mi rubro' : 'Para mi rubro'}
          </button>
          <button
            onClick={() => setOnlyFollowed((v) => !v)}
            className={`px-3 py-1.5 rounded-full text-[11px] font-semibold border transition flex items-center gap-1 ${
              onlyFollowed ? 'bg-amber-400 text-slate-950 border-amber-400' : 'bg-slate-950 text-slate-300 border-slate-700 hover:border-amber-400/70'
            }`}
          >
            <Star className="w-3 h-3" /> Siguiendo ({followedIds.length})
          </button>
          <span className="text-[10px] text-slate-500">
            {providerServices.length > 0
              ? 'Su rubro: ' + providerServices.map(serviceLabel).join(' · ') + '. Las coincidencias son hipótesis según el texto público, no datos del titular.'
              : 'Sin rubro definido, no se puede filtrar por relevancia.'}
          </span>
        </div>
      </div>

      {/* Novedades de lo que sigue */}
      {followedIds.length > 0 && (() => {
        const since = Date.now() - 30 * 24 * 3600 * 1000;
        const news = projects
          .filter((p) => followedIds.includes(p.id))
          .flatMap((p) => (p.history || []).map((h) => ({ p, h, t: new Date(h.date.length === 10 ? h.date + 'T00:00:00' : h.date).getTime() })))
          .filter((x) => !isNaN(x.t) && x.t >= since)
          .sort((a, b) => b.t - a.t)
          .slice(0, 6);
        return (
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="flex items-center gap-2 mb-2 text-[11px] font-semibold text-amber-400">
              <Bell className="w-3.5 h-3.5" /> Novedades de lo que sigue (últimos 30 días)
            </div>
            {news.length === 0 ? (
              <p className="text-xs text-slate-500">Sin hitos nuevos en los proyectos que sigue en los últimos 30 días.</p>
            ) : (
              <ul className="space-y-1.5">
                {news.map(({ p, h }) => (
                  <li key={h.id}>
                    <button onClick={() => onSelectProject(p)} className="text-left text-xs text-slate-300 hover:text-white">
                      <span className="ic-mono text-slate-500">{h.date}</span> · <strong>{p.name}</strong>: {h.signalTitle}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })()}

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.map((p) => (
          <div
            key={p.id}
            onClick={() => onSelectProject(p)}
            className="rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-400/70 hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col group overflow-hidden"
          >
            <div className="p-5 flex-1">
              {/* Etiquetas */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="ic-eyebrow text-[9px] px-2 py-1 rounded-[4px] bg-amber-400 text-slate-950">{p.mainMineral}</span>
                {p.submissionType && p.submissionType !== 'No informado' && (
                  <span className="ic-mono text-[10px] font-bold px-2 py-0.5 rounded-[4px] border border-slate-700 text-white">{p.submissionType}</span>
                )}
                <span className="ic-mono text-[10px] text-slate-500 ml-auto">{p.region}</span>
                <button
                  onClick={(e) => { e.stopPropagation(); onToggleFollow(p.id); }}
                  title={followedIds.includes(p.id) ? 'Dejar de seguir' : 'Seguir proyecto'}
                  className="p-1 rounded hover:bg-slate-800"
                >
                  <Star className={`w-4 h-4 ${followedIds.includes(p.id) ? 'fill-amber-400 text-amber-400' : 'text-slate-500'}`} />
                </button>
              </div>

              {/* Nombre y titular */}
              <h3 className="mt-3.5 text-[15px] font-bold text-white leading-snug group-hover:text-amber-300 transition line-clamp-3">
                {p.name}
              </h3>
              <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
                <Building2 className="w-3.5 h-3.5 text-amber-400 shrink-0" strokeWidth={1.5} />
                <span className="truncate">{p.ownerCompany}</span>
              </div>

              {/* Servicios de su rubro que calzan (hipótesis) */}
              {providerServices.length > 0 && matchedServices(p).length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {matchedServices(p).map((r) => (
                    <span key={r} className="text-[9px] px-1.5 py-0.5 rounded border border-amber-400/50 text-amber-300">
                      {serviceLabel(r)}
                    </span>
                  ))}
                </div>
              )}

              {/* Etapa */}
              <div className="mt-4 rounded-[10px] bg-slate-950 border border-slate-800 px-3 py-2.5">
                <div className="flex items-center justify-between">
                  <span className="ic-eyebrow text-[9px] text-slate-500">Etapa actual</span>
                  <span className="text-[10px] text-slate-500">{p.currentStatus}</span>
                </div>
                <div className="mt-1 text-[13px] font-bold text-white truncate">{p.stage.replace(/^\d+\.\s*/, '')}</div>
                <div className="mt-2 flex gap-[3px]">
                  {Array.from({ length: 14 }).map((_, i) => {
                    const n = parseInt(p.stage, 10) || 0;
                    return <span key={i} className={`h-1 flex-1 rounded-sm ${i < n ? 'bg-amber-400' : 'bg-slate-800'}`} />;
                  })}
                </div>
              </div>
            </div>

            {/* Pie */}
            <div className="px-5 py-3.5 border-t border-slate-800 bg-gradient-to-b from-white/[0.02] to-transparent flex items-end justify-between">
              <div>
                <span className="ic-eyebrow text-[9px] text-slate-500 block">Inversión</span>
                <span className="ic-display text-[20px] text-amber-400 leading-none mt-1 block">
                  {p.capexEstimatedMillionsUSD ? `US$${p.capexEstimatedMillionsUSD.toLocaleString('es-CL')} MM` : 'No informada'}
                </span>
              </div>
              <div className="text-right">
                <span className="ic-mono text-[10px] text-slate-400 flex items-center justify-end gap-1">
                  <Clock className="w-3 h-3" strokeWidth={1.5} />
                  {p.history?.length || 0} {(p.history?.length || 0) === 1 ? 'hito' : 'hitos'}
                </span>
                <span className="text-amber-400 font-bold flex items-center justify-end gap-0.5 group-hover:translate-x-1 transition text-[11px] mt-1">
                  Ver ficha <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
