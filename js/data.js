(function () {
  window.ITASO_DATA = {
    products: {
      alimentos: [
        { id: 'yogur', name: 'Yogur natural', portion: '125 g', sugar: '6 g', seals: '0', ingredients: 'Leche, cultivos' },
        { id: 'cereal', name: 'Cereal de caja', portion: '30 g', sugar: '9 g', seals: '1', ingredients: 'Maíz, azúcar, vitaminas' },
        { id: 'avena', name: 'Avena simple', portion: '40 g', sugar: '1 g', seals: '0', ingredients: 'Avena integral' }
      ],
      bebidas: [
        { id: 'agua', name: 'Agua simple', portion: '355 ml', sugar: '0 g', seals: '0', ingredients: 'Agua' },
        { id: 'jugo', name: 'Jugo envasado', portion: '250 ml', sugar: '24 g', seals: '1', ingredients: 'Agua, concentrado de fruta, azúcar' },
        { id: 'leche', name: 'Leche', portion: '240 ml', sugar: '12 g', seals: '0', ingredients: 'Leche' }
      ],
      etiquetas: [
        { id: 'a', name: 'Producto A', portion: '45 g', sugar: '8 g', seals: '1', ingredients: 'Cereal, azúcar, cacao' },
        { id: 'b', name: 'Producto B', portion: '30 g', sugar: '4 g', seals: '0', ingredients: 'Cereal integral, semillas' }
      ]
    },
    recipes: [
      { id: 'tostada', name: 'Tostada de frijol y verduras', time: 10, difficulty: 'Fácil', cost: '$', tags: ['rápida', 'económica', 'lunch'], ages: ['8–12', '13–17'], ingredients: ['2 tostadas horneadas', '½ taza de frijoles', 'Verdura disponible'], steps: ['Unta los frijoles.', 'Agrega la verdura.', 'Empaca por separado si es para lunch.'], portions: 1 },
      { id: 'avena', name: 'Avena con fruta', time: 8, difficulty: 'Fácil', cost: '$', tags: ['rápida', 'económica'], ages: ['8–12', '13–17'], ingredients: ['½ taza de avena', '1 taza de leche o agua', 'Fruta de temporada'], steps: ['Cocina la avena.', 'Agrega la fruta.', 'Ajusta la consistencia.'], portions: 2 },
      { id: 'rollitos', name: 'Rollitos de tortilla', time: 12, difficulty: 'Fácil', cost: '$$', tags: ['lunch', 'sin refrigeración'], ages: ['13–17'], ingredients: ['2 tortillas', 'Frijoles refritos', 'Verduras firmes'], steps: ['Unta los frijoles.', 'Añade verdura.', 'Enrolla y corta.'], portions: 1 }
    ],
    nutritionTopics: {
      porciones: ['Las porciones son una referencia, no una regla rígida.', 'Compara productos usando la misma cantidad.'],
      grupos: ['Combinar grupos aporta variedad.', 'Usa lo que esté disponible en casa.'],
      etiquetado: ['Los sellos son una señal rápida.', 'Revisa también porción e ingredientes.'],
      hidratacion: ['El agua simple puede ser la opción cotidiana.', 'La frecuencia importa además de la cantidad.'],
      hambre: ['Hambre y saciedad cambian según el día.', 'Escuchar el cuerpo ayuda a decidir cuánto comer.']
    },
    nutritionResources: {
      porciones: {
        accent: 'orange',
        kicker: 'Alimentación · Porciones',
        title: 'Porciones',
        subtitle: 'Una referencia para comprender cantidades',
        intro: 'Una porción es la cantidad de un alimento o bebida que se sugiere consumir o que generalmente se consume en una ocasión. En productos preenvasados, conocer la cantidad utilizada como referencia ayuda a interpretar mejor la información nutrimental.',
        sabias: {
          visual: '100 g / 100 ml',
          text: 'La NOM-051 establece que la información de energía y nutrimentos de los productos preenvasados debe declararse por 100 g o 100 ml. Adicionalmente, también puede presentarse por porción.',
          chips: ['Porción', 'Cantidad', 'Comparación'],
          close: 'Cuando compares dos productos, primero revisa qué cantidad estás observando.'
        },
        importante: [
          { t: 'Una porción es una referencia', d: 'La NOM-051 define una porción como la cantidad de producto que se sugiere consumir o que generalmente se consume en una ingestión.' },
          { t: 'Revisa la misma cantidad', d: 'Para comparar dos productos con mayor claridad, observa primero la información declarada por 100 g o 100 ml, o verifica que las porciones que estás comparando sean equivalentes.' },
          { t: 'Porción y envase no son lo mismo', d: 'Un envase puede contener una o varias porciones. Revisa tanto la cantidad utilizada como referencia como el contenido total del envase.' },
          { t: 'Las necesidades cambian', d: 'La cantidad de alimentos que necesita cada persona puede variar según edad, actividad y otras características individuales.' }
        ],
        remember: 'Antes de decidir entre dos productos, primero compara cantidades equivalentes.',
        cta: { label: 'Usar este criterio para comparar', href: '#/cuidadores/decide-con-lo-que-tienes' },
        sources: [
          { institution: 'Diario Oficial de la Federación', title: 'NOM-051-SCFI/SSA1-2010', url: 'https://www.dof.gob.mx/2020/SEECO/NOM_051.pdf' },
          { institution: 'Instituto Mexicano del Seguro Social', title: 'Nutrición', url: 'https://www.imss.gob.mx/salud-en-linea/nutricion' }
        ]
      },
      grupos: {
        accent: 'green',
        kicker: 'Alimentación · Grupos de alimentos',
        title: 'Grupos de alimentos',
        subtitle: '¿Qué aporta cada uno?',
        intro: 'Los diferentes grupos de alimentos aportan distintos nutrimentos. Reconocerlos ayuda a observar la variedad de una comida y a identificar qué podrías agregar con lo que tienes disponible.',
        sabias: {
          visual: '5',
          text: 'El Plato del Bien Comer Saludable y Sostenible presenta cinco grandes grupos de alimentos.',
          chips: ['Variedad', 'Combinación', 'Alimentos'],
          close: 'No todos los alimentos aportan lo mismo. La variedad permite combinar distintos nutrimentos.'
        },
        importante: [
          { t: 'Verduras y frutas', d: 'Aportan fibra, vitaminas y minerales.' },
          { t: 'Cereales integrales, granos enteros y tubérculos', d: ['Incluyen alimentos como maíz, arroz, avena, trigo, tortilla, pasta, papa o camote.', 'Son una fuente importante de carbohidratos y energía.', 'Los granos enteros e integrales también aportan fibra.'] },
          { t: 'Leguminosas', d: 'Frijoles, lentejas, garbanzos, habas y otras leguminosas aportan carbohidratos, fibra, proteína vegetal, vitaminas y minerales.' },
          { t: 'Alimentos de origen animal', d: 'Incluyen alimentos como huevo, pescado, leche, yogur, queso y carnes. Aportan proteínas y otros nutrimentos.' },
          { t: 'Aceites y grasas saludables', d: 'Incluyen alimentos como aguacate, semillas, nueces y determinados aceites vegetales.' }
        ],
        remember: 'En lugar de preguntarte si una comida es “perfecta”, observa: ¿qué grupos ya están presentes? ¿Qué podrías complementar con lo que tienes hoy?',
        cta: { label: 'Ver ideas con lo que tengo', href: '#/cuidadores/recetas' },
        sources: [
          { institution: 'Instituto Mexicano del Seguro Social', title: 'Plato del Bien Comer Saludable y Sostenible', url: 'https://www.imss.gob.mx/salud-en-linea/platobiencomer' },
          { institution: 'Secretaría de Salud · INSP · UNICEF', title: 'Guías Alimentarias Saludables y Sostenibles para la Población Mexicana 2025', url: 'https://www.gob.mx/salud/sinsamac/documentos/guias-alimentarias-saludables-y-sostenibles-para-la-poblacion-mexicana-2025' }
        ]
      },
      etiquetado: {
        accent: 'red',
        kicker: 'Alimentación · Etiquetado nutrimental',
        title: 'Etiquetado nutrimental',
        subtitle: 'Información para observar y comparar',
        intro: 'El etiquetado frontal permite identificar rápidamente ciertas características de los alimentos y bebidas preenvasados y puede utilizarse como una herramienta para comparar opciones semejantes.',
        sabias: {
          visual: '5 + 2',
          text: 'En México existen cinco sellos de advertencia y dos posibles leyendas precautorias.',
          chips: ['Sellos', 'Etiqueta', 'Comparación'],
          close: 'No necesitas memorizar toda la etiqueta. Empieza identificando la información que puede ayudarte en la decisión que estás tomando.'
        },
        importante: [
          { t: 'Cinco sellos de advertencia', d: 'Un producto puede mostrar uno o más de estos sellos:', list: ['EXCESO CALORÍAS', 'EXCESO AZÚCARES', 'EXCESO GRASAS SATURADAS', 'EXCESO GRASAS TRANS', 'EXCESO SODIO'] },
          { t: 'Dos leyendas precautorias', d: 'También pueden aparecer dos tipos de leyendas precautorias:', list: ['CONTIENE EDULCORANTES, NO RECOMENDABLE EN NIÑOS.', 'CONTIENE CAFEÍNA, EVITAR EN NIÑOS.'] },
          { t: 'Los sellos facilitan una primera lectura', d: 'Permiten identificar de manera rápida cuando un producto excede los criterios establecidos para determinados nutrimentos críticos.' },
          { t: 'Puedes comparar productos similares', d: 'El sistema de etiquetado puede ayudar a observar diferencias entre productos semejantes.' },
          { t: 'Mira más allá del frente', d: 'También puedes revisar:', list: ['declaración nutrimental', 'cantidad del producto', 'lista de ingredientes'] }
        ],
        remember: 'La etiqueta no decide por ti. Te ayuda a observar diferencias y obtener más información antes de elegir.',
        cta: { label: 'Comparar dos opciones', href: '#/cuidadores/decide-con-lo-que-tienes' },
        sources: [
          { institution: 'Secretaría de Salud', title: 'Etiquetado frontal de alimentos y bebidas', url: 'https://www.gob.mx/promosalud/acciones-y-programas/etiquetado-de-alimentos' },
          { institution: 'Diario Oficial de la Federación', title: 'NOM-051-SCFI/SSA1-2010', url: 'https://www.dof.gob.mx/2020/SEECO/NOM_051.pdf' }
        ]
      },
      hidratacion: {
        accent: 'blue',
        kicker: 'Alimentación · Bebidas',
        title: '¿Qué hay en lo que tomas?',
        subtitle: 'La información del envase puede ayudarte a observar y comparar lo que contienen distintas bebidas.',
        sabias: {
          visual: '2',
          text: 'Dos bebidas que parecen similares pueden contener cantidades distintas de azúcar.',
          chips: ['Azúcares', 'Cantidad', 'Bebidas'],
          close: 'Cuando quieras compararlas, utiliza una cantidad equivalente como referencia.'
        },
        importante: [
          { t: 'El agua simple puede ser el punto de partida para la hidratación cotidiana', d: 'El agua participa en funciones esenciales del organismo y es una opción recomendada para la hidratación cotidiana.' },
          { t: 'Observa la cantidad', d: ['El tamaño del envase puede cambiar cuánto terminas consumiendo.', 'No compares únicamente números pertenecientes a envases de diferente tamaño.'] },
          { t: 'Revisa los azúcares', d: 'La Organización Mundial de la Salud recomienda limitar los azúcares libres a menos del 10 % de la ingesta energética total.', note: 'Dato presentado solo como recomendación general de salud pública: no es una cifra diaria para una niña o niño concreto, ni una prescripción, meta individual automática o calculadora nutricional.' },
          { t: '¿Qué son los azúcares libres?', d: 'Incluyen los azúcares añadidos por fabricantes, cocineros o consumidores, además de los presentes naturalmente en miel, jarabes, jugos de fruta y concentrados de jugo.' },
          { t: 'Utiliza el envase como herramienta', d: 'Cuando compares bebidas preenvasadas:', list: ['revisa sellos', 'observa la cantidad', 'utiliza cantidades equivalentes', 'revisa leyendas precautorias'] }
        ],
        remember: 'Para la hidratación cotidiana, el agua simple puede ser tu punto de partida. Si eliges otra bebida, utiliza la información disponible para comprender qué contiene.',
        cta: { label: 'Decidir entre bebidas', href: '#/cuidadores/decide-con-lo-que-tienes' },
        sources: [
          { institution: 'Organización Mundial de la Salud', title: 'Alimentación saludable', url: 'https://www.who.int/es/news-room/fact-sheets/detail/healthy-diet' },
          { institution: 'Secretaría de Salud · INSP · UNICEF', title: 'Guías Alimentarias Saludables y Sostenibles para la Población Mexicana 2025', url: 'https://www.gob.mx/salud/sinsamac/documentos/guias-alimentarias-saludables-y-sostenibles-para-la-poblacion-mexicana-2025' },
          { institution: 'Secretaría de Salud', title: 'Etiquetado frontal de alimentos y bebidas', url: 'https://www.gob.mx/promosalud/acciones-y-programas/etiquetado-de-alimentos' }
        ]
      },
      hambre: {
        accent: 'lime',
        kicker: 'Alimentación · Hambre y saciedad',
        title: 'Hambre y saciedad',
        subtitle: 'Aprender a escuchar las señales',
        intro: 'El hambre y la saciedad también forman parte de nuestra relación con los alimentos. Acompañar a niñas y niños implica aprender a reconocer y respetar estas señales.',
        sabias: {
          visual: '2',
          text: 'Hambre y saciedad son señales que pueden orientar cuándo queremos seguir comiendo y cuándo sentimos que hemos comido suficiente.',
          chips: ['Hambre', 'Saciedad', 'Acompañamiento'],
          close: 'La cantidad que una niña o un niño quiere comer puede cambiar entre una comida y otra.'
        },
        importante: [
          { t: 'Ofrece, observa y escucha', d: 'La persona adulta puede ofrecer alimentos y crear el momento de la comida. La niña o el niño también participa expresando cuánto quiere comer de lo que se le ofrece.' },
          { t: 'No siempre comerá la misma cantidad', d: 'El apetito puede variar entre días y comidas.' },
          { t: 'Evita obligar a terminar el plato', d: ['Permitir que niñas y niños reconozcan cuándo están satisfechos ayuda a respetar sus señales internas.', 'No convertir “terminar todo” en el único indicador de una comida suficiente.'] },
          { t: 'Si aún tiene hambre, puede pedir más', d: 'Puede ofrecerse una cantidad inicial y permitir que solicite más si todavía tiene hambre.' },
          { t: 'La experiencia de comer también importa', d: 'Evita utilizar los alimentos constantemente como:', list: ['premio', 'castigo', 'presión', 'negociación'], after: 'La finalidad es acompañar el aprendizaje y el reconocimiento de las propias señales.' }
        ],
        remember: 'La persona cuidadora ofrece y acompaña. La niña o el niño también puede comunicar cuándo tiene hambre y cuándo se siente satisfecho.',
        note: 'Esta información es orientación general. No sustituye una valoración médica o nutricional. Si existe preocupación por cuánto, qué o cómo está comiendo una niña, niño o adolescente, recomendar consultar a un profesional de salud.',
        cta: { label: 'Explorar recursos para conversar en familia', href: '#/cuidadores/recursos' },
        sources: [
          { institution: 'American Academy of Pediatrics · HealthyChildren.org', title: 'Making Sure Your Child Is Eating Enough', url: 'https://www.healthychildren.org/spanish/healthy-living/nutrition/paginas/making-sure-your-child-is-eating-enough.aspx' },
          { institution: 'Centers for Disease Control and Prevention', title: 'Signs Your Child Is Hungry or Full', url: 'https://www.cdc.gov/infant-toddler-nutrition/mealtime/signs-your-child-is-hungry-or-full.html' }
        ]
      }
    }
  };
})();
