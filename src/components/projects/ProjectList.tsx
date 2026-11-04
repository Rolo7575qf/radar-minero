import React, { useState } from 'react';
import { MiningProject, MineralType, MiningStage } from '../../types/project';
import { Badge } from '../common/Badge';
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
}

export const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  onSelectProject,
  selectedCountry,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMineral, setSelectedMineral] = useState<string>('Todos');
  const [selectedStage, setSelectedStage] = useState<string>('Todas');
  const [selectedType, setSelectedType] = useState<string>('Todos');

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

    return matchesCountry && matchesMineral && matchesStage && matchesType && matchesSearch;
  });

  const totalCapex = filteredProjects.reduce(
    (acc, p) => acc + (p.capexEstimatedMillionsUSD || 0),
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
            <Pickaxe className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-white">
              Cartera de Proyectos Mineros Monitoreados
            </h2>
            <p className="text-xs text-slate-400">
              Seguimiento desde etapas tempranas hasta construcción y operación con trazabilidad inmutable
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono self-start sm:self-auto">
          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-500 block uppercase font-bold">Proyectos</span>
            <span className="text-base font-extrabold text-white">{filteredProjects.length}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-500 block uppercase font-bold">CAPEX Total</span>
            <span className="text-base font-extrabold text-amber-400">
              US$ {(totalCapex / 1000).toFixed(1)}B
            </span>
          </div>
        </div>
      </div>

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
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.map((p) => (
          <div
            key={p.id}
            onClick={() => onSelectProject(p)}
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-900 transition-all cursor-pointer flex flex-col justify-between group shadow-xl"
          >
            <div>
              {/* Top Badges */}
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <Badge variant={p.mainMineral === 'Litio' ? 'cyan' : 'amber'} size="sm">
                    {p.mainMineral}
                  </Badge>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    {p.country}
                  </span>
                  <span className="text-[10px] font-medium text-slate-400">
                    {p.submissionType && p.submissionType !== 'No informado' ? p.submissionType : 'Tipo no informado'}
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded">
                  {p.currentStatus}
                </span>
              </div>

              {/* Title & Owner */}
              <h3 className="text-sm font-extrabold text-white group-hover:text-amber-300 transition leading-snug">
                {p.name}
              </h3>

              <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                <Building2 className="w-3.5 h-3.5 text-slate-500" />
                <span className="truncate">{p.ownerCompany}</span>
              </div>

              <div className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-slate-600" />
                <span className="truncate">{p.region}</span>
              </div>

              {/* Stage Pill */}
              <div className="mt-3 p-2 rounded-lg bg-slate-950/80 border border-slate-800/80 text-xs">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">
                  Etapa Actual (Clasificación 1-14)
                </span>
                <span className="text-xs font-bold text-cyan-300 font-mono mt-0.5 block truncate">
                  {p.stage}
                </span>
              </div>

              {/* EPCM info */}
              {p.epcmCompany && (
                <div className="mt-2 text-[11px] text-slate-400 truncate">
                  <strong className="text-slate-300">EPCM:</strong> {p.epcmCompany}
                </div>
              )}
            </div>

            {/* Bottom Meta */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase block">CAPEX</span>
                <span className="text-sm font-extrabold text-amber-400 font-mono">
                  US$ {p.capexEstimatedMillionsUSD.toLocaleString()}M
                </span>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono text-cyan-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {p.history?.length || 0} hitos trazados
                </span>
                <span className="text-amber-400 font-semibold flex items-center gap-0.5 group-hover:translate-x-1 transition text-[11px] mt-0.5">
                  Ver Ficha <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
