type LangType = {
    name: string,
    nativeName: string
}

enum TRANS_LANG {
  ENG = 'English',
  CHN = 'Chinese',
  POR = 'Portuguese',
}

export type SentenceTranslation = {
  text: string,
  translations: {
    lang: TRANS_LANG,
    text: string
  }[]
}

export const GreetingSentences: SentenceTranslation[] = [
  { 
    text: 'Buenos días',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'Good morning'
      },
      {
        lang: TRANS_LANG.POR,
        text: 'Bom dia'
      },
      {
        lang: TRANS_LANG.CHN,
        text: '早安'
      }
    ]
  }
  , { 
    text: 'Buenas tardes',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'Good afternoon'
      },
      {
        lang: TRANS_LANG.POR,
        text: 'Boa tarde'
      },
      {
        lang: TRANS_LANG.CHN,
        text: '午安'
      }
    ]
  },
  { 
    text: 'Buenas noches',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'Good evening'
      },
      {
        lang: TRANS_LANG.POR,
        text: 'Boa noite'
      },
      {
        lang: TRANS_LANG.CHN,
        text: '晚安'
      }
    ]
  },
  { 
    text: 'De nada',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'Your are welcome'
      },
      {
        lang: TRANS_LANG.POR,
        text: 'De nada'
      },
      {
        lang: TRANS_LANG.CHN,
        text: '別客氣'
      }
    ]
  },
  { 
    text: 'Mucho gusto',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'Nice to meet you'
      },
      {
        lang: TRANS_LANG.POR,
        text: 'Prazer em conhecê-lo'
      },
      {
        lang: TRANS_LANG.CHN,
        text: '很高興認識你'
      }
    ]
  },
  { 
    text: 'Adiós',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'Good bye'
      },
      {
        lang: TRANS_LANG.POR,
        text: 'TChau'
      },
      {
        lang: TRANS_LANG.CHN,
        text: '再見'
      }
    ]
  },
  { 
    text: 'Gracias',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'Thank you'
      },
      {
        lang: TRANS_LANG.POR,
        text: 'Obrigado'
      },
      {
        lang: TRANS_LANG.CHN,
        text: '謝謝'
      }
    ]
  },
  { 
    text: 'Muchas gracias',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'Many Thanks'
      },
      {
        lang: TRANS_LANG.POR,
        text: 'Muito Obrigado'
      },
      {
        lang: TRANS_LANG.CHN,
        text: '非常感謝你'
      }
    ]
  },
  { 
    text: 'Hasta luego',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'See you later'
      },
      {
        lang: TRANS_LANG.POR,
        text: 'Tchau'
      },
      {
        lang: TRANS_LANG.CHN,
        text: '回頭見'
      }
    ]
  },
  { 
    text: 'Hasta mañana',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'See you tomorrow'
      },
      {
        lang: TRANS_LANG.POR,
        text: 'Te vejo amanhã'
      },
      {
        lang: TRANS_LANG.CHN,
        text: '明天見'
      }
    ]
  },
  { 
    text: 'Estoy bien',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'I am good'
      },
      {
        lang: TRANS_LANG.POR,
        text: 'Estou bem'
      },
      {
        lang: TRANS_LANG.CHN,
        text: '我很好'
      }
    ]
  }
]

export const GenderSentences = [
  { 
    text: 'Yo soy una mujer',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'I am a woman'
      },
      {
        lang: TRANS_LANG.POR,
        text: 'Eu sou uma mulher'
      },
      {
        lang: TRANS_LANG.CHN,
        text: '我是一個女人'
      }
    ]
  },
  { 
    text: 'Yo soy una niña',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'I am a girl'
      },
      {
        lang: TRANS_LANG.POR,
        text: 'Eu sou uma menina'
      },
      {
        lang: TRANS_LANG.CHN,
        text: '我是一個女孩'
      }
    ]
  },
  { 
    text: 'Ella es una mujer',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'She is a woman'
      },
      {
        lang: TRANS_LANG.POR,
        text: 'Ela é uma mulher'
      },
      {
        lang: TRANS_LANG.CHN,
        text: '她是一個女人'
      }
    ]
  },
  { 
    text: 'Ella es una niña',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'She is a girl'
      },
      {
        lang: TRANS_LANG.POR,
        text: 'Ela é uma menina'
      },
      {
        lang: TRANS_LANG.CHN,
        text: '她是一個女孩'
      }
    ]
  },
  { 
    text: 'Él es un niño',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'He is a boy'
      },
      {
        lang: TRANS_LANG.POR,
        text: 'Ele é um menino'
      },
      {
        lang: TRANS_LANG.CHN,
        text: '他是一個男孩'
      }
    ]
  },
  { 
    text: 'Él es un hombre',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'He is a man'
      },
      {
        lang: TRANS_LANG.POR,
        text: 'Ele é um homem'
      },
      {
        lang: TRANS_LANG.CHN,
        text: '他是一個男人'
      }
    ]
  },
]

export const IntroSentences = [
    { 
      text: '¿Cómo te llamas?',
      translations: [
        {
          lang: TRANS_LANG.ENG,
          text: 'What is your name?'
        },
        {
          lang: TRANS_LANG.CHN,
          text: '你叫什麼名字？'
        }
      ]
    },
    { 
      text: 'Me llamo Connie / Mi nombre es Connie',
      translations: [
        {
          lang: TRANS_LANG.ENG,
          text: 'My name is Connie'
        },
        {
          lang: TRANS_LANG.POR,
          text: 'Meu nome é Connie'
        },
        {
          lang: TRANS_LANG.CHN,
          text: '我叫 Connie'
        }
      ]
    },
    { 
        text: '¿Cómo te apellidas?',
        translations: [
          {
            lang: TRANS_LANG.ENG,
            text: 'What is your last name??'
          },
          {
            lang: TRANS_LANG.CHN,
            text: '你姓什麼？'
          }
        ]
    },
    { 
        text: 'Mi apellidas es Leung',
        translations: [
          {
            lang: TRANS_LANG.ENG,
            text: 'My last name is Leung'
          },
          {
            lang: TRANS_LANG.CHN,
            text: '我姓Leung'
          }
        ]
    },
    { 
      text: '¿Dónde vives?',
      translations: [
        {
          lang: TRANS_LANG.ENG,
          text: 'Where do you live?'
        },
        {
          lang: TRANS_LANG.CHN,
          text: '你住在哪裡？'
        }
      ]
    },
    { 
      text: 'Yo vivo en Hong Kong.',
      translations: [
        {
          lang: TRANS_LANG.ENG,
          text: 'I live in Hong Kong.'
        },
        {
          lang: TRANS_LANG.POR,
          text: 'Eu vivo em Hong Kong'
        },
        {
          lang: TRANS_LANG.CHN,
          text: '我住在香港'
        }
      ]
    },
    { 
      text: '¿A qué te dedicas?',
      translations: [
        {
          lang: TRANS_LANG.ENG,
          text: 'What is your job?'
        },
        {
          lang: TRANS_LANG.CHN,
          text: '你做什麼工作？'
        }
      ]
    },
    { 
      text: '¿De dónde eres?',
      translations: [
        {
          lang: TRANS_LANG.ENG,
          text: 'Where are your from?'
        },
        {
          lang: TRANS_LANG.POR,
          text: 'De onde é?'
        },
        {
          lang: TRANS_LANG.CHN,
          text: '你從哪裡來?'
        }
      ]
    },
    { 
        text: 'Soy de Hong Kong',
        translations: [
          {
            lang: TRANS_LANG.ENG,
            text: 'I am from Hong Kong'
          },
          {
            lang: TRANS_LANG.POR,
            text: 'Sou de Hong Kong'
          },
          {
            lang: TRANS_LANG.CHN,
            text: '我來自香港'
          }
        ]
    },
    { 
        text: '¿Tienes twitter?',
        translations: [
          {
            lang: TRANS_LANG.ENG,
            text: 'Do you have twitter?'
          },
          {
            lang: TRANS_LANG.POR,
            text: '¿Você tem Twitter?'
          },
          {
            lang: TRANS_LANG.CHN,
            text: '你有推特嗎？'
          }
        ]
    },
    { 
        text: '¿Cual es tu correo electrónico?',
        translations: [
          {
            lang: TRANS_LANG.ENG,
            text: 'What is your email?'
          },
          {
            lang: TRANS_LANG.CHN,
            text: '你的電子郵箱是什麼？'
          }
        ]
    }
]

export const ActivitySentences = [
    { 
      text: 'Yo bebo agua, tu bebes agua, él bebe agua',
      translations: [
        {
          lang: TRANS_LANG.ENG,
          text: 'I drink water, you drink water, he drinks water'
        },
        {
            lang: TRANS_LANG.POR,
            text: 'Eu bebo água, você bebe água, ele bebe água'
          },
        {
          lang: TRANS_LANG.CHN,
          text: '我喝水，你喝水，他喝水'
        }
      ]
    },
    { 
        text: 'Yo como pan, tu comes pan, él come pan',
        translations: [
          {
            lang: TRANS_LANG.ENG,
            text: 'I drink bread, you drink bread, he drinks bread'
          },
          {
              lang: TRANS_LANG.POR,
              text: 'Eu como pão, você come pão, ele come pão'
            },
          {
            lang: TRANS_LANG.CHN,
            text: '我吃麵包，你吃麵包，他吃麵包'
          }
        ]
      },
]

export const DescriptionSentences = [
  { 
    text: 'Ella es una mujer joven. Ella tienes el pelo rubio, largo y liso, los ojos azules, boca pequeña y nariz pequeña.',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'She is a young woman. She has long, straight, blond hair, blue eyes, a small mouth and a small nose.'
      },
      {
        lang: TRANS_LANG.CHN,
        text: '她是一個年輕女子。她有一頭直直的金色長髮，藍色的眼睛，小嘴巴和小鼻子。'
      }
    ]
  },
  { 
    text: 'Ella es una mujer joven y lleva una gorra blanca con logotipo Angular. Ella tienes el pelo castaño, corto y ondulado, los ojos marrones, boca pequeña y labitos pintados de rojo.',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'She is a young woman and wears a white cap with Angular logo. She has short, wavy brown hair, brown eyes, a small mouth, and red lipstick.'
      },
      {
        lang: TRANS_LANG.CHN,
        text: '她是一位年輕女子，戴著帶有Angular徽標的白帽子。她有一頭波浪狀短髮，棕色的眼睛，小嘴巴和紅色嘴唇。'
      }
    ]
  },
  { 
    text: 'Yo soy una mujer mayor y llevo lentes. Yo tengo el pelo moreno, corto y liso, los ojos negros, boca grande y nariz grande.',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'I am an older woman and I wear glasses. I have short, straight black hair, black eyes, a large mouth, and a large nose.'
      },
      {
        lang: TRANS_LANG.CHN,
        text: '我是一個年長的女人。我有一頭黑色的短直髮，黑眼睛，大嘴巴，大鼻子。'
      }
    ]
  },
  { 
    text: 'El es un hombre mayor, lleva lentes y sombrero negro. El tiene el pelo corto, los ojos azules, boca pequeña, labitos pequeños y nariz grande.',
    translations: [
      {
        lang: TRANS_LANG.ENG,
        text: 'He is an older man, wears glasses and a black hat. He has short hair, blue eyes, a small mouth, small lips, and a large nose.'
      },
      {
        lang: TRANS_LANG.CHN,
        text: '他是個大男人，戴著眼鏡，戴著黑帽子。他短髮，藍眼睛，小嘴巴，小嘴唇，大鼻子。'
      }
    ]
  },
]

export const AvailableLanguages: LangType[] = [
    {
        name: 'English',
        nativeName: 'English'
    },
    {
        name: 'Chinese',
        nativeName: '中文'
    },
    {
        name: 'Spanish',
        nativeName: 'Español'
    },
    {
        name: 'Portuguese',
        nativeName: 'Português'
    },
    {
        name: 'Vietnamese',
        nativeName: 'Tiếng Việt'
    }
  ]
