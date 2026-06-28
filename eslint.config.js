import pluginVue from "eslint-plugin-vue";
import { withVueTs, vueTsConfigs } from "@vue/eslint-config-typescript";
import skipFormatting from "@vue/eslint-config-prettier/skip-formatting";

export default withVueTs(
  {
    name: "vue-waypoint/files-to-lint",
    files: ["**/*.{ts,mts,tsx,vue}"],
  },
  {
    name: "vue-waypoint/files-to-ignore",
    ignores: ["dist/**", "coverage/**"],
  },
  pluginVue.configs["flat/essential"],
  vueTsConfigs.recommended,
  skipFormatting,
);
