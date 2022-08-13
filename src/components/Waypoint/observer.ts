import { ref } from "vue";

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
  oldRect: DOMRectReadOnly
): Direction | undefined => {
  if (rect.top < oldRect.top) return Direction.Up;
  if (rect.left > oldRect.left) return Direction.Right;
  if (rect.top > oldRect.top) return Direction.Down;
  if (rect.left < oldRect.left) return Direction.Left;
};

type Callback = (state: WaypointState) => void;

export const createObserver = (options?: IntersectionObserverInit) => {
  return (callback: Callback) => {
    const boundingClientRect = ref<DOMRectReadOnly>();

    return new window.IntersectionObserver(([entry]) => {
      // this should never happen
      if (typeof entry === "undefined") {
        console.error("[vue-waypoint]", "observed element is undefined");
        return;
      }

      // set the default bounding client
      // this happens only on the first call
      boundingClientRect.value ??= entry.boundingClientRect;

      // create a new state and notify
      callback({
        el: entry.target,
        going: toGoing(entry.isIntersecting),
        direction: toDirection(
          entry.boundingClientRect,
          boundingClientRect.value
        ),
      });

      // save the rect for next matching
      boundingClientRect.value = entry.boundingClientRect;
    }, options);
  };
};
