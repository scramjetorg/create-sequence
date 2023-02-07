"use strict"

module.exports = {
  env: {
    es6: true,
    mocha: true,
    node: true
  },
  extends: ["eslint:recommended", "plugin:import/errors"],
  globals: {
    __non_webpack_require__: false
  },
  parser: "eslint-plugin-import/memo-parser",
  parserOptions: {
    ecmaVersion: 9,
    parser: "babel-eslint",
    sourceType: "module"
  },
  plugins: ["import", "node"],
  root: true,
  rules: {
    "arrow-parens": "error",
    "arrow-spacing": "error",
    "brace-style": ["error", "1tbs"],
    "comma-dangle": "error",
    curly: "error",
    "eol-last": "error",
    "import/no-duplicates": "error",
    "import/no-extraneous-dependencies": ["error", { packageDir: "./" }],
    "import/prefer-default-export": "error",
    "keyword-spacing": "error",
    "no-console": ["error", { allow: ["error"] }],
    "no-constant-condition": ["error", { checkLoops: false }],
    "no-empty": ["error", { allowEmptyCatch: true }],
    "no-multiple-empty-lines": ["error", { max: 1 }],
    "no-trailing-spaces": "error",
    "no-undef": "error",
    "no-undefined": "error",
    "no-unused-vars": "error",
    "no-useless-rename": "error",
    "no-var": "error",
    "one-var": ["error", "never"],
    "quote-props": ["error", "as-needed"],
    quotes: ["error", "double", { allowTemplateLiterals: true, avoidEscape: true }],
    "rest-spread-spacing": "error",
    semi: ["error", "never"],
    "sort-keys": ["error", "asc", { caseSensitive: true, natural: true }],
    "sort-vars": "error",
    "space-before-function-paren": ["error", { named: "never" }],
    "space-infix-ops": "error",
    "spaced-comment": ["error", "always", { block: { balanced: true } }],
    strict: "error"
  }
}
