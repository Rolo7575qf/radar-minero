import React, { useState, ReactNode } from 'react';
import { MiningProject, MineralType, MiningStage } from '../../types/project';
import { Badge } from '../common/Badge';
import { SectionHeader } from '../common/SectionHeader';
import { RUBROS, RUBRO_LABEL, MAX_RUBROS, inferRubros, loadRubros, saveRubros } from '../../services/rubros';
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
  Clock
} from 'lucide-react';

interface ProjectListProps {
  projects: MiningProject[];
  onSelectProject: (project: MiningProject) => void;
  selectedCountry: string;
  viewToggle?: ReactNode;
}

export const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  onSelectProject,
  selectedCountry,
  viewToggle,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMineral, setSelectedMineral] = useState<string>('Todos');
  const [selectedStage, setSelectedStage] = useState<string>('Todas');
  const [selectedType, setSelectedType] = useState<string>('Todos');
  const [myRubros, setMyRubros] = useState<string[]>(() => loadRubros());

  const toggleRubro = (id: string) => {
    setMyRubros((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < MAX_RUBROS ? [...prev, id] : prev;
      saveRubros(next);
      return next;
    });
  };

  const MINERALS = ['Todos', 'Cobre', 'Litio', 'Oro', 'Molibdeno', 'Hierro'];
  const TYPES = ['Todos', 'EIA', 'DIA'];

  const filteredProjects = projects.filter((p) => {
    const matchesCountry = selectedCountry === 'Todos' || p.country === selectedCountry;
    const matchesMineral = selectedMineral === 'Todos' || p.mainMineral === selectedMineral;
    const matchesStage = selectedStage === 'Todas' || p.stage === selectedStage;
    const matchesType = selectedType === 'Todos' || p.submissionType === selectedType;
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.ownerCompany.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.epcmCompany && p.epcmCompany.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesRubro = myRubros.length === 0 || inferRubros(p).some((r) => myRubros.includes(r));

    return matchesCountry && matchesMineral && matchesStage && matchesType && matchesSearch && matchesRubro;
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

        {/* Para mi rubro */}
        <div className="pt-3 border-t border-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span className="ic-eyebrow text-[10px] text-amber-400">Para mi rubro</span>
            <span className="text-[10px] text-slate-500">
              Elija hasta {MAX_RUBROS}. Las etiquetas son hipótesis según etapa y tipo de proyecto, no datos del titular.
              {myRubros.length > 0 && (
                <button
                  onClick={() => { setMyRubros([]); saveRubros([]); }}
                  className="ml-2 text-amber-400 hover:underline"
                >
                  Limpiar
                </button>
              )}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {RUBROS.map((r) => {
              const on = myRubros.includes(r.id);
              return (
                <button
                  key={r.id}
                  onClick={() => toggleRubro(r.id)}
                  title={r.momento}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border transition ${
                    on
                      ? 'bg-amber-400 text-slate-950 border-amber-400'
                      : 'bg-slate-950 text-slate-300 border-slate-700 hover:border-amber-400/70'
                  }`}
                >
                  {r.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

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
              </div>

              {/* Nombre y titular */}
              <h3 className="mt-3.5 text-[15px] font-bold text-white leading-snug group-hover:text-amber-300 transition line-clamp-3">
                {p.name}
              </h3>
              <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
                <Building2 className="w-3.5 h-3.5 text-amber-400 shrink-0" strokeWidth={1.5} />
                <span className="truncate">{p.ownerCompany}</span>
              </div>

              {/* Rubros que calzan (hipótesis) */}
              {myRubros.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {inferRubros(p)
                    .filter((r) => myRubros.includes(r))
                    .map((r) => (
                      <span key={r} className="text-[9px] px-1.5 py-0.5 rounded border border-amber-400/50 text-amber-300">
                        {RUBRO_LABEL[r]}
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
