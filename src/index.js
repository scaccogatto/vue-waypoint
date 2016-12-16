import VueCollision from 'vue-collision'
import VueThrottleEvent from 'vue-throttle-event'

import WaypointScroll from './WaypointScroll.js'
import Waypoint from './Waypoint.vue'

const VueWaypoint = {
  install (Vue) {
    // throttle
    Vue.use(VueThrottleEvent)

    // collision
    Vue.use(VueCollision)

    // scroll direction handler
    this._throttledScrollListener = VueThrottleEvent._throttle('scroll', 'v-waypoint-throttled-scroll', window)
    window.addEventListener('v-waypoint-throttled-scroll', WaypointScroll.updateScrollDirection)

    // instance method
    Vue.prototype.$scrollDirection = () => { return WaypointScroll.getScrollDirection() }

    // global component
    Vue.component('v-waypoint', Waypoint)
  }
}

export default VueWaypoint

// in-browser load
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueWaypoint)
}
