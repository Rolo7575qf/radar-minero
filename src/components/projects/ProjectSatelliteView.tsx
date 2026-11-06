import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Satellite, Globe, ExternalLink, Layers, ZoomIn } from 'lucide-react';
import { MiningProject } from '../../types/project';

interface ProjectSatelliteViewProps {
  project: MiningProject;
}

export const ProjectSatelliteView: React.FC<ProjectSatelliteViewProps> = ({ project }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const [mapType, setMapType] = useState<'satellite' | 'topo'>('satellite');

  const hasValidCoords =
    typeof project.latitude === 'number' &&
    typeof project.longitude === 'number' &&
    !isNaN(project.latitude) &&
    !isNaN(project.longitude);

  const lat = hasValidCoords ? project.latitude : -26.5;
  const lng = hasValidCoords ? project.longitude : -69.8;
  const zoomLevel = hasValidCoords ? 13 : 6;

  // URLs de mosaicos satelitales y topográficos de alta disponibilidad
  const SATELLITE_TILES = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
  const TOPO_TILES = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        zoomControl: true,
        scrollWheelZoom: false,
        attributionControl: true,
      }).setView([lat, lng], zoomLevel);

      const tileLayer = L.tileLayer(mapType === 'satellite' ? SATELLITE_TILES : TOPO_TILES, {
        attribution:
          mapType === 'satellite'
            ? 'Tiles &copy; Esri, Maxar, Earthstar Geographics'
            : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map);

      // Marcador central en el yacimiento / faena
      const customIcon = L.divIcon({
        className: 'custom-faena-pin',
        html: `
          <div style="position: relative; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;">
            <div style="position: absolute; width: 32px; height: 32px; background: rgba(245, 158, 11, 0.35); border-radius: 50%; animation: ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
            <div style="position: absolute; width: 18px; height: 18px; background: #f59e0b; border: 2.5px solid #0f172a; border-radius: 50%; box-shadow: 0 0 10px rgba(245,158,11,0.8);"></div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      L.marker([lat, lng], { icon: customIcon })
        .addTo(map)
        .bindPopup(`
          <div style="font-family: sans-serif; font-size: 12px; color: #0f172a; padding: 4px;">
            <strong style="color: #0f172a; font-size: 13px;">${project.name}</strong><br/>
            <span style="color: #64748b;">${project.ownerCompany}</span><br/>
            <span style="display: inline-block; margin-top: 4px; padding: 2px 6px; background: #fef3c7; color: #92400e; border-radius: 3px; font-weight: bold; font-size: 10px;">
              ${project.stage}
            </span>
          </div>
        `);

      tileLayerRef.current = tileLayer;
      mapInstanceRef.current = map;
    } else {
      mapInstanceRef.current.setView([lat, lng], zoomLevel);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [lat, lng, zoomLevel]);

  // Cambiar capa (Satélite vs Topo)
  const toggleMapType = (newType: 'satellite' | 'topo') => {
    setMapType(newType);
    if (!mapInstanceRef.current || !tileLayerRef.current) return;
    mapInstanceRef.current.removeLayer(tileLayerRef.current);
    const newLayer = L.tileLayer(newType === 'satellite' ? SATELLITE_TILES : TOPO_TILES, {
      attribution:
        newType === 'satellite'
          ? 'Tiles &copy; Esri, Maxar, Earthstar Geographics'
          : '&copy; OpenStreetMap',
      maxZoom: 18,
    }).addTo(mapInstanceRef.current);
    tileLayerRef.current = newLayer;
  };

  const googleEarthUrl = `https://earth.google.com/web/@${lat},${lng},1200a,35d,35y,0h,0t,0r`;
  const sentinelHubUrl = `https://browser.dataspace.copernicus.eu/?zoom=13&lat=${lat}&lng=${lng}&themeId=DEFAULT-THEME`;

  return (
    <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
      {/* Barra superior de control satelital */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Satellite className="w-4 h-4 text-amber-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
            Monitoreo Óptico y Satelital de Faena (HD)
          </h3>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            ESRI World Imagery · Cobertura 2025/2026
          </span>
        </div>

        {/* Switch Satélite / Terreno y Enlaces externos */}
        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-lg p-0.5 bg-slate-900 border border-slate-800 text-[11px]">
            <button
              onClick={() => toggleMapType('satellite')}
              className={`px-2.5 py-1 rounded-md font-medium transition flex items-center gap-1 ${
                mapType === 'satellite' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Satellite className="w-3 h-3" /> Satélite
            </button>
            <button
              onClick={() => toggleMapType('topo')}
              className={`px-2.5 py-1 rounded-md font-medium transition flex items-center gap-1 ${
                mapType === 'topo' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe className="w-3 h-3" /> Terreno
            </button>
          </div>

          <a
            href={googleEarthUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Abrir en Google Earth 3D"
            className="text-[11px] px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 inline-flex items-center gap-1 transition"
          >
            <ExternalLink className="w-3 h-3 text-amber-400" /> Earth 3D
          </a>

          <a
            href={sentinelHubUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Historial de satélite en Copernicus / Sentinel Browser"
            className="text-[11px] px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-800 inline-flex items-center gap-1 transition"
          >
            <Layers className="w-3 h-3 text-cyan-400" /> Historial Sentinel-2
          </a>
        </div>
      </div>

      {/* Contenedor del Mapa Satelital */}
      <div className="relative rounded-lg overflow-hidden border border-slate-800 h-[260px] sm:h-[300px] w-full bg-slate-900 z-0 isolate">
        <div ref={mapContainerRef} className="h-full w-full z-0" />
        
        {/* Overlay informativo flotante en la esquina inferior izquierda */}
        <div className="absolute bottom-2 left-2 z-[400] bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-[10px] text-slate-300 flex items-center gap-3">
          <div>
            <span className="text-slate-500 block">COORDENADAS</span>
            <span className="font-mono text-white font-bold">{lat.toFixed(4)}°, {lng.toFixed(4)}°</span>
          </div>
          <div className="border-l border-slate-800 pl-3">
            <span className="text-slate-500 block">RESOLUCIÓN ESTIMADA</span>
            <span className="text-amber-400 font-bold font-mono">0.3 – 1.0 m / px</span>
          </div>
          <div className="border-l border-slate-800 pl-3 hidden sm:block">
            <span className="text-slate-500 block">ÁREA OBSERVADA</span>
            <span className="text-slate-200">Rajo, tranque & campamento</span>
          </div>
        </div>
      </div>

      {/* Pie de foto y contexto técnico */}
      <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 px-1">
        <span>
          Permite inspeccionar avance de movimientos de tierra, apertura de caminos y recrecimiento de depósitos de relaves.
        </span>
        <span className="text-slate-500 text-[10px]">
          Filtro óptico sin nubes vía World Imagery
        </span>
      </div>
    </div>
  );
};
