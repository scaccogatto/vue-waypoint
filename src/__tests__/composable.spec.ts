import { beforeEach, describe, it, expect } from "vitest";
import { effectScope, nextTick, ref } from "vue";
import { useWaypoint } from "@/components/Waypoint/composable";
import { Going, Direction } from "@/components/Waypoint/observer";
import {
  MockIntersectionObserver,
  installMockIntersectionObserver,
  makeEntry,
} from "./intersection-observer.mock";

beforeEach(() => {
  installMockIntersectionObserver();
});

describe("useWaypoint happy path", () => {
  it("observes immediately when the target already has an element", () => {
    const el = document.createElement("div");
    const target = ref<Element | null>(el);

    useWaypoint(target);

    const observer = MockIntersectionObserver.last!;
    expect(observer.observe).toHaveBeenCalledTimes(1);
    expect(observer.observe).toHaveBeenCalledWith(el);
  });

  it("does not build an observer while the target is null", () => {
    const target = ref<Element | null>(null);
    useWaypoint(target);
    expect(MockIntersectionObserver.instances).toHaveLength(0);
  });

  it("builds the observer lazily once the target is assigned", async () => {
    const target = ref<Element | null>(null);
    useWaypoint(target);

    const el = document.createElement("div");
    target.value = el;
    await nextTick();

    const observer = MockIntersectionObserver.last!;
    expect(observer.observe).toHaveBeenCalledWith(el);
  });

  it("updates state and forwards it on intersection", () => {
    const el = document.createElement("div");
    const target = ref<Element | null>(el);
    const { state } = useWaypoint(target);

    const observer = MockIntersectionObserver.last!;
    observer.trigger([makeEntry({ top: 100, isIntersecting: true })]);
    observer.trigger([makeEntry({ top: 50, isIntersecting: true })]);

    expect(state.value?.going).toBe(Going.In);
    expect(state.value?.direction).toBe(Direction.Up);
  });
});

describe("useWaypoint active toggling", () => {
  it("does not observe while inactive from the start", () => {
    const el = document.createElement("div");
    const target = ref<Element | null>(el);
    useWaypoint(target, { active: false });
    expect(MockIntersectionObserver.instances).toHaveLength(0);
  });

  it("unobserves when toggled inactive and re-observes without rebuilding", async () => {
    const el = document.createElement("div");
    const target = ref<Element | null>(el);
    const active = ref(true);
    useWaypoint(target, { active });

    const observer = MockIntersectionObserver.last!;
    expect(observer.observe).toHaveBeenCalledTimes(1);

    active.value = false;
    await nextTick();
    expect(observer.unobserve).toHaveBeenCalledTimes(1);
    expect(observer.unobserve).toHaveBeenCalledWith(el);

    active.value = true;
    await nextTick();
    expect(observer.observe).toHaveBeenCalledTimes(2);
    expect(MockIntersectionObserver.instances).toHaveLength(1);
  });
});

describe("useWaypoint options change", () => {
  it("rebuilds the observer when observerOptions change", async () => {
    const el = document.createElement("div");
    const target = ref<Element | null>(el);
    const observerOptions = ref<IntersectionObserverInit>({
      rootMargin: "10px",
    });
    useWaypoint(target, { observerOptions });

    const oldObserver = MockIntersectionObserver.last!;
    expect(oldObserver.observe).toHaveBeenCalledTimes(1);

    observerOptions.value = { rootMargin: "20px" };
    await nextTick();

    expect(oldObserver.disconnect).toHaveBeenCalledTimes(1);
    const newObserver = MockIntersectionObserver.last!;
    expect(newObserver).not.toBe(oldObserver);
    expect(newObserver.options).toEqual({ rootMargin: "20px" });
    expect(newObserver.observe).toHaveBeenCalledWith(el);
  });

  it("rebuilds without observing when the target went null before options changed", async () => {
    const el = document.createElement("div");
    const target = ref<Element | null>(el);
    const observerOptions = ref<IntersectionObserverInit>({
      rootMargin: "10px",
    });
    useWaypoint(target, { observerOptions });

    target.value = null;
    await nextTick();

    observerOptions.value = { rootMargin: "20px" };
    await nextTick();

    const newObserver = MockIntersectionObserver.last!;
    expect(newObserver.observe).not.toHaveBeenCalled();
  });

  it("does not build an observer when options change before the target is active", async () => {
    const target = ref<Element | null>(null);
    const observerOptions = ref<IntersectionObserverInit>({
      rootMargin: "10px",
    });
    useWaypoint(target, { observerOptions });

    observerOptions.value = { rootMargin: "20px" };
    await nextTick();
    expect(MockIntersectionObserver.instances).toHaveLength(0);
  });
});

describe("useWaypoint disposal", () => {
  it("disconnects the observer when the effect scope is disposed", () => {
    const el = document.createElement("div");
    const target = ref<Element | null>(el);
    const scope = effectScope();

    scope.run(() => useWaypoint(target));
    const observer = MockIntersectionObserver.last!;

    scope.stop();
    expect(observer.disconnect).toHaveBeenCalledTimes(1);
  });

  it("returns a working stop() outside of a component scope", async () => {
    const el = document.createElement("div");
    const target = ref<Element | null>(el);
    const active = ref(true);
    const { stop } = useWaypoint(target, { active });

    const observer = MockIntersectionObserver.last!;
    stop();
    expect(observer.disconnect).toHaveBeenCalledTimes(1);

    // stop() must also tear down the internal watchers, not just disconnect
    active.value = false;
    await nextTick();
    active.value = true;
    await nextTick();
    expect(MockIntersectionObserver.instances).toHaveLength(1);
  });
});
