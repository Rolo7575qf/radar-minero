import React, { useEffect, useState } from 'react';
import { Loader2, Mail, KeyRound, ArrowLeft } from 'lucide-react';
import { ICSeal } from './ICSeal';

type Step = 'email' | 'code';

async function post(path: string, body: object): Promise<{ ok: boolean; status: number; data: any }> {
  const res = await fetch(path, {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

export const LoginScreen: React.FC = () => {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const requestCode = async () => {
    setLoading(true);
    setError(null);
    try {
      const r = await post('/api/auth/request', { email: email.trim() });
      if (!r.ok) {
        setError(r.data?.error || 'No pudimos enviar el código.');
      } else {
        setStep('code');
        setCode('');
        setCooldown(45);
      }
    } catch {
      setError('Sin conexión con el servidor. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const verify = async () => {
    setLoading(true);
    setError(null);
    try {
      const r = await post('/api/auth/verify', { email: email.trim(), code });
      if (r.ok) {
        window.location.reload();
        return;
      }
      setError(r.data?.error || 'Código inválido o vencido.');
    } catch {
      setError('Sin conexión con el servidor. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const input =
    'w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-amber-400/60';
  const primary =
    'w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 transition disabled:opacity-40 disabled:cursor-not-allowed';

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl relative overflow-hidden">
        <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-amber-400" />
        <div className="flex justify-center mb-5">
          <ICSeal size={44} />
        </div>
        <div className="text-center text-[10px] font-bold uppercase tracking-widest text-amber-400">
          TRACER · Industrial Intelligence Platform
        </div>
        <h1 className="mt-3 text-center text-lg font-bold text-slate-100">
          {step === 'email' ? 'Ingrese a su cuenta' : 'Revise su correo'}
        </h1>

        {step === 'email' ? (
          <form
            className="mt-5 space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              if (email.trim() && !loading) void requestCode();
            }}
          >
            <p className="text-center text-sm text-slate-400">
              Le enviaremos un código de 6 dígitos a su correo corporativo.
            </p>
            <div className="relative">
              <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="email"
                autoComplete="email"
                autoFocus
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario@empresa.com"
                className={input + ' pl-10'}
              />
            </div>
            <button type="submit" disabled={loading || !email.trim()} className={primary}>
              {loading ? <Loader2 size={15} className="animate-spin" /> : null} Enviarme el código
            </button>
          </form>
        ) : (
          <form
            className="mt-5 space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              if (code.length === 6 && !loading) void verify();
            }}
          >
            <p className="text-center text-sm text-slate-400">
              Si <span className="text-slate-200">{email.trim()}</span> tiene licencia, recibirá un código. Vence en 10 minutos.
              Revise también la carpeta de spam.
            </p>
            <div className="relative">
              <KeyRound size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                inputMode="numeric"
                autoComplete="one-time-code"
                autoFocus
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                placeholder="000000"
                className={input + ' pl-10 tracking-[0.5em] text-center font-mono text-lg'}
              />
            </div>
            <button type="submit" disabled={loading || code.length !== 6} className={primary}>
              {loading ? <Loader2 size={15} className="animate-spin" /> : null} Ingresar
            </button>
            <div className="flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => { setStep('email'); setError(null); }}
                className="flex items-center gap-1 text-slate-400 hover:text-slate-200"
              >
                <ArrowLeft size={12} /> Cambiar correo
              </button>
              <button
                type="button"
                disabled={cooldown > 0 || loading}
                onClick={() => void requestCode()}
                className="text-amber-400 hover:text-amber-300 disabled:text-slate-600"
              >
                {cooldown > 0 ? `Reenviar en ${cooldown}s` : 'Reenviar código'}
              </button>
            </div>
          </form>
        )}

        {error && (
          <div className="mt-4 text-xs text-rose-300 bg-rose-500/10 border border-rose-500/30 rounded-xl px-3 py-2">{error}</div>
        )}
      </div>
    </div>
  );
};
