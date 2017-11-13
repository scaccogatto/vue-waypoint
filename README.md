# VueWaypoint

> trigger functions based on elements' positions, based on viewport

## Installation

### npm

```
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
  <div v-waypoint="{ active: true, callback: onWaypoint }"></div>
</template>

```

### Javascript

```js
export default {
  methods: {
    onWaypoint (going, direction) {
      // going: in, out
      // direction: top, right, bottom, left
      if (going === this.$waypoint.)
    }
  }
}
```

## API

You are encouraged to use `v-waypoint` directive since it follows the Vue's flow, *anyway* you can progammatically add new waypoints as you like, even outside Vue's context.

This can be accomplished with `addObserver` and `removeObserver`.

You can call them inside **Vue's components** with `this.$addObserver` and `this.$removeObserver`.

They are also available as **standalone-plugin**, just go with `VueWaypoint.addObserver` and `VueWaypoint.removeObserver`

Here there some description:

- `addObserver (Element el, function callback)`

- `removeObserver (Element el, function callback)`
