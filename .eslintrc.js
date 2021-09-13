module.exports = {
  root: true,

  env: {
    browser : true,
    commonjs: true,
    es6     : true,
    node    : true,
  },

  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:jest/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
  ],

  parser: '@babel/eslint-parser',

  parserOptions: {
    ecmaVersion : 11,
    sourceType  : 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },

  plugins: ['react', 'react-hooks', 'import', 'jest', 'jsx-a11y'],

  rules: {
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components : ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects    : ['invalidHref', 'preferButton'],
      },
    ],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prop-types'            : ['error',
      {
        ignore          : ['pageProps'],
        customValidators: [],
        skipUndeclared  : false,
      },
    ],
    indent       : ['error', 2],
    'key-spacing': [2, { align: 'colon' }],
    'max-len'    : ['error', { code: 100 }],
    quotes       : ['error', 'single'],
    semi         : ['error', 'never'],
  },

  settings: {
    react: {
      version: 'detect',
    },
  },
}
