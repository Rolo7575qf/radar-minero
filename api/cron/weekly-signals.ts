import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// Endpoint llamado automáticamente por Vercel Cron Job cada Lunes a las 06:00 AM UTC
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Verificación de autorización de Cron (opcional con CRON_SECRET)
  const authHeader = req.headers['authorization'];
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({
      error: 'Variables de Supabase no configuradas en el entorno de Vercel.',
      status: 'pending_configuration'
    });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const timestamp = new Date().toISOString();
    const publishedDate = timestamp.split('T')[0];

    // Simulación del crawler semanal del SEIA y CMF de Chile
    // En producción este bloque consume el feed RSS o API del SEIA/CMF
    const weeklyDetectedSignals = [
      {
        id: `sig-cron-${Date.now()}-1`,
        name: 'Publicación de Resolución de Inicio de Participación Ciudadana (PAC) Ampliada',
        category: 'Ambiental',
        description: 'El SEA confirmó el inicio del proceso formal de participación ciudadana temprana para las obras de impulsión de agua de mar desalada.',
        original_source: 'SEA / SEIA',
        source_url: 'https://seia.sea.gob.cl',
        country: 'Chile',
        published_date: publishedDate,
        related_project_id: 'proj-nuevaunion',
        related_project_name: 'Proyecto NuevaUnión (Relincho + El Morro)',
        related_company: 'NuevaUnión SpA',
        project_stage: '8. Permisos y aprobaciones',
        relevance: 'Alta',
        confidence: 'Alta',
        commercial_interpretation: {
          hypothesis: 'La apertura del proceso ciudadano exige a la minera contratar servicios especializados de monitoreo socioambiental y consultoría de relacionamiento comunitario cordillerano.',
          potentialNeeds: [
            'Talleres de difusión técnica y mesas de trabajo comunitarias',
            'Sistemas de monitoreo participativo de calidad de aguas',
            'Auditorías externas de cumplimiento ambiental preventivo'
          ],
          targetServices: ['Consultoría Socioambiental', 'Monitoreo Participativo', 'Comunidades'],
          anticipationWindowMonths: 6,
          supportingEvidence: ['Resolución exenta publicada en el portal oficial SEIA Atacama']
        },
        validation_state: 'Detectada automát.'
      }
    ];

    // Inserción en tabla signals de Supabase
    const { data: insertedSignals, error: signalError } = await supabase
      .from('signals')
      .insert(weeklyDetectedSignals)
      .select();

    if (signalError) {
      throw signalError;
    }

    return res.status(200).json({
      success: true,
      message: 'Agente Semanal ejecutado con éxito. Nuevas señales incorporadas.',
      signalsCount: insertedSignals?.length || 0,
      timestamp
    });
  } catch (error: any) {
    console.error('Error en ejecución del agente semanal:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Error procesando señales semanales'
    });
  }
}
