import VueCollision from 'vue-collision'
import VueThrottleEvent from 'vue-throttle-event'

import Waypoint from './Waypoint.vue'

const VueWaypoint = {
  install (Vue) {
    // throttle
    Vue.use(VueThrottleEvent)

    // collision
    Vue.use(VueCollision)

    // global component
    Vue.component('v-waypoint', Waypoint)
  }
}

export default VueWaypoint

// in-browser load
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueWaypoint)
}
