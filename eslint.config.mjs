import nextVitals from "eslint-config-next/core-web-vitals";

const config = [
  {
    ignores: [
      "legacy/**",
      ".next/**",
      ".vercel/**",
      "dist/**",
      "node_modules/**",
    ],
  },
  ...nextVitals,
];

export default config;
