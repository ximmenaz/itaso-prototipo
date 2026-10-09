/* Registro central de fuentes de ITASO-MX.
   Fuente única de verdad: lo consumen la sección "Fuentes" del Home, el modal
   "Información respaldada por evidencia", Alimentación, Actividad física,
   Recetas, Decide con lo que tienes y la guía "Claridad para entender".
   Ninguna fuente debe volver a escribirse a mano en otros archivos: siempre
   se referencian por su id desde este registro. */
(function () {
  const REGISTRY = {
    dietaryGuidelines2025: {
      id: 'dietaryGuidelines2025',
      title: 'Guías Alimentarias Saludables y Sostenibles para la Población Mexicana 2025',
      institution: 'Secretaría de Salud · Instituto Nacional de Salud Pública · UNICEF',
      url: 'https://www.gob.mx/salud/sinsamac/documentos/guias-alimentarias-saludables-y-sostenibles-para-la-poblacion-mexicana-2025',
      use: 'Referencia base sobre alimentación, grupos de alimentos, hidratación y decisiones cotidianas.',
      themes: ['alimentación', 'grupos de alimentos', 'hidratación', 'cuidadores', 'decisiones cotidianas', 'sostenibilidad', 'guía Claridad para entender']
    },
    platoBienComer: {
      id: 'platoBienComer',
      title: 'Plato del Bien Comer Saludable y Sostenible',
      institution: 'Instituto Mexicano del Seguro Social',
      url: 'https://www.imss.gob.mx/salud-en-linea/platobiencomer',
      use: 'Referencia utilizada para agrupar alimentos y promover la variedad.',
      themes: ['grupos de alimentos', 'variedad', 'alimentación', 'guía Claridad para entender']
    },
    imssNutrition: {
      id: 'imssNutrition',
      title: 'Nutrición',
      institution: 'Instituto Mexicano del Seguro Social',
      url: 'https://www.imss.gob.mx/salud-en-linea/nutricion',
      use: 'Orientación general sobre alimentación y porciones.',
      themes: ['alimentación', 'porciones', 'orientación general']
    },
    nom051: {
      id: 'nom051',
      title: 'NOM-051-SCFI/SSA1-2010',
      institution: 'Diario Oficial de la Federación',
      url: 'https://www.dof.gob.mx/2020/SEECO/NOM_051.pdf',
      use: 'Referencia utilizada para porciones, información nutrimental y etiquetado de productos preenvasados.',
      themes: ['porciones', 'etiquetado nutrimental', 'información nutrimental', 'alimentos preenvasados']
    },
    foodLabeling: {
      id: 'foodLabeling',
      title: 'Etiquetado frontal de alimentos y bebidas',
      institution: 'Secretaría de Salud',
      url: 'https://www.gob.mx/promosalud/acciones-y-programas/etiquetado-de-alimentos',
      use: 'Referencia sobre sellos y comparación de productos preenvasados.',
      themes: ['etiquetado', 'sellos', 'productos preenvasados', 'comparación']
    },
    whoHealthyDiet: {
      id: 'whoHealthyDiet',
      title: 'Alimentación saludable',
      institution: 'Organización Mundial de la Salud',
      url: 'https://www.who.int/es/news-room/fact-sheets/detail/healthy-diet',
      use: 'Referencia sobre diversidad de alimentos, bebidas y azúcares libres.',
      themes: ['alimentación', 'diversidad', 'bebidas', 'azúcares libres', 'hidratación']
    },
    healthyChildrenEatingEnough: {
      id: 'healthyChildrenEatingEnough',
      title: 'Making Sure Your Child Is Eating Enough',
      institution: 'American Academy of Pediatrics · HealthyChildren.org',
      url: 'https://www.healthychildren.org/spanish/healthy-living/nutrition/paginas/making-sure-your-child-is-eating-enough.aspx',
      use: 'Referencia sobre hambre, saciedad y acompañamiento en alimentación infantil.',
      themes: ['hambre', 'saciedad', 'acompañamiento', 'alimentación infantil']
    },
    cdcHungerFullness: {
      id: 'cdcHungerFullness',
      title: 'Signs Your Child Is Hungry or Full',
      institution: 'Centers for Disease Control and Prevention',
      url: 'https://www.cdc.gov/infant-toddler-nutrition/mealtime/signs-your-child-is-hungry-or-full.html',
      use: 'Referencia sobre señales de hambre y saciedad en edades tempranas.',
      themes: ['hambre', 'saciedad', 'señales', 'alimentación responsiva', 'edades tempranas']
    },
    whoPhysicalActivity: {
      id: 'whoPhysicalActivity',
      title: 'Physical activity',
      institution: 'Organización Mundial de la Salud',
      url: 'https://www.who.int/europe/news-room/fact-sheets/item/physical-activity',
      use: 'Referencia sobre actividad física, sedentarismo y movimiento cotidiano.',
      themes: ['actividad física', 'sedentarismo', 'movimiento cotidiano', 'recomendaciones por edad']
    },
    whoPhysicalActivityGuidelines: {
      id: 'whoPhysicalActivityGuidelines',
      title: 'WHO Guidelines on Physical Activity and Sedentary Behaviour',
      institution: 'Organización Mundial de la Salud',
      url: 'https://www.who.int/publications/b/55518',
      use: 'Referencia sobre recomendaciones de actividad física y sedentarismo por edad.',
      themes: ['actividad física', 'sedentarismo', 'niñas', 'niños', 'adolescentes', 'adultos']
    },
    whoUnder5Movement: {
      id: 'whoUnder5Movement',
      title: 'Guidelines on physical activity, sedentary behaviour and sleep for children under 5 years of age',
      institution: 'Organización Mundial de la Salud',
      url: 'https://www.who.int/publications-detail-redirect/9789241550536',
      use: 'Referencia sobre movimiento, sedentarismo y sueño en menores de 5 años.',
      themes: ['menores de 5 años', 'movimiento', 'sedentarismo', 'sueño']
    },
    imssHealthGuides: {
      id: 'imssHealthGuides',
      title: 'Guías de Salud',
      institution: 'Instituto Mexicano del Seguro Social',
      url: 'https://www.imss.gob.mx/salud-en-linea/guias-salud',
      use: 'Referencia de recursos prácticos para cuidadores sobre alimentación y actividad física.',
      themes: ['cuidadores', 'actividad física', 'alimentación infantil', 'recursos prácticos']
    },
    imssNutritionAdvice: {
      id: 'imssNutritionAdvice',
      title: 'Consejos de nutrición',
      institution: 'Instituto Mexicano del Seguro Social',
      url: 'https://www.imss.gob.mx/salud-en-linea/consejos-nutricion',
      use: 'Referencia sobre alimentación, recetas y porciones.',
      themes: ['alimentación', 'recetas', 'porciones', 'actividad física']
    },
    unicefSchoolSnacks: {
      id: 'unicefSchoolSnacks',
      title: 'Recetario de refrigerios prácticos, ricos y saludables',
      institution: 'UNICEF México',
      url: 'https://www.unicef.org/mexico/informes/recetario-de-refrigerios-pr%C3%A1cticos-ricos-y-saludables',
      use: 'Fuente de referencia general para refrigerios escolares.',
      themes: ['lunch', 'refrigerios', 'escuela', 'recetas', 'niñas y niños']
    }
  };

  window.ITASO_SOURCES_REGISTRY = REGISTRY;
  window.ITASO_source = id => REGISTRY[id] || null;
  window.ITASO_sources = ids => (ids || []).map(id => REGISTRY[id]).filter(Boolean);

  /* Categorías de la sección "Fuentes" del Home. */
  window.ITASO_SOURCES = [
    {
      id: 'alimentacion',
      number: '01',
      theme: 'Alimentación y decisiones cotidianas',
      description: 'Referencias oficiales sobre alimentación, grupos de alimentos e hidratación que sostienen los criterios y materiales de ITASO.',
      sources: window.ITASO_sources(['dietaryGuidelines2025', 'platoBienComer', 'imssNutrition', 'whoHealthyDiet'])
    },
    {
      id: 'porciones-etiquetado',
      number: '02',
      theme: 'Porciones y etiquetado',
      description: 'Norma oficial y materiales que explican porciones, sellos e información nutrimental de alimentos y bebidas preenvasados.',
      sources: window.ITASO_sources(['nom051', 'foodLabeling'])
    },
    {
      id: 'hambre-saciedad',
      number: '03',
      theme: 'Hambre, saciedad y acompañamiento',
      description: 'Referencias para reconocer las señales de hambre y saciedad y acompañar la alimentación de niñas y niños.',
      sources: window.ITASO_sources(['healthyChildrenEatingEnough', 'cdcHungerFullness'])
    },
    {
      id: 'actividad-fisica',
      number: '04',
      theme: 'Actividad física y sedentarismo',
      description: 'Recomendaciones internacionales sobre actividad física, comportamiento sedentario y descanso según la edad.',
      sources: window.ITASO_sources(['whoPhysicalActivity', 'whoPhysicalActivityGuidelines', 'whoUnder5Movement'])
    },
    {
      id: 'cuidadores-recursos',
      number: '05',
      theme: 'Guías, recetas y recursos para cuidadores',
      description: 'Materiales prácticos de referencia para orientar el cuidado cotidiano y la preparación de alimentos.',
      sources: window.ITASO_sources(['imssHealthGuides', 'imssNutritionAdvice', 'unicefSchoolSnacks'])
    }
  ];

  /* Temas del modal "Información respaldada por evidencia" (Home > Nutrición). */
  window.ITASO_SOURCES_TOPICS = [
    {
      title: 'Porciones y etiquetado',
      text: 'Referencias sobre porciones, información nutrimental y sellos de productos preenvasados.',
      sources: window.ITASO_sources(['nom051', 'imssNutrition', 'foodLabeling'])
    },
    {
      title: 'Grupos de alimentos',
      text: 'Referencias para reconocer los grupos de alimentos y promover la variedad.',
      sources: window.ITASO_sources(['platoBienComer', 'dietaryGuidelines2025'])
    },
    {
      title: 'Hidratación y bebidas',
      text: 'Referencias sobre hidratación, diversidad de bebidas y azúcares libres.',
      sources: window.ITASO_sources(['dietaryGuidelines2025', 'whoHealthyDiet', 'foodLabeling'])
    },
    {
      title: 'Hambre y saciedad',
      text: 'Referencias sobre señales de hambre, saciedad y acompañamiento.',
      sources: window.ITASO_sources(['healthyChildrenEatingEnough', 'cdcHungerFullness'])
    },
    {
      title: 'Actividad física',
      text: 'Referencias sobre actividad física, sedentarismo y movimiento según la edad.',
      sources: window.ITASO_sources(['whoPhysicalActivity', 'whoPhysicalActivityGuidelines', 'whoUnder5Movement'])
    }
  ];

  window.ITASO_SOURCES_ALL = window.ITASO_SOURCES.flatMap(group =>
    group.sources.map(source => ({ ...source, theme: group.theme })));
})();
