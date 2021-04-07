const { guessProductionMode } = require("@ngneat/tailwind");

module.exports = {
    prefix: '',
    purge: {
      enabled: guessProductionMode(),
      content: [
        './apps/**/*.{html,ts}',
        './libs/**/*.{html,ts}',
      ]
    },
    darkMode: 'class', // or 'media' or 'class'
    theme: {
      extend: {},
    },
    variants: {
      extend: {
        opacity: ['disabled'],
      },
    },
    plugins: [
      require('@tailwindcss/typography'),
    ],
};
