# VueWaypoint

> trigger functions and events based on the element position on the screen

![Latest Release](https://github.com/scaccogatto/vue-waypoint/workflows/Release/badge.svg)

## Demo

[Simple demo page](https://vue-waypoint.netlify.app/)

Open your browser console and see what's going on while scrolling up and down

## Features

- [x] Vue 3
- [x] No dependencies
- [x] Flexible
- [x] Typescript
- [x] Battle tested
- [x] Customizable
- [x] Solid project (5+ years)
- [x] Supports slots

## Getting started

### npm

```bash
npm i vue-waypoint
```

### Vue component

```html
<template>
  <Waypoint @change="onChange">
    <!-- anything you want here -->
  </Waypoint>
</template>
```

```html
<script lang="ts">
  import { defineComponent } from "vue";
  import { Waypoint } from "vue-waypoint";

  export default defineComponent({
    name: "SomeComponent",
    components: {
      Waypoint,
    },
    setup() {
      const onChange = (waypointState) => {
        // Going can be:
        // IN
        // OUT
        console.log(waypointState.going);

        // Direction can be:
        // UP
        // DOWN
        // LEFT
        // RIGHT
        console.log(waypointState.direction);
      };

      return { onChange };
    },
  });
</script>
```

## Props

### `active`

- [x] Can use a reactive variable
- [x] Can set `true`/`false` dynamically

Usage:

- Enable the waypoint: `<Waypoint :active="true" />`
- Disable the waypoint: `<Waypoint :active="false" />`

### `options`

- [x] Useful for inner div detection
- [x] Trigger `change` event a portion of the element is completely on screen
- [x] Is an [official IntersectionObserverInit implementation](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver)

Usage:

- Set a custom `IntersectionObserver` options: `<Waypoint :options="options" />`
- Read what you can do with `options`: [IntersectionObserverInit docs](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver)

Options example:

```js
const options: IntersectionObserverInit = {
  root: document,
  rootMargin: "0px 0px 0px 0px",
  threshold: [0.25, 0.75],
};
```

### `tag`

- [x] Set your preferred tag for the element
- [x] Defaults to `div`

- Waypoint as div: `<Waypoint :tag="'div'" /> --> renders --> <div class="waypoint"></div>`
- Waypoint as span: `<Waypoint :tag="'span'" /> --> renders --> <span class="waypoint"></span>`
- Waypoint as p: `<Waypoint :tag="'p'" /> --> renders --> <p class="waypoint"></p>`

### `disableCssHelpers`

- [x] Disable automatic CSS classes on the Waypoint component
- [x] Defaults to `false`

Usage:

- Enable helpers (default): `<Waypoint :disableCssHelpers="false" />`
- Disable helpers: `<Waypoint :disableCssHelpers="true" />`

DOM result:

- With CSS helpers: `<Waypoint /> --> renders --> <div class="waypoint going-in direction-down"></div>`
- Without CSS helpers: `<Waypoint :disableCssHelpers="true" /> --> renders --> <div></div>`

## CSS helpers

- [x] Zero configuration needed
- [x] Useful for simple CSS animations

The component comes with three classes:

- `waypoint`: set when the waypoint is ready
- `going-in`, `going-out`: dynamically changed when the waypoint comes in and out
- `direction-up`, `direction-down`, `direction-left`, `direction-right`: dynamically changed when the direction changes

Examples:

- `<Waypoint class="waypoint going-in direction-up" />` - the element is visible and came from bottom and is going top (natural scroll)
- `<Waypoint class="waypoint going-in direction-down" />` - the element is visible and came from top and is going up (reverse natural scroll)
- `<Waypoint class="waypoint going-out direction-up" />` - the element is not visible and came from bottom and is going top
- `<Waypoint class="waypoint going-out direction-down" />` - the element is not visible and came from top and is going up

## Events

### `change`

Emitted every time the waypoint detects a change.

```html
<template>
  <Waypoint @change="onChange" />
</template>
```

```js
function onChange(waypointState) {
  /* ... */
}
```

```js
interface WaypointState {
  el: Element;
  going: "IN" | "OUT";
  direction: "UP" | "DOWN" | "LEFT" | "RIGHT";
}
```

## Development

1. Fork the repository
2. Run the project (`npm i && npm run dev`)
3. Follow [Conventional Commits spec](https://www.conventionalcommits.org/en/v1.0.0/) for your commits
4. Open a pull request

## LEGACY: Vue2 and Nuxt version

[vue-waypoint for Vue2 repository](https://github.com/scaccogatto/vue-waypoint/tree/vue2)
