# vue-waypoint

> <v-waypoint> component for Vue, this is the easiest way to trigger a function when you scroll [Waypoints](http://imakewebthings.com/waypoints/)-like

## Features
- Uses [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
- Uses [vue-collision](https://github.com/scaccogatto/vue-collision)
- `<v-waypoint>` is callable everywhere
- Comes with the old fashioned event or with a new, fresh event-oriented syntax

## Installation

### npm
```js
$ npm install vue-waypoint --save-dev
```

### Vue's main.js
```js
import VueWaypoint from 'vue-waypoint'

// Waypoint plugin
Vue.use(VueWaypoint)
```
### Components - Easy
```js
<template>
  <div class="waypoint-test">
    <v-waypoint @waypoint="oldEventHandler"></v-waypoint>
    <div class="waypoint-old-text">
      {{ oldText }}
    </div>
  </div>
</template>

<script>
  export default {
    data: () => {
      return {
        oldText: 'no-trigger-yet'
      }
    },
    methods: {
      oldEventHandler (direction, going) {
        // this will be called every time the Waypoint is triggered
        oldText = 'scroll ' + direction + ', going ' + going + 'side'
      }
    }
  }
</script>
```

### Components - Event Oriented
```js
<template>
  <div class="waypoint-test">
    <v-waypoint
      @waypoint-down-in="downIn"
      @waypoint-down-out="downOut"
      @waypoint-up-in="upIn"
      @waypoint-up-out="upOut"></v-waypoint>
    <div class="waypoint-fresh-text">
      {{ freshText }}
    </div>
    <v-waypoint @waypoint="oldEventHandler"></v-waypoint>
    <div class="waypoint-old-text">
      {{ oldText }}
    </div>
  </div>
</template>

<script>
  export default {
    data: () => {
      return {
        freshText: 'no-trigger-yet',
        oldText: 'no-trigger-yet'
      }
    },
    methods: {
      downIn () {
        // this will be called when the Waypoint is going inside the window with scroll -> down
        freshText = 'scroll down, going inside'
      },
      downOut () {
        // this will be called when the Waypoint is going outside the window with scroll -> down
        freshText = 'scroll down, going outside'
      },
      upIn () {
        // this will be called when the Waypoint is going inside the window with scroll -> up
        freshText = 'scroll up, going inside'
      },
      upOut () {
        // this will be called when the Waypoint is going outside the window with scroll -> up
        freshText = 'scroll up, going outside'
      },
      oldEventHandler (direction, going) {
        // this will be called every time the Waypoint is triggered
        oldText = 'scroll ' + direction + ', going ' + going + 'side'
      }
    }
  }
</script>
```

## What is a Waypoint
### Theory
> When a Waypoint touches the window's boundaries, this will fire an event containing information about that collide

### DOM
- Physically, it is a `div.vue-waypoint__waypoint` containing a `div.vue-waypoint__waypoint__collider`
- `.vue-waypoint__waypoint` is styled with `width: 100%; height: 0` as it should be the common usage
- `.vue-waypoint__waypoint__collider` is born to occupy totally his parent: `position: relative; width: 100%; height: 100%;`
- You can style it differently based on your needs (yes, even a rectangle would be fine)

### Vue.js
- It is a global [Component](https://vuejs.org/v2/guide/components.html), you can call it with `<v-waypoint></v-waypoint>`
- Implements three props:
  1. `:active`: activates the Waypoint (default: `true`)
  2. `:position`: sets the Waypoint `position: absolute` with a specific direction; possible values: `['top', 'right', 'bottom', 'left']` (default: `undefined`)
  3. `:horizontal`: activates the horizontal scroll check (default: `false`)
- Implements five events:
  1. `@waypoint-down-in`: this will be called when the Waypoint is going inside the window with scroll -> down
  2. `@waypoint-down-out`: this will be called when the Waypoint is going outside the window with scroll -> down
  3. `@waypoint-up-in`: this will be called when the Waypoint is going inside the window with scroll -> up
  4. `@waypoint-up-out`: this will be called when the Waypoint is going outside the window with scroll -> up
  5. `@waypoint`: this will be called every time the Waypoint is triggered, it has (direction, going) as parameters
    - `direction`: `down || up`, scroll direction
    - `going`: `in || out`, inside or outside the window's viewport

### API
> You can also get some data from the Waypoint ref

- `Boolean colliding`: check is the Waypoint is colliding against the window
- `String direction`: gets the last scroll direction
- `String going`: gets the last component's direction (in/out)
