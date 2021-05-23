type LangType = {
  name: string
  nativeName: string
  flag: string
  shinyFlag: string
}

enum TRANS_LANG {
  ENG = 'English',
  CHN = 'Chinese',
  POR = 'Portuguese',
}

export type SentenceTranslation = {
  text: string
  translations: {
    lang: TRANS_LANG
    text: string
  }[]
}

export const GreetingSentences: SentenceTranslation[] = [
  {
    text: 'Buenos días',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'Good morning',
      },
      {
        lang: TRANS_LANG.POR,
        text: 'Bom dia',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '早安',
      },
    ],
  },
  {
    text: 'Buenas tardes',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'Good afternoon',
      },
      {
        lang: TRANS_LANG.POR,
        text: 'Boa tarde',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '午安',
      },
    ],
  },
  {
    text: 'Buenas noches',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'Good evening',
      },
      {
        lang: TRANS_LANG.POR,
        text: 'Boa noite',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '晚安',
      },
    ],
  },
  {
    text: 'De nada',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'Your are welcome',
      },
      {
        lang: TRANS_LANG.POR,
        text: 'De nada',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '別客氣',
      },
    ],
  },
  {
    text: 'Mucho gusto',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'Nice to meet you',
      },
      {
        lang: TRANS_LANG.POR,
        text: 'Prazer em conhecê-lo',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '很高興認識你',
      },
    ],
  },
  {
    text: 'Adiós',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'Good bye',
      },
      {
        lang: TRANS_LANG.POR,
        text: 'TChau',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '再見',
      },
    ],
  },
  {
    text: 'Gracias',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'Thank you',
      },
      {
        lang: TRANS_LANG.POR,
        text: 'Obrigado',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '謝謝',
      },
    ],
  },
  {
    text: 'Muchas gracias',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'Many Thanks',
      },
      {
        lang: TRANS_LANG.POR,
        text: 'Muito Obrigado',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '非常感謝你',
      },
    ],
  },
  {
    text: 'Hasta luego',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'See you later',
      },
      {
        lang: TRANS_LANG.POR,
        text: 'Tchau',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '回頭見',
      },
    ],
  },
  {
    text: 'Hasta mañana',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'See you tomorrow',
      },
      {
        lang: TRANS_LANG.POR,
        text: 'Te vejo amanhã',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '明天見',
      },
    ],
  },
  {
    text: 'Estoy bien',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'I am good',
      },
      {
        lang: TRANS_LANG.POR,
        text: 'Estou bem',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '我很好',
      },
    ],
  },
]

export const GenderSentences: SentenceTranslation[] = [
  {
    text: 'Yo soy una mujer',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'I am a woman',
      },
      {
        lang: TRANS_LANG.POR,
        text: 'Eu sou uma mulher',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '我是一個女人',
      },
    ],
  },
  {
    text: 'Yo soy una niña',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'I am a girl',
      },
      {
        lang: TRANS_LANG.POR,
        text: 'Eu sou uma menina',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '我是一個女孩',
      },
    ],
  },
  {
    text: 'Ella es una mujer',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'She is a woman',
      },
      {
        lang: TRANS_LANG.POR,
        text: 'Ela é uma mulher',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '她是一個女人',
      },
    ],
  },
  {
    text: 'Ella es una niña',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'She is a girl',
      },
      {
        lang: TRANS_LANG.POR,
        text: 'Ela é uma menina',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '她是一個女孩',
      },
    ],
  },
  {
    text: 'Él es un niño',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'He is a boy',
      },
      {
        lang: TRANS_LANG.POR,
        text: 'Ele é um menino',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '他是一個男孩',
      },
    ],
  },
  {
    text: 'Él es un hombre',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'He is a man',
      },
      {
        lang: TRANS_LANG.POR,
        text: 'Ele é um homem',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '他是一個男人',
      },
    ],
  },
]

export const IntroSentences: SentenceTranslation[] = [
  {
    text: '¿Cómo te llamas?',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'What is your name?',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '你叫什麼名字？',
      },
    ],
  },
  {
    text: 'Me llamo Connie / Mi nombre es Connie',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'My name is Connie',
      },
      {
        lang: TRANS_LANG.POR,
        text: 'Meu nome é Connie',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '我叫 Connie',
      },
    ],
  },
  {
    text: '¿Cómo te apellidas?',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'What is your last name??',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '你姓什麼？',
      },
    ],
  },
  {
    text: 'Mi apellidas es Leung',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'My last name is Leung',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '我姓Leung',
      },
    ],
  },
  {
    text: '¿Dónde vives?',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'Where do you live?',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '你住在哪裡？',
      },
    ],
  },
  {
    text: 'Yo vivo en Hong Kong.',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'I live in Hong Kong.',
      },
      {
        lang: TRANS_LANG.POR,
        text: 'Eu vivo em Hong Kong',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '我住在香港',
      },
    ],
  },
  {
    text: '¿A qué te dedicas?',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'What is your job?',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '你做什麼工作？',
      },
    ],
  },
  {
    text: '¿De dónde eres?',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'Where are your from?',
      },
      {
        lang: TRANS_LANG.POR,
        text: 'De onde é?',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '你從哪裡來?',
      },
    ],
  },
  {
    text: 'Soy de Hong Kong',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'I am from Hong Kong',
      },
      {
        lang: TRANS_LANG.POR,
        text: 'Sou de Hong Kong',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '我來自香港',
      },
    ],
  },
  {
    text: '¿Tienes twitter?',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'Do you have twitter?',
      },
      {
        lang: TRANS_LANG.POR,
        text: '¿Você tem Twitter?',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '你有推特嗎？',
      },
    ],
  },
  {
    text: '¿Cual es tu correo electrónico?',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'What is your email?',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '你的電子郵箱是什麼？',
      },
    ],
  },
]

export const ActivitySentences: SentenceTranslation[] = [
  {
    text: 'Yo bebo agua, tu bebes agua, él bebe agua',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'I drink water, you drink water, he drinks water',
      },
      {
        lang: TRANS_LANG.POR,
        text: 'Eu bebo água, você bebe água, ele bebe água',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '我喝水，你喝水，他喝水',
      },
    ],
  },
  {
    text: 'Yo como pan, tu comes pan, él come pan',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'I drink bread, you drink bread, he drinks bread',
      },
      {
        lang: TRANS_LANG.POR,
        text: 'Eu como pão, você come pão, ele come pão',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '我吃麵包，你吃麵包，他吃麵包',
      },
    ],
  },
]

export const DescriptionSentences: SentenceTranslation[] = [
  {
    text: 'El es guapo./ Ella es guapa.',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'He is good looking./ She is pretty.',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '他很帥氣。/ 她很漂亮。',
      },
    ],
  },
  {
    text: 'El es feo./ Ella es fea.',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'He is ugly./ She is ugly.',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '他很醜。/ 她很醜。',
      },
    ],
  },
  {
    text: 'El es bajo./ Ella es baja.',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'He is short./ She is short.',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '他很矮。/ 她很矮。',
      },
    ],
  },
  {
    text: 'El es alto./ Ella es alta.',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'He is tall./ She is tall.',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '他很高。/ 她很高。',
      },
    ],
  },
  {
    text: 'Ella es joven.',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'She is young.',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '她很年輕。',
      },
    ],
  },
  {
    text: 'Ella es mayor.',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'She is old.',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '她年紀大了。',
      },
    ],
  },
  {
    text: 'El es calvo./ Ella es calva.',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'He is bald./ She is bald.',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '他是禿頭。 /她是禿頂頭。',
      },
    ],
  },
  {
    text: 'El es moreno./ Ella es morena.',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'He is dark-haired./ She is dark-haired.',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '他是黑色頭髮。 /她是黑色頭髮。',
      },
    ],
  },
  {
    text: 'El es rubio./ Ella es rubia.',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'He is blond./ She is blond.',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '他是金色頭髮。 /她是金色頭髮。',
      },
    ],
  },
  {
    text: 'El es castaño./ Ella es castaña.',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'He is chestnut-haired./ She is chestnum-haired.',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '他是棕色頭髮。 /她是棕色頭髮。',
      },
    ],
  },
  {
    text: 'El es pelirrojo./ Ella es pelirroja.',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'He is a redhead./ She is a redhead.',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '他是個紅髮。 /她是紅髮。',
      },
    ],
  },
  {
    text: 'Ella tiene el pelo rizado./ Yo tengo el pelo rizado.',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'She has curly hair./ I have curly hair.',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '她有捲曲的頭髮。/我有捲曲的頭髮。',
      },
    ],
  },
  {
    text: 'Ella tiene el pelo ondulado./ Yo tengo el pelo ondulado.',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'She has wavy hair./ I have wavy hair.',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '她有波浪形的頭髮。 /我有波浪形的頭髮。',
      },
    ],
  },
  {
    text: 'Ella tiene el pelo listo./ Yo tengo el pelo listo.',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'She has straight hair./ I have straight hair.',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '她有直頭髮。 /我有直頭髮。',
      },
    ],
  },
  {
    text: 'Ella tiene el pelo corto./ Yo tengo el pelo corto.',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'She has short hair./ I have short hair.',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '她有短頭髮。 /我有短頭髮。',
      },
    ],
  },
  {
    text: 'Ella tiene el pelo largo./ Yo tengo el pelo largo.',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'She has long hair./ I have long hair.',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '她有長頭髮。 /我有長頭髮。',
      },
    ],
  },
  {
    text: 'Ella tiene el pelo canoso./ Yo tengo el pelo canoso.',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'She has gray hair./ I have gray hair.',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '她有灰白色的頭髮。 /我有灰白色的頭髮。',
      },
    ],
  },
  {
    text: 'Ella tiene el pelo teñido./ Yo tengo el pelo teñido.',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'She has dyed hair./ I have dyed hair.',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '她染了頭髮。 /我染了頭髮。',
      },
    ],
  },
  {
    text: 'Ella tiene los ojos negros./ Yo tengo los ojos negros.',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'She has black eyes./ I have black eyes.',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '她有黑眼睛。/我有黑眼睛。',
      },
    ],
  },
  {
    text: 'Ella tiene los ojos verdes./ Yo tengo los ojos verdes.',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'She has green eyes./ I have green eyes.',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '她有綠眼睛。/我有綠眼睛。',
      },
    ],
  },
  {
    text: 'Ella tiene los ojos azules./ Yo tengo los ojos azules.',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'She has blue eyes./ I have blue eyes.',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '她有藍眼睛。/我有藍眼睛。',
      },
    ],
  },
  {
    text: 'Ella tiene los ojos marrones./ Yo tengo los ojos marrones.',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'She has brown eyes./ I have brown eyes.',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '她有棕色眼睛。/我有棕色眼睛。',
      },
    ],
  },
  {
    text: 'Ella tiene la nariz pequeña.',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'She has a small nose.',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '她有小鼻子。',
      },
    ],
  },
  {
    text: 'Ella tiene la nariz grande.',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'She has a big nose.',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '她有大鼻子。',
      },
    ],
  },
  {
    text: 'Yo llevo las gafas.',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'I wear glasses.',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '我戴眼鏡。',
      },
    ],
  },
  {
    text: 'El lleva la barba.',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'He wears the beard',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '他留著鬍子。',
      },
    ],
  },
  {
    text: 'El lleva la perilla.',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'He wears the goatee',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '他留著著山羊鬍子',
      },
    ],
  },
  {
    text: 'El lleva el bigote.',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'He wears the moustache',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '他留著著山羊鬍子',
      },
    ],
  },
  {
    text:
      'Ella es una mujer joven. Ella tienes el pelo rubio, largo y liso, los ojos azules, boca pequeña y nariz pequeña.',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'She is a young woman. She has long, straight, blond hair, blue eyes, a small mouth and a small nose.',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '她是一個年輕女子。她有一頭直直的金色長髮，藍色的眼睛，小嘴巴和小鼻子。',
      },
    ],
  },
  {
    text:
      'Ella es una mujer joven y lleva una gorra blanca con logotipo Angular. Ella tienes el pelo castaño, corto y ondulado, los ojos marrones, boca pequeña y labitos pintados de rojo.',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text:
          'She is a young woman and wears a white cap with Angular logo. She has short, wavy brown hair, brown eyes, a small mouth, and red lipstick.',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '她是一位年輕女子，戴著帶有Angular徽標的白帽子。她有一頭波浪狀短髮，棕色的眼睛，小嘴巴和紅色嘴唇。',
      },
    ],
  },
  {
    text:
      'Yo soy una mujer mayor y llevo lentes. Yo tengo el pelo moreno, corto y liso, los ojos negros, boca grande y nariz grande.',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text:
          'I am an older woman and I wear glasses. I have short, straight black hair, black eyes, a large mouth, and a large nose.',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '我是一個年長的女人。我有一頭黑色的短直髮，黑眼睛，大嘴巴，大鼻子。',
      },
    ],
  },
  {
    text:
      'El es un hombre mayor, lleva lentes y sombrero negro. El tiene el pelo corto, los ojos azules, boca pequeña, labitos pequeños y nariz grande.',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text:
          'He is an older man, wears glasses and a black hat. He has short hair, blue eyes, a small mouth, small lips, and a large nose.',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '他是個大男人，戴著眼鏡，戴著黑帽子。他短髮，藍眼睛，小嘴巴，小嘴唇，大鼻子。',
      },
    ],
  },
]

export const ProfessionSentences: SentenceTranslation[] = [
  {
    text: 'El abogado / La abogada',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The lawyer',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '律師',
      },
    ],
  },
  {
    text: 'El actor / La actriz',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The lawyer',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '律師',
      },
    ],
  },
  {
    text: 'El astronauta / La astronauta',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The astronaut',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '太空人',
      },
    ],
  },
  {
    text: 'El administrativo / La administrativa',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The administrative worker',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '行政人員',
      },
    ],
  },
  {
    text: 'El arquitecto / La arquitecta',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The architect',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '建築師',
      },
    ],
  },
  {
    text: 'El barrendero / La barrendera',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The sweeper',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '打掃工人',
      },
    ],
  },
  {
    text: 'El biólogo / La bióloga',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The biologist',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '生物學家',
      },
    ],
  },
  {
    text: 'El bombero / La bombera',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The fireman',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '消防員',
      },
    ],
  },
  {
    text: 'El cajero / La cajera',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The cashier',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '收銀員',
      },
    ],
  },
  {
    text: 'El camarero / La camarera',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The waiter/ The waitress',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '服務員',
      },
    ],
  },
  {
    text: 'El carnicero / La carnicera',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The butcher',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '屠夫',
      },
    ],
  },
  {
    text: 'El carpintero / La carpintera',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The carpenter',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '木匠',
      },
    ],
  },
  {
    text: 'El cartero / La cartera',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The mailman',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '郵差',
      },
    ],
  },
  {
    text: 'El científico / La científica',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The scientist',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '科學家',
      },
    ],
  },
  {
    text: 'El cocinero / La cocinera',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The chef',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '廚師',
      },
    ],
  },
  {
    text: 'El dentisa / La dentisa',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The dentist',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '牙醫',
      },
    ],
  },
  {
    text: 'El dependiente / La dependienta',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'salesperson',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '售貨員',
      },
    ],
  },
  {
    text: 'El electricista / La electricista',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The electrician',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '電工',
      },
    ],
  },
  {
    text: 'El empresario / La empresaria',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The business owner',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '商人',
      },
    ],
  },
  {
    text: 'El médico / La médica',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The doctor',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '醫生',
      },
    ],
  },
  {
    text: 'El fontanero / La fontanera',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The plumber',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '水管工',
      },
    ],
  },
  {
    text: 'El fotógrafo / La fotógrafa',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The photographer',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '攝影師',
      },
    ],
  },
  {
    text: 'El ingeniero / La ingeniera',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The engineer',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '工程師',
      },
    ],
  },
  {
    text: 'El juez / La jueza',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The judge',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '法官',
      },
    ],
  },
  {
    text: 'El profesor / La profesora',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The professor',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '老師',
      },
    ],
  },
  {
    text: 'El mecánico / La mecánica',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The mechanic',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '修理工',
      },
    ],
  },
  {
    text: 'El panadero / La panadera',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The baker',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '麵包師',
      },
    ],
  },
  {
    text: 'El peluquero / La peluquera',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The hairdresser',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '理髮師',
      },
    ],
  },
  {
    text: 'El periodista / La periodista',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The journalist',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '記者',
      },
    ],
  },
  {
    text: 'El pintor / La pintora',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The artist',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '畫家',
      },
    ],
  },
  {
    text: 'El policía / La policía',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The police',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '警察',
      },
    ],
  },
  {
    text: 'El programador / La programadora',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The programmer',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '程序員',
      },
    ],
  },
]

export const PlacesOfWorkSentences: SentenceTranslation[] = [
  {
    text: 'la escuela / el colegio',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'School',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '學校',
      },
    ],
  },
  {
    text: 'el bar / la cafetería',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'Bar / Café',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '酒吧 / 咖啡店',
      },
    ],
  },
  {
    text: 'el restaurante',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'Restaurant',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '餐廳',
      },
    ],
  },
  {
    text: 'la agencia de viajes',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'Travel agency',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '旅行社',
      },
    ],
  },
  {
    text: 'El centro de estética',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The aesthetic center',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '美學中心',
      },
    ],
  },
  {
    text: 'la autoescuela',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'Driving school',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '駕駛學校',
      },
    ],
  },
  {
    text: 'el ayuntamiento',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'City Hall',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '市政府',
      },
    ],
  },
  {
    text: 'el banco',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'Bank',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '銀行',
      },
    ],
  },
  {
    text: 'la bibliolteca',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'Library',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '圖書館',
      },
    ],
  },
  {
    text: 'el supermercado',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'Supermarket',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '超市',
      },
    ],
  },
  {
    text: 'la carnicería',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'butchery',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '屠房',
      },
    ],
  },
  {
    text: 'la verdulería / la frutería',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'Vegetable shop / Fruit shop',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '蔬菜水果商 / 水果店',
      },
    ],
  },
  {
    text: 'la charcutería',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'processed food shop',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '熟食店',
      },
    ],
  },
  {
    text: 'la pescadería',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'Fish shop',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '魚店',
      },
    ],
  },
  {
    text: 'la panadería',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'the bakery',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '麵包店',
      },
    ],
  },
  {
    text: 'la comisaría de policía',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'the police station',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '警局',
      },
    ],
  },
  {
    text: 'la copistería',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'the copy shop',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '影印店',
      },
    ],
  },
  {
    text: 'el estanco',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'the tabacco shop',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '煙草店',
      },
    ],
  },
  {
    text: 'la oficina de correos',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'post office',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '郵政局',
      },
    ],
  },
  {
    text: 'la peluquería',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'the barber shop',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '理髮店',
      },
    ],
  },
  {
    text: 'la farmacia',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'the pharmacy',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '藥店',
      },
    ],
  },
  {
    text: 'la floristería',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'the florist',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '花店',
      },
    ],
  },
  {
    text: 'la tienda de ropa',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'the clothing store',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '服裝店',
      },
    ],
  },
  {
    text: 'la herboristería',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'the herbal shop',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '藥材店',
      },
    ],
  },
  {
    text: 'el hotel',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'the hotel',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '酒店',
      },
    ],
  },
  {
    text: 'el hospital',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'hospital',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '醫院',
      },
    ],
  },
  {
    text: 'la iglesia',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'the church',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '教會',
      },
    ],
  },
  {
    text: 'la joyería',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'the jewelry shop',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '珠寶店',
      },
    ],
  },
  {
    text: 'la librería',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'the bookstore',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '書店',
      },
    ],
  },
  {
    text: 'la gasolinera',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'the gas station',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '加油站',
      },
    ],
  },
  {
    text: 'La camarera trabaja en un bar',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The waitress works in a bar',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '女服務員在酒吧里工作',
      },
    ],
  },
  {
    text: 'La panadera trabaja en una panadería',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The baker works in a bakery',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '麵包師在麵包店工作',
      },
    ],
  },
  {
    text: 'La policía trabaja en una comisaría',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The police work in a police station',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '警察在警局工作',
      },
    ],
  },
  {
    text: 'La cajera trabaja en un supermercado',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The cashier works in a supermarket',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '收銀員在一家超市工作',
      },
    ],
  },
  {
    text: 'La profesora trabaja en un colegio',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The teacher works in a school',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '老師在學校工作',
      },
    ],
  },
  {
    text: 'La carnicera trabaja en un carnicería',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The butcher works in a butcher shop',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '屠夫在肉店工作',
      },
    ],
  },
  {
    text: 'La médica trabaja en el hospital',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The doctor works in the hospital',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '醫生在醫院工作',
      },
    ],
  },
  {
    text: 'La peluquera trabaja en la peluquería',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The hairdresser works in the barber shop',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '理髮師在理髮店工作',
      },
    ],
  },
  {
    text: 'La cartera trabaja en una oficina de correos',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The postman works in a post office',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '郵差在郵局工作',
      },
    ],
  },
  {
    text: 'La dependienta trabaja en una tienda de ropa',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The staff works in a clothing store',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '店員在一家服裝店工作',
      },
    ],
  },
]

export const PrepositionSentences: SentenceTranslation[] = [
  {
    text: 'El gato está encima de la mesa.',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The cat is on the table.',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '貓在桌子上。',
      },
    ],
  },
  {
    text: 'El gato está sobre la mesa.',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The cat is on the table.',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '貓在桌子上。',
      },
    ],
  },
  {
    text: 'El gato está en la mesa.',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The cat is on the table.',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '貓在桌子上。',
      },
    ],
  },
  {
    text: 'El gato está debajo de la mesa.',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The cat is under the table.',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '貓在桌子底下。',
      },
    ],
  },
  {
    text: 'El gato está entre la mesa y la caja.',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The cat is between the table and the box.',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '貓在桌子和盒子之間。',
      },
    ],
  },
  {
    text: 'El gato está en el medio de la mesa y el flores.',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The cat is in the middle of the table and the flowers.',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '貓在桌子和花中間。',
      },
    ],
  },
  {
    text: 'El gato está a la izquierda de la caja.',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The cat is to the left of the box.',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '貓在盒子的左邊。',
      },
    ],
  },
  {
    text: 'El gato está a la derecha de la caja.',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The cat is to the right of the box.',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '貓在盒子的右邊。',
      },
    ],
  },
  {
    text: 'El gato está a lado de la caja.',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The cat is next to the box.',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '貓在盒子旁邊。',
      },
    ],
  },
  {
    text: 'El gato está dentro de la caja.',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The cat is inside the box.',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '貓在盒子裡面。',
      },
    ],
  },
  {
    text: 'El gato está fuera de la caja.',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The cat is outside of the box.',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '貓在盒子外面。',
      },
    ],
  },
  {
    text: 'El gato está cerca de la caja.',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The cat is near the box.',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '貓在箱子附近。',
      },
    ],
  },
  {
    text: 'El gato está delante de la caja.',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The cat is in front of the box.',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '貓在盒子前面。',
      },
    ],
  },
  {
    text: 'El gato está enfrente de la caja.',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The cat is in front of the box.',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '貓在盒子前面。',
      },
    ],
  },
  {
    text: 'El gato está detrás de la caja.',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The cat is behind the box.',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '貓在盒子後面。',
      },
    ],
  },
  {
    text: 'El gato está lejos de la caja.',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'The cat is far away from the box.',
      },
      {
        lang: TRANS_LANG.CHN,
        text: '貓離盒子很遠。',
      },
    ],
  },
]

export const AvailableLanguages: LangType[] = [
  {
    name: 'English',
    nativeName: 'English',
    flag: 'https://www.countryflags.io/us/flat/64.png',
    shinyFlag: 'https://www.countryflags.io/us/shiny/64.png',
  },
  {
    name: 'Chinese',
    nativeName: '中文',
    flag: 'https://www.countryflags.io/hk/flat/64.png',
    shinyFlag: 'https://www.countryflags.io/hk/shiny/64.png',
  },
  {
    name: 'Spanish',
    nativeName: 'Español',
    flag: 'https://www.countryflags.io/es/flat/64.png',
    shinyFlag: 'https://www.countryflags.io/es/shiny/64.png',
  },
  {
    name: 'Portuguese',
    nativeName: 'Português',
    flag: 'https://www.countryflags.io/br/flat/64.png',
    shinyFlag: 'https://www.countryflags.io/br/shiny/64.png',
  },
  {
    name: 'Vietnamese',
    nativeName: 'Tiếng Việt',
    flag: 'https://www.countryflags.io/vn/flat/64.png',
    shinyFlag: 'https://www.countryflags.io/vn/shiny/64.png',
  },
]
