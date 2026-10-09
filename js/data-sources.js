/* Fuentes de ITASO-MX agrupadas por tema.
   Fuente única de verdad: las utiliza la sección "Fuentes" del Home, la guía
   "Claridad para entender" y las fichas que muestran referencias. */
(function () {
  window.ITASO_SOURCES = [
    {
      id: 'alimentacion',
      theme: 'Alimentación general',
      description: 'Referencias oficiales sobre alimentación saludable, grupos de alimentos y criterios generales para la población mexicana.',
      sources: [
        {
          institution: 'Gobierno de México · Secretaría de Salud',
          title: 'Guías Alimentarias Saludables y Sostenibles para la Población Mexicana 2025',
          url: 'https://www.gob.mx/salud/sinsamac/documentos/guias-alimentarias-saludables-y-sostenibles-para-la-poblacion-mexicana-2025'
        },
        {
          institution: 'Instituto Mexicano del Seguro Social',
          title: 'Plato del Bien Comer Saludable y Sostenible',
          url: 'https://www.imss.gob.mx/salud-en-linea/platobiencomer'
        },
        {
          institution: 'Instituto Mexicano del Seguro Social',
          title: 'Nutrición',
          url: 'https://www.imss.gob.mx/salud-en-linea/nutricion'
        }
      ]
    },
    {
      id: 'cuidadores',
      theme: 'Guías y materiales para cuidadores',
      description: 'Materiales de instituciones de salud pensados para orientar a las familias en el cuidado cotidiano.',
      sources: [
        {
          institution: 'Instituto Mexicano del Seguro Social',
          title: 'Guías de Salud',
          url: 'https://www.imss.gob.mx/salud-en-linea/guias-salud'
        },
        {
          institution: 'Instituto Mexicano del Seguro Social',
          title: 'Consejos de nutrición',
          url: 'https://www.imss.gob.mx/salud-en-linea/nutricion/consejos'
        }
      ]
    },
    {
      id: 'etiquetado',
      theme: 'Etiquetado nutrimental',
      description: 'Norma oficial y materiales que explican los sellos de advertencia y el etiquetado frontal de alimentos y bebidas preenvasados.',
      sources: [
        {
          institution: 'Comisión Federal para la Protección contra Riesgos Sanitarios',
          title: 'Etiquetado frontal de alimentos y bebidas (NOM-051)',
          url: 'https://www.gob.mx/cofepris/acciones-y-programas/etiquetado-frontal-de-alimentos-y-bebidas-no-alcoholicas-preenvasadas'
        },
        {
          institution: 'Diario Oficial de la Federación',
          title: 'NOM-051-SCFI/SSA1-2010',
          url: 'https://www.dof.gob.mx/2020/SEECO/NOM_051.pdf'
        }
      ]
    },
    {
      id: 'recetas',
      theme: 'Recetas y refrigerios',
      description: 'Recetarios y materiales de referencia para preparar refrigerios y comidas con ingredientes accesibles.',
      sources: [
        {
          institution: 'UNICEF',
          title: 'Recetario de refrigerios escolares',
          url: 'https://www.unicef.org/mexico/informes/recetario-de-refrigerios'
        }
      ]
    },
    {
      id: 'actividad',
      theme: 'Actividad física y movimiento',
      description: 'Recomendaciones internacionales sobre actividad física, comportamiento sedentario y descanso.',
      sources: [
        {
          institution: 'Organización Mundial de la Salud',
          title: 'Physical activity',
          url: 'https://www.who.int/health-topics/noncommunicable-diseases/physical-activity'
        },
        {
          institution: 'Organización Mundial de la Salud',
          title: 'Guidelines on physical activity and sedentary behaviour (menores de 5 años)',
          url: 'https://www.who.int/publications-detail-redirect/9789240015128'
        }
      ]
    }
  ];

  window.ITASO_SOURCES_ALL = window.ITASO_SOURCES.flatMap(group =>
    group.sources.map(source => ({ ...source, theme: group.theme })));
})();
