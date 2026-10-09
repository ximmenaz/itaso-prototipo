(function () {
  const S = ids => (window.ITASO_sources ? window.ITASO_sources(ids) : []);
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
      { id: 'avena', name: 'Avena con plátano y canela', tipo: ['desayuno'], time: 8, cost: '$', difficulty: 'Fácil', tags: ['Rápida', 'Económica', 'Con fruta'], description: 'Un desayuno caliente y sencillo para empezar el día con cereal y fruta.', ingredients: ['½ taza de avena', '1 taza de agua, leche o mezcla', '1 plátano maduro en rebanadas', 'Canela al gusto'], steps: ['Cocina la avena con el líquido elegido a fuego medio.', 'Cuando espese, agrega el plátano en rebanadas.', 'Ajusta la consistencia con más líquido y espolvorea canela.'], substitutions: [{ what: 'plátano', replace: 'usa la fruta disponible: manzana, pera, papaya o guayaba.' }, { what: 'leche', replace: 'puedes usar agua o una bebida vegetal que tengas.' }], siNoTienes: 'cambia el plátano por otra fruta disponible o agrégala en trozos al final.', sirveSi: 'hoy necesitas una mañana rápida y quieres empezar con cereal y fruta.', portions: 2 },
      { id: 'yogur-fruta', name: 'Yogur natural con fruta y avena', time: 5, difficulty: 'Fácil', cost: '$', tipo: ['desayuno', 'colacion'], tags: ['rápida', 'fría', 'con fruta'], description: 'Una opción fría que no requiere cocinar y se arma en minutos.', ingredients: ['1 vaso de yogur natural sin azúcar', '1 taza de fruta picada', '2 cucharadas de avena o granola', 'Canela o un toque de miel si lo deseas'], steps: ['Sirve el yogur en un vaso o tazón.', 'Agrega la fruta picada.', 'Termina con la avena y un toque de canela.'], substitutions: [{ what: 'yogur', replace: 'puedes usar yogur natural o bebible sin azúcar añadida.' }, { what: 'avena', replace: 'usa granola, amaranto o simplemente omítela.' }], siNoTienes: 'cambia la fruta según la temporada o lo que haya en casa.', sirveSi: 'no quieres cocinar y buscas una opción fría y rápida.', portions: 1 },
      { id: 'mollete', name: 'Mollete de frijol con pico de gallo', time: 10, difficulty: 'Fácil', cost: '$', tags: ['rápida', 'con leguminosas', 'familiar'], tipo: ['desayuno', 'comida'], description: 'Un desayuno o comida sencilla a partir de frijoles ya preparados.', ingredients: ['1 bolillo partido a la mitad', '½ taza de frijoles cocidos o refritos', 'jitomate, cebolla y cilantro picados', 'Un toque de limón y sal'], steps: ['Calienta el bolillo y úntale los frijoles.', 'Mezcla el jitomate, la cebolla y el cilantro con limón y sal.', 'Sirve el pico de gallo sobre el mollete.'], substitutions: [{ what: 'bolillo', replace: 'usa tortilla, tostada horneada o pan que tengas.' }, { what: 'frijoles', replace: 'puedes usar frijoles negros, bayos o peruanos ya cocidos.' }], siNoTienes: 'cambia el bolillo por tortilla o tostada horneada.', sirveSi: 'tienes frijoles preparados y quieres una comida sencilla.', portions: 1 },
      { id: 'huevo-espinaca', name: 'Huevo con jitomate y espinaca', time: 10, difficulty: 'Fácil', cost: '$', tags: ['rápida', 'con verduras', 'casera'], tipo: ['desayuno', 'comida'], description: 'Un guisado breve que combina huevo con verdura disponible.', ingredients: ['2 huevos', '1 jitomate picado', '1 puño de espinaca lavada', '½ cebolla picada y un poco de aceite'], steps: ['Acitrona la cebolla y el jitomate.', 'Agrega la espinaca y deja que se reduzca.', 'Incorpora los huevos y revuelve hasta que cuajen.'], substitutions: [{ what: 'espinaca', replace: 'usa otra verdura disponible como acelga, calabacita o champiñones.' }, { what: 'huevo', replace: 'puede servirse también con frijoles o queso.' }], siNoTienes: 'usa cualquier verdura que tengas y funcione en un guisado.', sirveSi: 'quieres integrar verduras en un platillo rápido.', portions: 1 },
      { id: 'quesadilla', name: 'Quesadilla de champiñones y queso', time: 12, difficulty: 'Fácil', cost: '$', tags: ['rápida', 'con verduras', 'sencilla'], tipo: ['desayuno', 'cena'], description: 'Una opción caliente y sencilla para el desayuno o la cena.', ingredients: ['2 tortillas', '1 taza de champiñones limpios y rebanados', 'Queso al gusto', 'Un poco de cebolla y aceite'], steps: ['Saltea la cebolla y los champiñones.', 'Coloca el queso y los champiñones en la tortilla y dobla.', 'Dora en el comal hasta que el queso se derrita.'], substitutions: [{ what: 'champiñones', replace: 'usa calabacita, nopales o cualquier verdura disponible.' }, { what: 'queso', replace: 'usa el queso que tengas o fríjoles como relleno.' }], siNoTienes: 'cambia los champiñones por calabacita, nopales u otra verdura.', sirveSi: 'necesitas algo caliente y rápido para la mañana o la noche.', portions: 1 },
      { id: 'tostada', name: 'Tostada de frijol y verduras', time: 10, difficulty: 'Fácil', cost: '$', tags: ['económica', 'con leguminosas', 'lunch'], tipo: ['lunch', 'comida'], description: 'Una comida rápida que puede servir en casa o como lunch.', ingredients: ['2 tostadas horneadas', '½ taza de frijoles cocidos', 'Verdura disponible (jitomate, cebolla, lechuga, aguacate)'], steps: ['Unta los frijoles sobre las tostadas.', 'Agrega la verdura que tengas disponible.', 'Si es para llevar, guarda la verdura por separado para que no se humedezca.'], substitutions: [{ what: 'frijoles', replace: 'puedes usar lentejas o garbanzos cocidos, o el guisado de leguminosa que ya esté listo.' }, { what: 'tostadas', replace: 'puedes usar tortillas a la plancha o el pan que tengas.' }], siNoTienes: 'usa tortilla a la plancha o pan en lugar de tostadas.', sirveSi: 'necesitas resolver una comida rápida o un lunch sin refrigeración.', portions: 1 },
      { id: 'rollitos', name: 'Rollitos de tortilla con aguacate y pollo', time: 12, difficulty: 'Fácil', cost: '$$', tags: ['para llevar', 'práctica', 'lunch'], tipo: ['lunch', 'colacion'], description: 'Rollitos fáciles de guardar y llevar, con ingredientes que se sostienen bien.', ingredients: ['2 tortillas', 'Pollo cocido y deshebrado', '½ aguacate', 'Verduras firmes (zanahoria, lechuga, pepino)'], steps: ['Lava y corta la verdura en tiras.', 'Unta el aguacate y coloca el pollo en las tortillas.', 'Agrega la verdura, enrolla y corta a la mitad.'], substitutions: [{ what: 'pollo', replace: 'usa frijoles, huevo cocido o queso como relleno.' }, { what: 'tortillas', replace: 'puedes usar pan de caja, bolillo o tostadas.' }], siNoTienes: 'cambia el pollo por frijol o queso.', sirveSi: 'hoy necesitas algo que puedas guardar y llevar.', portions: 1 },
      { id: 'sandwich-atun', name: 'Sándwich de atún con pepino', time: 10, difficulty: 'Fácil', cost: '$$', tags: ['rápida', 'lunch', 'fresca'], tipo: ['lunch', 'colacion'], description: 'Un lunch fresco que no necesita calentarse.', ingredients: ['2 rebanadas de pan', '1 lata de atún', '½ pepino en rebanadas', 'Un poco de limón, sal y mayonesa si te gusta'], steps: ['Escurre el atún y mézclalo con limón y sal.', 'Unta el atún en el pan.', 'Agrega el pepino y cierra el sándwich.'], substitutions: [{ what: 'pepino', replace: 'usa jitomate, lechuga o zanahoria rallada.' }, { what: 'atún', replace: 'puedes usar huevo cocido o pollo deshebrado.' }], siNoTienes: 'cambia el pepino por jitomate o lechuga.', sirveSi: 'buscas un lunch fresco que no necesite calentarse.', portions: 1 },
      { id: 'jicama', name: 'Preparado de jícama, pepino y cacahuates', time: 8, difficulty: 'Fácil', cost: '$', tags: ['con verduras', 'para llevar', 'crujiente'], tipo: ['lunch', 'colacion'], description: 'Una colación crujiente y fresca que se puede llevar.', ingredients: ['1 taza de jícama en tiras', '1 pepino en rebanadas', 'Un puño de cacahuates', 'Limón, sal y chile en polvo al gusto'], steps: ['Lava y corta la jícama y el pepino.', 'Mezcla con limón y sal.', 'Agrega los cacahuates justo antes de comer.'], substitutions: [{ what: 'jícama', replace: 'usa zanahoria, apio o cualquier verdura crujiente.' }, { what: 'cacahuates', replace: 'puedes usar semillas de girasol o pepitas.' }], siNoTienes: 'cambia una de las verduras por fruta firme, como manzana o pera.', sirveSi: 'quieres una colación crujiente y fresca para llevar.', portions: 2 },
      { id: 'vaso-fruta', name: 'Vasito de fruta con yogur y amaranto', time: 7, difficulty: 'Fácil', cost: '$', tags: ['con fruta', 'sencilla', 'lunch'], tipo: ['lunch', 'colacion'], description: 'Una colación rápida que combina fruta con yogur.', ingredients: ['1 taza de fruta picada', '½ taza de yogur natural', '1 cucharada de amaranto', 'Un toque de limón si te gusta'], steps: ['Lava y corta la fruta.', 'Acomódala en un vaso con el yogur.', 'Espolvorea el amaranto justo al servir.'], substitutions: [{ what: 'amaranto', replace: 'usa avena o granola.' }, { what: 'yogur', replace: 'puede servirse solo con fruta si prefieres.' }], siNoTienes: 'usa avena en lugar de amaranto.', sirveSi: 'necesitas algo práctico para media mañana o media tarde.', portions: 1 },
      { id: 'lentejas', name: 'Sopa de lentejas con verduras', time: 25, difficulty: 'Fácil', cost: '$', tags: ['con leguminosas', 'casera', 'rendidora'], tipo: ['comida'], description: 'Una comida rendidora para compartir en familia.', ingredients: ['1 taza de lentejas', 'Zanahoria, jitomate y cebolla picados', 'Un poco de aceite, sal y ajo', 'Agua suficiente para la cocción'], steps: ['Sofríe la cebolla, el jitomate y la zanahoria.', 'Agrega las lentejas y el agua.', 'Cocina hasta que las lentejas estén suaves y sazona.'], substitutions: [{ what: 'verduras', replace: 'cambia por las verduras que tengas disponibles.' }, { what: 'lentejas', replace: 'puedes usar frijoles o garbanzos.' }], siNoTienes: 'cambia las verduras según lo que haya disponible.', sirveSi: 'quieres una comida rendidora para la familia.', portions: 4 },
      { id: 'arroz-verdura', name: 'Arroz con verduras y huevo', time: 20, difficulty: 'Fácil', cost: '$', tags: ['económica', 'completa', 'familiar'], tipo: ['comida'], description: 'Una comida completa con ingredientes básicos.', ingredients: ['2 tazas de arroz cocido', '1 zanahoria y 1 calabacita en cubos', '2 huevos', 'Un poco de aceite, sal y cebolla'], steps: ['Saltea la cebolla y las verduras.', 'Agrega el arroz cocido y mezcla.', 'Incorpora el huevo y revuelve hasta que cuaje.'], substitutions: [{ what: 'huevo', replace: 'usa frijoles o queso como complemento.' }, { what: 'verduras', replace: 'usa las verduras que tengas disponibles.' }], siNoTienes: 'cambia el huevo por frijoles o queso.', sirveSi: 'solo tienes pocos ingredientes y quieres una comida completa.', portions: 3 },
      { id: 'tacos-nopales', name: 'Tacos de nopales con frijoles', time: 15, difficulty: 'Fácil', cost: '$', tags: ['con verduras', 'con leguminosas', 'familiar'], tipo: ['comida', 'cena'], description: 'Una opción cotidiana y accesible con nopales y frijoles.', ingredients: ['2 tazas de nopales limpios y picados', '½ taza de frijoles cocidos', 'Tortillas', 'Cebolla, sal y un poco de aceite'], steps: ['Asa o saltea los nopales con cebolla hasta que estén tiernos.', 'Calienta los frijoles y las tortillas.', 'Sirve los nopales y los frijoles dentro de las tortillas.'], substitutions: [{ what: 'nopales', replace: 'usa calabacitas o champiñones.' }, { what: 'frijoles', replace: 'puedes usar lentejas o garbanzos.' }], siNoTienes: 'cambia los nopales por calabacitas o champiñones.', sirveSi: 'buscas una opción cotidiana y accesible.', portions: 2 },
      { id: 'pasta-verdura', name: 'Ensalada de pasta con verduras', time: 18, difficulty: 'Fácil', cost: '$', tags: ['rendidora', 'fría', 'adaptable'], tipo: ['comida', 'lunch'], description: 'Un platillo flexible que funciona como comida o como lunch.', ingredients: ['Pasta corta (la que tengas)', 'Verduras disponibles en cubos', 'Un poco de aceite, limón y sal', 'Opcional: atún, huevo cocido o queso'], steps: ['Cocina la pasta y enjuágala con agua fría.', 'Corta y mezcla las verduras.', 'Aliña con aceite, limón y sal; agrega la proteína si la usas.'], substitutions: [{ what: 'pasta', replace: 'puedes usar arroz, quinua o papas en cubos.' }, { what: 'verduras', replace: 'usa cualquier verdura disponible; combina las que tengas.' }], siNoTienes: 'cambia las verduras según lo que haya en casa.', sirveSi: 'puede servir para comida o para llevar como lunch.', portions: 3 },
      { id: 'tinga', name: 'Tinga de pollo en tostada horneada', time: 20, difficulty: 'Media', cost: '$$', tags: ['familiar', 'para compartir', 'práctica'], tipo: ['comida'], description: 'Una comida rendidora para compartir.', ingredients: ['Pollo cocido y deshebrado', '2 jitomates y ½ cebolla', 'Chipotle al gusto', 'Tostadas horneadas'], steps: ['Licúa el jitomate con la cebolla y el chipotle.', 'Guisa el pollo con esa salsa.', 'Sirve sobre tostadas horneadas.'], substitutions: [{ what: 'pollo', replace: 'usa frijoles o setas como versión sin carne.' }, { what: 'tostadas', replace: 'puedes usar tortillas, bolillo o pan.' }], siNoTienes: 'usa pollo cocido de otro día o cambia por frijoles.', sirveSi: 'quieres algo rendidor para compartir en familia.', portions: 4 },
      { id: 'calabacitas', name: 'Calabacitas con elote y queso', time: 15, difficulty: 'Fácil', cost: '$', tags: ['con verduras', 'fácil', 'casera'], tipo: ['comida', 'cena'], description: 'Una forma sencilla de integrar verduras.', ingredients: ['2 calabacitas en cubos', '1 taza de elote desgranado', '1 jitomate y ½ cebolla', 'Queso al gusto'], steps: ['Acitrona la cebolla y el jitomate.', 'Agrega la calabacita y el elote; cocina hasta que suavicen.', 'Añade el queso y deja que se derrita.'], substitutions: [{ what: 'calabacita', replace: 'usa otra verdura similar como chayote o ejotes.' }, { what: 'elote', replace: 'puedes usar elote de lata o congelado.' }], siNoTienes: 'usa otra verdura similar que tengas.', sirveSi: 'quieres integrar verduras sin complicarte.', portions: 3 },
      { id: 'enfrijoladas', name: 'Enfrijoladas sencillas con queso fresco', time: 15, difficulty: 'Fácil', cost: '$', tags: ['rápida', 'con leguminosas', 'tradicional'], tipo: ['comida', 'cena'], description: 'Una comida rápida cuando ya hay frijoles preparados.', ingredients: ['1 taza de frijoles cocidos y caldo', '4 tortillas', 'Queso fresco y cebolla', 'Un poco de aceite'], steps: ['Licúa los frijoles con un poco de caldo y caliéntalos.', 'Pasa las tortillas por el aceite y luego por el frijol.', 'Sirve con queso fresco y cebolla.'], substitutions: [{ what: 'queso fresco', replace: 'usa el queso que tengas o crema.' }, { what: 'frijoles', replace: 'puedes usar frijoles negros o bayos.' }], siNoTienes: 'usa tortilla y los frijoles disponibles.', sirveSi: 'tienes poco tiempo y frijoles preparados.', portions: 2 },
      { id: 'burrito', name: 'Burrito de frijoles y arroz', time: 12, difficulty: 'Fácil', cost: '$', tags: ['para llevar', 'llenadora', 'adaptable'], tipo: ['comida', 'lunch'], description: 'Una comida o lunch fácil de armar y llevar.', ingredients: ['1 tortilla grande', '½ taza de frijoles', '½ taza de arroz cocido', 'Verduras o queso al gusto'], steps: ['Calienta la tortilla.', 'Coloca los frijoles, el arroz y lo que tengas.', 'Enrolla con firmeza y corta a la mitad.'], substitutions: [{ what: 'arroz', replace: 'puedes usar quinua, pasta corta o papas.' }, { what: 'frijoles', replace: 'usa lentejas o garbanzos.' }], siNoTienes: 'arma solo con frijoles y verduras.', sirveSi: 'necesitas comer en casa o llevar sin complicarte.', portions: 1 },
      { id: 'agua-limon', name: 'Agua de limón con chía sin azúcar', time: 5, difficulty: 'Fácil', cost: '$', tags: ['hidratación', 'simple', 'fresca'], tipo: ['bebida'], description: 'Una bebida casera para hidratarse sin azúcar añadida.', ingredients: ['1 litro de agua', '2 limones', '1 cucharada de chía', 'Hielo al gusto'], steps: ['Exprime los limones y mezcla con el agua.', 'Agrega la chía y deja reposar unos minutos.', 'Sirve con hielo.'], substitutions: [{ what: 'limón', replace: 'usa otra fruta cítrica disponible.' }, { what: 'chía', replace: 'puedes prepararla sin chía, solo con agua y limón.' }], siNoTienes: 'usa la fruta cítrica que tengas.', sirveSi: 'quieres priorizar hidratación sin agregar azúcar.', portions: 4 },
      { id: 'jamaica', name: 'Agua de jamaica sin azúcar', time: 10, difficulty: 'Fácil', cost: '$', tags: ['hidratación', 'casera', 'para compartir'], tipo: ['bebida'], description: 'Una bebida casera para acompañar la comida.', ingredients: ['1 taza de flor de jamaica', '2 litros de agua', 'Hielo al gusto'], steps: ['Enjuaga la flor de jamaica.', 'Hiénvela en un poco de agua por 5 minutos.', 'Cuela, añade el resto del agua y deja enfriar.'], substitutions: [{ what: 'jamaica', replace: 'puedes usar tamarindo o limón.' }, { what: 'agua', replace: 'sirve primero agua simple si prefieres.' }], siNoTienes: 'prioriza agua simple si no hay flor de jamaica.', sirveSi: 'quieres acompañar una comida familiar con una bebida casera.', portions: 6 }
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
        sources: S(['nom051', 'imssNutrition'])
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
        sources: S(['platoBienComer', 'dietaryGuidelines2025'])
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
        sources: S(['nom051', 'foodLabeling'])
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
        sources: S(['dietaryGuidelines2025', 'whoHealthyDiet', 'foodLabeling'])
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
        sources: S(['healthyChildrenEatingEnough', 'cdcHungerFullness'])
      }
    },
    activityTopics: {
      movimiento: {
        accent: 'orange',
        kicker: 'Actividad física · Movimiento cotidiano',
        title: 'MOVERSE ES MÁS QUE HACER EJERCICIO',
        subtitle: 'Por qué el movimiento cotidiano también cuenta',
        intro: 'La Organización Mundial de la Salud define la actividad física como cualquier movimiento corporal que requiere gasto de energía. Puede incluir caminar, jugar, bailar, andar en bicicleta, trasladarse, realizar actividades recreativas o practicar deportes.',
        sabias: {
          visual: 'NO SOLO DEPORTE',
          text: 'El movimiento puede formar parte de actividades familiares, escolares, recreativas y de traslado.',
          chips: ['Caminar', 'Jugar', 'Bailar', 'Trasladarse'],
          close: 'Una sesión formal de ejercicio es una forma de movimiento, pero no la única.'
        },
        importante: [
          { t: 'CADA MOVIMIENTO CUENTA', d: 'No es necesario que toda la actividad ocurra dentro de una sesión formal de ejercicio.' },
          { t: 'BUSCA OPORTUNIDADES COTIDIANAS', d: 'Caminar, jugar o realizar actividades activas en familia también pueden sumar movimiento al día.' },
          { t: 'QUE SEA POSIBLE IMPORTA', d: 'Una actividad que se adapta al tiempo, espacio y realidad de la familia puede ser más fácil de incorporar.' }
        ],
        remember: 'Moverse puede empezar con algo tan sencillo como cambiar algunos minutos sentados por una actividad que implique movimiento.',
        sources: S(['whoPhysicalActivity', 'imssHealthGuides'])
      },
      cuanto: {
        accent: 'green',
        kicker: 'Actividad física · ¿Cuánto movimiento?',
        title: '¿CUÁNTO MOVIMIENTO NECESITAN?',
        subtitle: 'Recomendaciones generales de salud pública',
        intro: 'Para niñas, niños y adolescentes de 5 a 17 años, la OMS recomienda un promedio de al menos 60 minutos al día de actividad física moderada a vigorosa a lo largo de la semana.',
        sabias: {
          visual: '60 MIN',
          text: 'El promedio recomendado es de al menos 60 minutos al día de actividad moderada a vigorosa, acumulados a lo largo de la semana.',
          chips: ['60 min', 'Moderada', 'Vigorosa'],
          close: 'Estas cifras son una recomendación general de salud pública, no una meta individual.'
        },
        importante: [
          { t: 'NO TIENE QUE SER UN SOLO BLOQUE', d: 'El movimiento puede aparecer en diferentes momentos del día.' },
          { t: 'LA MAYOR PARTE DEBE SER AERÓBICA', d: 'Actividades como caminar rápido, correr, jugar o andar en bicicleta pueden formar parte de ella.' },
          { t: 'FUERZA Y HUESOS TAMBIÉN CUENTAN', d: 'La OMS recomienda incluir actividades vigorosas y que fortalezcan músculos y huesos al menos tres días por semana.' }
        ],
        note: 'Presentar estas cifras como recomendaciones generales de salud pública: no crean metas individuales, no diagnostican y no se convierten automáticamente en una rutina personalizada.',
        remember: 'Más que buscar un día perfecto, busca oportunidades frecuentes para moverse.',
        cta: { label: 'Ver recursos y guías', href: '#/cuidadores/recursos' },
        sources: S(['whoPhysicalActivityGuidelines'])
      },
      intensidad: {
        accent: 'blue',
        kicker: 'Actividad física · Intensidad',
        title: '¿QUÉ TAN INTENSA ES UNA ACTIVIDAD?',
        subtitle: 'Distinguir actividades suaves, moderadas y más intensas',
        intro: 'La intensidad describe cuánto esfuerzo implica una actividad. Puede ayudarte a observar cómo se siente el cuerpo; no es una medición médica.',
        sabias: {
          visual: 'MODERADA',
          text: 'El cuerpo trabaja más y aumenta la respiración. Ejemplos generales: caminar rápido, bailar o andar en bicicleta tranquilamente.',
          chips: ['Suave', 'Moderada', 'Vigorosa'],
          close: 'Vigorosa: la respiración y el ritmo cardiaco aumentan más, por ejemplo al correr, jugar activamente o ir en bicicleta rápido.'
        },
        importante: [
          { t: 'ACTIVIDAD MODERADA', d: 'El cuerpo trabaja más y aumenta la respiración. Ejemplos generales: caminar rápido, bailar o andar en bicicleta tranquilamente.' },
          { t: 'ACTIVIDAD VIGOROSA', d: 'La respiración y el ritmo cardiaco aumentan más. Ejemplos: correr, juegos activos o bicicleta rápida.' },
          { t: 'NO ES UNA MEDICIÓN MÉDICA', d: 'La intensidad es una forma sencilla de describir la actividad; no sustituye una valoración médica ni una prueba de esfuerzo.' }
        ],
        remember: 'No todas las actividades necesitan sentirse igual. La variedad también forma parte del movimiento.',
        sources: S(['whoPhysicalActivity'])
      },
      sedentarismo: {
        accent: 'red',
        kicker: 'Actividad física · Sedentarismo',
        title: 'ESTAR SENTADO TAMBIÉN FORMA PARTE DE LA RUTINA',
        subtitle: 'Reconocer y interrumpir periodos largos',
        intro: 'El comportamiento sedentario se refiere a actividades realizadas estando despierto con muy poco gasto de energía, generalmente sentado o reclinado.',
        sabias: {
          visual: 'EQUILIBRIO',
          text: 'El objetivo no es eliminar todo momento sedentario, sino buscar equilibrio con oportunidades de movimiento.',
          chips: ['Sentado', 'Pausas', 'Movimiento']
        },
        importante: [
          { t: 'OBSERVA LOS PERIODOS LARGOS', d: 'Identifica momentos en los que pasan largos periodos sentados.' },
          { t: 'INTERRUMPE CUANDO SEA POSIBLE', d: 'Las recomendaciones de la OMS promueven reducir el tiempo sedentario e interrumpir periodos prolongados.' },
          { t: 'NO TODO TIEMPO SENTADO ES IGUAL', d: 'Leer, estudiar o compartir una actividad tranquila también forman parte de la vida diaria.' }
        ],
        remember: 'No necesitas eliminar las actividades sentadas: busca momentos para levantarse, cambiar de postura y moverse.',
        cta: { label: 'Ver recursos de movimiento', href: '#/cuidadores/recursos' },
        sources: S(['whoPhysicalActivityGuidelines'])
      },
      familia: {
        accent: 'lime',
        kicker: 'Actividad física · Movimiento en familia',
        title: 'EL MOVIMIENTO TAMBIÉN PUEDE COMPARTIRSE',
        subtitle: 'Ideas para incorporar movimiento sin convertirlo en una obligación',
        intro: 'Incorporar movimiento en familia puede empezar por actividades que tengan sentido dentro de la vida cotidiana y que resulten disfrutables.',
        sabias: {
          visual: 'JUNTOS',
          text: 'Moverse en familia puede ser una oportunidad de convivencia, no una obligación.',
          chips: ['Espacio', 'Tiempo', 'Intereses']
        },
        importante: [
          { t: 'ELIGE ALGO POSIBLE', d: 'Tomar en cuenta:', list: ['espacio', 'tiempo', 'edad', 'intereses', 'contexto'] },
          { t: 'PRIORIZA ACTIVIDADES DISFRUTABLES', d: 'No presentar la actividad física como castigo o compensación por haber comido.' },
          { t: 'BUSCA OPORTUNIDADES REALES', d: 'Ejemplos:', list: ['caminar juntos', 'bailar', 'jugar', 'salir al parque', 'hacer una pausa activa', 'desplazarse caminando cuando sea posible'] }
        ],
        remember: 'Moverse en familia puede ser una oportunidad de convivencia, no una obligación.',
        cta: { label: 'Ver ideas para tu día', href: '#/cuidadores/recetas' },
        sources: S(['whoPhysicalActivityGuidelines'])
      }
    },
  };
})();
