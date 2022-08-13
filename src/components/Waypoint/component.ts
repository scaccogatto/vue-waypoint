import {
  computed,
  defineComponent,
  h,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  type PropType,
} from "vue";
import { createObserver, type WaypointState } from "./observer";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Waypoint",
  props: {
    active: {
      type: Boolean,
      default: () => true,
    },
    options: {
      type: Object as PropType<IntersectionObserverInit>,
      default: () => ({}),
    },
    tag: {
      type: String,
      default: () => "div",
    },
    disableCssHelpers: {
      type: Boolean,
      default: () => false,
    },
  },
  setup(props, context) {
    // check for browser compatibility
    const compatible: boolean =
      typeof window.IntersectionObserver === "function";

    // watch for mount
    const mounted = ref<boolean>(false);

    // element DOM reference
    const element = ref<Element | null>(null);

    // activable conditions
    const activable = computed<boolean>(
      () =>
        compatible && mounted.value && props.active && element.value !== null
    );

    const waypointState = ref<WaypointState>();
    const updateWaypointState = (newState: WaypointState) =>
      (waypointState.value = newState);

    const observer = ref<IntersectionObserver>(
      createObserver(props.options)(updateWaypointState)
    );

    watch(activable, () => {
      // cannot observer or unobserve if the element is null
      if (element.value === null) return;

      if (activable.value) return observer.value.observe(element.value);
      else return observer.value.unobserve(element.value);
    });

    watch(waypointState, () => {
      if (typeof waypointState.value === "undefined") return;
      context.emit("change", waypointState.value);
    });

    // bind and unbind IntersectionObserver as needed
    onMounted(() => (mounted.value = true));
    onBeforeUnmount(() => (mounted.value = false));

    const cssHelpers = computed(() => {
      const { going, direction: dir } = waypointState.value ?? {};
      const goingClass = going && `going-${going.toLowerCase()}`;
      const directionClass = dir && `direction-${dir.toLowerCase()}`;
      return ["waypoint", goingClass, directionClass];
    });

    return () => {
      const rawProps = props.disableCssHelpers
        ? { ref: element }
        : { ref: element, class: cssHelpers.value };

      return h(
        props.tag,
        rawProps,
        context.slots.default?.(waypointState.value ?? {})
      );
    };
  },
});
