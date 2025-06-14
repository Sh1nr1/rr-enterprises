import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
    {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn", // You can use "error" if you prefer it to break the build
        {
          "argsIgnorePattern": "^_", // Ignore unused arguments starting with _
          "varsIgnorePattern": "^_",  // Ignore unused variables starting with _
          "caughtErrorsIgnorePattern": "^_" // Ignore unused catch block variables starting with _
        }],
      // Disable the warning for <img> elements
      "@next/next/no-img-element": "off",
    },
  },
];

export default eslintConfig;
