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
import {
  createObserver,
  sameOptions,
  snapshotOptions,
  type WaypointState,
} from "./observer";

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

    // plain locals, not refs: nothing renders from them
    let observer: IntersectionObserver | null = null;
    let appliedOptions: IntersectionObserverInit = {};
    let observed: Element | null = null;

    const build = () => {
      appliedOptions = snapshotOptions(props.options);
      observer = createObserver(props.options)(updateWaypointState);
    };

    // observe exactly the element that should be observed right now: a `tag`
    // change re-renders a new element, which must replace the old one
    const sync = () => {
      const wanted = activatable.value ? element.value : null;
      if (!observer || observed === wanted) return;
      if (observed) observer.unobserve(observed);
      observed = wanted;
      if (wanted) observer.observe(wanted);
    };

    watch([activatable, element], sync);

    // bind and unbind IntersectionObserver as needed
    onMounted(() => {
      build();
      mounted.value = true;
    });

    onBeforeUnmount(() => {
      observer?.disconnect();
      observer = null;
      observed = null;
      mounted.value = false;
    });

    // rebuild the observer only when the options actually differ, so an inline
    // `:options="{ threshold: 0.5 }"` literal survives parent re-renders
    watch(
      () => props.options,
      (options) => {
        if (!observer || sameOptions(appliedOptions, options)) return;
        observer.disconnect();
        observed = null;
        build();
        sync();
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
