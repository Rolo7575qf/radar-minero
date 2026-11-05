import React, { useMemo, useState, ReactNode } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { MiningProject, ProjectHistoryEntry } from '../../types/project';
import { CommercialOpportunity } from '../../types/opportunity';
import { Clock, Diamond } from 'lucide-react';

interface ProjectTimelineProps {
  projects: MiningProject[];
  opportunities: CommercialOpportunity[];
  onSelectProject: (project: MiningProject) => void;
  viewToggle?: ReactNode;
}

type Span = 36 | 60;

const MONTH_MS = 1000 * 60 * 60 * 24 * 30.4375;
const CONF_COLOR: Record<ProjectHistoryEntry['confidenceLevel'], string> = {
  Alta: 'bg-emerald-400 border-emerald-200',
  Media: 'bg-amber-400 border-amber-200',
  Baja: 'bg-slate-500 border-slate-300',
};

const toDate = (iso?: string | null): Date | null => {
  if (!iso) return null;
  const d = new Date(iso.length === 10 ? iso + 'T00:00:00' : iso);
  return isNaN(d.getTime()) ? null : d;
};

const fmt = (d: Date) => d.toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' });

/**
 * Línea de tiempo de huellas: cada proyecto es una fila, cada hito del historial es un punto.
 * La ventana por defecto cubre 3 años hacia atrás y 18 meses hacia adelante (fecha objetivo de RFQ).
 */
export const ProjectTimeline: React.FC<ProjectTimelineProps> = ({ projects, opportunities, onSelectProject, viewToggle }) => {
  const [span, setSpan] = useState<Span>(36);
  const [active, setActive] = useState<{ project: MiningProject; entry: ProjectHistoryEntry } | null>(null);

  const now = useMemo(() => new Date(), []);
  const start = useMemo(() => new Date(now.getTime() - span * MONTH_MS), [now, span]);
  const end = useMemo(() => new Date(now.getTime() + 18 * MONTH_MS), [now]);
  const total = end.getTime() - start.getTime();
  const pos = (d: Date) => Math.min(100, Math.max(0, ((d.getTime() - start.getTime()) / total) * 100));

  const rfqByProject = useMemo(() => {
    const map = new Map<string, { date: Date; basis?: string }>();
    for (const o of opportunities) {
      const d = toDate(o.targetRfqDate);
      if (!d) continue;
      const prev = map.get(o.relatedProjectId);
      if (!prev || d < prev.date) map.set(o.relatedProjectId, { date: d, basis: o.targetBasis });
    }
    return map;
  }, [opportunities]);

  const rows = useMemo(
    () =>
      projects
        .map((p) => {
          const events = (p.history || [])
            .map((h) => ({ h, d: toDate(h.date) }))
            .filter((x): x is { h: ProjectHistoryEntry; d: Date } => x.d !== null)
            .sort((a, b) => a.d.getTime() - b.d.getTime());
          const inWindow = events.filter((e) => e.d >= start && e.d <= end);
          const before = events.filter((e) => e.d < start).length;
          return { p, inWindow, before, total: events.length };
        })
        .filter((r) => r.total > 0)
        .sort((a, b) => b.total - a.total || (b.p.capexEstimatedMillionsUSD || 0) - (a.p.capexEstimatedMillionsUSD || 0)),
    [projects, start, end],
  );

  // Marcas de años en el eje
  const ticks = useMemo(() => {
    const out: { label: string; left: number }[] = [];
    for (let y = start.getFullYear(); y <= end.getFullYear(); y++) {
      const d = new Date(y, 0, 1);
      if (d >= start && d <= end) out.push({ label: String(y), left: pos(d) });
    }
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, end]);

  const todayLeft = pos(now);

  const totalEvents = rows.reduce((t, r) => t + r.total, 0);

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Huella a 3 años"
        title="Línea de tiempo de proyectos"
        description="Cada punto es un hito registrado con fuente y fecha: ingresos al SEIA, anuncios, aprobaciones y señales de foros."
        stats={[
          { value: rows.length, label: 'Proyectos con huella' },
          { value: totalEvents, label: 'Hitos' },
        ]}
      />

      {viewToggle}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Clock className="w-4 h-4 text-cyan-400" />
          <span>
            {rows.length} proyectos con huella · cada punto es un hito registrado (no se sobrescribe)
          </span>
        </div>
        <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-900 border border-slate-800">
          {([36, 60] as Span[]).map((s) => (
            <button
              key={s}
              onClick={() => setSpan(s)}
              className={`px-3 py-1 rounded-md text-[11px] font-semibold transition ${
                span === s ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {s === 36 ? '3 años' : '5 años'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400">
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Confianza alta (fuente oficial)</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Media (prensa, foros)</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-500" /> Baja</span>
        <span className="flex items-center gap-1.5"><Diamond className="w-3 h-3 text-violet-400" /> Fecha objetivo de RFQ (estimada)</span>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-950/70 overflow-x-auto">
        <div className="min-w-[860px]">
          {/* Eje */}
          <div className="grid grid-cols-[220px_1fr] border-b border-slate-800">
            <div className="px-4 py-2 text-[10px] uppercase tracking-wider text-slate-500">Proyecto</div>
            <div className="relative h-8">
              {ticks.map((t) => (
                <div key={t.label} className="absolute top-0 bottom-0 border-l border-slate-800" style={{ left: `${t.left}%` }}>
                  <span className="absolute top-2 left-1.5 text-[10px] font-mono text-slate-400">{t.label}</span>
                </div>
              ))}
              <div className="absolute top-0 bottom-0 border-l border-cyan-500/70" style={{ left: `${todayLeft}%` }}>
                <span className="absolute top-2 left-1.5 text-[10px] font-semibold text-cyan-400">hoy</span>
              </div>
            </div>
          </div>

          {rows.map(({ p, inWindow, before }) => {
            const rfq = rfqByProject.get(p.id);
            return (
              <div key={p.id} className="grid grid-cols-[220px_1fr] border-b border-slate-900 hover:bg-slate-900/40">
                <button
                  onClick={() => onSelectProject(p)}
                  className="text-left px-4 py-3 min-w-0"
                  title="Abrir ficha del proyecto"
                >
                  <div className="text-xs font-semibold text-slate-100 truncate">{p.name}</div>
                  <div className="text-[10px] text-slate-500 truncate">
                    {p.ownerCompany} · US${(p.capexEstimatedMillionsUSD || 0).toLocaleString('es-CL')}M
                  </div>
                  {before > 0 && (
                    <div className="text-[10px] text-slate-500 mt-0.5">◀ {before} hito{before > 1 ? 's' : ''} anterior{before > 1 ? 'es' : ''}</div>
                  )}
                </button>
                <div className="relative h-14">
                  {ticks.map((t) => (
                    <div key={t.label} className="absolute top-0 bottom-0 border-l border-slate-900" style={{ left: `${t.left}%` }} />
                  ))}
                  <div className="absolute top-0 bottom-0 border-l border-cyan-500/30" style={{ left: `${todayLeft}%` }} />
                  <div className="absolute left-0 right-0 top-1/2 h-px bg-slate-800" />
                  {inWindow.map(({ h, d }) => (
                    <button
                      key={h.id}
                      onClick={() => setActive({ project: p, entry: h })}
                      onMouseEnter={() => setActive({ project: p, entry: h })}
                      className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 hover:scale-150 transition-transform ${CONF_COLOR[h.confidenceLevel]} ${
                        active?.entry.id === h.id ? 'ring-2 ring-cyan-400 scale-150' : ''
                      }`}
                      style={{ left: `${pos(d)}%` }}
                      title={`${h.date} · ${h.signalTitle}`}
                    />
                  ))}
                  {rfq && rfq.date >= start && rfq.date <= end && (
                    <div
                      className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 text-violet-400"
                      style={{ left: `${pos(rfq.date)}%` }}
                      title={`RFQ objetivo: ${fmt(rfq.date)} (${rfq.basis || 'estimada'})`}
                    >
                      <Diamond className="w-4 h-4 fill-violet-500/40" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detalle del hito seleccionado */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 min-h-[110px]">
        {active ? (
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-cyan-400">{active.project.name}</div>
                <div className="text-sm font-bold text-white">{active.entry.signalTitle}</div>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono">
                <span className="text-slate-400">{active.entry.date}</span>
                <span className="px-1.5 py-0.5 rounded border border-cyan-800/40 bg-cyan-950/60 text-cyan-400">
                  {active.entry.source}
                </span>
                <span className="px-1.5 py-0.5 rounded border border-slate-700 text-slate-300">
                  Confianza {active.entry.confidenceLevel}
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{active.entry.changeDescription}</p>
            {active.entry.commercialInterpretation && (
              <p className="text-[11px] text-slate-400">
                <strong className="text-amber-400">Lectura comercial:</strong> {active.entry.commercialInterpretation}
              </p>
            )}
          </div>
        ) : (
          <p className="text-xs text-slate-500">Pase el cursor o haga clic sobre un punto para ver el detalle del hito.</p>
        )}
      </div>
    </div>
  );
};
