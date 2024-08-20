const MYTH_SOURCE_API = {
  BASE_URL: 'https://api.myl.cl',
  PB_EDITIONS: [
    'toolkit_pb_magia_y_divinidad',
    'toolkit_pb_fuerza_y_destino',
    'leyendas_pb_3.0',
    // 'pb_lootbox_2023', // NOT FOUND
    'dracula_pb',
    'shogun_ii',
    'helenica_aniversario',
    //'colecciones_raciales_pb_2023', //  NOT FOUND
    // 'relatos_espada_sagrada_aniversario', //  NOT FOUND
    'espada_sagrada_aniversario',
    'extensiones_pb_2023',
    'toolkit_fe_sin_limite',
    'toolkit_dragon_dorado',
    'primer_bloque_2',
    'shogun_1',
    'raciales_pb',
    'promocionales_primer_bloque',
    'leyendas_primer_bloque',
    'encrucijada',
    'dominios-de-ra',
    'tierras_altas',
    'hijos_de_daana',
    'imperio',
    'helenica',
    'cruzadas',
    'espada-sagrada',
  ],
  CARD_TYPES: [
    {
      id: 1,
      slug: 'aliado',
      name: 'Aliado',
    },
    {
      id: 2,
      slug: 'talisman',
      name: 'Talismán',
    },
    {
      id: 3,
      slug: 'arma',
      name: 'Arma',
    },
    {
      id: 4,
      slug: 'totem',
      name: 'Tótem',
    },
    {
      id: 5,
      slug: 'oro',
      name: 'Oro',
    },
    {
      id: 6,
      slug: 'monumento',
      name: 'Monumento',
    },
  ],
  CARD_RARITIES: [
    {
      id: 0,
      slug: 'promo',
      name: 'Promocional',
    },
    {
      id: 1,
      slug: 'legendaria',
      name: 'Legendaria',
    },
    {
      id: 2,
      slug: 'ultra-real',
      name: 'Ultra Real',
    },
    {
      id: 3,
      slug: 'mega-real',
      name: 'Mega Real',
    },
    {
      id: 4,
      slug: 'real',
      name: 'Real',
    },
    {
      id: 5,
      slug: 'cortesano',
      name: 'Cortesano',
    },
    {
      id: 6,
      slug: 'vasallo',
      name: 'Vasallo',
    },
    {
      id: 7,
      slug: 'oro',
      name: 'Oro',
    },
    {
      id: 8,
      slug: 'milenaria',
      name: 'Milenaria',
    },
    {
      id: 9,
      slug: 'secreta',
      name: 'Secreta',
    },
    {
      id: 10,
      slug: 'ficha',
      name: 'Ficha',
    },
    {
      id: 11,
      slug: 'set_paralelo',
      name: 'Set Paralelo',
    },
  ],
  CARD_RACES: [
    {
      id: 0,
      slug: 'noraza',
      name: 'Sin Raza',
    },
    {
      id: 1,
      slug: 'caballero',
      name: 'Caballero',
    },
    {
      id: 2,
      slug: 'bestia',
      name: 'Bestia',
    },
    {
      id: 3,
      slug: 'eterno',
      name: 'Eterno',
    },
    {
      id: 4,
      slug: 'guerrero',
      name: 'Guerrero',
    },
    {
      id: 5,
      slug: 'barbaro',
      name: 'Bárbaro',
    },
    {
      id: 6,
      slug: 'faerie',
      name: 'Faerie',
    },
    {
      id: 7,
      slug: 'samurai',
      name: 'Samurái',
    },
    {
      id: 8,
      slug: 'sombra',
      name: 'Sombra',
    },
    {
      id: 9,
      slug: 'ancestral',
      name: 'Ancestral',
    },
    {
      id: 10,
      slug: 'sacerdote',
      name: 'Sacerdote',
    },
    {
      id: 11,
      slug: 'dragon',
      name: 'Dragón',
    },
    {
      id: 12,
      slug: 'heroe',
      name: 'Héroe',
    },
    {
      id: 13,
      slug: 'oni',
      name: 'Oni',
    },
    {
      id: 14,
      slug: 'olimpico',
      name: 'Olímpico',
    },
    {
      id: 15,
      slug: 'titan',
      name: 'Titán',
    },
    {
      id: 16,
      slug: 'faraon',
      name: 'Faraón',
    },
    {
      id: 17,
      slug: 'desafiante',
      name: 'Desafiante',
    },
    {
      id: 18,
      slug: 'defensor',
      name: 'Defensor',
    },
    {
      id: 19,
      slug: 'licantropo',
      name: 'Licántropo',
    },
    {
      id: 20,
      slug: 'vampiro',
      name: 'Vampiro',
    },
    {
      id: 21,
      slug: 'cazador',
      name: 'Cazador',
    },
    {
      id: 22,
      slug: 'chaman',
      name: 'Chamán',
    },
    {
      id: 23,
      slug: 'dios',
      name: 'Dios',
    },
    {
      id: 24,
      slug: 'abominacion',
      name: 'Abominación',
    },
    {
      id: 25,
      slug: 'kami',
      name: 'Kami',
    },
    {
      id: 26,
      slug: 'xian',
      name: 'Xian',
    },
    {
      id: 27,
      slug: 'criaturas',
      name: 'Criaturas',
    },
    {
      id: 28,
      slug: 'campeon/shaolin',
      name: 'Campeón / Shaolín',
    },
    {
      id: 29,
      slug: 'campeon/ninja',
      name: 'Campeón / Ninja',
    },
    {
      id: 30,
      slug: 'campeon/samurai',
      name: 'Campeón / Samurái',
    },
    {
      id: 31,
      slug: 'campeon',
      name: 'Campeón',
    },
    {
      id: 32,
      slug: 'heroe/sacerdote',
      name: 'Héroe/Sacerdote',
    },
    {
      id: 33,
      slug: 'eterno/sombra',
      name: 'Eterno/Sombra',
    },
    {
      id: 34,
      slug: 'caballero/guerrero',
      name: 'Caballero/Guerrero',
    },
    {
      id: 35,
      slug: 'bestia/guerrero',
      name: 'Bestia/Guerrero',
    },
    {
      id: 36,
      slug: 'caballero/heroe',
      name: 'Caballero/Héroe',
    },
    {
      id: 37,
      slug: 'dragon/eterno',
      name: 'Dragón/Eterno',
    },
    {
      id: 38,
      slug: 'eterno/faerie',
      name: 'Eterno/Faerie',
    },
    {
      id: 39,
      slug: 'paladin',
      name: 'Paladín',
    },
    {
      id: 40,
      slug: 'asesino',
      name: 'Asesino',
    },
    {
      id: 41,
      slug: 'tenebris',
      name: 'Tenebris',
    },
  ],
  FORMAT_GAMES: [
    {
      id: 1,
      name: 'Formato Libre',
      name_slug: 'formato_libre',
      description:
        'En este formato de juego, podrás elegir cualquier estrategia combinando todas las cartas razas de aliados o soporte de cualquiera de las ediciones y productos de Primer Bloque',
    },
    {
      id: 2,
      name: 'Racial Edición',
      name_slug: 'racial_edicion',
      description:
        'En este formato de juego, deberás elegir una de las razas disponibles en Primer Bloque y complementarla sólo con cartas soporte de su edición original.',
    },
    {
      id: 3,
      name: 'Racial Libre',
      name_slug: 'racial_libre',
      description:
        'En este formato de juego, deberás elegir una de las razas disponibles en Primer Bloque y complementarla con cartas de cualquier edición del Formato.',
    },
  ],
};

module.exports = MYTH_SOURCE_API;
