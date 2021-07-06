import { ref, Ref } from "vue";

export type WaypointState = {
  el: Element | undefined;
  going: Going | undefined;
  direction: Direction | undefined;
};

export enum Going {
  In = "IN",
  Out = "OUT"
}

export enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
}

const toGoing = (isIntersecting: boolean): Going => {
  return isIntersecting ? Going.In : Going.Out;
};

const toDirection = (
  rect: DOMRectReadOnly,
  oldRect: DOMRectReadOnly
): Direction | undefined => {
  if (rect.top < oldRect.top) return Direction.Up;
  if (rect.left > oldRect.left) return Direction.Right;
  if (rect.top > oldRect.top) return Direction.Down;
  if (rect.left < oldRect.left) return Direction.Left;
};

export const createObserver = (
  options: IntersectionObserverInit | undefined
) => (callback: Function) => {
  const boundingClientRect: Ref<DOMRectReadOnly | undefined> = ref(undefined);

  return new window.IntersectionObserver(
    (entries: IntersectionObserverEntry[]) => {
      const entry: IntersectionObserverEntry | undefined = entries[0];

      // this should never happen
      if (typeof entry === "undefined") {
        console.error("[vue-waypoint]", "observed element is undefined");
        return;
      }

      // set the default bounding client
      // this happens only on the first call
      if (typeof boundingClientRect.value === "undefined") {
        boundingClientRect.value = entry.boundingClientRect;
      }

      // create a new state and notify
      const waypointState: WaypointState = {
        el: entry.target,
        going: toGoing(entry.isIntersecting),
        direction: toDirection(
          entry.boundingClientRect,
          boundingClientRect.value
        )
      };
      callback(waypointState);

      // save the rect for next matching
      boundingClientRect.value = entry.boundingClientRect;
    },
    options
  );
};
