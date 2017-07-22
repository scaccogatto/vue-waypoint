# vue-waypoint

> <v-waypoint> component for Vue, this is the easiest way to trigger a function when you scroll [Waypoints](http://imakewebthings.com/waypoints/)-like

## Features
- Uses [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
- Uses [vue-collision](https://github.com/scaccogatto/vue-collision)
- `<v-waypoint>` is callable everywhere
- Comes with an easy plug and play event or with a fully described event

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
    <v-waypoint @waypoint-in="inHandler"
                @waypoint-out="outHandler"></v-waypoint>
    <div class="waypoint-text">
      {{ text }}
    </div>
  </div>
</template>

<script>
  export default {
    data: () => {
      return {
        text: 'not-trigger-yet'
      }
    },
    methods: {
      inHandler () {
        this.text = 'going in'
      },
      outHandler () {
        this.text = 'going out'
      }
    }
  }
</script>
```

### Components - Complete method
```js
<template>
  <div class="waypoint-test">
    <v-waypoint @waypoint="waypointHandler"></v-waypoint>
    <div class="waypoint-text">
      {{ text }}
    </div>
  </div>
</template>

<script>
  export default {
    data: () => {
      return {
        text: 'not-trigger-yet'
      }
    },
    methods: {
      waypointHandler (direction, going) {
        this.text = 'the Waypoint has been triggered with: direction: { x: ' + direction.x + ', y: ' + direction.y + ' } and going: ' + going
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
- Implements two props:
  1. `:active`: activates the Waypoint (default: `true`)
  2. `:position`: sets the Waypoint `position: absolute` with a specific direction; possible values: `['fill', 'top', 'right', 'bottom', 'left']` (default: `undefined`)
- Implements three events:
  1. `@waypoint-in`: this will be called when the Waypoint is going inside the window
  2. `@waypoint-out`: this will be called when the Waypoint is going outside the window
  5. `@waypoint`: this will be called every time the Waypoint is triggered, it has (direction, going) as parameters
    - `direction`: `Object: { x, y }`, scroll direction (up, down, left, right)
    - `going`: `in || out`, inside or outside the window's viewport

### API
> You can also get some data from the Waypoint reference

- `Boolean colliding`: check is the Waypoint is colliding against the window
- `String going`: gets the last component's direction (in/out)

### Prerendering
> When using tools like [prerender-spa-plugin](https://github.com/chrisvfritz/prerender-spa-plugin) to generate static HTML pages, it is very necessary to ensure the [Polyfill](https://babeljs.io/docs/usage/polyfill/) process load before it start.
#### example for a vue init webpack project with prerender-spa-plugin
- add Polyfill to your project
``` bash
npm install --save babel-polyfill
``` 
- modify the build/webpack.base.conf.js to be like this way
``` js
module.exports = {
    entry: {app: ["babel-polyfill",'./src/main.js']},
}
```
