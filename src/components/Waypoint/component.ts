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
  emits: {
    change: (state: WaypointState) => state !== undefined,
  },
  setup(props, context) {
    // check for mounted status
    const mounted = ref(false);

    // element DOM reference
    const element = ref<Element | null>(null);

    // activatable conditions
    const activatable = computed<boolean>(
      () => mounted.value && props.active && element.value !== null,
    );

    const waypointState = ref<WaypointState>();
    const updateWaypointState = (newState: WaypointState) => {
      waypointState.value = newState;
      context.emit("change", newState);
    };

    const observer = ref<IntersectionObserver | null>();
    watch(activatable, () => {
      // ponytail: element is bound by the template ref before `mounted`/`active`
      // can flip, so this is unreachable through the public API; kept for type
      // safety against a wider Element | null contract.
      /* v8 ignore next */
      if (element.value === null) return;

      if (activatable.value && observer.value)
        return observer.value.observe(element.value);
      else return observer.value?.unobserve(element.value);
    });

    // bind and unbind IntersectionObserver as needed
    onMounted(() => {
      mounted.value = true;
      observer.value = createObserver(props.options)(updateWaypointState);
    });

    onBeforeUnmount(() => {
      observer.value?.disconnect();
      mounted.value = false;
    });

    // rebuild the observer whenever its options change
    watch(
      () => props.options,
      () => {
        observer.value?.disconnect();
        observer.value = createObserver(props.options)(updateWaypointState);
        if (activatable.value && element.value !== null)
          observer.value.observe(element.value);
      },
      { deep: true },
    );

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
        context.slots.default?.(waypointState.value ?? {}),
      );
    };
  },
});
