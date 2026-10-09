/* Guía única de "Recursos y guías": Claridad para entender.
   No es una biblioteca de archivos: una sola guía que se explica, se
   comparte en familia y se puede llevar. Fuentes tomadas de Alimentación. */
(function () {
  window.ITASO_GUIDE = {
    id: 'claridad-para-entender',
    accent: 'orange',

    page: {
      title: 'Claridad para llevar contigo',
      lead: 'Una guía sencilla para comprender, conversar y tomar decisiones cotidianas sobre alimentación y movimiento en familia.'
    },

    card: {
      name: 'Claridad para entender',
      text: 'Una guía para acompañar a tu familia en decisiones cotidianas sobre alimentación y movimiento.',
      micro: 'Entiende los conceptos principales de ITASO, encuentra una forma sencilla de explicárselos a niñas y niños y llévatelos contigo para consultarlos cuando los necesites.',
      cta: 'Conocer la guía'
    },

    kicker: 'Recursos y guías',
    title: 'Claridad para entender',
    subtitle: 'Una guía para hablar, comprender y decidir en familia.',
    intro: 'No necesitas saberlo todo sobre nutrición o actividad física. Esta guía reúne ideas clave de ITASO en un lenguaje cotidiano para que puedas entenderlas, explicarlas en familia y utilizarlas en situaciones reales.',

    how: {
      label: '¿Cómo funciona?',
      hero: '3 pasos',
      chips: ['Entiendo', 'Se lo cuento', 'Lo hacemos juntos'],
      items: [
        { label: 'Entiendo', text: 'Primero te explicamos cada tema con palabras sencillas.' },
        { label: 'Se lo cuento', text: 'Te damos una forma cercana de hablarlo con niñas y niños.' },
        { label: 'Lo hacemos juntos', text: 'Incluimos una pequeña pregunta o actividad para llevar la idea a la vida cotidiana.' }
      ]
    },

    contentsTitle: 'Contenidos de la guía',

    sections: [
      {
        n: '01',
        title: 'EMPEZAR DESDE TU REALIDAD',
        desc: 'Tiempo, presupuesto y disponibilidad cambian todos los días. Empezamos por reconocer lo que hoy sí es posible.',
        say: '“Hoy vamos a ver qué tenemos y qué podemos hacer con eso.”',
        together: 'Pregúntense “¿Qué tenemos hoy?”'
      },
      {
        n: '02',
        title: 'UNA COMIDA POSIBLE',
        desc: 'En lugar de buscar una comida perfecta, observa qué alimentos ya están presentes y qué podrías complementar.',
        say: '“Vamos a ver qué cosas diferentes podemos juntar.”',
        together: 'Reconozcan juntos los alimentos que ya hay disponibles.'
      },
      {
        n: '03',
        title: 'CONOCER LOS GRUPOS DE ALIMENTOS',
        desc: 'Los distintos grupos aportan cosas diferentes. La variedad ayuda a combinar alimentos sin convertir la comida en una lista rígida.',
        say: '“Los alimentos hacen trabajos diferentes en nuestro cuerpo.”',
        together: 'Elijan tres alimentos y observen si pertenecen al mismo grupo o a grupos diferentes.'
      },
      {
        n: '04',
        title: 'PORCIONES Y CANTIDADES',
        desc: 'Las porciones sirven como una referencia para comprender cantidades; no significan que todas las personas tengan que comer exactamente lo mismo.',
        say: '“A veces necesitamos poquito y otras veces un poco más.”',
        together: 'Busquen juntos dónde aparece la porción en un envase.'
      },
      {
        n: '05',
        title: 'LEER ETIQUETAS Y COMPARAR',
        desc: 'Las etiquetas ofrecen información que puede ayudarnos a observar diferencias entre productos.',
        say: '“La etiqueta es como la tarjeta de información del alimento.”',
        together: 'Busquen cantidad, sellos e ingredientes.'
      },
      {
        n: '06',
        title: 'BEBIDAS E HIDRATACIÓN',
        desc: 'El agua simple puede ser el punto de partida para la hidratación cotidiana. Las etiquetas ayudan a comprender mejor otras bebidas.',
        say: '“Cuando tenemos sed, podemos empezar por agua.”',
        together: 'Comparen dos bebidas y encuentren una diferencia.'
      },
      {
        n: '07',
        title: 'COLACIONES Y LUNCHES',
        desc: 'Pueden adaptarse al tiempo, traslado, disponibilidad y preferencias de cada familia.',
        say: '“Vamos a elegir algo que podamos llevar y que también te guste.”',
        together: 'Elijan entre dos opciones disponibles.'
      },
      {
        n: '08',
        title: 'HAMBRE Y SACIEDAD',
        desc: 'Reconocer sensaciones también forma parte de aprender a comer.',
        say: '“Tu cuerpo puede avisarte cuándo tienes hambre y cuándo ya estás satisfecho.”',
        together: 'Pregunta: “¿Todavía tienes hambre o ya te sientes satisfecho?”'
      },
      {
        n: '09',
        title: 'MOVIMIENTO',
        desc: 'Moverse no significa solamente hacer ejercicio. Jugar, caminar y bailar también son formas de movimiento.',
        say: '“Mover nuestro cuerpo también puede ser jugar.”',
        together: 'Elijan una canción y muévanse juntos.'
      },
      {
        n: '10',
        title: 'DECIDIR CON LO QUE TIENES',
        desc: 'Una decisión cambia según tiempo, presupuesto, disponibilidad y preferencias.',
        say: '“Hoy tenemos estas opciones. ¿Cuál nos funciona mejor?”',
        together: 'Elijan entre dos posibilidades y expliquen por qué.'
      },
      {
        n: '11',
        title: 'DÍAS COMPLICADOS',
        desc: 'Hay días donde resolver algo posible importa más que seguir el plan original.',
        say: '“Hoy es un día diferente. Vamos a encontrar algo que nos funcione.”',
        together: 'Elijan qué importa más hoy: tiempo, facilidad, disponibilidad o llevar algo fuera de casa.'
      }
    ],

    final: {
      title: 'Llévate la guía contigo',
      text: 'Consulta estas ideas fuera de la página, compártelas en familia o vuelve a ellas cuando necesites resolver una situación cotidiana.',
      ctaLabel: 'DESCARGAR “CLARIDAD PARA ENTENDER” ↓',
      pendingLabel: 'PDF próximamente',
      pdf: null,
      meta: 'PDF · para celular e impresión',
      sourcesLink: 'Ver fuentes utilizadas'
    },

    sources: (window.ITASO_sources ? window.ITASO_sources([
      'nom051',
      'platoBienComer',
      'imssNutrition',
      'dietaryGuidelines2025',
      'foodLabeling',
      'whoHealthyDiet',
      'healthyChildrenEatingEnough',
      'cdcHungerFullness'
    ]) : [])
  };
})();
