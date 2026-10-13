import { fileURLToPath } from "node:url";
import { mergeConfig, defineConfig, configDefaults } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      root: fileURLToPath(new URL("./", import.meta.url)),
      coverage: {
        // test doubles/fixtures aren't production code; only measure src proper
        exclude: [...configDefaults.coverage.exclude!, "src/__tests__/**"],
      },
    },
  }),
);
