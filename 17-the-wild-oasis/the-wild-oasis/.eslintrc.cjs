module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", "node_modules", ".eslintrc.cjs"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    // Warn if non-component exports break Vite HMR
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],

    // Disable prop-types (using TypeScript or other validation)
    "react/prop-types": "off",

    // Optional cleanup
    "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
  },
};
