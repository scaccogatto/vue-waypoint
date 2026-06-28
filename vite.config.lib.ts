import { resolve } from "node:path";
import { defineConfig, mergeConfig } from "vite";
import dts from "vite-plugin-dts";
import baseConfig from "./vite.config";

const libConfig = defineConfig({
  plugins: [
    dts({
      tsconfigPath: resolve(__dirname, "tsconfig.lib.json"),
      insertTypesEntry: true,
      cleanVueFileName: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/components/Waypoint/index.ts"),
      name: "VueWaypoint",
      fileName: "vue-waypoint",
      formats: ["es", "umd"],
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});

export default mergeConfig(baseConfig, libConfig);
