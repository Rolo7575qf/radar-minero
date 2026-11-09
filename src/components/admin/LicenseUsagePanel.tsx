import React, { useEffect, useMemo, useState } from 'react';
import { Loader2, Users, LogIn, ShieldAlert, AlertTriangle, Clock } from 'lucide-react';

interface UsageRow {
  licenseId: string;
  companyName: string;
  maxUsers: number | null;
  status: string;
  expiryDate: string | null;
  email: string | null;
  firstSeen: string | null;
  lastSeen: string | null;
}
interface AuthEvent {
  ts: number;
  email: string | null;
  event: string;
}

const EVENT_LABEL: Record<string, { text: string; tone: string }> = {
  login: { text: 'Ingresó', tone: 'text-emerald-400' },
  limite_usuarios: { text: 'Bloqueado: límite de usuarios', tone: 'text-amber-400' },
  sin_licencia: { text: 'Pidió código sin licencia', tone: 'text-slate-400' },
  verify_fail: { text: 'Código incorrecto', tone: 'text-rose-400' },
};

const parseDate = (s: string | null): Date | null => {
  if (!s) return null;
  const d = new Date(s.includes('T') ? s : s.replace(' ', 'T') + 'Z');
  return isNaN(d.getTime()) ? null : d;
};

const ago = (s: string | null): string => {
  const d = parseDate(s);
  if (!d) return 'nunca';
  const mins = Math.floor((Date.now() - d.getTime()) / 60000);
  if (mins < 2) return 'hace un momento';
  if (mins < 60) return `hace ${mins} min`;
  const h = Math.floor(mins / 60);
  if (h < 24) return `hace ${h} h`;
  const days = Math.floor(h / 24);
  return days === 1 ? 'ayer' : `hace ${days} días`;
};

const daysToExpiry = (s: string | null): number | null => {
  if (!s) return null;
  const d = new Date(s + 'T23:59:59');
  return isNaN(d.getTime()) ? null : Math.ceil((d.getTime() - Date.now()) / 86400000);
};

export const LicenseUsagePanel: React.FC = () => {
  const [rows, setRows] = useState<UsageRow[]>([]);
  const [events, setEvents] = useState<AuthEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    fetch('/api/admin/usage', { credentials: 'same-origin' })
      .then(async (r) => {
        if (!r.ok) throw new Error('No se pudo cargar el uso de las licencias.');
        return r.json();
      })
      .then((d) => {
        if (!alive) return;
        setRows(d.users || []);
        setEvents(d.events || []);
      })
      .catch((e) => alive && setError(e instanceof Error ? e.message : 'Error desconocido'))
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, []);

  const clients = useMemo(() => {
    const map = new Map<string, { id: string; name: string; max: number; status: string; expiry: string | null; users: UsageRow[] }>();
    for (const r of rows) {
      if (!map.has(r.licenseId)) {
        map.set(r.licenseId, { id: r.licenseId, name: r.companyName, max: r.maxUsers || 5, status: r.status, expiry: r.expiryDate, users: [] });
      }
      if (r.email) map.get(r.licenseId)!.users.push(r);
    }
    return [...map.values()];
  }, [rows]);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-xs text-slate-400 py-10 justify-center">
        <Loader2 size={14} className="animate-spin" /> Cargando uso de las licencias…
      </div>
    );
  }
  if (error) {
    return <div className="text-xs text-rose-300 bg-rose-500/10 border border-rose-500/30 rounded-xl px-3 py-2">{error}</div>;
  }

  const totalUsers = clients.reduce((a, c) => a + c.users.length, 0);
  const blocked = events.filter((e) => e.event === 'limite_usuarios').length;
  const expiring = clients.filter((c) => {
    const d = daysToExpiry(c.expiry);
    return d !== null && d >= 0 && d <= 30 && c.status !== 'suspendida';
  }).length;

  const stat = (icon: React.ReactNode, label: string, value: number, tone = 'text-white') => (
    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">{icon}{label}</div>
      <div className={`mt-2 text-2xl font-extrabold ${tone}`}>{value}</div>
    </div>
  );

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stat(<Users size={12} />, 'Clientes', clients.length)}
        {stat(<LogIn size={12} />, 'Usuarios activos', totalUsers, 'text-emerald-400')}
        {stat(<Clock size={12} />, 'Vencen en 30 días', expiring, expiring ? 'text-amber-400' : 'text-white')}
        {stat(<ShieldAlert size={12} />, 'Bloqueos por cupo', blocked, blocked ? 'text-amber-400' : 'text-white')}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-3">
          {clients.map((c) => {
            const pct = Math.min(100, Math.round((c.users.length / c.max) * 100));
            const full = c.users.length >= c.max;
            const d = daysToExpiry(c.expiry);
            return (
              <div key={c.id} className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-sm font-extrabold text-white truncate">{c.name}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2 flex-wrap">
                      <span className="uppercase">{c.status}</span>
                      {c.expiry && (
                        <span className={d !== null && d <= 30 ? 'text-amber-400' : ''}>
                          · {d !== null && d < 0 ? 'venció' : d !== null && d <= 30 ? `vence en ${d} días` : `vigente hasta ${c.expiry}`}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className={`text-xs font-bold shrink-0 ${full ? 'text-amber-400' : 'text-slate-300'}`}>
                    {c.users.length} / {c.max} usuarios
                  </div>
                </div>
                <div className="mt-3 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div className={`h-full ${full ? 'bg-amber-400' : 'bg-emerald-400'}`} style={{ width: `${pct}%` }} />
                </div>
                {c.users.length === 0 ? (
                  <div className="mt-3 text-[11px] text-slate-500">Nadie ha ingresado todavía.</div>
                ) : (
                  <ul className="mt-3 divide-y divide-slate-800/70">
                    {c.users.map((u) => (
                      <li key={u.email!} className="py-1.5 flex items-center justify-between gap-3 text-[11px]">
                        <span className="font-mono text-cyan-400 truncate">{u.email}</span>
                        <span className="text-slate-500 shrink-0">último ingreso {ago(u.lastSeen)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 h-fit">
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
            <AlertTriangle size={12} /> Actividad reciente
          </div>
          {events.length === 0 ? (
            <div className="mt-3 text-[11px] text-slate-500">Sin actividad registrada.</div>
          ) : (
            <ul className="mt-3 space-y-2 max-h-[420px] overflow-y-auto pr-1">
              {events.slice(0, 40).map((e, i) => {
                const m = EVENT_LABEL[e.event] || { text: e.event, tone: 'text-slate-400' };
                return (
                  <li key={i} className="text-[11px]">
                    <div className={`font-semibold ${m.tone}`}>{m.text}</div>
                    <div className="text-slate-500 truncate">
                      <span className="font-mono">{e.email || '—'}</span> · {ago(new Date(e.ts).toISOString())}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
