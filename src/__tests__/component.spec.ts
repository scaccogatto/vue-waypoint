import { beforeEach, describe, it, expect } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import { Waypoint } from "@/components/Waypoint";
import { Going, Direction } from "@/components/Waypoint";
import {
  MockIntersectionObserver,
  installMockIntersectionObserver,
  makeEntry,
} from "./intersection-observer.mock";

beforeEach(() => {
  installMockIntersectionObserver();
});

describe("Waypoint rendering", () => {
  it("renders a div with the waypoint class by default", () => {
    const wrapper = mount(Waypoint);
    expect(wrapper.html()).toBe(`<div class="waypoint"></div>`);
  });

  it.each(["span", "p", "section"])("renders the requested tag %s", (tag) => {
    const wrapper = mount(Waypoint, { props: { tag } });
    expect(wrapper.element.tagName.toLowerCase()).toBe(tag);
  });

  it("omits the class attribute when disableCssHelpers is true", () => {
    const wrapper = mount(Waypoint, { props: { disableCssHelpers: true } });
    expect(wrapper.attributes("class")).toBeUndefined();
  });

  it("renders default slot content with the waypoint state", () => {
    const wrapper = mount(Waypoint, {
      slots: { default: "scroll me" },
    });
    expect(wrapper.text()).toBe("scroll me");
  });
});

describe("Waypoint observation lifecycle", () => {
  it("observes the element once mounted and active", async () => {
    const wrapper = mount(Waypoint);
    await flushPromises();
    const observer = MockIntersectionObserver.last!;
    expect(observer.observe).toHaveBeenCalledTimes(1);
    expect(observer.observe).toHaveBeenCalledWith(wrapper.element);
  });

  it("does not observe when mounted inactive", async () => {
    mount(Waypoint, { props: { active: false } });
    await flushPromises();
    expect(MockIntersectionObserver.last!.observe).not.toHaveBeenCalled();
  });

  it("unobserves when toggled inactive and re-observes when active again", async () => {
    const wrapper = mount(Waypoint);
    await flushPromises();
    const observer = MockIntersectionObserver.last!;
    expect(observer.observe).toHaveBeenCalledTimes(1);

    await wrapper.setProps({ active: false });
    expect(observer.unobserve).toHaveBeenCalledTimes(1);
    expect(observer.unobserve).toHaveBeenCalledWith(wrapper.element);

    await wrapper.setProps({ active: true });
    expect(observer.observe).toHaveBeenCalledTimes(2);
  });

  it("disconnects the observer on unmount", async () => {
    const wrapper = mount(Waypoint);
    await flushPromises();
    const observer = MockIntersectionObserver.last!;

    wrapper.unmount();
    expect(observer.disconnect).toHaveBeenCalledTimes(1);
  });

  it("passes custom IntersectionObserver options through", async () => {
    const options: IntersectionObserverInit = {
      rootMargin: "10px",
      threshold: 0.5,
    };
    mount(Waypoint, { props: { options } });
    await flushPromises();
    expect(MockIntersectionObserver.last!.options).toEqual(options);
  });
});

describe("Waypoint change event", () => {
  it("emits change with the computed state on intersection", async () => {
    const wrapper = mount(Waypoint);
    await flushPromises();
    const observer = MockIntersectionObserver.last!;

    observer.trigger([makeEntry({ top: 100, isIntersecting: true })]);
    await flushPromises();
    observer.trigger([makeEntry({ top: 50, isIntersecting: true })]);
    await flushPromises();

    const emitted = wrapper.emitted("change");
    expect(emitted).toHaveLength(2);
    const lastState = emitted!.at(-1)![0] as {
      going: Going;
      direction: Direction;
    };
    expect(lastState.going).toBe(Going.In);
    expect(lastState.direction).toBe(Direction.Up);
  });

  it("reflects state into css helper classes", async () => {
    const wrapper = mount(Waypoint);
    await flushPromises();
    const observer = MockIntersectionObserver.last!;

    observer.trigger([makeEntry({ top: 100, isIntersecting: true })]);
    await flushPromises();
    observer.trigger([makeEntry({ top: 50, isIntersecting: true })]);
    await flushPromises();

    const classes = wrapper.classes();
    expect(classes).toContain("waypoint");
    expect(classes).toContain("going-in");
    expect(classes).toContain("direction-up");
  });

  it("does not emit change when disableCssHelpers and no intersection happened", async () => {
    const wrapper = mount(Waypoint, { props: { disableCssHelpers: true } });
    await flushPromises();
    expect(wrapper.emitted("change")).toBeUndefined();
  });
});
