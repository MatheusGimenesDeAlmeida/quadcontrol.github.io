import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(() => {
  const requestedBase = process.env.VITE_BASE_PATH ?? "/";
  const withLeadingSlash = requestedBase.startsWith("/")
    ? requestedBase
    : `/${requestedBase}`;
  const normalizedBase = withLeadingSlash.endsWith("/")
    ? withLeadingSlash
    : `${withLeadingSlash}/`;

  return {
    base: normalizedBase,
    build: {
      outDir: "dist",
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});