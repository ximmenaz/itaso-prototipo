/* "Decide con lo que tienes": entradas directas.
   Cada entrada abre una ficha reutilizando el sistema visual de nutrition.css. */
(function () {
  window.ITASO_SCENARIOS = [
    {
      id: 'desayuno-rapido',
      accent: 'orange',
      icon: 'plate',
      kicker: 'Decide · Desayuno',
      title: 'Organizar un desayuno rápido',
      subtitle: 'Empezar el día con algo sencillo cuando hay poco tiempo.',
      sabias: { visual: '10 MIN', text: 'Un desayuno sencillo puede resolverse con lo que ya está listo en casa.', close: 'Empezar por lo disponible suele ahorrar más tiempo que buscar la opción perfecta.' },
      importante: [
        { t: 'Empieza por lo que ya está listo', d: 'Si hay algo cocido o listo para servir (fruta, yogur, cereal o frijoles del día anterior), úsalo como punto de partida.' },
        { t: 'Combina sobre la marcha', d: 'Un cereal o tortilla con fruta, y algo de proteína como huevo, yogur o frijol, puede formar un desayuno sencillo.' },
        { t: 'La prisa no es un error', d: 'Cuidar el tiempo disponible también es parte de decidir. Una opción simple y repetible puede funcionar toda la semana.' },
        { t: 'Deja listo lo que puedas', d: 'Si un día tienes más tiempo, lava o corta fruta de más para tenerla a la mano en la mañana.' }
      ],
      remember: 'Un desayuno posible empieza por lo que ya tienes y por el tiempo real que tienes hoy.',
      cta: { label: 'Ver ideas de desayuno', href: '#/cuidadores/recetas' },
      source: window.ITASO_source('imssNutritionAdvice')
    },
    {
      id: 'lunch-para-llevar',
      accent: 'blue',
      icon: 'plate',
      kicker: 'Decide · Lunch',
      title: 'Preparar un lunch para llevar',
      subtitle: 'Opciones que resisten el traslado y se arman con anticipación.',
      sabias: { visual: 'LUNCH', text: 'Lo que viaja bien suele ser firme, seco y fácil de separar.', close: 'Guardar lo húmedo por separado evita que todo se humedezca antes de comer.' },
      importante: [
        { t: 'Elige componentes que viajan bien', d: 'Frijoles, tortillas, pan, fruta firme y verduras resistentes como zanahoria o pepino aguantan mejor el traslado.' },
        { t: 'Separa lo húmedo', d: 'Guarda jitomate, aguacate o aderezos por separado para que no humedezcan el resto hasta el momento de comer.' },
        { t: 'Arma por capas', d: 'Deja lo firme abajo y lo delicado arriba. Un recipiente con compartimentos ayuda, pero no es obligatorio.' },
        { t: 'Repetir no es aburrido', d: 'Si algo funcionó y gustó, puede repetirse variando solo la fruta o la verdura de temporada.' }
      ],
      remember: 'Un buen lunch no es el más elaborado, sino el que se puede armar y llevar sin complicaciones.',
      cta: { label: 'Ir a recetas para llevar', href: '#/cuidadores/recetas' },
      source: window.ITASO_source('unicefSchoolSnacks')
    },
    {
      id: 'poca-despensa',
      accent: 'green',
      icon: 'plate',
      kicker: 'Decide · Despensa',
      title: 'Resolver una comida con poca despensa',
      subtitle: 'Cuando queda poco en casa y la comida sigue siendo necesaria.',
      sabias: { visual: '¿QUÉ HAY?', text: 'Revisar lo que queda antes de comprar evita gastar en algo que ya tenías.', close: 'Con pocos ingredientes todavía se puede combinar una comida.' },
      importante: [
        { t: 'Revisa antes de comprar', d: 'Ver qué hay todavía, aunque parezca poco, evita gastar en algo que ya estaba en casa.' },
        { t: 'Las leguminosas rinden', d: 'Frijoles, lentejas o garbanzos pueden acompañar tortilla, arroz o verdura y dar una comida completa.' },
        { t: 'Combina lo que ya existe', d: 'Un cereal, una verdura y una proteína son una base suficiente; no necesitas productos nuevos para cada comida.' },
        { t: 'El huevo es versátil', d: 'Si cuentas con huevo, se combina con casi cualquier verdura, arroz o tortilla que tengas disponible.' }
      ],
      remember: 'Con pocos ingredientes todavía se puede armar una comida: la clave es combinar lo que sí existe.',
      cta: { label: 'Ver recetas con lo que hay', href: '#/cuidadores/recetas' },
      source: window.ITASO_source('dietaryGuidelines2025')
    },
    {
      id: 'cena-sencilla',
      accent: 'lime',
      icon: 'heart',
      kicker: 'Decide · Cena',
      title: 'Preparar una cena sencilla',
      subtitle: 'Cerrar el día con algo ligero y fácil de hacer.',
      sabias: { visual: 'SENCILLO', text: 'Una cena puede repetir o adaptar lo que ya comiste al mediodía.', close: 'Sencillo no significa incompleto: puede incluir verdura, proteína y tortilla.' },
      importante: [
        { t: 'No tiene que ser distinta', d: 'Lo que ya comiste al mediodía puede repetirse o adaptarse; no hace falta inventar un platillo nuevo cada noche.' },
        { t: 'Ligero no es sin comida', d: 'Una cena sencilla puede incluir verduras, huevo, frijoles, queso o tortilla. Sencillo no significa incompleto.' },
        { t: 'Aprovecha lo del día', d: 'Reutilizar sobras bien conservadas ahorra tiempo y evita desperdicio.' },
        { t: 'Cuida el horario', d: 'Cenar muy tarde puede no sentar bien a todas las personas; ajusta según la rutina de tu familia.' }
      ],
      remember: 'Una cena sencilla puede ser ligera, rápida y hecha con lo que sobró del día.',
      cta: { label: 'Ver ideas de cena', href: '#/cuidadores/recetas' },
      source: window.ITASO_source('imssNutritionAdvice')
    },
    {
      id: 'que-bebida',
      accent: 'blue',
      icon: 'drop',
      kicker: 'Decide · Bebidas',
      title: 'Elegir qué bebida tomar',
      subtitle: 'Decidir entre agua, bebidas preparadas en casa y productos envasados.',
      sabias: { visual: 'AGUA', text: 'El agua simple es la opción más fácil de repetir durante el día.', close: 'Si eliges otra bebida, revisa cuánta azúcar contiene.' },
      importante: [
        { t: 'El agua simple es el punto de partida', d: 'Es una opción cotidiana de hidratación y la más fácil de repetir durante el día.' },
        { t: 'Revisa los azúcares', d: 'Dos bebidas que parecen similares pueden contener cantidades muy distintas. Observa la información del envase.' },
        { t: 'Compara cantidades equivalentes', d: 'Para comparar con claridad, usa la misma cantidad de referencia (por ejemplo, por 100 ml o la misma porción).' },
        { t: 'Preparar en casa da control', d: 'El agua de frutas sin azúcar añadida puede ser una alternativa casera cuando quieres variar el sabor.' }
      ],
      remember: 'Para hidratarte, el agua simple puede ser tu primera opción. Si eliges otra bebida, revisa qué contiene.',
      cta: { label: 'Comparar dos bebidas', href: '#/cuidadores/decide-con-lo-que-tienes' },
      source: window.ITASO_source('dietaryGuidelines2025')
    },
    {
      id: 'comparar-productos',
      accent: 'red',
      icon: 'book',
      kicker: 'Decide · Etiquetas',
      title: 'Comparar dos productos envasados',
      subtitle: 'Usar la etiqueta para observar diferencias antes de decidir.',
      sabias: { visual: 'MISMA CANTIDAD', text: 'Comparar solo tiene sentido cuando miras la misma cantidad de referencia.', close: 'Los sellos dan una señal rápida, pero no deciden por ti.' },
      importante: [
        { t: 'Primero iguala la referencia', d: 'Compara la información por 100 g o 100 ml, o verifica que las porciones que observas sean equivalentes.' },
        { t: 'Los sellos son una señal rápida', d: 'Indican de manera veloz cuándo un producto excede los criterios establecidos para ciertos nutrimentos.' },
        { t: 'Mira más allá del frente', d: 'La cantidad del envase y la lista de ingredientes completan lo que dicen los sellos.' },
        { t: 'La etiqueta no decide por ti', d: 'Ayuda a observar diferencias, pero la decisión depende de tu contexto, gustos y presupuesto.' }
      ],
      remember: 'Antes de comparar dos productos, primero revisa que estés mirando la misma cantidad.',
      cta: { label: 'Comparar paso a paso', href: '#/cuidadores/decide-con-lo-que-tienes' },
      source: window.ITASO_source('nom051')
    },
    {
      id: 'colacion-media',
      accent: 'orange',
      icon: 'apple',
      kicker: 'Decide · Colación',
      title: 'Armar una colación entre comidas',
      subtitle: 'Algo práctico para media mañana o media tarde.',
      sabias: { visual: 'ENTRE COMIDAS', text: 'Una colación no reemplaza una comida: es algo pequeño y suficiente.', close: 'Si combinás fruta o verdura con un lácteo o semillas, rinde más.' },
      importante: [
        { t: 'Pequeña y suficiente', d: 'Una colación no reemplaza una comida; puede ser fruta, verduras o lácteos en una porción sencilla.' },
        { t: 'Combina para que rinda', d: 'Frutas o verduras con un lácteo, semillas o cereal pueden durar más y satisfacer mejor.' },
        { t: 'Que se pueda cargar', d: 'Lo que se lleva y no se ensucia es más fácil de usar en el trabajo o la escuela.' },
        { t: 'No siempre es obligatoria', d: 'Si nadie tiene hambre entre comidas, no es necesario imponer una colación.' }
      ],
      remember: 'Una colación útil es la que se puede llevar y comer con facilidad cuando aparece el hambre.',
      cta: { label: 'Ver ideas de colación', href: '#/cuidadores/recetas' },
      source: window.ITASO_source('unicefSchoolSnacks')
    },
    {
      id: 'sin-refrigeracion',
      accent: 'green',
      icon: 'plate',
      kicker: 'Decide · Para llevar',
      title: 'Comer fuera de casa sin refrigeración',
      subtitle: 'Opciones que se conservan bien durante unas horas.',
      sabias: { visual: 'SIN FRÍO', text: 'Sin refrigeración conviene evitar lácteos, carnes y pescados cocidos.', close: 'Tortillas, pan, frijoles y frutas firmes resisten mejor unas horas.' },
      importante: [
        { t: 'Evita lo que se echa a perder', d: 'Lácteos, carnes o pescados cocidos requieren frío. Si no hay refrigeración, es mejor otra opción.' },
        { t: 'Funcionan los alimentos estables', d: 'Tortillas, pan, frijoles bien cocidos, frutas firmes y verduras resistentes aguantan mejor.' },
        { t: 'Frío es seguridad, no capricho', d: 'Cuando dudes, prioriza alimentos que no dependen de refrigeración para mantenerse seguros.' },
        { t: 'Empaca limpio', d: 'Lava la fruta y la verdura, y usa recipientes limpios para reducir riesgos.' }
      ],
      remember: 'Sin refrigeración, elige alimentos que se conserven bien y evita los que necesitan frío.',
      cta: { label: 'Ver recetas sin refrigeración', href: '#/cuidadores/recetas' },
      source: window.ITASO_source('unicefSchoolSnacks')
    },
    {
      id: 'conversar-comer',
      accent: 'lime',
      icon: 'heart',
      kicker: 'Decide · Acompañar',
      title: 'Conversar sobre cómo come mi familia',
      subtitle: 'Hablar de gustos y señales sin convertirlo en presión.',
      sabias: { visual: 'SIN PRESIÓN', text: 'La persona adulta ofrece; la niña o el niño también decide cuánto comer.', close: 'Evitar premios, castigos y obligar a terminar el plato respeta sus señales.' },
      importante: [
        { t: 'Ofrece y acompaña', d: 'La persona adulta ofrece alimentos; la niña o el niño también expresa cuánto quiere comer de lo que se le ofrece.' },
        { t: 'Evita premios y castigos', d: 'Usar la comida como premio o castigo puede complicar la relación con los alimentos.' },
        { t: 'No obligues a terminar el plato', d: 'Respetar las señales de saciedad ayuda a reconocer el hambre y la cantidad adecuada.' },
        { t: 'Pregunta sin interrogatorio', d: 'Conversar con curiosidad sobre gustos y preferencias funciona mejor que juzgar lo que comió.' }
      ],
      remember: 'Acompañar es ofrecer, conversar y respetar las señales, no obligar a terminar el plato.',
      cta: { label: 'Explorar recursos y guías', href: '#/cuidadores/recursos' },
      source: window.ITASO_source('imssNutritionAdvice')
    },
    {
      id: 'aprovechar-sobras',
      accent: 'yellow',
      icon: 'leaf',
      kicker: 'Decide · Aprovechar',
      title: 'Aprovechar sobras y evitar desperdicio',
      subtitle: 'Transformar lo que quedó en una comida nueva sin complicarte.',
      sabias: { visual: 'SOBRAS', text: 'Un guisado puede volverse relleno, sopa, tostada o mezcla con arroz.', close: 'Aprovechar lo que ya hay también puede reducir lo que compras.' },
      importante: [
        { t: 'Reutiliza con seguridad', d: 'Conserva las sobras refrigeradas y consume solo lo que se mantuvo en buen estado.' },
        { t: 'Reinventa con facilidad', d: 'Un guisado puede volverse relleno, sopa, tostada o mezcla con arroz o pasta.' },
        { t: 'Organiza para no olvidar', d: 'Guardar lo más antiguo al frente ayuda a usarlo antes de que se eche a perder.' },
        { t: 'El desperdicio también es dinero', d: 'Aprovechar lo que ya hay puede reducir lo que se compra cada semana.' }
      ],
      remember: 'Reinventar lo que sobró puede ahorrar dinero y evitar que la comida se desperdicie.',
      cta: { label: 'Ver ideas para aprovechar', href: '#/cuidadores/recetas' },
      source: window.ITASO_source('dietaryGuidelines2025')
    }
  ];
})();
