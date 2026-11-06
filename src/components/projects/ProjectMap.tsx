import React, { useEffect, useMemo, useRef, ReactNode } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { SectionHeader } from '../common/SectionHeader';
import { MiningProject } from '../../types/project';

interface ProjectMapProps {
  projects: MiningProject[];
  onSelectProject: (project: MiningProject) => void;
  viewToggle?: ReactNode;
}

// Etapas agrupadas por momento comercial
const stageNumber = (p: MiningProject) => parseInt(p.stage, 10) || 0;
const GROUPS = [
  { id: 'early', label: 'Exploración y estudios (1-7)', color: '#38bdf8', test: (n: number) => n <= 7 },
  { id: 'permits', label: 'Permisos y decisión (8-9)', color: '#fbbf24', test: (n: number) => n === 8 || n === 9 },
  { id: 'build', label: 'Contratación y construcción (10-12)', color: '#f97316', test: (n: number) => n >= 10 && n <= 12 },
  { id: 'ops', label: 'Operación y expansión (13-14)', color: '#34d399', test: (n: number) => n >= 13 },
];
const groupOf = (p: MiningProject) => GROUPS.find((g) => g.test(stageNumber(p))) || GROUPS[0];

// El backend marca "ubicación referencial" cuando no hay coordenadas reales del proyecto
const isApprox = (p: MiningProject) => /referencial/i.test(p.locationDetails || '');

/** Dispersa en espiral los puntos que comparten el mismo centro de región, para que sean clicables. */
function spread(projects: MiningProject[]): Map<string, [number, number]> {
  const seen = new Map<string, number>();
  const out = new Map<string, [number, number]>();
  for (const p of projects) {
    if (!isApprox(p)) {
      out.set(p.id, [p.latitude, p.longitude]);
      continue;
    }
    const key = `${p.latitude.toFixed(2)},${p.longitude.toFixed(2)}`;
    const i = seen.get(key) || 0;
    seen.set(key, i + 1);
    const angle = i * 2.4;
    const r = i === 0 ? 0 : 0.18 * Math.sqrt(i);
    out.set(p.id, [p.latitude + r * Math.sin(angle), p.longitude + r * Math.cos(angle)]);
  }
  return out;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));

export const ProjectMap: React.FC<ProjectMapProps> = ({ projects, onSelectProject, viewToggle }) => {
  const el = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);

  const positions = useMemo(() => spread(projects), [projects]);
  const approxCount = projects.filter(isApprox).length;

  useEffect(() => {
    if (!el.current || mapRef.current) return;
    const map = L.map(el.current, { zoomControl: true, scrollWheelZoom: true }).setView([-26.5, -69.8], 5);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 12,
    }).addTo(map);
    // Tono oscuro sobre el mapa base (sin depender de proveedores de pago)
    const tiles = map.getPane('tilePane');
    if (tiles) tiles.style.filter = 'invert(1) hue-rotate(180deg) brightness(0.85) contrast(0.9) saturate(0.5)';
    layerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const layer = layerRef.current;
    if (!map || !layer) return;
    layer.clearLayers();
    const pts: L.LatLngTuple[] = [];

    for (const p of projects) {
      const pos = positions.get(p.id);
      if (!pos) continue;
      const g = groupOf(p);
      const approx = isApprox(p);
      const radius = Math.max(6, Math.min(16, 5 + Math.sqrt(p.capexEstimatedMillionsUSD || 0) / 6));
      const m = L.circleMarker(pos, {
        radius,
        color: approx ? '#e2e8f0' : '#0f172a',
        weight: approx ? 1.5 : 1,
        dashArray: approx ? '3 3' : undefined,
        fillColor: g.color,
        fillOpacity: approx ? 0.55 : 0.9,
      });
      const wrap = document.createElement('div');
      wrap.style.minWidth = '200px';
      wrap.innerHTML = `
        <div style="font-weight:700;font-size:12px;line-height:1.3">${esc(p.name)}</div>
        <div style="font-size:11px;color:#475569;margin-top:2px">${esc(p.ownerCompany)}</div>
        <div style="font-size:11px;margin-top:4px"><b>${esc(p.stage.replace(/^\d+\.\s*/, ''))}</b> · ${
          p.capexEstimatedMillionsUSD ? 'US$' + p.capexEstimatedMillionsUSD.toLocaleString('es-CL') + ' MM' : 'inversión no informada'
        }</div>
        ${approx ? '<div style="font-size:10px;color:#b45309;margin-top:4px">Ubicación referencial (centro de región)</div>' : ''}`;
      const btn = document.createElement('button');
      btn.textContent = 'Ver ficha';
      btn.style.cssText = 'margin-top:8px;padding:4px 10px;border-radius:6px;background:#fbbf24;color:#0f172a;font-weight:700;font-size:11px;border:0;cursor:pointer';
      btn.onclick = () => onSelectProject(p);
      wrap.appendChild(btn);
      m.bindPopup(wrap);
      m.bindTooltip(p.name, { direction: 'top' });
      m.addTo(layer);
      pts.push(pos);
    }

    if (pts.length > 1) map.fitBounds(L.latLngBounds(pts).pad(0.15), { maxZoom: 8 });
  }, [projects, positions, onSelectProject]);

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Mapa de cartera"
        title="Proyectos en el territorio"
        description="Cada punto es un proyecto: el color indica el momento comercial y el tamaño, la inversión declarada."
        stats={[
          { value: projects.length, label: 'Proyectos' },
          { value: projects.length - approxCount, label: 'Con ubicación del sitio' },
        ]}
      />

      {viewToggle}

      <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400">
        {GROUPS.map((g) => (
          <span key={g.id} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: g.color }} /> {g.label}
          </span>
        ))}
        {approxCount > 0 && (
          <span className="flex items-center gap-1.5 text-slate-500">
            <span className="w-2.5 h-2.5 rounded-full border border-dashed border-slate-300" /> Contorno punteado: ubicación referencial por región ({approxCount})
          </span>
        )}
      </div>

      <div className="rounded-2xl border border-slate-800 overflow-hidden">
        <div ref={el} style={{ height: 560, width: '100%', background: '#0b1220' }} />
      </div>
    </div>
  );
};
