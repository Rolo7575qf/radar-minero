import React, { useState } from 'react';
import { EarlySignal, SignalCategory, SignalRelevance } from '../../types/signal';
import { Badge } from '../common/Badge';
import { SectionHeader } from '../common/SectionHeader';
import {
  Radio,
  Search,
  Filter,
  ExternalLink,
  Clock,
  Lightbulb,
  ChevronRight,
  ShieldAlert,
  SlidersHorizontal,
  PlusCircle
} from 'lucide-react';

interface SignalFeedProps {
  signals: EarlySignal[];
  onSelectSignal: (signal: EarlySignal) => void;
  onOpenSimulator?: () => void;
}

export const SignalFeed: React.FC<SignalFeedProps> = ({
  signals,
  onSelectSignal,
  onOpenSimulator,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [selectedSource, setSelectedSource] = useState<string>('Todas');
  const [selectedRelevance, setSelectedRelevance] = useState<string>('Todas');
  const [searchTerm, setSearchTerm] = useState('');

  const ALL_CATEGORIES: (SignalCategory | 'Todas')[] = [
    'Todas',
    'Ambiental',
    'Inversión',
    'Ingeniería y desarrollo',
    'Contratación',
    'Corporativa y financiera',
    'Organizacional',
    'Operacional',
    'Sectorial',
  ];

  const SOURCES = ['Todas', 'SEA / SEIA', 'COCHILCO', 'CMF', 'SERNAGEOMIN', 'SEDAR+', 'Corporativo / Prensa'];

  const filteredSignals = signals.filter((s) => {
    const matchesCat = selectedCategory === 'Todas' || s.category === selectedCategory;
    const matchesSrc = selectedSource === 'Todas' || s.originalSource === selectedSource;
    const matchesRel = selectedRelevance === 'Todas' || s.relevance === selectedRelevance;
    const q = (searchTerm || '').toLowerCase();
    const matchesSearch =
      String(s.name || '').toLowerCase().includes(q) ||
      String(s.relatedProjectName || '').toLowerCase().includes(q) ||
      String(s.description || '').toLowerCase().includes(q) ||
      String(s.commercialInterpretation?.hypothesis || '').toLowerCase().includes(q);
    return matchesCat && matchesSrc && matchesRel && matchesSearch;
  });

  const categoryBadgeVariant = (cat: SignalCategory) => {
    switch (cat) {
      case 'Ambiental':
        return 'slate';
      case 'Inversión':
        return 'amber';
      case 'Ingeniería y desarrollo':
        return 'cyan';
      case 'Contratación':
        return 'amber';
      case 'Corporativa y financiera':
        return 'indigo';
      case 'Organizacional':
        return 'rose';
      default:
        return 'slate';
    }
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Detección temprana"
        title="Las huellas más recientes"
        description="Cada señal es un hecho público con fuente y fecha: ingresos al SEIA, aprobaciones, licitaciones e inversiones. Abra una para ver qué significa para un proveedor."
        stats={[{ value: signals.length, label: 'Señales' }]}
        actions={onOpenSimulator && (
          <button
            onClick={onOpenSimulator}
            className="flex items-center gap-2 px-4 py-2.5 rounded-[6px] text-[11px] font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 transition"
          >
            <PlusCircle className="w-4 h-4" />
            NUEVA SEÑAL
          </button>
        )}
      />

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700/80 space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filtrar por proyecto, palabra clave, hipótesis o servicio..."
              className="w-full bg-slate-950 border border-slate-700 rounded-[6px] pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Source dropdown */}
          <div className="flex items-center gap-2">
            <span className="ic-eyebrow text-[9px] text-slate-400 shrink-0">Fuente</span>
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-[6px] px-2.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
            >
              {SOURCES.map((src) => (
                <option key={src} value={src}>
                  {src}
                </option>
              ))}
            </select>
          </div>

          {/* Relevance dropdown */}
          <div className="flex items-center gap-2">
            <span className="ic-eyebrow text-[9px] text-slate-400 shrink-0">Relevancia</span>
            <select
              value={selectedRelevance}
              onChange={(e) => setSelectedRelevance(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-[6px] px-2.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
            >
              <option value="Todas">Todas</option>
              <option value="Crítica">Crítica</option>
              <option value="Alta">Alta</option>
              <option value="Media">Media</option>
            </select>
          </div>
        </div>

        {/* Category Pills (Categorías A a H) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-1">
          <span className="ic-eyebrow text-[9px] text-slate-400 mr-1 shrink-0">
            Categoría
          </span>
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-[6px] text-xs font-bold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-slate-950 border border-amber-400'
                  : 'bg-slate-950 text-slate-100 border border-slate-700 hover:border-amber-400/70 hover:text-amber-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Counter summary */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span className="text-slate-300">Mostrando <strong className="text-white">{filteredSignals.length}</strong> señales</span>
        <span className="ic-mono text-[10px] text-slate-500">FUENTE → SEÑAL → PROYECTO → OPORTUNIDAD</span>
      </div>

      {/* Signals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSignals.map((sig) => (
          <div
            key={sig.id}
            onClick={() => onSelectSignal(sig)}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-400/70 hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col justify-between group shadow-lg"
          >
            <div>
              {/* Top metadata */}
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <Badge variant={categoryBadgeVariant(sig.category) as any} size="sm">
                    {sig.category}
                  </Badge>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    {sig.originalSource}
                  </span>
                  <span className="text-[10px] font-semibold text-amber-400 bg-slate-800 px-1.5 py-0.5 rounded">
                    {sig.validationState}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {sig.publishedDate}
                </span>
              </div>

              {/* Title & Project */}
              <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition leading-snug">
                {sig.name}
              </h3>

              <div className="mt-1 text-xs text-amber-300/90 font-medium">
                📍 {sig.relatedProjectName} ({sig.relatedCompany})
              </div>

              {/* Description preview */}
              <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {sig.description}
              </p>

              {/* Hipótesis Comercial Box */}
              <div className="mt-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs">
                <div className="flex items-center gap-1 text-amber-400 font-bold mb-1 text-[11px] uppercase tracking-wide">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                  <span>Interpretación Comercial Temprana</span>
                </div>
                <p className="text-slate-300 text-[11.5px] leading-relaxed line-clamp-3">
                  {sig.commercialInterpretation.hypothesis}
                </p>

                {/* Target services preview */}
                <div className="mt-2 flex flex-wrap gap-1">
                  {sig.commercialInterpretation.targetServices.slice(0, 3).map((srv, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800"
                    >
                      {srv}
                    </span>
                  ))}
                  {sig.commercialInterpretation.targetServices.length > 3 && (
                    <span className="text-[10px] text-slate-500 font-mono self-center">
                      +{sig.commercialInterpretation.targetServices.length - 3} más
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span className="text-amber-400 font-medium">
                Ventana de anticipación: <strong>{sig.commercialInterpretation.anticipationWindowMonths} meses</strong>
              </span>
              <span className="flex items-center gap-1 text-cyan-400 font-semibold group-hover:translate-x-1 transition">
                <span>Ver ficha completa</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
