// ==============================================================================
// SERVICIO DE LICENCIAS Y CLIENTES B2B
// Comunicación con /api/admin/licenses y persistencia segura
// ==============================================================================

import { ClientLicense, LicenseStatus } from '../types/license';

const DEFAULT_DEMO_LICENSES: ClientLicense[] = [
  {
    id: 'lic-ic-master',
    companyName: 'InteligenciaConectada™ Headquarters',
    contactName: 'Rolando Quiñones',
    contactEmail: 'roloquinonesf@gmail.com',
    allowedEmails: ['roloquinonesf@gmail.com', 'contacto@inteligenciaconectada.com'],
    status: 'activa',
    plan: 'Master Central Admin',
    countries: ['Chile', 'Perú', 'Argentina', 'Colombia'],
    rubros: ['Minería', 'Energía & Renovables', 'Infraestructura & Construcción', 'Celulosa & Forestal'],
    maxUsers: 999,
    startDate: '2026-01-01',
    expiryDate: '2030-12-31',
    notes: 'Licencia Maestra Central del Fundador y SuperAdministrador',
  },
  {
    id: 'lic-metso-chile',
    companyName: 'Metso Outotec Chile',
    contactName: 'Rodrigo Larraín',
    contactEmail: 'contacto.chile@metso.com',
    allowedEmails: ['contacto.chile@metso.com', '@metso.com'],
    status: 'activa',
    plan: 'Enterprise B2B',
    countries: ['Chile'],
    rubros: ['Minería'],
    maxUsers: 10,
    startDate: '2026-02-01',
    expiryDate: '2027-02-01',
    notes: 'Cliente corporativo de equipos mineros de molienda y flotación.',
  },
  {
    id: 'lic-komatsu-cummins',
    companyName: 'Komatsu Cummins Chile',
    contactName: 'Carlos Valenzuela',
    contactEmail: 'c.valenzuela@komatsu.cl',
    allowedEmails: ['c.valenzuela@komatsu.cl', '@komatsu.cl'],
    status: 'activa',
    plan: 'Growth Partner',
    countries: ['Chile'],
    rubros: ['Minería'],
    maxUsers: 8,
    startDate: '2026-03-01',
    expiryDate: '2027-03-01',
    notes: 'Monitoreo activo de flotas de extracción y contratos de mantenimiento en rajos abiertos.',
  },
  {
    id: 'lic-ausenco-latam',
    companyName: 'Ausenco Sudamérica',
    contactName: 'Javier Morales',
    contactEmail: 'j.morales@ausenco.com',
    allowedEmails: ['j.morales@ausenco.com', '@ausenco.com'],
    status: 'demo',
    plan: 'Trial',
    countries: ['Chile', 'Perú'],
    rubros: ['Minería'],
    maxUsers: 3,
    startDate: '2026-11-01',
    expiryDate: '2026-12-01',
    notes: 'Licencia de prueba comercial extendida para equipo de desarrollo de negocios EPCM.',
  },
];

const LOCAL_STORAGE_KEY = 'radar_admin_licenses_v1';

function getLocalLicenses(): ClientLicense[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* sin storage */
  }
  return DEFAULT_DEMO_LICENSES;
}

function saveLocalLicenses(licenses: ClientLicense[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(licenses));
  } catch {
    /* sin storage */
  }
}

export const licenseService = {
  async fetchLicenses(): Promise<ClientLicense[]> {
    try {
      const res = await fetch('/api/admin/licenses');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          saveLocalLicenses(data);
          return data;
        }
      }
    } catch {
      // Fallback a almacenamiento local si estamos en entorno dev o sin backend
    }
    return getLocalLicenses();
  },

  async saveLicense(license: ClientLicense): Promise<ClientLicense> {
    try {
      const res = await fetch('/api/admin/licenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(license),
      });
      if (res.ok) {
        const saved = await res.json();
        return saved;
      }
    } catch {
      // Fallback local
    }

    const current = getLocalLicenses();
    const idx = current.findIndex((l) => l.id === license.id);
    let updated: ClientLicense[];
    if (idx >= 0) {
      updated = [...current];
      updated[idx] = { ...license, updatedAt: new Date().toISOString() };
    } else {
      updated = [{ ...license, createdAt: new Date().toISOString() }, ...current];
    }
    saveLocalLicenses(updated);
    return license;
  },

  async updateLicenseStatus(id: string, newStatus: LicenseStatus): Promise<void> {
    try {
      await fetch(`/api/admin/licenses/${encodeURIComponent(id)}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch {
      // Fallback local
    }

    const current = getLocalLicenses();
    const updated = current.map((l) => (l.id === id ? { ...l, status: newStatus, updatedAt: new Date().toISOString() } : l));
    saveLocalLicenses(updated);
  },

  async toggleLicenseCountry(id: string, country: string): Promise<ClientLicense | null> {
    const current = getLocalLicenses();
    const target = current.find((l) => l.id === id);
    if (!target) return null;

    const has = target.countries.includes(country);
    const updatedCountries = has ? target.countries.filter((c) => c !== country) : [...target.countries, country];
    // Al menos un país debe quedar activo si la licencia está activa
    if (updatedCountries.length === 0 && target.status === 'activa') {
      updatedCountries.push('Chile');
    }

    const updatedLicense = { ...target, countries: updatedCountries, updatedAt: new Date().toISOString() };
    await this.saveLicense(updatedLicense);
    return updatedLicense;
  },

  async toggleLicenseRubro(id: string, rubro: string): Promise<ClientLicense | null> {
    const current = getLocalLicenses();
    const target = current.find((l) => l.id === id);
    if (!target) return null;

    const has = target.rubros.includes(rubro);
    const updatedRubros = has ? target.rubros.filter((r) => r !== rubro) : [...target.rubros, rubro];
    if (updatedRubros.length === 0 && target.status === 'activa') {
      updatedRubros.push('Minería');
    }

    const updatedLicense = { ...target, rubros: updatedRubros, updatedAt: new Date().toISOString() };
    await this.saveLicense(updatedLicense);
    return updatedLicense;
  },

  async deleteLicense(id: string): Promise<void> {
    try {
      await fetch(`/api/admin/licenses/${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
    } catch {
      // Fallback local
    }

    const current = getLocalLicenses();
    const filtered = current.filter((l) => l.id !== id);
    saveLocalLicenses(filtered);
  },
};
