import { vi } from "vitest";

/**
 * A controllable IntersectionObserver test double.
 *
 * It records every instance, captures the callback the component registers,
 * and exposes `observe`/`unobserve`/`disconnect` as spies so tests can assert
 * lifecycle calls and manually drive intersection callbacks.
 */
export class MockIntersectionObserver implements IntersectionObserver {
  static instances: MockIntersectionObserver[] = [];

  readonly callback: IntersectionObserverCallback;
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = "0px";
  readonly scrollMargin: string = "0px";
  readonly thresholds: ReadonlyArray<number> = [];
  readonly options?: IntersectionObserverInit;

  observe = vi.fn<(target: Element) => void>();
  unobserve = vi.fn<(target: Element) => void>();
  disconnect = vi.fn<() => void>();
  takeRecords = vi.fn<() => IntersectionObserverEntry[]>(() => []);

  constructor(
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit,
  ) {
    this.callback = callback;
    this.options = options;
    MockIntersectionObserver.instances.push(this);
  }

  /** Drive the captured callback with crafted entries. */
  trigger(entries: Partial<IntersectionObserverEntry>[]): void {
    this.callback(entries as IntersectionObserverEntry[], this);
  }

  static get last(): MockIntersectionObserver | undefined {
    return MockIntersectionObserver.instances.at(-1);
  }

  static reset(): void {
    MockIntersectionObserver.instances = [];
  }
}

export const installMockIntersectionObserver = (): void => {
  MockIntersectionObserver.reset();
  vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
};

type RectInput = { top?: number; left?: number };

export const makeEntry = (
  input: RectInput & { isIntersecting: boolean; target?: Element },
): Partial<IntersectionObserverEntry> => {
  const { top = 0, left = 0, isIntersecting, target } = input;
  const rect = {
    top,
    left,
    right: left,
    bottom: top,
    width: 0,
    height: 0,
    x: left,
    y: top,
    toJSON: () => ({}),
  } as DOMRectReadOnly;

  return {
    isIntersecting,
    boundingClientRect: rect,
    target: target ?? document.createElement("div"),
  };
};
