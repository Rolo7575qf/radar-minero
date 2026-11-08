import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldAlert,
  Users,
  CheckCircle2,
  XCircle,
  Plus,
  Search,
  Globe2,
  Pickaxe,
  Zap,
  Building2,
  TreePine,
  Fish,
  Edit2,
  Trash2,
  Calendar,
  Mail,
  Building,
  KeyRound,
  Layers,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  AlertTriangle,
  Info
} from 'lucide-react';
import {
  ClientLicense,
  LicenseStatus,
  LicensePlan,
  ALL_AVAILABLE_COUNTRIES,
  ALL_AVAILABLE_RUBROS
} from '../../types/license';
import { licenseService } from '../../services/licenseService';

interface AdminControlPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  adminEmail?: string | null;
}

export const AdminControlPanelModal: React.FC<AdminControlPanelModalProps> = ({
  isOpen,
  onClose,
  adminEmail,
}) => {
  const [licenses, setLicenses] = useState<ClientLicense[]>([]);
  const [activeTab, setActiveTab] = useState<'licenses' | 'rubros' | 'countries'>('licenses');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todas');
  const [isLoading, setIsLoading] = useState(true);

  // Modal para Crear / Editar Licencia
  const [editingLicense, setEditingLicense] = useState<ClientLicense | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  // Estados locales del formulario
  const [formCompany, setFormCompany] = useState('');
  const [formContactName, setFormContactName] = useState('');
  const [formContactEmail, setFormContactEmail] = useState('');
  const [formAllowedEmails, setFormAllowedEmails] = useState('');
  const [formPlan, setFormPlan] = useState<LicensePlan>('Enterprise B2B');
  const [formStatus, setFormStatus] = useState<LicenseStatus>('activa');
  const [formCountries, setFormCountries] = useState<string[]>(['Chile']);
  const [formRubros, setFormRubros] = useState<string[]>(['Minería']);
  const [formMaxUsers, setFormMaxUsers] = useState<number>(5);
  const [formStartDate, setFormStartDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [formExpiryDate, setFormExpiryDate] = useState<string>('2027-12-31');
  const [formNotes, setFormNotes] = useState('');
  const [formError, setFormError] = useState('');

  // Carga inicial
  useEffect(() => {
    if (isOpen) {
      loadLicenses();
    }
  }, [isOpen]);

  const loadLicenses = async () => {
    setIsLoading(true);
    const data = await licenseService.fetchLicenses();
    setLicenses(data);
    setIsLoading(false);
  };

  if (!isOpen) return null;

  // Filtrado de licencias
  const filteredLicenses = licenses.filter((lic) => {
    const q = (searchTerm || '').toLowerCase();
    const matchesSearch =
      !q ||
      String(lic.companyName || '').toLowerCase().includes(q) ||
      String(lic.contactName || '').toLowerCase().includes(q) ||
      String(lic.contactEmail || '').toLowerCase().includes(q) ||
      String(lic.plan || '').toLowerCase().includes(q);

    const matchesStatus = statusFilter === 'todas' || lic.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Métricas
  const totalClients = licenses.length;
  const activeLicensesCount = licenses.filter((l) => l.status === 'activa').length;
  const demoLicensesCount = licenses.filter((l) => l.status === 'demo').length;
  const inactiveLicensesCount = licenses.filter((l) => l.status === 'inactiva' || l.status === 'suspendida').length;

  // Acciones rápidas de toggle
  const handleToggleStatus = async (lic: ClientLicense) => {
    const nextStatus: LicenseStatus = lic.status === 'activa' ? 'inactiva' : 'activa';
    await licenseService.updateLicenseStatus(lic.id, nextStatus);
    setLicenses((prev) =>
      prev.map((l) => (l.id === lic.id ? { ...l, status: nextStatus, updatedAt: new Date().toISOString() } : l))
    );
  };

  const handleToggleCountry = async (lic: ClientLicense, country: string) => {
    const updated = await licenseService.toggleLicenseCountry(lic.id, country);
    if (updated) {
      setLicenses((prev) => prev.map((l) => (l.id === lic.id ? updated : l)));
    }
  };

  const handleToggleRubro = async (lic: ClientLicense, rubro: string) => {
    const updated = await licenseService.toggleLicenseRubro(lic.id, rubro);
    if (updated) {
      setLicenses((prev) => prev.map((l) => (l.id === lic.id ? updated : l)));
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`¿Está seguro de eliminar la licencia de "${name}"? Esta acción revoca el acceso del cliente.`)) {
      await licenseService.deleteLicense(id);
      setLicenses((prev) => prev.filter((l) => l.id !== id));
    }
  };

  // Abrir formulario para Nuevo o Editar
  const handleOpenCreateForm = () => {
    setEditingLicense(null);
    setFormCompany('');
    setFormContactName('');
    setFormContactEmail('');
    setFormAllowedEmails('');
    setFormPlan('Enterprise B2B');
    setFormStatus('activa');
    setFormCountries(['Chile']);
    setFormRubros(['Minería']);
    setFormMaxUsers(5);
    setFormStartDate(new Date().toISOString().split('T')[0]);
    setFormExpiryDate('2027-12-31');
    setFormNotes('');
    setFormError('');
    setIsFormModalOpen(true);
  };

  const handleOpenEditForm = (lic: ClientLicense) => {
    setEditingLicense(lic);
    setFormCompany(lic.companyName);
    setFormContactName(lic.contactName);
    setFormContactEmail(lic.contactEmail);
    setFormAllowedEmails((lic.allowedEmails || []).join(', '));
    setFormPlan(lic.plan);
    setFormStatus(lic.status);
    setFormCountries(lic.countries || ['Chile']);
    setFormRubros(lic.rubros || ['Minería']);
    setFormMaxUsers(lic.maxUsers || 5);
    setFormStartDate(lic.startDate || new Date().toISOString().split('T')[0]);
    setFormExpiryDate(lic.expiryDate || '');
    setFormNotes(lic.notes || '');
    setFormError('');
    setIsFormModalOpen(true);
  };

  const handleSaveForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formCompany.trim()) {
      setFormError('El nombre de la empresa cliente es obligatorio.');
      return;
    }
    if (!formContactEmail.trim() || !formContactEmail.includes('@')) {
      setFormError('Ingrese un correo de contacto corporativo válido.');
      return;
    }
    if (formCountries.length === 0) {
      setFormError('Debe asignar al menos un país para la licencia.');
      return;
    }
    if (formRubros.length === 0) {
      setFormError('Debe asignar al menos un rubro para la licencia.');
      return;
    }

    const allowed = formAllowedEmails
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const id = editingLicense ? editingLicense.id : `lic-${Date.now()}`;
    const payload: ClientLicense = {
      id,
      companyName: formCompany.trim(),
      contactName: formContactName.trim() || formCompany.trim(),
      contactEmail: formContactEmail.trim().toLowerCase(),
      allowedEmails: allowed.length > 0 ? allowed : [formContactEmail.trim().toLowerCase()],
      status: formStatus,
      plan: formPlan,
      countries: formCountries,
      rubros: formRubros,
      maxUsers: Number(formMaxUsers) || 1,
      startDate: formStartDate,
      expiryDate: formExpiryDate || undefined,
      notes: formNotes.trim() || undefined,
    };

    await licenseService.saveLicense(payload);
    await loadLicenses();
    setIsFormModalOpen(false);
  };

  const getRubroIcon = (name: string) => {
    switch (name) {
      case 'Minería':
        return <Pickaxe className="w-3.5 h-3.5" />;
      case 'Energía & Renovables':
        return <Zap className="w-3.5 h-3.5" />;
      case 'Infraestructura & Construcción':
        return <Building2 className="w-3.5 h-3.5" />;
      case 'Celulosa & Forestal':
        return <TreePine className="w-3.5 h-3.5" />;
      case 'Agroindustria & Salmonicultura':
        return <Fish className="w-3.5 h-3.5" />;
      default:
        return <Layers className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-amber-500/30 rounded-2xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl shadow-amber-500/10 overflow-hidden">
        {/* Header Superior del Administrador Central */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-400/40 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-extrabold text-white tracking-wide">
                  Panel de Control Central · InteligenciaConectada™
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400 text-slate-950 uppercase tracking-wider">
                  SuperAdmin Exclusivo
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Gestión de Clientes B2B, Licenciamiento, Activación de Rubros Industriales y Países
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{adminEmail || 'roloquinonesf@gmail.com'}</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              title="Cerrar panel de control"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* KPIs de Control de Licencias */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-5 bg-slate-950/40 border-b border-slate-800/80">
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Total Clientes
              </span>
              <span className="text-2xl font-black text-white font-mono mt-0.5 block">
                {totalClients}
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-800 text-slate-300">
              <Building className="w-5 h-5" />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-emerald-500/20 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block">
                Licencias Activas
              </span>
              <span className="text-2xl font-black text-emerald-400 font-mono mt-0.5 block">
                {activeLicensesCount}
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-800/50">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-amber-500/20 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block">
                Licencias Demo / Trial
              </span>
              <span className="text-2xl font-black text-amber-400 font-mono mt-0.5 block">
                {demoLicensesCount}
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-amber-950/60 text-amber-400 border border-amber-800/50">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Inactivas / Suspendidas
              </span>
              <span className="text-2xl font-black text-slate-300 font-mono mt-0.5 block">
                {inactiveLicensesCount}
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-rose-950/60 text-rose-400 border border-rose-800/50">
              <XCircle className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Selector de Pestañas del Panel */}
        <div className="px-6 pt-3 border-b border-slate-800 flex items-center justify-between flex-wrap gap-3 bg-slate-900">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('licenses')}
              className={`px-4 py-2 text-xs font-bold transition border-b-2 flex items-center gap-2 ${
                activeTab === 'licenses'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Clientes & Licencias ({licenses.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('rubros')}
              className={`px-4 py-2 text-xs font-bold transition border-b-2 flex items-center gap-2 ${
                activeTab === 'rubros'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Catálogo de Rubros (5)</span>
            </button>

            <button
              onClick={() => setActiveTab('countries')}
              className={`px-4 py-2 text-xs font-bold transition border-b-2 flex items-center gap-2 ${
                activeTab === 'countries'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Globe2 className="w-4 h-4" />
              <span>Expansión Geográfica (4 Países)</span>
            </button>
          </div>

          {activeTab === 'licenses' && (
            <button
              onClick={handleOpenCreateForm}
              className="flex items-center gap-1.5 px-3.5 py-1.5 mb-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition shadow-md shadow-amber-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>Registrar Nuevo Cliente</span>
            </button>
          )}
        </div>

        {/* Contenido de la Pestaña Activa */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {/* TAB 1: CLIENTES Y LICENCIAS */}
          {activeTab === 'licenses' && (
            <div className="space-y-4">
              {/* Barra de Filtros y Búsqueda */}
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar por empresa, contacto, email o plan..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-semibold text-slate-400">Estado:</span>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="todas">Todas las licencias</option>
                    <option value="activa">Solo Activas</option>
                    <option value="inactiva">Solo Inactivas</option>
                    <option value="demo">Solo Pruebas (Demo)</option>
                  </select>
                </div>
              </div>

              {/* Tabla de Clientes y Licencias */}
              <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/60 shadow-lg">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                      <tr>
                        <th className="py-3 px-4">Empresa / Cliente</th>
                        <th className="py-3 px-3">Estado Licencia</th>
                        <th className="py-3 px-3">Plan / Cupos</th>
                        <th className="py-3 px-3">Rubros Habilitados</th>
                        <th className="py-3 px-3">Países Autorizados</th>
                        <th className="py-3 px-3">Vigencia</th>
                        <th className="py-3 px-4 text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      {filteredLicenses.map((lic) => {
                        const isSuperAdmin = lic.id === 'lic-ic-master';
                        const isActive = lic.status === 'activa';
                        const isDemo = lic.status === 'demo';

                        return (
                          <tr
                            key={lic.id}
                            className={`hover:bg-slate-900/60 transition ${
                              !isActive && !isDemo ? 'opacity-60 bg-slate-950/40' : ''
                            }`}
                          >
                            {/* Empresa & Contacto */}
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0">
                                  {lic.companyName.charAt(0)}
                                </div>
                                <div className="min-w-0">
                                  <div className="font-extrabold text-white text-xs truncate flex items-center gap-1.5">
                                    <span>{lic.companyName}</span>
                                    {isSuperAdmin && (
                                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 font-black">
                                        HQ
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-[11px] text-slate-400 flex items-center gap-1 truncate">
                                    <span>{lic.contactName}</span>
                                    <span>·</span>
                                    <span className="font-mono text-cyan-400">{lic.contactEmail}</span>
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* Estado y Switch */}
                            <td className="py-3 px-3">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => !isSuperAdmin && handleToggleStatus(lic)}
                                  disabled={isSuperAdmin}
                                  title={
                                    isSuperAdmin
                                      ? 'La licencia Master siempre permanece activa'
                                      : isActive
                                      ? 'Clic para desactivar licencia'
                                      : 'Clic para activar licencia'
                                  }
                                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border transition ${
                                    isActive
                                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60 hover:bg-emerald-900/80'
                                      : isDemo
                                      ? 'bg-amber-950/80 text-amber-300 border-amber-700/60 hover:bg-amber-900/80'
                                      : 'bg-rose-950/80 text-rose-300 border-rose-700/60 hover:bg-rose-900/80'
                                  }`}
                                >
                                  {isActive ? (
                                    <>
                                      <ToggleRight className="w-3.5 h-3.5 text-emerald-400" />
                                      <span>Activa</span>
                                    </>
                                  ) : isDemo ? (
                                    <>
                                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                                      <span>Prueba</span>
                                    </>
                                  ) : (
                                    <>
                                      <ToggleLeft className="w-3.5 h-3.5 text-rose-400" />
                                      <span>Inactiva</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            </td>

                            {/* Plan & Cupos */}
                            <td className="py-3 px-3">
                              <div className="font-bold text-slate-200 text-xs">{lic.plan}</div>
                              <div className="text-[10px] text-slate-400 font-mono">
                                Hasta {lic.maxUsers} usuarios
                              </div>
                            </td>

                            {/* Rubros Habilitados (con switches/chips rápidos) */}
                            <td className="py-3 px-3">
                              <div className="flex flex-wrap gap-1 max-w-xs">
                                {ALL_AVAILABLE_RUBROS.map((rubro) => {
                                  const hasRubro = (lic.rubros || []).includes(rubro.id);
                                  return (
                                    <button
                                      key={rubro.id}
                                      onClick={() => !isSuperAdmin && handleToggleRubro(lic, rubro.id)}
                                      disabled={isSuperAdmin}
                                      title={hasRubro ? `Desactivar ${rubro.id}` : `Activar ${rubro.id}`}
                                      className={`px-2 py-0.5 rounded text-[10px] font-medium border flex items-center gap-1 transition ${
                                        hasRubro
                                          ? 'bg-amber-500/15 text-amber-300 border-amber-500/30 font-semibold'
                                          : 'bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-400 opacity-60'
                                      }`}
                                    >
                                      {getRubroIcon(rubro.id)}
                                      <span>{rubro.id.split(' ')[0]}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            </td>

                            {/* Países Autorizados (con switches/chips rápidos) */}
                            <td className="py-3 px-3">
                              <div className="flex flex-wrap gap-1">
                                {ALL_AVAILABLE_COUNTRIES.map((ctry) => {
                                  const hasCountry = (lic.countries || []).includes(ctry.id);
                                  return (
                                    <button
                                      key={ctry.id}
                                      onClick={() => !isSuperAdmin && handleToggleCountry(lic, ctry.id)}
                                      disabled={isSuperAdmin}
                                      title={hasCountry ? `Desactivar ${ctry.label}` : `Activar ${ctry.label}`}
                                      className={`px-2 py-0.5 rounded text-[10px] font-medium border flex items-center gap-1 transition ${
                                        hasCountry
                                          ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30 font-semibold'
                                          : 'bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-400 opacity-60'
                                      }`}
                                    >
                                      <span>{ctry.flag}</span>
                                      <span>{ctry.id}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            </td>

                            {/* Vigencia */}
                            <td className="py-3 px-3 font-mono text-[11px] text-slate-400">
                              <div>{lic.startDate}</div>
                              {lic.expiryDate ? (
                                <div className="text-amber-400/90 text-[10px]">
                                  Hasta: {lic.expiryDate}
                                </div>
                              ) : (
                                <div className="text-slate-500 text-[10px]">Sin límite</div>
                              )}
                            </td>

                            {/* Acciones */}
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => handleOpenEditForm(lic)}
                                  title="Editar configuración y accesos del cliente"
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                {!isSuperAdmin && (
                                  <button
                                    onClick={() => handleDelete(lic.id, lic.companyName)}
                                    title="Revocar licencia y eliminar cliente"
                                    className="p-1.5 rounded-lg text-rose-400 hover:text-rose-200 hover:bg-rose-950/40 transition"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CATÁLOGO DE RUBROS INDUSTRIALES */}
          {activeTab === 'rubros' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0 mt-0.5">
                  <Info className="w-4 h-4" />
                </div>
                <div className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-white block font-bold mb-1">
                    Arquitectura Multi-Rubro de InteligenciaConectada™
                  </strong>
                  Actualmente la plataforma tiene operativa al 100% la vertical de <strong>Minería</strong> (con base en Cochilco, SEIA, memorias técnicas y decisores). Los demás rubros están modelados en la arquitectura para activarse en futuras fases sin alterar el código central.
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ALL_AVAILABLE_RUBROS.map((rubro) => (
                  <div
                    key={rubro.id}
                    className={`p-4 rounded-xl border transition flex flex-col justify-between ${
                      rubro.isAvailableNow
                        ? 'bg-amber-950/15 border-amber-500/40'
                        : 'bg-slate-950/50 border-slate-800 opacity-80'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div
                            className={`p-2 rounded-lg ${
                              rubro.isAvailableNow
                                ? 'bg-amber-400 text-slate-950 font-bold'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {getRubroIcon(rubro.id)}
                          </div>
                          <div>
                            <h3 className="text-sm font-extrabold text-white">{rubro.label}</h3>
                            <span className="text-[10px] font-mono text-slate-400">
                              Vertical B2B
                            </span>
                          </div>
                        </div>

                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            rubro.isAvailableNow
                              ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                              : 'bg-slate-900 text-slate-400 border-slate-700'
                          }`}
                        >
                          {rubro.isAvailableNow ? '● Operativo en Radar' : 'En Roadmap'}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed mt-2">
                        {rubro.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Clientes con este rubro activo:</span>
                      <strong className="text-white font-mono">
                        {licenses.filter((l) => (l.rubros || []).includes(rubro.id)).length}
                      </strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: CATÁLOGO DE PAÍSES / EXPANSIÓN LATAM */}
          {activeTab === 'countries' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0 mt-0.5">
                  <Globe2 className="w-4 h-4" />
                </div>
                <div className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-white block font-bold mb-1">
                    Control de Cobertura Geográfica por Cliente
                  </strong>
                  En el Radar se visualiza actualmente <strong>Chile</strong> como mercado principal. Cuando se activen nuevos países (Perú y Argentina con sus carteras de inversión), cada cliente sólo verá los países incluidos en su contrato de licencia.
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ALL_AVAILABLE_COUNTRIES.map((country) => (
                  <div
                    key={country.id}
                    className={`p-4 rounded-xl border transition flex flex-col justify-between ${
                      country.isAvailableNow
                        ? 'bg-cyan-950/15 border-cyan-500/40'
                        : 'bg-slate-950/50 border-slate-800'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl">{country.flag}</span>
                          <div>
                            <h3 className="text-sm font-extrabold text-white">{country.label}</h3>
                            <span className="text-[10px] font-mono text-slate-400">
                              Territorio Minero & B2B
                            </span>
                          </div>
                        </div>

                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            country.isAvailableNow
                              ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                              : 'bg-slate-900 text-amber-300 border-amber-800/50'
                          }`}
                        >
                          {country.isAvailableNow ? '● Producción Activa' : 'Próxima Integración'}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed mt-2">
                        {country.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Clientes con cobertura en {country.label}:</span>
                      <strong className="text-white font-mono">
                        {licenses.filter((l) => (l.countries || []).includes(country.id)).length}
                      </strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer del Modal */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>InteligenciaConectada™ · B2B Growth Partner en Minería e Industria</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition"
          >
            Cerrar Panel
          </button>
        </div>
      </div>

      {/* SUB-MODAL: REGISTRAR / EDITAR CLIENTE Y LICENCIA */}
      {isFormModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white">
                  {editingLicense ? 'Editar Licencia de Cliente' : 'Registrar Nuevo Cliente & Licencia'}
                </h3>
              </div>
              <button
                onClick={() => setIsFormModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="p-6 overflow-y-auto space-y-4 text-xs">
              {formError && (
                <div className="p-3 rounded-lg bg-rose-950/80 border border-rose-800 text-rose-300 font-medium flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Empresa y Contacto */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Empresa Cliente *</label>
                  <input
                    type="text"
                    required
                    value={formCompany}
                    onChange={(e) => setFormCompany(e.target.value)}
                    placeholder="Ej: Metso Outotec Chile, Ausenco..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Nombre Contacto / Titular</label>
                  <input
                    type="text"
                    value={formContactName}
                    onChange={(e) => setFormContactName(e.target.value)}
                    placeholder="Ej: Rodrigo Larraín"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Correo Principal y Plan */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Correo Electrónico Principal *</label>
                  <input
                    type="email"
                    required
                    value={formContactEmail}
                    onChange={(e) => setFormContactEmail(e.target.value)}
                    placeholder="contacto@empresa.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Plan / Modalidad</label>
                  <select
                    value={formPlan}
                    onChange={(e) => setFormPlan(e.target.value as LicensePlan)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Enterprise B2B">Enterprise B2B</option>
                    <option value="Growth Partner">Growth Partner</option>
                    <option value="Standard">Standard</option>
                    <option value="Trial">Prueba Comercial (Trial)</option>
                    <option value="Master Central Admin">Master Central Admin</option>
                  </select>
                </div>
              </div>

              {/* Emails autorizados adicionales */}
              <div>
                <label className="font-bold text-slate-300 block mb-1">
                  Correos o Dominios Autorizados (Separados por coma)
                </label>
                <input
                  type="text"
                  value={formAllowedEmails}
                  onChange={(e) => setFormAllowedEmails(e.target.value)}
                  placeholder="ej: @empresa.com, juan@empresa.com, maria@empresa.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400 font-mono"
                />
                <span className="text-[10px] text-slate-500 mt-0.5 block">
                  Cualquier usuario con estos correos o con dominio @empresa.com podrá ingresar con esta licencia.
                </span>
              </div>

              {/* Estado y Cupos */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Estado de Licencia</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as LicenseStatus)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="activa">Activa (Acceso Total)</option>
                    <option value="inactiva">Inactiva (Bloqueado)</option>
                    <option value="demo">Demo / Trial</option>
                    <option value="suspendida">Suspendida por Pago</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Cupo Máximo Usuarios</label>
                  <input
                    type="number"
                    min="1"
                    max="999"
                    value={formMaxUsers}
                    onChange={(e) => setFormMaxUsers(parseInt(e.target.value, 10) || 1)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Fecha de Vencimiento</label>
                  <input
                    type="date"
                    value={formExpiryDate}
                    onChange={(e) => setFormExpiryDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>

              {/* Selección de Rubros Autorizados */}
              <div>
                <label className="font-bold text-slate-300 block mb-1.5">
                  Rubros Industriales Contratados por el Cliente:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
                  {ALL_AVAILABLE_RUBROS.map((rubro) => {
                    const checked = formRubros.includes(rubro.id);
                    return (
                      <label
                        key={rubro.id}
                        className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition border ${
                          checked
                            ? 'bg-amber-500/15 border-amber-500/40 text-white font-semibold'
                            : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormRubros([...formRubros, rubro.id]);
                            } else {
                              setFormRubros(formRubros.filter((r) => r !== rubro.id));
                            }
                          }}
                          className="rounded text-amber-500 focus:ring-0"
                        />
                        <span className="flex items-center gap-1.5 text-xs">
                          {getRubroIcon(rubro.id)}
                          <span>{rubro.label}</span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Selección de Países Autorizados */}
              <div>
                <label className="font-bold text-slate-300 block mb-1.5">
                  Países / Territorios Autorizados para este Cliente:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
                  {ALL_AVAILABLE_COUNTRIES.map((ctry) => {
                    const checked = formCountries.includes(ctry.id);
                    return (
                      <label
                        key={ctry.id}
                        className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition border ${
                          checked
                            ? 'bg-cyan-500/15 border-cyan-500/40 text-white font-semibold'
                            : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormCountries([...formCountries, ctry.id]);
                            } else {
                              setFormCountries(formCountries.filter((c) => c !== ctry.id));
                            }
                          }}
                          className="rounded text-cyan-500 focus:ring-0"
                        />
                        <span className="flex items-center gap-1 text-xs">
                          <span>{ctry.flag}</span>
                          <span>{ctry.label}</span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Notas Comerciales */}
              <div>
                <label className="font-bold text-slate-300 block mb-1">Notas Comerciales Internas IC</label>
                <textarea
                  rows={2}
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="Detalles del contrato, requerimientos específicos, contacto de facturación..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Botones de acción del formulario */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsFormModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold transition shadow-lg shadow-amber-500/20"
                >
                  {editingLicense ? 'Guardar Cambios' : 'Registrar Licencia'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
