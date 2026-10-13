import {
  computed,
  getCurrentScope,
  onScopeDispose,
  ref,
  toValue,
  watch,
  type Ref,
} from "vue";
import {
  createObserver,
  sameOptions,
  snapshotOptions,
  type WaypointState,
} from "./observer";

export type UseWaypointOptions = {
  active?: Ref<boolean> | boolean;
  observerOptions?: Ref<IntersectionObserverInit> | IntersectionObserverInit;
};

export type UseWaypointReturn = {
  state: Readonly<Ref<WaypointState | undefined>>;
  stop: () => void;
};

export const useWaypoint = (
  target: Ref<Element | null>,
  { active = true, observerOptions = {} }: UseWaypointOptions = {},
): UseWaypointReturn => {
  const isActive = computed(() => toValue(active));
  const currentOptions = computed(() => toValue(observerOptions));

  const state = ref<WaypointState>();
  const updateState = (newState: WaypointState) => (state.value = newState);

  // built lazily: no window/IntersectionObserver access until target+active are both truthy.
  // Plain locals, not refs: nothing renders from them.
  let observer: IntersectionObserver | null = null;
  let appliedOptions: IntersectionObserverInit = {};
  let observed: Element | null = null;

  const build = (): IntersectionObserver => {
    appliedOptions = snapshotOptions(currentOptions.value);
    return createObserver(currentOptions.value)(updateState);
  };

  // observe exactly the element that should be observed right now, moving
  // observation when the target is swapped and releasing it when it goes null
  const sync = (el: Element | null, on: boolean) => {
    const wanted = on ? el : null;
    if (observed === wanted) return;
    if (observed) observer?.unobserve(observed);
    observed = wanted;
    if (wanted) (observer ??= build()).observe(wanted);
  };

  const stopHandles = [
    watch([target, isActive], ([el, on]) => sync(el, on), { immediate: true }),
    // rebuild the observer only when the options actually differ, mirroring the component
    watch(
      currentOptions,
      (options) => {
        if (!observer || sameOptions(appliedOptions, options)) return;
        observer.disconnect();
        observer = build();
        if (observed) observer.observe(observed);
      },
      { deep: true },
    ),
  ];

  const stop = () => {
    stopHandles.forEach((stopWatch) => stopWatch());
    observer?.disconnect();
    observer = null;
    observed = null;
  };

  if (getCurrentScope()) onScopeDispose(stop);

  return { state: state as Readonly<Ref<WaypointState | undefined>>, stop };
};
