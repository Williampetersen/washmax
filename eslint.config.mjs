import nextVitals from "eslint-config-next/core-web-vitals";

const config = [
  {
    ignores: [
      "legacy/**",
      ".next/**",
      ".astro/**",
      ".vercel/**",
      "dist/**",
      "node_modules/**",
      "CleanWash/**",
    ],
  },
  ...nextVitals,
];

export default config;
