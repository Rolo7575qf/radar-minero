import { createClient } from '@supabase/supabase-js';

// Obtenemos las variables de entorno de Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'https://tu-proyecto.supabase.co' &&
  supabaseAnonKey !== 'tu-anon-key'
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Servicio para verificar y sincronizar datos con Supabase
 */
export const supabaseSync = {
  isAvailable(): boolean {
    return isSupabaseConfigured;
  },

  async fetchProjects() {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('projects')
      .select('*, history:project_history(*)')
      .order('capex_estimated_millions_usd', { ascending: false });

    if (error) {
      console.warn('Error fetching projects from Supabase:', error.message);
      return null;
    }
    return data;
  },

  async fetchSignals() {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('signals')
      .select('*')
      .order('published_date', { ascending: false });

    if (error) {
      console.warn('Error fetching signals from Supabase:', error.message);
      return null;
    }
    return data;
  },

  async fetchOpportunities() {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('opportunities')
      .select('*')
      .order('detection_date', { ascending: false });

    if (error) {
      console.warn('Error fetching opportunities from Supabase:', error.message);
      return null;
    }
    return data;
  },

  async insertSignal(signalPayload: any) {
    if (!supabase) return null;
    const { data, error } = await supabase.from('signals').insert([signalPayload]).select();
    if (error) {
      console.error('Error inserting signal in Supabase:', error.message);
      return null;
    }
    return data[0];
  }
};
