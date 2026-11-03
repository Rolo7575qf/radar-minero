import React, { useState } from 'react';
import { MiningProject } from '../../types/project';
import { SignalCategory, SignalRelevance, SignalConfidence } from '../../types/signal';
import { IngestSignalPayload } from '../../services/signalEngine';
import { X, Sparkles, Radio, Check, FileText, Lightbulb } from 'lucide-react';

interface SignalSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: MiningProject[];
  onIngestSignal: (payload: IngestSignalPayload) => void;
}

export const SignalSimulatorModal: React.FC<SignalSimulatorModalProps> = ({
  isOpen,
  onClose,
  projects,
  onIngestSignal,
}) => {
  const [projectId, setProjectId] = useState(projects[0]?.id || '');
  const [name, setName] = useState('');
  const [category, setCategory] = useState<SignalCategory>('Ingeniería y desarrollo');
  const [originalSource, setOriginalSource] = useState<IngestSignalPayload['originalSource']>('SEA / SEIA');
  const [description, setDescription] = useState('');
  const [hypothesis, setHypothesis] = useState('');
  const [potentialNeeds, setPotentialNeeds] = useState('');
  const [targetServices, setTargetServices] = useState('');
  const [anticipationWindowMonths, setAnticipationWindowMonths] = useState(6);
  const [relevance, setRelevance] = useState<SignalRelevance>('Alta');
  const [confidence, setConfidence] = useState<SignalConfidence>('Alta');

  if (!isOpen) return null;

  // Plantillas de simulación rápida
  const loadPreset = (presetType: string) => {
    const selectedP = projects.find((p) => p.id === projectId) || projects[0];
    if (presetType === 'sea_eia') {
      setName(`Ingreso de Estudio de Impacto Ambiental (EIA) para Expansión de ${selectedP.name}`);
      setCategory('Ambiental');
      setOriginalSource('SEA / SEIA');
      setDescription(`El titular ingresó formalmente al SEIA el Estudio de Impacto Ambiental que contempla nuevas áreas de botaderos, mineroducto y planta desalinizadora de respaldo.`);
      setHypothesis(`El inicio de tramitación ambiental anticipa requerimientos inminentes de modelación hidrogeológica, monitoreo de flora/fauna y preparación de ingeniería de detalle previa a la RCA.`);
      setPotentialNeeds('Modelamiento hidrogeológico continuo; Servicios de relacionamiento comunitario; Ensayos de laboratorio de relaves');
      setTargetServices('Consultoría Ambiental; Hidrogeología; Monitoreo en Terreno');
      setAnticipationWindowMonths(10);
      setRelevance('Crítica');
    } else if (presetType === 'epcm_award') {
      setName(`Adjudicación de Contrato EPCM para Concentradora Principal`);
      setCategory('Contratación');
      setOriginalSource('Corporativo / Prensa');
      setDescription(`Compañía minera confirmó la adjudicación del contrato EPCM a firma internacional de ingeniería, iniciando la procura de equipos mayores.`);
      setHypothesis(`La selección del EPCM traslada el poder de decisión de compras técnicas a la firma de ingeniería. Momento clave para homologación en la Vendor List oficial.`);
      setPotentialNeeds('Inspección técnica de soldaduras de molinos; Suministro de piping de alta presión; Grúas de alto tonelaje para montaje');
      setTargetServices('Montaje Electromecánico; Inspección Técnica (ITO); Piping Industrial');
      setAnticipationWindowMonths(4);
      setRelevance('Crítica');
    } else if (presetType === 'capex_increase') {
      setName(`Aprobación de Incremento de CAPEX por US$ 450M en Directorio`);
      setCategory('Inversión');
      setOriginalSource('CMF');
      setDescription(`Hecho esencial remitido a la CMF confirma ampliación presupuestaria para incorporar tecnología de relaves espesados y automatización de flota.`);
      setHypothesis(`Mayor disponibilidad presupuestaria para modernización tecnológica y mitigación de huella hídrica.`);
      setPotentialNeeds('Sistemas de telemetría y sensores IoT; Bandas transportadoras overland; Plantas de filtrado rápido');
      setTargetServices('Automatización Minera; Filtrado de Relaves; Equipamiento Mayor');
      setAnticipationWindowMonths(8);
      setRelevance('Alta');
    } else if (presetType === 'talent_exec') {
      setName(`Nombramiento de Nuevo Vicepresidente de Proyectos y Adquisiciones`);
      setCategory('Organizacional');
      setOriginalSource('Corporativo / Prensa');
      setDescription(`La compañía nombró a reconocido ejecutivo con trayectoria en megaproyectos para reestructurar la cartera de contratos y cronograma de ejecución.`);
      setHypothesis(`Revisión estratégica de proveedores contratistas y posibles llamados a nuevas precalificaciones para diversificar la oferta.`);
      setPotentialNeeds('Servicios de consultoría de gestión de riesgos contractuales; Auditorías de aseguramiento de calidad');
      setTargetServices('Consultoría Estratégica; Auditoría QA/QC');
      setAnticipationWindowMonths(5);
      setRelevance('Media');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !projectId) {
      alert('Por favor completa el nombre de la señal y selecciona el proyecto.');
      return;
    }

    const payload: IngestSignalPayload = {
      name,
      category,
      description: description || 'Detección generada en simulación de inteligencia.',
      originalSource,
      sourceUrl: 'https://radarminero.com/simulacion-fuente',
      country: projects.find((p) => p.id === projectId)?.country || 'Chile',
      relatedProjectId: projectId,
      relevance,
      confidence,
      hypothesis: hypothesis || 'Señale con impacto en la contratación de proveedores especializados.',
      potentialNeeds: potentialNeeds
        ? potentialNeeds.split(';').map((s) => s.trim())
        : ['Servicios de ingeniería de detalle', 'Suministro especializado'],
      targetServices: targetServices
        ? targetServices.split(';').map((s) => s.trim())
        : ['Ingeniería', 'Servicios Especializados'],
      anticipationWindowMonths: Number(anticipationWindowMonths) || 6,
    };

    onIngestSignal(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white">
                Ingesta & Simulador de Señales Tempranas
              </h2>
              <p className="text-xs text-slate-400">
                Alimenta el motor con un hecho para generar la hipótesis y la oportunidad B2B
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preset selector */}
        <div className="p-4 bg-slate-950/40 border-b border-slate-800 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[10px] font-bold uppercase text-slate-500 shrink-0">
            Plantillas Rápidas:
          </span>
          <button
            type="button"
            onClick={() => loadPreset('sea_eia')}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-300 font-medium whitespace-nowrap transition"
          >
            🌿 Permiso SEA / EIA
          </button>
          <button
            type="button"
            onClick={() => loadPreset('epcm_award')}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-purple-300 font-medium whitespace-nowrap transition"
          >
            🏗️ Adjudicación EPCM
          </button>
          <button
            type="button"
            onClick={() => loadPreset('capex_increase')}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 font-medium whitespace-nowrap transition"
          >
            💰 Aumento CAPEX (CMF)
          </button>
          <button
            type="button"
            onClick={() => loadPreset('talent_exec')}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-rose-300 font-medium whitespace-nowrap transition"
          >
            👔 Nombramiento Decisor
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-4 text-xs">
          {/* Proyecto y Categoría */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Proyecto Minero Afectado
              </label>
              <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.country} · {p.stage})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Categoría de Señal (A - H)
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as SignalCategory)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400"
              >
                <option value="Ambiental">A. Señal Ambiental</option>
                <option value="Inversión">B. Señal de Inversión</option>
                <option value="Ingeniería y desarrollo">C. Señal de Ingeniería y desarrollo</option>
                <option value="Contratación">D. Señal de Contratación</option>
                <option value="Corporativa y financiera">E. Señal Corporativa y financiera</option>
                <option value="Organizacional">F. Señal Organizacional</option>
                <option value="Operacional">G. Señal Operacional</option>
                <option value="Sectorial">H. Señal Sectorial</option>
              </select>
            </div>
          </div>

          {/* Nombre de la señal */}
          <div>
            <label className="block font-semibold text-slate-300 mb-1">
              Nombre / Titular de la Señal
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Aprobación de Adenda N° 3 y nueva ingeniería de relaves..."
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-medium focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Fuente y Ventana */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Fuente Oficial
              </label>
              <select
                value={originalSource}
                onChange={(e) => setOriginalSource(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400"
              >
                <option value="SEA / SEIA">SEA / SEIA (Chile)</option>
                <option value="COCHILCO">COCHILCO</option>
                <option value="CMF">CMF (Hecho Esencial)</option>
                <option value="SERNAGEOMIN">SERNAGEOMIN</option>
                <option value="SEDAR+">SEDAR+ (TSX NI 43-101)</option>
                <option value="Corporativo / Prensa">Corporativo / Prensa</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Ventana Anticipación
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min="1"
                  max="36"
                  value={anticipationWindowMonths}
                  onChange={(e) => setAnticipationWindowMonths(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono focus:outline-none focus:border-amber-400"
                />
                <span className="text-slate-400 text-xs">meses</span>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Relevancia
              </label>
              <select
                value={relevance}
                onChange={(e) => setRelevance(e.target.value as SignalRelevance)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400"
              >
                <option value="Crítica">Crítica</option>
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
              </select>
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label className="block font-semibold text-slate-300 mb-1">
              Descripción del Hecho
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detalles técnicos, hitos contractuales o resoluciones publicadas..."
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Hipótesis Comercial */}
          <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 space-y-3">
            <div className="flex items-center gap-1.5 text-amber-300 font-bold">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>Inferencia del Motor: Hipótesis Comercial B2B</span>
            </div>

            <div>
              <label className="block text-slate-400 text-[11px] font-semibold mb-1">
                ¿Qué necesidad comercial o técnica anticipa este hecho?
              </label>
              <textarea
                rows={2}
                value={hypothesis}
                onChange={(e) => setHypothesis(e.target.value)}
                placeholder="Ej: Desbloquea licitación de obras tempranas y exige contratación de consultoría geotécnica..."
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 text-[11px] font-semibold mb-1">
                  Necesidades Potenciales (separar con punto y coma ;)
                </label>
                <input
                  type="text"
                  value={potentialNeeds}
                  onChange={(e) => setPotentialNeeds(e.target.value)}
                  placeholder="Ej: Geotecnia avanzada; Telemetría; Piping"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-400 text-[11px] font-semibold mb-1">
                  Categoría de Proveedores Aplicables
                </label>
                <input
                  type="text"
                  value={targetServices}
                  onChange={(e) => setTargetServices(e.target.value)}
                  placeholder="Ej: Ingeniería EPCM; Montaje; Medio Ambiente"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          </div>

          {/* Footer Controls */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition font-semibold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold transition shadow-lg shadow-amber-500/20"
            >
              <Radio className="w-4 h-4" />
              <span>Procesar Señal en Motor</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
