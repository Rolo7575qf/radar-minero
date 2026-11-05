import React, { useEffect, useRef, useState } from 'react';
import { X, Send, Sparkles, Copy, Check, Loader2 } from 'lucide-react';
import { MiningProject } from '../../types/project';

interface AssistantPanelProps {
  isOpen: boolean;
  onClose: () => void;
  /** Si viene un proyecto, se genera su brief comercial al abrir. */
  briefProject?: MiningProject | null;
  /** Nombres de los servicios del proveedor (perfil), para adaptar la hipótesis. */
  providerServiceLabels: string[];
}

interface Msg {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTIONS = [
  '¿Qué proyectos están más cerca de licitar y quién decide en cada uno?',
  '¿Qué proyectos tienen titular con decisor con correo verificado?',
  'Resume los hitos recientes de los proyectos en etapa de permisos.',
  '¿Dónde hay oportunidades para mi perfil de servicios?',
];

// Render mínimo y seguro: **negrita** y saltos de línea, sin HTML.
function renderInline(text: string): React.ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i} className="text-slate-100">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );
}

const Rendered: React.FC<{ text: string }> = ({ text }) => (
  <div className="space-y-1.5 text-[13px] leading-relaxed text-slate-300">
    {text.split('\n').map((line, i) => {
      const t = line.trim();
      if (!t) return <div key={i} className="h-1" />;
      const bullet = /^[-•*]\s+/.test(t);
      return (
        <p key={i} className={bullet ? 'pl-4 -indent-3' : undefined}>
          {bullet ? '• ' : ''}
          {renderInline(bullet ? t.replace(/^[-•*]\s+/, '') : t.replace(/^#{1,4}\s+/, ''))}
        </p>
      );
    })}
  </div>
);

export const AssistantPanel: React.FC<AssistantPanelProps> = ({ isOpen, onClose, briefProject, providerServiceLabels }) => {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<number | null>(null);
  const [scopeId, setScopeId] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);
  const startedFor = useRef<string | null>(null);

  const call = async (body: object): Promise<string> => {
    const res = await fetch('/api/assistant', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...body, providerServices: providerServiceLabels }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'No se pudo consultar al asistente.');
    return data.answer as string;
  };

  const generateBrief = async (p: MiningProject) => {
    setLoading(true);
    setError(null);
    setScopeId(p.id);
    setMessages([{ role: 'user', content: `Brief comercial: ${p.name}` }]);
    try {
      const answer = await call({ mode: 'brief', projectId: p.id });
      setMessages((m) => [...m, { role: 'assistant', content: answer }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  // Al abrir con un proyecto, genera el brief una sola vez por proyecto.
  useEffect(() => {
    if (!isOpen) {
      startedFor.current = null;
      return;
    }
    if (briefProject && startedFor.current !== briefProject.id) {
      startedFor.current = briefProject.id;
      void generateBrief(briefProject);
    } else if (!briefProject && startedFor.current !== '__chat__') {
      startedFor.current = '__chat__';
      setMessages([]);
      setScopeId(null);
      setError(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, briefProject?.id]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, loading]);

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || loading) return;
    const next: Msg[] = [...messages, { role: 'user', content: q }];
    setMessages(next);
    setInput('');
    setLoading(true);
    setError(null);
    try {
      const answer = await call({ mode: 'chat', projectId: scopeId, messages: next.slice(-8) });
      setMessages((m) => [...m, { role: 'assistant', content: answer }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const copy = async (i: number, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(i);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      /* sin portapapeles */
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:justify-end p-0 sm:p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-slate-950 border border-slate-800 sm:rounded-2xl w-full sm:max-w-xl h-[88vh] sm:h-[calc(100vh-2rem)] flex flex-col shadow-2xl overflow-hidden">
        <div className="relative px-5 py-4 border-b border-slate-800 bg-slate-900 flex items-start justify-between gap-4">
          <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-amber-400" />
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-amber-400 text-[10px] font-bold uppercase tracking-widest">
              <Sparkles size={12} /> Asistente IA
            </div>
            <h3 className="text-sm font-bold text-slate-100 mt-1 truncate">
              {briefProject ? `Brief comercial · ${briefProject.name}` : 'Pregunte sobre las fichas de Radar Minero'}
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">Responde solo con los datos de las fichas. Lo que no está, lo dice.</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800" aria-label="Cerrar">
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {messages.length === 0 && !loading && (
            <div className="space-y-3">
              <p className="text-xs text-slate-400">Pruebe con una de estas preguntas o escriba la suya:</p>
              <div className="flex flex-col gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => void send(s)}
                    className="text-left text-xs text-slate-300 px-3 py-2 rounded-xl border border-slate-800 hover:border-amber-400/50 hover:bg-slate-900 transition"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) =>
            m.role === 'user' ? (
              <div key={i} className="flex justify-end">
                <div className="max-w-[85%] rounded-2xl rounded-br-md bg-amber-400/10 border border-amber-400/30 px-3.5 py-2 text-[13px] text-amber-100">
                  {m.content}
                </div>
              </div>
            ) : (
              <div key={i} className="rounded-2xl rounded-bl-md bg-slate-900 border border-slate-800 px-4 py-3">
                <Rendered text={m.content} />
                <div className="mt-2 flex justify-end">
                  <button
                    onClick={() => void copy(i, m.content)}
                    className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-amber-400"
                  >
                    {copied === i ? <Check size={11} /> : <Copy size={11} />} {copied === i ? 'Copiado' : 'Copiar'}
                  </button>
                </div>
              </div>
            )
          )}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Loader2 size={14} className="animate-spin" /> Analizando las fichas…
            </div>
          )}
          {error && <div className="text-xs text-rose-300 bg-rose-500/10 border border-rose-500/30 rounded-xl px-3 py-2">{error}</div>}
          <div ref={endRef} />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            void send(input);
          }}
          className="p-3 border-t border-slate-800 bg-slate-900 flex items-center gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={1500}
            placeholder={scopeId ? 'Pregunte más sobre este proyecto…' : 'Pregunte sobre proyectos, actores, etapas…'}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-amber-400/60"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="p-2.5 rounded-xl bg-amber-400 text-slate-950 hover:bg-amber-300 disabled:opacity-40 disabled:cursor-not-allowed transition"
            aria-label="Enviar"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};
