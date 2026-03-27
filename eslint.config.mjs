import nextVitals from "eslint-config-next/core-web-vitals";
import prettierRecommended from "eslint-plugin-prettier/recommended";

const config = [
  {
    ignores: [".next/**", "node_modules/**", "out/**", "build/**"],
  },
  ...nextVitals,
  {
    ...prettierRecommended,
    rules: {
      ...prettierRecommended.rules,
      "react-hooks/immutability": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },
];

export default config;
