import React from 'react';
import { RefreshCw, LogOut } from 'lucide-react';
import { ICSeal } from './ICSeal';

interface Props {
  code: string;
  email?: string | null;
}

const MESSAGES: Record<string, { title: string; body: string; retry?: boolean }> = {
  sin_licencia: {
    title: 'Su cuenta aún no tiene licencia',
    body: 'Este correo no está asociado a una licencia vigente de TRACER. Contacte a su ejecutivo de InteligenciaConectada™ para activarla.',
  },
  licencia_suspendida: {
    title: 'Su licencia está suspendida',
    body: 'El acceso de su empresa a TRACER está suspendido. Contacte a su ejecutivo de InteligenciaConectada™.',
  },
  licencia_inactiva: {
    title: 'Su licencia está inactiva',
    body: 'El acceso de su empresa a TRACER está inactivo. Contacte a su ejecutivo de InteligenciaConectada™.',
  },
  licencia_vencida: {
    title: 'Su licencia venció',
    body: 'La vigencia de su licencia terminó. Contacte a su ejecutivo de InteligenciaConectada™ para renovarla.',
  },
  error_licencia: {
    title: 'No pudimos verificar su licencia',
    body: 'Hubo un problema al consultar su licencia. Por seguridad no mostramos datos hasta verificarla. Intente nuevamente en unos minutos.',
    retry: true,
  },
};

export const LicenseGate: React.FC<Props> = ({ code, email }) => {
  const m = MESSAGES[code] ?? {
    title: 'Acceso no disponible',
    body: 'No pudimos habilitar el acceso a TRACER con esta cuenta. Contacte a su ejecutivo de InteligenciaConectada™.',
  };
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center shadow-2xl relative overflow-hidden">
        <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-amber-400" />
        <div className="flex justify-center mb-5">
          <ICSeal size={44} />
        </div>
        <div className="text-[10px] font-bold uppercase tracking-widest text-amber-400">TRACER · Industrial Intelligence Platform</div>
        <h1 className="mt-3 text-lg font-bold text-slate-100">{m.title}</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">{m.body}</p>
        {email && (
          <p className="mt-4 text-xs text-slate-500">
            Sesión iniciada como <span className="text-slate-300">{email}</span>
          </p>
        )}
        <div className="mt-6 flex flex-col sm:flex-row gap-2 justify-center">
          {m.retry && (
            <button
              onClick={() => window.location.reload()}
              className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 transition"
            >
              <RefreshCw size={13} /> Reintentar
            </button>
          )}
          <button
            onClick={async () => {
              try { await fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin' }); } catch { /* sin red */ }
              window.location.href = '/';
            }}
            className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
          >
            <LogOut size={13} /> Ingresar con otra cuenta
          </button>
        </div>
      </div>
    </div>
  );
};
