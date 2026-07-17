# vue-waypoint

> Trigger functions and events based on an element's position on screen — a tiny, dependency-free Vue 3 wrapper around the native [`IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver).

[![npm version](https://img.shields.io/npm/v/vue-waypoint.svg)](https://www.npmjs.com/package/vue-waypoint)
[![npm downloads](https://img.shields.io/npm/dm/vue-waypoint)](https://www.npmjs.com/package/vue-waypoint)
[![CI](https://github.com/scaccogatto/vue-waypoint/actions/workflows/ci.yml/badge.svg)](https://github.com/scaccogatto/vue-waypoint/actions/workflows/ci.yml)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/vue-waypoint)](https://bundlephobia.com/package/vue-waypoint)
[![license](https://img.shields.io/npm/l/vue-waypoint.svg)](./LICENSE)

## Demo

[Simple demo page](https://vue-waypoint.netlify.app/) — open your browser console and watch the events fire while scrolling up and down.

## Features

- Vue 3, written in TypeScript with shipped type declarations
- Zero runtime dependencies — a thin wrapper over the native `IntersectionObserver`
- ESM + CJS builds (tree-shakable) with correct `exports`
- Flexible: custom tag, custom observer options, reactive `active` toggle
- Optional CSS helper classes for quick, configuration-free animations
- Slot support exposing the live waypoint state
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

## Development

```bash
npm i          # install
npm run dev    # run the demo app
npm run lint   # eslint (flat config)
npm run type-check
npm test       # vitest
npm run build  # type-check + library build (ESM + CJS + .d.ts)
```

## Legacy: Vue 2 and Nuxt

The Vue 2 line lives on the [`vue2` branch](https://github.com/scaccogatto/vue-waypoint/tree/vue2). The `4.x`/`5.x` releases target Vue 3 only.

## License

[MIT](./LICENSE)
