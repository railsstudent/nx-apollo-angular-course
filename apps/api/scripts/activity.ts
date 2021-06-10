import { SentenceTranslation, TRANS_LANG } from "./types";

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
