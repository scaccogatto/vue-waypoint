import { beforeEach, describe, it, expect, vi } from "vitest";
import {
  createObserver,
  Going,
  Direction,
} from "@/components/Waypoint/observer";
import type { WaypointState } from "@/components/Waypoint/observer";
import {
  MockIntersectionObserver,
  installMockIntersectionObserver,
  makeEntry,
} from "./intersection-observer.mock";

beforeEach(() => {
  installMockIntersectionObserver();
});

const collect = () => {
  const states: WaypointState[] = [];
  createObserver()((state) => states.push(state));
  return { states, observer: MockIntersectionObserver.last! };
};

describe("createObserver", () => {
  it("forwards the IntersectionObserver options", () => {
    const options: IntersectionObserverInit = { threshold: [0.25, 0.75] };
    createObserver(options);
    // options are passed lazily on first observe registration
    createObserver(options)(() => {});
    expect(MockIntersectionObserver.last!.options).toEqual(options);
  });

  it("maps isIntersecting=true to Going.In and false to Going.Out", () => {
    const { states, observer } = collect();
    observer.trigger([makeEntry({ top: 100, isIntersecting: true })]);
    observer.trigger([makeEntry({ top: 100, isIntersecting: false })]);
    expect(states[0]!.going).toBe(Going.In);
    expect(states[1]!.going).toBe(Going.Out);
  });

  it("reports no direction on the very first callback", () => {
    const { states, observer } = collect();
    observer.trigger([makeEntry({ top: 100, isIntersecting: true })]);
    expect(states[0]!.direction).toBeUndefined();
  });

  it.each([
    ["UP", { top: 100 }, { top: 50 }, Direction.Up],
    ["DOWN", { top: 50 }, { top: 100 }, Direction.Down],
    ["RIGHT", { top: 0, left: 0 }, { top: 0, left: 50 }, Direction.Right],
    ["LEFT", { top: 0, left: 50 }, { top: 0, left: 0 }, Direction.Left],
  ])("detects direction %s", (_label, first, second, expected) => {
    const { states, observer } = collect();
    observer.trigger([makeEntry({ ...first, isIntersecting: true })]);
    observer.trigger([makeEntry({ ...second, isIntersecting: true })]);
    expect(states.at(-1)!.direction).toBe(expected);
  });

  it("exposes the observed element on the state", () => {
    const target = document.createElement("section");
    const { states, observer } = collect();
    observer.trigger([makeEntry({ isIntersecting: true, target })]);
    expect(states[0]!.el).toBe(target);
  });

  it("ignores empty entry batches without throwing", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const { states, observer } = collect();
    observer.trigger([]);
    expect(states).toHaveLength(0);
    expect(errorSpy).toHaveBeenCalledWith(
      "[vue-waypoint]",
      "observed element is undefined",
    );
    errorSpy.mockRestore();
  });
});
