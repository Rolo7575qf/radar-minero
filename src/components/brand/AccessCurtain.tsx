import React, { useEffect, useState } from 'react';
import { ArrowRight, Lock } from 'lucide-react';
import { ICSeal, ClientLogo, ClientBrand } from './ICSeal';

interface Props {
  ready: boolean;
  email?: string | null;
  clientBrand?: ClientBrand;
  stats: { projects: number; capexMillions: number; signals: number };
  onEnter: () => void;
}

const FEATURES = [
  { n: '01', t: 'Huellas de cada proyecto', d: 'Cada etapa con fuente y fecha: SEIA, prensa especializada y licitaciones.' },
  { n: '02', t: 'Oportunidades a su medida', d: 'Ranking según los servicios que su empresa ofrece.' },
  { n: '03', t: 'Momento de entrada', d: 'Ventana de anticipación antes de cada licitación.' },
];

const fmtCapex = (m: number) =>
  m >= 1000
    ? { v: (m / 1000).toLocaleString('es-CL', { maximumFractionDigits: 1 }), l: 'US$ mil MM' }
    : { v: String(Math.round(m)), l: 'US$ MM' };

// Cortina de acceso de marca IC. La autenticación la hace Cloudflare Access antes de llegar aquí;
// esta pantalla da la bienvenida, personaliza con el logo del cliente y espera la carga de datos.
export const AccessCurtain: React.FC<Props> = ({ ready, email, clientBrand, stats, onEnter }) => {
  const [leaving, setLeaving] = useState(false);

  const enter = () => {
    if (!ready || leaving) return;
    setLeaving(true);
    setTimeout(onEnter, 520);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Enter') enter(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  return (
    <div
      className={`fixed inset-0 z-[100] bg-slate-950 text-white overflow-y-auto ${leaving ? 'ic-curtain-out' : ''}`}
      role="dialog"
      aria-label="Acceso a TRACER"
    >
      <div className="min-h-full grid lg:grid-cols-[1.15fr_1fr]">
        {/* Lado marca */}
        <section className="relative overflow-hidden ic-dot-grid px-6 sm:px-10 lg:px-14 py-10 flex flex-col justify-between gap-10 border-b lg:border-b-0 lg:border-r border-slate-800">
          {/* Radar decorativo */}
          <div className="pointer-events-none absolute -right-[260px] top-1/2 -translate-y-1/2 w-[620px] h-[620px] hidden md:block" aria-hidden>
            {[1, 0.74, 0.48, 0.22].map((s) => (
              <div key={s} className="absolute rounded-full border border-amber-400/15"
                style={{ inset: `${(1 - s) * 50}%` }} />
            ))}
            <div className="absolute inset-0 ic-sweep">
              <div className="absolute left-1/2 top-1/2 w-1/2 h-px origin-left"
                style={{ background: 'linear-gradient(90deg, rgba(245,197,24,0.55), rgba(245,197,24,0))' }} />
            </div>
            <span className="absolute left-1/2 top-1/2 -ml-1 -mt-1 w-2 h-2 rounded-full bg-amber-400" />
            <span className="absolute left-1/2 top-1/2 -ml-1 -mt-1 w-2 h-2 rounded-full bg-amber-400 ic-ping" />
            <span className="absolute left-[30%] top-[38%] w-1.5 h-1.5 rounded-full bg-amber-400/80" />
            <span className="absolute left-[24%] top-[64%] w-1.5 h-1.5 rounded-full bg-amber-400/60" />
          </div>

          <div className="relative ic-fade-up">
            <div className="flex items-center gap-3">
              <ICSeal size={40} />
              <div>
                <div className="ic-mono text-[11px] font-bold tracking-[0.18em]">INTELIGENCIACONECTADA™</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="ic-rule" />
                  <span className="ic-eyebrow text-[10px] text-amber-400">TRACER · Trazabilidad de Inversiones Industriales</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative max-w-[620px] ic-fade-up" style={{ animationDelay: '80ms' }}>
            <h1 className="ic-display text-[44px] sm:text-[60px] xl:text-[72px]">
              Dónde está el próximo proyecto.{' '}
              <span className="text-amber-400">Y cuándo entrar.</span>
            </h1>
            <p className="mt-6 text-[15px] leading-relaxed text-slate-300 max-w-[460px]">
              El panel donde su empresa sigue cada proyecto minero desde su primera huella pública y decide a cuál llegar antes que la competencia.
            </p>

            <div className="mt-8 border border-slate-800 bg-slate-950/80 max-w-[480px]">
              {FEATURES.map((f, i) => (
                <div key={f.n} className={`flex gap-4 px-5 py-4 ${i ? 'border-t border-slate-800' : ''}`}>
                  <span className="ic-mono text-[12px] font-bold text-amber-400">{f.n}</span>
                  <div>
                    <div className="text-[13px] font-bold">{f.t}</div>
                    <div className="text-[12px] text-slate-400 mt-0.5">{f.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative ic-mono text-[10px] tracking-[0.18em] text-slate-500">
            GROWTH PARTNER B2B · INTELIGENCIACONECTADA.COM
          </div>
        </section>

        {/* Lado acceso */}
        <section className="flex items-center justify-center px-6 sm:px-10 pt-12 pb-28 lg:pb-12">
          <div className="w-full max-w-[400px] ic-fade-up" style={{ animationDelay: '160ms' }}>
            <div className="flex items-center gap-3">
              <span className="ic-rule" />
              <span className="ic-eyebrow text-[10px] text-amber-400">Acceso clientes</span>
            </div>
            <h2 className="mt-3 text-[28px] font-bold leading-tight">
              Bienvenido a su{' '}
              <span className="bg-amber-400 text-slate-950 px-1.5">panel</span>
            </h2>

            {(clientBrand?.logo || clientBrand?.name) && (
              <div className="mt-6 rounded-[10px] bg-white px-5 py-4 flex items-center justify-center min-h-[72px]">
                {clientBrand?.logo ? (
                  <ClientLogo brand={clientBrand} maxHeight={48} />
                ) : (
                  <span className="ic-display text-slate-950 text-xl">{clientBrand?.name}</span>
                )}
              </div>
            )}

            <div className="mt-6 border border-slate-800 rounded-[6px] px-4 py-3 flex items-center gap-3">
              <Lock className="w-4 h-4 text-amber-400 shrink-0" strokeWidth={1.5} />
              <div className="min-w-0">
                <div className="ic-eyebrow text-[9px] text-slate-500">Sesión verificada</div>
                <div className="ic-mono text-[12px] text-white truncate">{email || 'Verificando identidad…'}</div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 border border-slate-800">
              {[
                { v: ready ? String(stats.projects) : '—', l: 'Proyectos' },
                { v: ready ? fmtCapex(stats.capexMillions).v : '—', l: ready ? fmtCapex(stats.capexMillions).l : 'Inversión' },
                { v: ready ? String(stats.signals) : '—', l: 'Señales' },
              ].map((s, i) => (
                <div key={s.l} className={`px-3 py-3 ${i ? 'border-l border-slate-800' : ''}`}>
                  <div className="ic-display text-amber-400 text-[17px] leading-none truncate">{s.v}</div>
                  <div className="ic-eyebrow text-[8px] text-slate-500 mt-2">{s.l}</div>
                </div>
              ))}
            </div>

            <button
              onClick={enter}
              disabled={!ready}
              className={`mt-6 w-full flex items-center justify-center gap-2 py-4 rounded-[6px] text-[12px] font-bold tracking-[0.16em] transition ${
                ready ? 'bg-amber-400 hover:bg-amber-300 text-slate-950' : 'bg-slate-900 text-slate-500 cursor-wait'
              }`}
            >
              {ready ? (<>INGRESAR A TRACER <ArrowRight className="w-4 h-4" /></>) : 'SINCRONIZANDO DATOS…'}
            </button>

            <p className="mt-5 flex items-start gap-2 text-[11px] text-slate-500 leading-relaxed">
              <Lock className="w-3 h-3 mt-0.5 shrink-0" strokeWidth={1.5} />
              Acceso privado. Su pipeline, sus notas y su perfil de proveedor son visibles solo para su cuenta.
            </p>
          </div>
        </section>
      </div>

      {/* Botón fijo en celular para no esconder el ingreso bajo el pliegue */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 p-4 bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent">
        <button
          onClick={enter}
          disabled={!ready}
          className={`w-full flex items-center justify-center gap-2 py-4 rounded-[6px] text-[12px] font-bold tracking-[0.16em] ${
            ready ? 'bg-amber-400 text-slate-950' : 'bg-slate-900 text-slate-500'
          }`}
        >
          {ready ? (<>INGRESAR A TRACER <ArrowRight className="w-4 h-4" /></>) : 'SINCRONIZANDO DATOS…'}
        </button>
      </div>
    </div>
  );
};
