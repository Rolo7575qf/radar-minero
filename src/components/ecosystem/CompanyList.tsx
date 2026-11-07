import React, { useState } from 'react';
import { MiningCompany, CompanyRole } from '../../types/company';
import { Badge } from '../common/Badge';
import {
  Building2,
  Search,
  Users,
  Briefcase,
  ChevronRight,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

interface CompanyListProps {
  companies: MiningCompany[];
  onSelectCompany: (company: MiningCompany) => void;
  onOpenProject?: (projectId: string) => void;
}

export const CompanyList: React.FC<CompanyListProps> = ({
  companies,
  onSelectCompany,
  onOpenProject,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('Todos');

  const ROLES = [
    'Todos',
    'Titular Minero',
    'EPCM',
    'Empresa de Ingeniería',
    'Contratista Principal Construcción',
    'Consultora Ambiental y Permisos',
  ];

  const filteredCompanies = companies.filter((c) => {
    const matchesRole = selectedRole === 'Todos' || c.primaryRole === selectedRole || (c.supportedRoles || []).includes(selectedRole as CompanyRole);
    const matchesSearch =
      String(c.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(c.countryOrigin || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(c.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-white">
              Directorio de Inteligencia del Ecosistema Minero
            </h2>
            <p className="text-xs text-slate-400">
              Titulares, Consorcios EPCM, Ingenierías de Detalle, Contratistas y Decisores
            </p>
          </div>
        </div>

        <span className="text-xs font-mono font-semibold text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 self-start sm:self-auto">
          {filteredCompanies.length} empresas catalogadas
        </span>
      </div>

      {/* Filter and Search */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar empresa, país de origen, especialidad o descripción..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-400"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 shrink-0">Rol:</span>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-400"
          >
            {ROLES.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid of Companies */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCompanies.map((c) => (
          <div
            key={c.id}
            onClick={() => onSelectCompany(c)}
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 hover:bg-slate-900 transition-all cursor-pointer flex flex-col justify-between group shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <Badge variant="indigo" size="sm">
                  {c.primaryRole}
                </Badge>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                  {c.countryOrigin}
                </span>
              </div>

              <h3 className="text-sm font-extrabold text-white group-hover:text-indigo-300 transition">
                {c.name}
              </h3>

              <p className="mt-2 text-xs text-slate-400 line-clamp-3 leading-relaxed">
                {c.description}
              </p>

              {/* Supported roles */}
              <div className="mt-3 flex flex-wrap gap-1">
                {c.supportedRoles.map((role, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Meta */}
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 text-slate-400 text-[11px]">
                <Users className="w-3.5 h-3.5 text-emerald-400" />
                <strong className="text-slate-300">{(c.keyContacts || []).length}</strong> decisores
              </span>

              <span className="text-indigo-400 font-semibold flex items-center gap-0.5 group-hover:translate-x-1 transition text-[11px]">
                Ver Perfil <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
