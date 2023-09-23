const config = {
  semi: true,
  tabWidth: 2,
  printWidth: 80,
  singleQuote: true,
  trailingComma: 'none',
  jsxBracketSameLine: true,
  plugins: [require.resolve('prettier-plugin-tailwindcss')]
};

module.exports = config;
