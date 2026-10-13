import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { defineConfig, mergeConfig } from "vite";
import dts from "vite-plugin-dts";
import baseConfig from "./vite.config";

// Node16/NodeNext type resolution needs explicit extensions on relative
// specifiers: `.js` inside the ESM declarations, `.cjs` inside the CJS copies
// (which then resolve to the sibling `.d.cts` files).
const relativeSpecifier =
  /(\bfrom\s*|\bimport\s*\(\s*)(["'])(\.{1,2}\/[^"']+?)(?:\.js)?\2/g;
const withExtension = (content: string, extension: ".js" | ".cjs") =>
  content.replace(
    relativeSpecifier,
    (_match, lead: string, quote: string, specifier: string) =>
      `${lead}${quote}${specifier}${extension}${quote}`,
  );

const libConfig = defineConfig({
  plugins: [
    dts({
      tsconfigPath: resolve(__dirname, "tsconfig.lib.json"),
      insertTypesEntry: true,
      cleanVueFileName: true,
      beforeWriteFile: (filePath, content) => ({
        filePath,
        content: withExtension(content, ".js"),
      }),
      // emit a `.d.cts` twin of every declaration so `require` consumers get
      // CommonJS-flavoured types instead of ESM ones ("masquerading as ESM")
      afterBuild: async (emittedFiles) => {
        await Promise.all(
          [...emittedFiles]
            .filter(([filePath]) => filePath.endsWith(".d.ts"))
            .map(([filePath, content]) =>
              writeFile(
                filePath.replace(/\.d\.ts$/, ".d.cts"),
                withExtension(content, ".cjs"),
              ),
            ),
        );
      },
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/components/Waypoint/index.ts"),
      fileName: "vue-waypoint",
      formats: ["es", "cjs"],
    },
    rolldownOptions: {
      external: ["vue"],
    },
  },
});

export default mergeConfig(baseConfig, libConfig);
