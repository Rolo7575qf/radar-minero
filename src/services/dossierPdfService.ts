// ==============================================================================
// SERVICIO DE GENERACIÓN DE DOSSIER EJECUTIVO PDF / IMPRESIÓN COMERCIAL B2B
// Genera documentos ejecutivos en alta resolución con sellos de InteligenciaConectada™
// ==============================================================================

import { MiningProject } from '../types/project';
import { CommercialOpportunity } from '../types/opportunity';
import { Actor } from '../types/company';
import { ClientBrand } from '../components/brand/ICSeal';

function escapeHtml(text?: string | null): string {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export const dossierPdfService = {
  /**
   * Genera y abre el Dossier Ejecutivo de un Proyecto Minero
   */
  exportProjectDossier(
    project: MiningProject,
    actors: Actor[] = [],
    opportunities: CommercialOpportunity[] = [],
    brand?: ClientBrand
  ): void {
    const relatedActors = actors.filter((a) =>
      Array.isArray(a.projectIds) && a.projectIds.includes(project.id)
    );
    const relatedOpps = opportunities.filter((o) =>
      o.relatedProjectId === project.id
    );

    const clientName = brand?.name ? escapeHtml(brand.name) : 'Empresa Proveedora Calificada';
    const clientLogoHtml = brand?.logo
      ? `<img src="${brand.logo}" alt="${clientName}" style="max-height: 48px; max-width: 180px; object-fit: contain;" />`
      : `<span style="font-size: 13px; font-weight: 700; color: #1e293b;">${clientName}</span>`;

    const capexText = project.capexEstimatedMillionsUSD
      ? `US$ ${project.capexEstimatedMillionsUSD.toLocaleString('es-CL')} MM`
      : 'A definir';

    // Filas de decisores
    const actorsRowsHtml = relatedActors.length > 0
      ? relatedActors.map((a) => {
          const emailBadge = a.emailStatus === 'verificado'
            ? '<span style="background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: 700;">VERIFICADO</span>'
            : a.email
            ? '<span style="background: #fffbeb; color: #b45309; border: 1px solid #fde68a; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: 700;">AUDITADO</span>'
            : '<span style="background: #f1f5f9; color: #64748b; padding: 2px 6px; border-radius: 4px; font-size: 10px;">PENDIENTE</span>';

          const emailText = a.email
            ? `<a href="mailto:${escapeHtml(a.email)}" style="color: #0284c7; text-decoration: none; font-family: monospace;">${escapeHtml(a.email)}</a>`
            : '<span style="color: #94a3b8; font-style: italic;">Por identificar</span>';

          const linkedinText = a.linkedinUrl
            ? `<a href="${escapeHtml(a.linkedinUrl)}" target="_blank" style="color: #0369a1; text-decoration: none; font-size: 11px;">LinkedIn &rarr;</a>`
            : '-';

          return `
            <tr>
              <td style="padding: 10px 12px; font-weight: 700; color: #0f172a;">${escapeHtml(a.fullName)}</td>
              <td style="padding: 10px 12px; color: #334155;">${escapeHtml(a.jobTitle)}</td>
              <td style="padding: 10px 12px; color: #475569;">${escapeHtml(a.company)}</td>
              <td style="padding: 10px 12px;">${emailText} ${emailBadge}</td>
              <td style="padding: 10px 12px; text-align: center;">${linkedinText}</td>
            </tr>
          `;
        }).join('')
      : `<tr><td colspan="5" style="padding: 16px; text-align: center; color: #94a3b8; font-style: italic;">No se registran contactos específicos en este corte. Mapeo en curso por InteligenciaConectada™.</td></tr>`;

    // Filas de oportunidades B2B
    const oppsRowsHtml = relatedOpps.length > 0
      ? relatedOpps.map((o) => {
          const valText = o.estimatedContractValueUSD
            ? `US$ ${(o.estimatedContractValueUSD / 1_000_000).toFixed(1)}M`
            : 'Por cotizar';
          const rfqDate = o.targetRfqDate || 'Por estimar';

          return `
            <div style="border: 1px solid #e2e8f0; border-left: 4px solid #f59e0b; border-radius: 8px; padding: 12px 16px; margin-bottom: 10px; background: #fafafa; page-break-inside: avoid;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
                <span style="font-weight: 800; font-size: 13px; color: #0f172a;">${escapeHtml(o.title)}</span>
                <span style="background: #fef3c7; color: #92400e; font-size: 10px; font-weight: 800; padding: 2px 8px; border-radius: 4px; text-transform: uppercase;">Prioridad ${escapeHtml(o.priority)}</span>
              </div>
              <div style="font-size: 11px; color: #475569; margin-bottom: 8px; line-height: 1.5;">${escapeHtml(o.potentialNeed)}</div>
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; font-size: 11px; color: #64748b; background: #fff; padding: 8px 10px; border-radius: 6px; border: 1px solid #f1f5f9;">
                <div><strong>Monto Est.:</strong> <span style="color: #0f172a; font-weight: 700;">${valText}</span></div>
                <div><strong>Ventana Anticipación:</strong> <span style="color: #0f172a; font-weight: 700;">${o.anticipationWindowMonths || 6} meses</span></div>
                <div><strong>Licitación RFQ:</strong> <span style="color: #0f172a; font-weight: 700;">${rfqDate}</span></div>
              </div>
              ${o.recommendedNextAction ? `
                <div style="margin-top: 8px; font-size: 11px; color: #0369a1; background: #f0f9ff; padding: 6px 10px; border-radius: 4px; border-left: 3px solid #0284c7;">
                  <strong>Acción Recomendada:</strong> ${escapeHtml(o.recommendedNextAction)}
                </div>
              ` : ''}
            </div>
          `;
        }).join('')
      : `<div style="padding: 16px; text-align: center; color: #94a3b8; font-style: italic; background: #f8fafc; border-radius: 8px;">Oportunidades en fase de modelación temprana para este proyecto.</div>`;

    // Señales históricas
    const historyHtml = (project.history && project.history.length > 0)
      ? project.history.map((h) => `
          <div style="display: flex; gap: 12px; margin-bottom: 12px; page-break-inside: avoid;">
            <div style="font-family: monospace; font-size: 10px; font-weight: 700; color: #b45309; min-width: 80px; padding-top: 2px;">
              ${escapeHtml(h.date)}
            </div>
            <div style="border-left: 2px solid #cbd5e1; padding-left: 12px; flex: 1;">
              <div style="font-weight: 700; font-size: 11px; color: #0f172a; margin-bottom: 2px;">${escapeHtml(h.signalTitle || 'Hito registrado')}</div>
              <div style="font-size: 11px; color: #475569; line-height: 1.4;">${escapeHtml(h.changeDescription)}</div>
              ${h.commercialInterpretation ? `
                <div style="margin-top: 4px; font-size: 10px; color: #78350f; background: #fffbeb; padding: 4px 8px; border-radius: 4px;">
                  <strong>Lectura Comercial:</strong> ${escapeHtml(h.commercialInterpretation)}
                </div>
              ` : ''}
            </div>
          </div>
        `).join('')
      : `<div style="color: #94a3b8; font-size: 11px; font-style: italic;">Sin hitos históricos detallados en la base pública.</div>`;

    const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Dossier Ejecutivo: ${escapeHtml(project.name)} | RADAR MINERO</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 14mm 14mm 14mm 14mm;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #0f172a;
      background: #ffffff;
      margin: 0;
      padding: 0;
      font-size: 12px;
      line-height: 1.5;
    }
    .header-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #f59e0b;
      padding-bottom: 12px;
      margin-bottom: 16px;
    }
    .badge-ic {
      background: #0f172a;
      color: #fbbf24;
      font-size: 9px;
      font-weight: 900;
      letter-spacing: 0.1em;
      padding: 3px 8px;
      border-radius: 4px;
      display: inline-block;
      text-transform: uppercase;
    }
    .section-title {
      font-size: 12px;
      font-weight: 900;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #0f172a;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 4px;
      margin-top: 20px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .section-title::before {
      content: "";
      display: inline-block;
      width: 8px;
      height: 8px;
      background: #f59e0b;
      border-radius: 2px;
    }
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      margin-bottom: 16px;
    }
    .kpi-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 10px 12px;
    }
    .kpi-label {
      font-size: 9px;
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .kpi-val {
      font-size: 16px;
      font-weight: 900;
      color: #0f172a;
      margin-top: 3px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 11px;
    }
    th {
      background: #f1f5f9;
      color: #475569;
      font-size: 9px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 8px 10px;
      border-bottom: 1px solid #cbd5e1;
    }
    td {
      border-bottom: 1px solid #f1f5f9;
    }
    .footer {
      border-top: 1px solid #e2e8f0;
      margin-top: 24px;
      padding-top: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 9px;
      color: #64748b;
    }
    .no-print {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 9999;
    }
    .print-btn {
      background: #f59e0b;
      color: #0f172a;
      border: none;
      font-weight: 800;
      font-size: 13px;
      padding: 12px 24px;
      border-radius: 8px;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(245, 158, 11, 0.4);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .print-btn:hover {
      background: #d97706;
      color: #ffffff;
    }
    @media print {
      .no-print { display: none !important; }
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
  </style>
</head>
<body>

  <!-- Botón flotante para imprimir / guardar PDF -->
  <div class="no-print">
    <button class="print-btn" onclick="window.print()">
      🖨️ IMPRIMIR / GUARDAR COMO PDF
    </button>
  </div>

  <!-- Header -->
  <div class="header-bar">
    <div>
      <span class="badge-ic">RADAR MINERO · INTELIGENCIACONECTADA™</span>
      <div style="font-size: 18px; font-weight: 900; color: #0f172a; margin-top: 4px;">DOSSIER COMERCIAL DE PROYECTO</div>
      <div style="font-size: 10px; color: #64748b;">Generado el ${new Date().toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' })} para reuniones estratégicas</div>
    </div>
    <div style="text-align: right;">
      ${clientLogoHtml}
    </div>
  </div>

  <!-- Título del Proyecto -->
  <div style="background: #0f172a; color: #fff; padding: 14px 18px; border-radius: 8px; margin-bottom: 16px;">
    <div style="font-size: 10px; font-weight: 800; color: #fbbf24; text-transform: uppercase; letter-spacing: 0.1em;">
      ${escapeHtml(project.region)} · ${escapeHtml(project.country)}
    </div>
    <div style="font-size: 20px; font-weight: 900; margin-top: 2px;">
      ${escapeHtml(project.name)}
    </div>
    <div style="font-size: 12px; color: #cbd5e1; margin-top: 4px;">
      Titular: <strong>${escapeHtml(project.ownerCompany)}</strong> 
      ${project.epcmCompany ? ` · EPCM: <strong>${escapeHtml(project.epcmCompany)}</strong>` : ''}
    </div>
  </div>

  <!-- Métricas Principales -->
  <div class="kpi-grid">
    <div class="kpi-box">
      <div class="kpi-label">CAPEX Estimado</div>
      <div class="kpi-val" style="color: #b45309;">${capexText}</div>
    </div>
    <div class="kpi-box">
      <div class="kpi-label">Etapa Oficial</div>
      <div class="kpi-val" style="font-size: 13px;">${escapeHtml(project.stage)}</div>
    </div>
    <div class="kpi-box">
      <div class="kpi-label">Mineral Principal</div>
      <div class="kpi-val" style="font-size: 13px;">${escapeHtml(project.mainMineral)}</div>
    </div>
    <div class="kpi-box">
      <div class="kpi-label">Tipo de Proyecto</div>
      <div class="kpi-val" style="font-size: 13px;">${escapeHtml(project.submissionType || 'Brownfield / Expansión')}</div>
    </div>
  </div>

  <!-- Alcance del Proyecto -->
  <div style="font-size: 11px; color: #334155; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 16px; margin-bottom: 16px; line-height: 1.6;">
    <strong style="color: #0f172a;">Descripción del Alcance Técnico:</strong> ${escapeHtml(project.locationDetails)}
    ${project.seiaId ? `<div style="margin-top: 6px; font-size: 10px; color: #0284c7;">Expediente Ambiental Oficial SEIA: <strong>${escapeHtml(project.seiaId)}</strong></div>` : ''}
  </div>

  <!-- Oportunidades B2B para Proveedores -->
  <div class="section-title">Oportunidades Comerciales B2B Detectadas (${relatedOpps.length})</div>
  ${oppsRowsHtml}

  <!-- Tomadores de Decisión Clave -->
  <div class="section-title">Tomadores de Decisión y Contactos Clave (${relatedActors.length})</div>
  <table style="border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; margin-bottom: 16px;">
    <thead>
      <tr>
        <th style="text-align: left;">Nombre</th>
        <th style="text-align: left;">Cargo</th>
        <th style="text-align: left;">Empresa</th>
        <th style="text-align: left;">Correo Corporativo</th>
        <th style="text-align: center;">LinkedIn</th>
      </tr>
    </thead>
    <tbody>
      ${actorsRowsHtml}
    </tbody>
  </table>

  <!-- Huella Pública y Cronología -->
  <div class="section-title">Huella Pública y Señales Recientes del Proyecto</div>
  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px 16px; margin-bottom: 16px;">
    ${historyHtml}
  </div>

  <!-- Footer -->
  <div class="footer">
    <div>
      Documento Confidencial · Preparado para <strong>${clientName}</strong> a través de <strong>RADAR MINERO</strong>
    </div>
    <div style="text-align: right;">
      © ${new Date().getFullYear()} InteligenciaConectada™ · B2B Growth Partner en Minería e Industria
    </div>
  </div>

  <script>
    // Auto disparo opcional si el usuario lo requiere
    window.onload = function() {
      // setTimeout(function() { window.print(); }, 400);
    };
  </script>
</body>
</html>
    `;

    const printWin = window.open('', '_blank');
    if (printWin) {
      printWin.document.open();
      printWin.document.write(htmlContent);
      printWin.document.close();
      printWin.focus();
    } else {
      // Si el navegador bloqueó el popup, fallback con blob descargable
      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Dossier_${project.id}_RadarMinero.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  },

  /**
   * Genera y abre el Dossier Ejecutivo de una Oportunidad Comercial B2B
   */
  exportOpportunityDossier(
    opp: CommercialOpportunity,
    project?: MiningProject | null,
    actors: Actor[] = [],
    brand?: ClientBrand
  ): void {
    const clientName = brand?.name ? escapeHtml(brand.name) : 'Empresa Proveedora Calificada';
    const clientLogoHtml = brand?.logo
      ? `<img src="${brand.logo}" alt="${clientName}" style="max-height: 48px; max-width: 180px; object-fit: contain;" />`
      : `<span style="font-size: 13px; font-weight: 700; color: #1e293b;">${clientName}</span>`;

    const valText = opp.estimatedContractValueUSD
      ? `US$ ${(opp.estimatedContractValueUSD / 1_000_000).toFixed(1)}M`
      : 'A cotizar';

    const relatedActors = actors.filter((a) =>
      opp.relatedProjectId && Array.isArray(a.projectIds) && a.projectIds.includes(opp.relatedProjectId)
    );

    const actorsRowsHtml = relatedActors.length > 0
      ? relatedActors.map((a) => `
          <tr>
            <td style="padding: 10px 12px; font-weight: 700; color: #0f172a;">${escapeHtml(a.fullName)}</td>
            <td style="padding: 10px 12px; color: #334155;">${escapeHtml(a.jobTitle)}</td>
            <td style="padding: 10px 12px; color: #475569;">${escapeHtml(a.company)}</td>
            <td style="padding: 10px 12px; font-family: monospace; color: #0284c7;">${escapeHtml(a.email || 'Por identificar')}</td>
          </tr>
        `).join('')
      : `<tr><td colspan="4" style="padding: 14px; text-align: center; color: #94a3b8; font-style: italic;">Contactos directos en fase de levantamiento.</td></tr>`;

    const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Dossier Oportunidad: ${escapeHtml(opp.title)} | RADAR MINERO</title>
  <style>
    @page { size: A4 portrait; margin: 14mm; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #0f172a; margin: 0; font-size: 12px; line-height: 1.5; }
    .header-bar { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #f59e0b; padding-bottom: 12px; margin-bottom: 16px; }
    .badge-ic { background: #0f172a; color: #fbbf24; font-size: 9px; font-weight: 900; letter-spacing: 0.1em; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; }
    .kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 16px; }
    .kpi-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 12px; }
    .kpi-label { font-size: 9px; font-weight: 700; color: #64748b; text-transform: uppercase; }
    .kpi-val { font-size: 16px; font-weight: 900; color: #0f172a; margin-top: 3px; }
    .section-title { font-size: 12px; font-weight: 900; text-transform: uppercase; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; margin-top: 20px; margin-bottom: 10px; }
    table { width: 100%; border-collapse: collapse; font-size: 11px; border: 1px solid #e2e8f0; }
    th { background: #f1f5f9; color: #475569; font-size: 9px; font-weight: 800; text-transform: uppercase; padding: 8px 10px; border-bottom: 1px solid #cbd5e1; text-align: left; }
    td { border-bottom: 1px solid #f1f5f9; }
    .footer { border-top: 1px solid #e2e8f0; margin-top: 24px; padding-top: 8px; display: flex; justify-content: space-between; font-size: 9px; color: #64748b; }
    .no-print { position: fixed; bottom: 20px; right: 20px; z-index: 9999; }
    .print-btn { background: #f59e0b; color: #0f172a; border: none; font-weight: 800; font-size: 13px; padding: 12px 24px; border-radius: 8px; cursor: pointer; }
    @media print { .no-print { display: none !important; } }
  </style>
</head>
<body>
  <div class="no-print">
    <button class="print-btn" onclick="window.print()">🖨️ IMPRIMIR / GUARDAR COMO PDF</button>
  </div>

  <div class="header-bar">
    <div>
      <span class="badge-ic">RADAR MINERO · FICHA DE OPORTUNIDAD B2B</span>
      <div style="font-size: 18px; font-weight: 900; color: #0f172a; margin-top: 4px;">OPORTUNIDAD COMERCIAL CALIFICADA</div>
      <div style="font-size: 10px; color: #64748b;">Generado el ${new Date().toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
    </div>
    <div style="text-align: right;">${clientLogoHtml}</div>
  </div>

  <div style="background: #0f172a; color: #fff; padding: 14px 18px; border-radius: 8px; margin-bottom: 16px;">
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <span style="font-size: 10px; font-weight: 800; color: #fbbf24; text-transform: uppercase;">Prioridad ${escapeHtml(opp.priority)} · Confianza ${escapeHtml(opp.confidence)}</span>
      <span style="background: rgba(255,255,255,0.15); padding: 2px 8px; border-radius: 4px; font-size: 10px;">${escapeHtml(opp.commercialStatus)}</span>
    </div>
    <div style="font-size: 19px; font-weight: 900; margin-top: 6px;">${escapeHtml(opp.title)}</div>
    <div style="font-size: 12px; color: #cbd5e1; margin-top: 4px;">
      Cliente / Titular: <strong>${escapeHtml(opp.targetCompany)}</strong> · Proyecto: <strong>${escapeHtml(opp.relatedProjectName)}</strong>
    </div>
  </div>

  <div class="kpi-grid">
    <div class="kpi-box">
      <div class="kpi-label">Valor Estimado Contrato</div>
      <div class="kpi-val" style="color: #b45309;">${valText}</div>
    </div>
    <div class="kpi-box">
      <div class="kpi-label">Ventana Anticipación</div>
      <div class="kpi-val">${opp.anticipationWindowMonths || 6} Meses</div>
    </div>
    <div class="kpi-box">
      <div class="kpi-label">Fecha Objetivo RFQ</div>
      <div class="kpi-val" style="font-size: 13px;">${escapeHtml(opp.targetRfqDate || 'Estimada')}</div>
    </div>
    <div class="kpi-box">
      <div class="kpi-label">Categoría Solución</div>
      <div class="kpi-val" style="font-size: 11px;">${escapeHtml(opp.relatedSolutionCategory)}</div>
    </div>
  </div>

  <div class="section-title">Detalle de la Necesidad y Especificación Técnica</div>
  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 16px; margin-bottom: 16px; font-size: 12px; line-height: 1.6;">
    ${escapeHtml(opp.potentialNeed)}
  </div>

  ${opp.recommendedNextAction ? `
    <div class="section-title">Estrategia y Plan de Acción Comercial</div>
    <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-left: 4px solid #0284c7; border-radius: 8px; padding: 12px 16px; margin-bottom: 16px; font-size: 12px; color: #0369a1; line-height: 1.6;">
      <strong>Próxima Acción Recomendada:</strong><br/>
      ${escapeHtml(opp.recommendedNextAction)}
    </div>
  ` : ''}

  <div class="section-title">Tomadores de Decisión del Proyecto (${relatedActors.length})</div>
  <table>
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Cargo</th>
        <th>Empresa</th>
        <th>Correo Corporativo</th>
      </tr>
    </thead>
    <tbody>${actorsRowsHtml}</tbody>
  </table>

  ${project ? `
    <div class="section-title">Datos Clave del Proyecto Relacionado</div>
    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 16px; font-size: 11px; line-height: 1.5;">
      <div><strong>Etapa:</strong> ${escapeHtml(project.stage)} · <strong>Región:</strong> ${escapeHtml(project.region)} · <strong>Mineral:</strong> ${escapeHtml(project.mainMineral)}</div>
      <div style="margin-top: 4px;"><strong>CAPEX Total del Proyecto:</strong> US$ ${project.capexEstimatedMillionsUSD.toLocaleString('es-CL')} MM</div>
      <div style="margin-top: 4px; color: #475569;">${escapeHtml(project.locationDetails)}</div>
    </div>
  ` : ''}

  <div class="footer">
    <div>Preparado para <strong>${clientName}</strong> · RADAR MINERO</div>
    <div>InteligenciaConectada™ · B2B Growth Partner</div>
  </div>
</body>
</html>
    `;

    const printWin = window.open('', '_blank');
    if (printWin) {
      printWin.document.open();
      printWin.document.write(htmlContent);
      printWin.document.close();
      printWin.focus();
    } else {
      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Oportunidad_${opp.id}_RadarMinero.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  },
};
