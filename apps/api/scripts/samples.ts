interface LangType {
  name: string
  nativeName: string
  flag: string
  shinyFlag: string
}

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
