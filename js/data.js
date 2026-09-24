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
    }
  };
})();
