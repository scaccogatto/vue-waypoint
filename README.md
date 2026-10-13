# vue-waypoint

> Trigger functions and events based on an element's position on screen — a tiny, dependency-free Vue 3 wrapper around the native [`IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver).

[![npm version](https://img.shields.io/npm/v/vue-waypoint.svg)](https://www.npmjs.com/package/vue-waypoint)
[![npm downloads](https://img.shields.io/npm/dm/vue-waypoint)](https://www.npmjs.com/package/vue-waypoint)
[![CI](https://github.com/scaccogatto/vue-waypoint/actions/workflows/ci.yml/badge.svg)](https://github.com/scaccogatto/vue-waypoint/actions/workflows/ci.yml)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/vue-waypoint)](https://bundlephobia.com/package/vue-waypoint)
[![license](https://img.shields.io/npm/l/vue-waypoint.svg)](./LICENSE)

## Demo

[Live demo](https://scaccogatto.github.io/vue-waypoint/): scroll up and down and watch the on-page `@change` log, the CSS helper classes and the slot state update.

## Features

- Vue 3.3+, written in TypeScript with shipped type declarations
- Zero runtime dependencies — a thin wrapper over the native `IntersectionObserver`
- ESM + CJS builds (tree-shakable) with correct `exports` and matching `.d.ts` / `.d.cts` types
- Flexible: custom tag, custom observer options, reactive `active` toggle
- Optional CSS helper classes for quick, configuration-free animations
- Slot support exposing the live waypoint state
- `useWaypoint` composable for observing any template ref directly
- SSR-safe

## Install

```bash
npm i vue-waypoint
```

## Usage

### `<script setup>` (recommended)

```vue
<script setup lang="ts">
import { Waypoint, type WaypointState } from "vue-waypoint";

function onChange(state: WaypointState) {
  // state.going     -> "IN" | "OUT"
  // state.direction -> "UP" | "DOWN" | "LEFT" | "RIGHT"
  // state.el        -> the observed Element
  console.log(state.going, state.direction);
}
</script>

<template>
  <Waypoint @change="onChange">
    <!-- anything you want here -->
  </Waypoint>
</template>
```

### Options API

```vue
<script lang="ts">
import { defineComponent } from "vue";
import { Waypoint, type WaypointState } from "vue-waypoint";

export default defineComponent({
  components: { Waypoint },
  setup() {
    const onChange = (state: WaypointState) => {
      console.log(state.going, state.direction);
    };
    return { onChange };
  },
});
</script>

<template>
  <Waypoint @change="onChange" />
</template>
```

## Props

### `active`

Reactively enable or disable the waypoint. The element is observed while `active` is `true` and unobserved when it flips to `false`.

- Enable: `<Waypoint :active="true" />`
- Disable: `<Waypoint :active="false" />`

### `options`

A standard [`IntersectionObserverInit`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver) object, forwarded verbatim to the underlying observer.

```ts
const options: IntersectionObserverInit = {
  root: document,
  rootMargin: "0px 0px 0px 0px",
  threshold: [0.25, 0.75],
};
```

`<Waypoint :options="options" />`

The observer is rebuilt only when the options actually change value (`root` by identity, `threshold` as a number or an array, the rest by value), so an inline literal such as `:options="{ threshold: 0.5 }"` is fine: parent re-renders do not recreate the observer.

### `tag`

The rendered element tag. Defaults to `div`.

- `<Waypoint tag="div" />` → `<div class="waypoint"></div>`
- `<Waypoint tag="span" />` → `<span class="waypoint"></span>`
- `<Waypoint tag="p" />` → `<p class="waypoint"></p>`

### `disableCssHelpers`

Disable the automatic CSS helper classes. Defaults to `false`.

- With helpers (default): `<Waypoint />` → `<div class="waypoint going-in direction-down"></div>`
- Without helpers: `<Waypoint :disable-css-helpers="true" />` → `<div></div>`

## CSS helpers

Zero configuration, handy for simple CSS animations. The component toggles three families of classes:

- `waypoint` — set as soon as the waypoint is ready
- `going-in` / `going-out` — toggled as the element enters and leaves the viewport
- `direction-up` / `direction-down` / `direction-left` / `direction-right` — toggled as the scroll direction changes

Examples:

- `waypoint going-in direction-up` — visible, came from the bottom, scrolling up (natural scroll)
- `waypoint going-in direction-down` — visible, came from the top, scrolling down
- `waypoint going-out direction-up` — hidden, was scrolling up
- `waypoint going-out direction-down` — hidden, was scrolling down

## Events

### `change`

Emitted every time the waypoint detects an intersection change.

```ts
interface WaypointState {
  el: Element | undefined;
  going: "IN" | "OUT" | undefined;
  direction: "UP" | "DOWN" | "LEFT" | "RIGHT" | undefined;
}
```

```vue
<template>
  <Waypoint @change="onChange" />
</template>
```

The same `WaypointState` is also exposed through the default slot:

```vue
<Waypoint #default="{ going, direction }">
  <span v-if="going">going-{{ going.toLowerCase() }}</span>
  <span v-if="direction">direction-{{ direction.toLowerCase() }}</span>
</Waypoint>
```

## Composable

Prefer composing over a component? `useWaypoint` observes a template ref directly, with the same reactive `active`/options behavior as `<Waypoint>`:

```vue
<script setup lang="ts">
import { ref } from "vue";
import { useWaypoint } from "vue-waypoint";

const target = ref<Element | null>(null);
const { state } = useWaypoint(target, {
  active: true,
  observerOptions: { threshold: 0.5 },
});
</script>

<template>
  <div ref="target">{{ state?.going }}</div>
</template>
```

`active` and `observerOptions` accept a plain value or a `Ref`. When the target ref points to a new element (for example after a `v-if` / `v-else` swap), observation moves to the new element, and setting it to `null` stops observing the old one. The observer is created lazily (only once the target element and `active` are both truthy) and is disconnected automatically when the enclosing component scope is torn down. Outside a component scope, call the returned `stop()` yourself.

## Development

```bash
npm i          # install
npm run dev    # run the demo app
npm run lint   # eslint (flat config)
npm run type-check
npm test       # vitest
npm run build  # type-check + library build (ESM + CJS + .d.ts/.d.cts)
npm run lint:package  # publint + arethetypeswrong on the packed tarball
```

## Legacy: Vue 2 and Nuxt

The Vue 2 line (and its Nuxt 2 notes) lives on the [`vue2` branch](https://github.com/scaccogatto/vue-waypoint/tree/vue2). The `4.x`/`5.x` releases target Vue 3 only. They are SSR-safe, so they also work in Nuxt 3+: import `Waypoint` or `useWaypoint` from `vue-waypoint` in your components as usual.

## License

[MIT](./LICENSE)
