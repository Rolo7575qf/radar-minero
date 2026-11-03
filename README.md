# RADAR MINERO — Plataforma de Inteligencia de Proyectos y Detección Temprana de Oportunidades B2B

Plataforma SaaS diseñada para proveedores, consultoras, firmas de ingeniería y contratistas del ecosistema minero latinoamericano (Chile prioritario, Perú y Argentina).

Su objetivo no es ser un mero lector de noticias ni un catálogo estático de proyectos, sino un **sistema proactivo de inteligencia comercial** sustentado en el principio rector:

> **Fuente Oficial → Señal Temprana → Proyecto Minero → Evolución Histórica → Hipótesis / Necesidad Comercial → Actor Involucrado → Oportunidad Comercial B2B.**

---

## 🚀 Inicio Rápido

### Requisitos
- Node.js v18+ (recomendado Node v20 o v24)
- npm o pnpm

### Ejecución en Modo Desarrollo
```bash
# Instalar dependencias (ya instaladas en el repositorio)
npm install

# Iniciar servidor de desarrollo en tiempo real
npm run dev
```
La aplicación estará disponible de inmediato en `http://localhost:5173`.

### Compilación para Producción
```bash
npm run build
npm run preview
```

---

## 🏛️ Arquitectura & Módulos del Sistema

### 1. Panel de Control — Dashboard Dinámico y Personalizable (Dashboard Builder)
- **Grid responsivo de 12 columnas**: widgets ajustables en 1/3, 1/2, 2/3 o ancho completo.
- **Dashboard Builder Interactivo**:
  - Agregar y eliminar gráficos / métricas.
  - Cambiar tipos de visualización (Métricas KPI, Funnel de 14 etapas, Distribución de minerales, Feed en tiempo real, Prioridades comerciales, Tabla de CAPEX, Ecosistema EPCM).
  - Cambiar dimensiones de análisis (etapa, país, mineral, categoría de señal, prioridad).
  - Reordenar componentes arriba / abajo.
  - Crear múltiples dashboards independientes.
  - Duplicar y guardar configuraciones en almacenamiento local persistente.
  - Restaurar configuración predeterminada en cualquier momento.

### 2. Motor de Detección de Señales Tempranas (8 Categorías A - H)
Monitorea eventos antes de que lleguen a licitaciones o portales de compra públicos:
- **A. Ambientales:** Ingreso de DIA/EIA, adendas complementarias, RCA, consultas de pertinencia (SEA / SEIA).
- **B. Inversión:** Cartera oficial COCHILCO, aprobación de financiamiento, decisión final de inversión (FID), variaciones de CAPEX.
- **C. Ingeniería y desarrollo:** Estudios PEA, PFS, DFS, reportes NI 43-101 en SEDAR+, ingeniería básica/detalle.
- **D. Contratación:** Precalificaciones, adjudicación de contratos EPC/EPCM, obras tempranas.
- **E. Corporativas y financieras:** M&A, hechos esenciales CMF, joint ventures, emisión de deuda.
- **F. Organizacionales:** Nombramientos de Study Director, Project Director, Gerente de Abastecimiento o Adquisiciones.
- **G. Operacionales:** Planes de cierre SERNAGEOMIN, desalación, aumento de capacidad de procesamiento.
- **H. Sectoriales:** Eventos, acuerdos tecnológicos, anuncios institucionales.

**Inferencia Comercial:**
Cada señal genera una hipótesis de necesidad comercial con:
- Hipótesis técnica de impacto
- Necesidades comerciales potenciales
- Categoría de proveedores involucrados
- Ventana de anticipación estimada (en meses antes de licitación pública)
- Trazabilidad y bitácora inmutable de detección

### 3. Motor de Inteligencia de Proyectos (14 Etapas Estándar)
Clasificación uniforme de ciclo de vida minero:
1. Exploración
2. Exploración avanzada
3. Conceptual
4. Prefactibilidad
5. Factibilidad
6. Ingeniería básica
7. Ingeniería de detalle
8. Permisos y aprobaciones
9. Decisión de inversión
10. Contratación
11. Construcción
12. Puesta en marcha
13. Operación
14. Expansión o modificación

**Requisito de Trazabilidad Inmutable:**
El sistema conserva el historial completo de cambios, deltas de CAPEX y transiciones de etapas sin sobrescribir información histórica previa.

### 4. Inteligencia del Ecosistema Empresarial & Mapa de Red
- Catálogo de empresas con roles estandarizados: Titular Minero, Matriz, Socio Inversionista, EPCM, Empresa de Ingeniería, Contratista Principal, Consultora Ambiental, Proveedor de Equipos.
- **Mapa de Relaciones Interactivo:**
  Visualización interactiva que conecta:
  `Proyecto → Titular Mandante → Firma EPCM / Ingeniería Líder → Contratistas Principales → Proveedores`
- Ficha de tomadores de decisión (Project Directors, Lead Procurement Managers, ITO).

### 5. Motor de Oportunidades Comerciales B2B & Scoring Algorítmico (100 Puntos)
- Clasificación comercial en 4 niveles: **Máxima, Alta, Media, Baja-media**.
- Tablero Kanban interactivo y vista de Lista analítica.
- **Modelo de Scoring Explicable (100 Puntos Configurable):**
  - Madurez del proyecto (20 pts por defecto)
  - Señales recientes de inversión o contratación (20 pts)
  - Compatibilidad con servicios potenciales (20 pts)
  - Identificación de actores y decisores (15 pts)
  - Tamaño y viabilidad económica (15 pts)
  - Ventana de anticipación comercial (10 pts)
- **Calibrador de Ponderaciones en Tiempo Real:** Sliders interactivos que recalculan el scoring de toda la cartera según la estrategia comercial del usuario.

### 6. Simulador / Ingesta de Señales
Permite crear o simular nuevas señales (ej: ingreso de adenda al SEA, nuevo hecho esencial CMF, adjudicación de contrato EPCM, nombramiento de decisor) y observar en tiempo real cómo el motor infiere la hipótesis comercial, actualiza la trazabilidad del proyecto y genera la oportunidad comercial correspondiente.

---

## 🛠️ Stack Tecnológico
- **Frontend:** React 19, TypeScript, Tailwind CSS v4, Lucide Icons
- **Bundler:** Vite 8 (compilación ultrarrápida en <4 segundos)
- **Arquitectura de Estado & Persistencia:** Almacenamiento local estructurado (`localStorage`) con soporte offline e inmutabilidad histórica.
- **UI:** Diseño industrial de alta tecnología para minería con tema oscuro optimizado.
