# VueWaypoint

> trigger functions based on elements' positions, based on viewport

[![Build Status](https://travis-ci.org/scaccogatto/vue-waypoint.svg?branch=master)](https://travis-ci.org/scaccogatto/vue-waypoint)

## Installation

### npm

```bash
$ npm install vue-waypoint --save-dev
```

### Vue

```js
import Vue from 'vue'
import VueWaypoint from 'vue-waypoint'

// Waypoint plugin
Vue.use(VueWaypoint)
```

## Usage

VueWaypoint is a [directive](https://vuejs.org/v2/guide/syntax.html#Directives) named `v-waypoint`

### Template

```html
<template>
  <div v-waypoint="{ active: true, callback: onWaypoint, options: intersectionOptions }"></div>
</template>

```

### Javascript

```js
export default {
  data: () => ({
    intersectionOptions: {
      root: null,
      rootMargin: '0px 0px 0px 0px',
      thresholds: [0]
    } // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
  })
  methods: {
    onWaypoint ({ going, direction }) {
      // going: in, out
      // direction: top, right, bottom, left
      if (going === this.$waypointMap.GOING_IN) {
        console.log('waypoint going in!')
      }

      if (direction === this.$waypointMap.DIRECTION_TOP) {
        console.log('waypoint going top!')
      }
    }
  }
}
```

## API

### Directive's options

- `active [boolean]`: set this parameter as you wish, changing dynamically the waypoint status (it removes and adds the waypoint physically)

- `callback [function]`: every time the waypoint triggers this function will be called with a `Waypoint` object as parameter

- `options [object]`: you can leave this `undefined` or follow [IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) (options)

### Waypoint object

Each callback call comes with a `Waypoint` object defined as follows:

```js
{
  el: Node,
  going: String,
  direction: String,
  _entry: IntersectionObserverEntry
}
```

You can map `going` and `direction` with the following **global** map, callable in every Vue's Component:

`this.$waypointMap`

Then you can compare map's elements with the callback's parameters:

```js
if (direction === this.$waypointMap.DIRECTION_TOP) {}
```

### Public API methods

- `VueWaypoint.addObserver (Element el, function callback, Object options)`

- `VueWaypoint.removeObserver (Element el, function callback)`

- `VueWaypoint.map`

## Best practices

You are encouraged to use `v-waypoint` directive since it follows the Vue's flow, *anyway* you can progammatically add new waypoints as you like, even outside Vue's context.

This can be accomplished with `addObserver` and `removeObserver`.

You can call them inside **Vue's components** with `this.$addObserver` and `this.$removeObserver`.

They are also available as **standalone-plugin**, just go with `VueWaypoint.addObserver` and `VueWaypoint.removeObserver`.

## Caveats

Waypoint first trigger is on page load, this means it *actually* triggers its own `callback` with `direction = undefined` (yes, we can't determine direction if no scroll has been made by the user)
