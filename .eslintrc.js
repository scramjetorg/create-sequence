"use strict"

module.exports = {
  env: {
    es6: true,
    mocha: true,
    node: true
  },
  extends: ["eslint:recommended"],
  globals: {
    __non_webpack_require__: false
  },
  parserOptions: {
    ecmaVersion: 9,
    sourceType: "commonjs"
  },
  plugins: ["node"],
  root: true,
  rules: {
    "arrow-parens": "error",
    "arrow-spacing": "error",
    "brace-style": ["error", "1tbs"],
    "comma-dangle": "error",
    curly: "error",
    "eol-last": "error",
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
    "sort-vars": "error",
    "space-before-function-paren": ["error", { named: "never" }],
    "space-infix-ops": "error",
    "spaced-comment": ["error", "always", { block: { balanced: true } }],
    strict: "error"
  }
}
