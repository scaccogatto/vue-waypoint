import { beforeEach, describe, it, expect, vi } from "vitest";
import { shallowMount } from "@vue/test-utils";
import { Waypoint } from "@/components/Waypoint";

beforeEach(() => {
  const noop = () => null;
  const mockIntersectionObserver = vi.fn();
  mockIntersectionObserver.mockReturnValue({ observe: noop, unobserve: noop });
  window.IntersectionObserver = mockIntersectionObserver;
});

describe("Template output", () => {
  it("renders the component with div tag", () => {
    const wrapper = shallowMount(Waypoint);
    expect(wrapper.html()).toMatch(`<div class="waypoint"></div>`);
  });

  it("renders the component with passed tag", () => {
    const wrapper = shallowMount(Waypoint, { props: { tag: "span" } });
    expect(wrapper.html()).toMatch(`<span class="waypoint"></span>`);
  });

  it("renders the component with passed tag", () => {
    const wrapper = shallowMount(Waypoint, { props: { tag: "p" } });
    expect(wrapper.html()).toMatch(`<p class="waypoint"></p>`);
  });
});
