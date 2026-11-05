import React, { useRef, useState } from 'react';
import { X, Upload, Trash2, Briefcase, Sliders, RotateCcw, Image as ImageIcon, BookOpen } from 'lucide-react';
import { ClientBrand } from '../brand/ICSeal';
import { serviceLabel } from '../../data/serviceCatalog';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  email?: string | null;
  brand: ClientBrand;
  onSaveBrand: (b: ClientBrand) => void;
  providerServices: string[];
  onOpenProviderProfile: () => void;
  onOpenScoringConfig: () => void;
  onOpenScoringGuide: () => void;
  onRestoreDefaults: () => void;
}

// Reduce el logo a un tamaño liviano para guardarlo en el espacio de trabajo del usuario
async function resizeLogo(file: File): Promise<string> {
  const url = await new Promise<string>((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(String(r.result));
    r.onerror = rej;
    r.readAsDataURL(file);
  });
  const img = await new Promise<HTMLImageElement>((res, rej) => {
    const i = new Image();
    i.onload = () => res(i);
    i.onerror = rej;
    i.src = url;
  });
  const maxW = 480, maxH = 160;
  const w0 = img.naturalWidth || maxW, h0 = img.naturalHeight || maxH;
  const scale = Math.min(1, maxW / w0, maxH / h0);
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(w0 * scale));
  canvas.height = Math.max(1, Math.round(h0 * scale));
  canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL('image/png');
}

export const AccountModal: React.FC<Props> = ({
  isOpen, onClose, email, brand, onSaveBrand, providerServices,
  onOpenProviderProfile, onOpenScoringConfig, onOpenScoringGuide, onRestoreDefaults,
}) => {
  const [name, setName] = useState(brand.name || '');
  const [logo, setLogo] = useState<string | undefined>(brand.logo);
  const [error, setError] = useState('');
  const [confirmReset, setConfirmReset] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  if (!isOpen) return null;

  const onFile = async (f?: File) => {
    setError('');
    if (!f) return;
    if (!/^image\/(png|jpeg|webp|svg\+xml)$/.test(f.type)) { setError('Use un archivo PNG, JPG, WEBP o SVG.'); return; }
    try {
      const data = await resizeLogo(f);
      if (data.length > 150_000) { setError('El logo es muy pesado. Pruebe con una versión más simple o más pequeña.'); return; }
      setLogo(data);
    } catch { setError('No se pudo leer la imagen.'); }
  };

  const save = () => { onSaveBrand({ name: name.trim() || undefined, logo }); onClose(); };

  const Row: React.FC<{ icon: React.ReactNode; title: string; desc: string; action: React.ReactNode }> = ({ icon, title, desc, action }) => (
    <div className="flex items-center gap-4 py-4 border-t border-slate-800">
      <div className="w-9 h-9 rounded-[6px] border border-slate-800 flex items-center justify-center text-amber-400 shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-bold text-white">{title}</div>
        <div className="text-[11px] text-slate-400 mt-0.5">{desc}</div>
      </div>
      {action}
    </div>
  );
  const ghost = 'px-3 py-2 rounded-[6px] border border-slate-700 text-[11px] font-bold text-slate-200 hover:border-amber-400 hover:text-amber-400 transition shrink-0';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-950 border border-slate-800 rounded-[16px] w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-800 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2"><span className="ic-rule" /><span className="ic-eyebrow text-[10px] text-amber-400">Configuración</span></div>
            <h2 className="ic-display text-white text-2xl mt-2">Su cuenta<span className="text-amber-400">.</span></h2>
            <div className="ic-mono text-[11px] text-slate-500 mt-1">{email || 'Sesión verificada por Cloudflare Access'}</div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-[6px] text-slate-400 hover:text-white hover:bg-slate-900"><X className="w-5 h-5" /></button>
        </div>

        <div className="px-6 py-5 overflow-y-auto">
          {/* Identidad del cliente */}
          <div className="ic-eyebrow text-[10px] text-slate-500">Identidad de su empresa</div>
          <div className="mt-3 grid sm:grid-cols-[1fr_200px] gap-4">
            <div className="space-y-3">
              <label className="block">
                <span className="ic-eyebrow text-[9px] text-slate-400">Nombre de la empresa</span>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej: Hidráulica del Norte S.A."
                  className="mt-1.5 w-full bg-slate-900 border border-slate-800 rounded-[6px] px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-400" />
              </label>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => fileRef.current?.click()} className="flex items-center gap-2 px-3 py-2 rounded-[6px] bg-amber-400 hover:bg-amber-300 text-slate-950 text-[11px] font-bold">
                  <Upload className="w-3.5 h-3.5" /> {logo ? 'CAMBIAR LOGO' : 'SUBIR LOGO'}
                </button>
                {logo && (
                  <button onClick={() => setLogo(undefined)} className={ghost + ' flex items-center gap-1.5'}>
                    <Trash2 className="w-3.5 h-3.5" /> Quitar
                  </button>
                )}
                <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" className="hidden"
                  onChange={(e) => onFile(e.target.files?.[0])} />
              </div>
              <p className="text-[11px] text-slate-500">PNG o SVG con fondo transparente se ve mejor. Aparece en su panel, en la cortina de acceso y en su cuenta.</p>
              {error && <p className="text-[11px] text-rose-400">{error}</p>}
            </div>
            <div className="space-y-2">
              <div className="h-[72px] rounded-[10px] bg-white flex items-center justify-center p-3">
                {logo ? <img src={logo} alt="Vista previa" className="max-h-full max-w-full object-contain" /> : <ImageIcon className="w-6 h-6 text-slate-300" />}
              </div>
              <div className="h-[72px] rounded-[10px] bg-slate-900 border border-slate-800 flex items-center justify-center p-3">
                {logo ? <img src={logo} alt="" className="max-h-full max-w-full object-contain" /> : <span className="ic-mono text-[10px] text-slate-600">VISTA SOBRE NEGRO</span>}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Row icon={<Briefcase className="w-4 h-4" strokeWidth={1.5} />} title="Perfil de proveedor"
              desc={providerServices.length ? providerServices.map(serviceLabel).join(' · ') : 'Aún no define los servicios que ofrece. Sin perfil, el ranking es genérico.'}
              action={<button className={ghost} onClick={onOpenProviderProfile}>Editar</button>} />
            <Row icon={<Sliders className="w-4 h-4" strokeWidth={1.5} />} title="Ponderaciones del puntaje"
              desc="Ajuste cuánto pesa cada variable en el ranking de oportunidades."
              action={<button className={ghost} onClick={onOpenScoringConfig}>Ajustar</button>} />
            <Row icon={<BookOpen className="w-4 h-4" strokeWidth={1.5} />} title="Cómo se calcula el puntaje"
              desc="Las 6 variables del modelo de 100 puntos, explicadas."
              action={<button className={ghost} onClick={onOpenScoringGuide}>Ver</button>} />
            <Row icon={<RotateCcw className="w-4 h-4" strokeWidth={1.5} />} title="Restaurar vista"
              desc="Vuelve los dashboards y las ponderaciones a los valores por defecto. No borra su pipeline ni sus notas."
              action={confirmReset
                ? <button className={ghost + ' !border-rose-500 !text-rose-400'} onClick={() => { onRestoreDefaults(); setConfirmReset(false); }}>Confirmar</button>
                : <button className={ghost} onClick={() => setConfirmReset(true)}>Restaurar</button>} />
          </div>
        </div>

        <div className="px-6 py-4 border-t border-slate-800 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2.5 rounded-[6px] text-[11px] font-bold text-slate-400 hover:text-white">CANCELAR</button>
          <button onClick={save} className="px-5 py-2.5 rounded-[6px] bg-amber-400 hover:bg-amber-300 text-slate-950 text-[11px] font-bold tracking-[0.12em]">GUARDAR CAMBIOS</button>
        </div>
      </div>
    </div>
  );
};
