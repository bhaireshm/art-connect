module.exports = {
  extends: ["mantine", "plugin:@next/next/recommended", "plugin:jest/recommended"],
  plugins: ["testing-library", "jest"],
  overrides: [
    {
      files: ["**/?(*.)+(spec|test).[jt]s?(x)"],
      extends: ["plugin:testing-library/react"],
    },
  ],
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    semi: "warn",
    quotes: ["warn", "double"],
    "react/react-in-jsx-scope": "off",
    "import/extensions": "off",
    "linebreak-style": ["warn", "windows"],
    "@typescript-eslint/quotes": ["error", "double"],
  },
};

