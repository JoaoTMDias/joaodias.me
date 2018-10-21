module.exports = {
  extends: 'airbnb',
  env: {
    browser: true,
    node: true,
    jasmine: true,
  },
  rules: {
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'on',
    'react/require-default-props': 'off',
    'jsx-a11y/href-no-hash': 'off',
    'class-methods-use-this': 'off',
    'import/no-extraneous-dependencies': 'off',
    'jsx-a11y/anchor-is-valid': [
      'warn',
      {
        aspects: ['invalidHref'],
      },
    ],
    'comma-dangle': [1, `always-multiline`],
    'no-console': process.env.NODE_ENV === `production` ? `error` : `off`,
    'no-debugger': process.env.NODE_ENV === `production` ? `error` : `off`,
    'lines-around-comment': [
      `error`,
      {
        beforeBlockComment: true,
        afterBlockComment: false,
        beforeLineComment: true,
        afterLineComment: false,
        allowBlockStart: true,
        allowBlockEnd: true,
        allowObjectStart: true,
        allowObjectEnd: true,
        allowArrayStart: true,
        allowArrayEnd: true,
      },
    ],

    // allow paren-less arrow functions
    'arrow-parens': 0,

    // allow async-await
    'generator-star-spacing': 0,
    quotes: [`error`, `backtick`],
    'prettier/prettier': [`error`],
  },

  plugins: [
    // "html",
    `prettier`,
  ],
};
