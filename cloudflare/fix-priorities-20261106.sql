-- Normalización de prioridades a tipos oficiales ('Máxima' | 'Alta' | 'Media' | 'Baja-media')
UPDATE opportunities SET priority = 'Máxima' WHERE priority IN ('Critica', 'Crítica');
