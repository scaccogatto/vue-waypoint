# VueWaypoint

> trigger functions and events based on VueWaypoint position on the screen

![Master](https://github.com/scaccogatto/vue-waypoint/workflows/Master/badge.svg)

## Demo

[DEMO](https://vue-waypoint.netlify.app/)

More info on browser's console.

## Installation

### npm

```bash
npm i vue-waypoint
```

### Vue

```html
<template>
  <Waypoint @change="onChange" />
</template>
```

```html
<script>
import VueWaypoint from 'vue-waypoint'

export default {
  name: "App",
  components: {
    Waypoint
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
    }

    return { onChange };
  }
}
</script>
```

## Props

### `active`

- Enable the waypoint: `<Waypoint :active="true" />`
- Disable the waypoint: `<Waypoint :active="false" />`

### `options`

- Custom `IntersectionObserver` options: `<Waypoint :options="options" />`

[https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver](IntersectionObserverInit)

Options example:

```js
const options = {
  threshold: [0.25, 0.75]
};
```

### `tag`

- Waypoint as div: `<Waypoint :tag="'div'" />` -> `<div class="waypoint"></div>`
- Waypoint as span: `<Waypoint :tag="'span'" />` -> `<span class="waypoint"></span>`
- Waypoint as p: `<Waypoint :tag="'p'" />` -> `<p class="waypoint"></p>`

## Events

### `change`

Emitted every time the waypoint detects a change.

```html
<template>
  <Waypoint @change="onChange" />
</template>
```

```js
const changeFunction = (waypointState) => {..}
```

```ts
WaypointState {
  going: 'IN' | 'OUT';
  direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
};
```
