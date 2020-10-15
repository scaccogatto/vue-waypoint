<template>
  <div ref="el" class="waypoint" :class="stringClass"></div>
</template>

<script lang="ts">
import {
  ComponentInternalInstance,
  computed,
  ComputedRef,
  defineComponent,
  getCurrentInstance,
  onBeforeUnmount,
  onBeforeUpdate,
  onMounted,
  onUpdated,
  Ref,
  ref,
  watch
} from "vue";
import { Going, Direction, createObserver } from "./observer";

export default defineComponent({
  name: "Waypoint",
  props: {
    active: {
      type: Boolean,
      default: () => true
    },
    callback: {
      type: Function,
      default: () => {}
    },
    options: {
      type: Object,
      validator: (value: IntersectionObserverInit | undefined) =>
        typeof value === "object",
      default: () => ({})
    }
    // todo: tag type
  },
  setup(props) {
    // check for browser compatibility
    const compatible: boolean =
      typeof window.IntersectionObserver === "function";

    const going: Ref<Going | undefined> = ref(undefined);
    const direction: Ref<Direction | undefined> = ref(undefined);
    const mounted: Ref<boolean> = ref(false);

    const activable: ComputedRef<boolean> = computed(
      () => compatible && mounted.value && props.active
    );

    const instance: ComponentInternalInstance | null = getCurrentInstance();

    // this should never happen
    if (instance === null) {
      console.error("[vue-waypoint]", "instance is null");
      return;
    }

    const boundingClientRect: Ref<DOMRectReadOnly | undefined> = ref(undefined);
    const observer: Ref<IntersectionObserver> = ref(
      createObserver(instance)(props.callback, props.options)(
        boundingClientRect,
        going,
        direction
      )
    );

    watch(activable, () => {
      const element: Element = instance.refs.el as Element;
      if (activable.value) return observer.value.observe(element);

      return observer.value.unobserve(element);
    });

    watch(going, () => {
      if (typeof going.value === "undefined") return;
      instance.emit(`going-${going.value.toString().toLowerCase()}`);
    });

    watch(direction, () => {
      if (typeof direction.value === "undefined") return;
      instance.emit(`direction-${direction.value.toString().toLowerCase()}`);
    });

    onMounted(() => (mounted.value = true));
    onBeforeUpdate(() => (mounted.value = false));
    onUpdated(() => (mounted.value = true));
    onBeforeUnmount(() => (mounted.value = false));

    const goingClass: ComputedRef<string | undefined> = computed(() => {
      if (!going.value) return;
      return `going-${going.value.toString().toLowerCase()}`;
    });

    const directionClass: ComputedRef<string | undefined> = computed(() => {
      if (!direction.value) return;
      return `direction-${direction.value.toString().toLowerCase()}`;
    });

    const stringClass: ComputedRef<string> = computed(() => {
      return [goingClass.value, directionClass.value]
        .filter(portion => typeof portion === "string")
        .join(" ");
    });

    return {
      stringClass
    };
  }
});
</script>
