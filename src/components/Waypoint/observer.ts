export type WaypointState = {
  el: Element | undefined;
  going: Going | undefined;
  direction: Direction | undefined;
};

export enum Going {
  In = "IN",
  Out = "OUT",
}

export enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

const toGoing = (isIntersecting: boolean): Going => {
  return isIntersecting ? Going.In : Going.Out;
};

const toDirection = (
  rect: DOMRectReadOnly,
  oldRect: DOMRectReadOnly,
): Direction | undefined => {
  if (rect.top < oldRect.top) return Direction.Up;
  if (rect.left > oldRect.left) return Direction.Right;
  if (rect.top > oldRect.top) return Direction.Down;
  if (rect.left < oldRect.left) return Direction.Left;
};

type Callback = (state: WaypointState) => void;

export const createObserver = (options?: IntersectionObserverInit) => {
  return (callback: Callback) => {
    let boundingClientRect: DOMRectReadOnly | undefined;

    return new window.IntersectionObserver(([entry]) => {
      // this should never happen
      if (typeof entry === "undefined") {
        console.error("[vue-waypoint]", "observed element is undefined");
        return;
      }

      // set the default bounding client
      // this happens only on the first call
      boundingClientRect ??= entry.boundingClientRect;

      // create a new state and notify
      callback({
        el: entry.target,
        going: toGoing(entry.isIntersecting),
        direction: toDirection(entry.boundingClientRect, boundingClientRect),
      });

      // save the rect for next matching
      boundingClientRect = entry.boundingClientRect;
    }, options);
  };
};

const normalizeThreshold = (
  threshold: IntersectionObserverInit["threshold"],
): number[] => (threshold === undefined ? [0] : [threshold].flat());

/**
 * Copy the options an observer was built with, so later in-place mutations of
 * the caller's object can still be detected as changes.
 */
export const snapshotOptions = (
  options: IntersectionObserverInit,
): IntersectionObserverInit =>
  Array.isArray(options.threshold)
    ? { ...options, threshold: [...options.threshold] }
    : { ...options };

/**
 * Value equality for IntersectionObserver options: `root` by identity,
 * `threshold` normalized to an array, every other key compared with Object.is.
 * Lets an inline options literal survive parent re-renders without rebuilding.
 */
export const sameOptions = (
  a: IntersectionObserverInit,
  b: IntersectionObserverInit,
): boolean => {
  const thresholdA = normalizeThreshold(a.threshold);
  const thresholdB = normalizeThreshold(b.threshold);
  if (
    thresholdA.length !== thresholdB.length ||
    thresholdA.some((value, index) => value !== thresholdB[index])
  )
    return false;

  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  keys.delete("threshold");
  return [...keys].every((key) =>
    Object.is(
      a[key as keyof IntersectionObserverInit],
      b[key as keyof IntersectionObserverInit],
    ),
  );
};
