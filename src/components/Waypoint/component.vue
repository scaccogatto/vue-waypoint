<script lang="ts">
import {
  computed,
  ComputedRef,
  defineComponent,
  h,
  onBeforeUnmount,
  onBeforeUpdate,
  onMounted,
  onUpdated,
  Ref,
  ref,
  watch
} from "vue";
import { createObserver, Direction, Going, WaypointState } from "./observer";

export default defineComponent({
  name: "Waypoint",
  props: {
    active: {
      type: Boolean,
      default: () => true
    },
    options: {
      type: Object,
      validator: (value: IntersectionObserverInit | undefined) =>
        typeof value === "object",
      default: () => ({})
    },
    tag: {
      type: String,
      default: () => "div"
    }
  },
  setup(props, context) {
    // check for browser compatibility
    const compatible: boolean =
      typeof window.IntersectionObserver === "function";

    // watch for mount
    const mounted: Ref<boolean> = ref(false);

    // element DOM reference
    const element: Ref<Element | null> = ref(null);

    // activable conditions
    const activable: ComputedRef<boolean> = computed(
      () =>
        compatible && mounted.value && props.active && element.value !== null
    );

    const waypointState: Ref<WaypointState | undefined> = ref(undefined);
    const updateWaypointState = (newState: WaypointState) =>
      (waypointState.value = newState);

    const observer: Ref<IntersectionObserver> = ref(
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
    onBeforeUpdate(() => (mounted.value = false));
    onUpdated(() => (mounted.value = true));
    onBeforeUnmount(() => (mounted.value = false));

    // css classes
    const goingClass: ComputedRef<string> = computed(() => {
      const going: Going | undefined = waypointState.value?.going;
      if (typeof going === "undefined") return "";
      return `going-${going.toString().toLowerCase()}`;
    });

    const directionClass: ComputedRef<string | undefined> = computed(() => {
      const direction: Direction | undefined = waypointState.value?.direction;
      if (typeof direction === "undefined") return "";
      return `direction-${direction.toString().toLowerCase()}`;
    });

    const stringClass: ComputedRef<string> = computed(() => {
      return [goingClass.value, directionClass.value].join(" ").trim();
    });

    return () =>
      h(props.tag, {
        ref: element,
        class: `waypoint ${stringClass.value}`.trim()
        // TODO: if exist, add inner content
      });
  }
});
</script>
