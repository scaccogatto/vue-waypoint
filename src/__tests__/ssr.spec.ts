// @vitest-environment jsdom

import { describe, it, expect } from "vitest";
import { renderToString } from "@vue/test-utils";
import { Waypoint } from "@/components/Waypoint";

describe("Template SSR output", () => {
  it("renders the component in SSR contexts without erroring out while printing slot", async () => {
    const contents = await renderToString(Waypoint, {
      slots: { default: "Test" },
    });
    expect(contents).toBe('<div class="waypoint">Test</div>');
  });
});
