import { ComponentInternalInstance, Ref } from "vue";

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

export const toDirection = (
  rect: DOMRectReadOnly,
  oldRect: DOMRectReadOnly
): Direction | undefined => {
  if (rect.top < oldRect.top) return Direction.Up;
  if (rect.left > oldRect.left) return Direction.Right;
  if (rect.top > oldRect.top) return Direction.Down;
  if (rect.left < oldRect.left) return Direction.Left;
};

export const createObserver = (instance: ComponentInternalInstance) => (
  callback: Function,
  options: IntersectionObserverInit | undefined
) => (
  boundingClientRect: Ref<DOMRectReadOnly | undefined>,
  going: Ref<Going | undefined>,
  direction: Ref<Direction | undefined>
) => {
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

      going.value = entry.isIntersecting ? Going.In : Going.Out;
      direction.value = toDirection(
        entry.boundingClientRect,
        boundingClientRect.value
      );

      // save the rect for next matching
      boundingClientRect.value = entry.boundingClientRect;

      // userland callback
      callback(going, direction, instance);
    },
    options
  );
};
