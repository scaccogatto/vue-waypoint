import {
  computed,
  getCurrentScope,
  onScopeDispose,
  ref,
  toValue,
  watch,
  type Ref,
} from "vue";
import { createObserver, type WaypointState } from "./observer";

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
  const activatable = computed(() => target.value !== null && isActive.value);

  const state = ref<WaypointState>();
  const updateState = (newState: WaypointState) => (state.value = newState);

  // built lazily: no window/IntersectionObserver access until target+active are both truthy
  const observer = ref<IntersectionObserver | null>();

  const rebuild = () => {
    observer.value?.disconnect();
    observer.value = createObserver(currentOptions.value)(updateState);
    if (target.value) observer.value.observe(target.value);
  };

  const stopHandles = [
    watch(
      activatable,
      () => {
        if (target.value === null) return;
        const el = target.value;

        if (activatable.value) {
          if (!observer.value) rebuild();
          else observer.value.observe(el);
        } else {
          observer.value?.unobserve(el);
        }
      },
      { immediate: true },
    ),
    // rebuild the observer whenever its options change, mirroring the component
    watch(currentOptions, () => observer.value && rebuild(), { deep: true }),
  ];

  const stop = () => {
    stopHandles.forEach((stopWatch) => stopWatch());
    observer.value?.disconnect();
    observer.value = null;
  };

  if (getCurrentScope()) onScopeDispose(stop);

  return { state: state as Readonly<Ref<WaypointState | undefined>>, stop };
};
