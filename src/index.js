import VueCollision from 'vue-collision'
import VueThrottleEvent from 'vue-throttle-event'

import WaypointScroll from './WaypointScroll.js'
import Waypoint from './Waypoint.vue'

const VueWaypoint = {
  _scrollElement: window,
  _throttledHandler: undefined,
  install (Vue) {
    // throttle
    Vue.use(VueThrottleEvent)

    // collision
    Vue.use(VueCollision)

    // instance method
    Vue.prototype.$scrollDirection = () => {
      return WaypointScroll.getScrollDirection()
    }

    Vue.prototype.$unsetWaypointScrollElement = VueWaypoint._unsetWaypointScrollElement

    Vue.prototype.$setWaypointScrollElement = VueWaypoint._setWaypointScrollElement

    // global component
    Vue.component('v-waypoint', Waypoint)

    // set default scroll element to window
    VueWaypoint._setWaypointScrollElement(VueWaypoint._scrollElement)
  },
  _setWaypointScrollElement (scrollElement) {
    VueWaypoint._unsetWaypointScrollElement()
    VueWaypoint._scrollElement = scrollElement
    console.log('WP: adding to', VueWaypoint._scrollElement)
    WaypointScroll.setScrollElement(VueWaypoint._scrollElement)
    VueWaypoint._throttledHandler = VueThrottleEvent._throttle('scroll', 'v-waypoint-throttled-scroll', VueWaypoint._scrollElement)
    VueWaypoint._scrollElement.addEventListener('v-waypoint-throttled-scroll', VueWaypoint._scrollHandler)
  },
  _unsetWaypointScrollElement () {
    console.log('WP: removing from', VueWaypoint._scrollElement)
    VueWaypoint._scrollElement.removeEventListener('v-waypoint-throttled-scroll', VueWaypoint._scrollHandler)
    VueWaypoint._scrollElement.removeEventListener('scroll', VueWaypoint._throttledHandler)
  },
  _scrollHandler () {
    WaypointScroll.updateScrollDirection()
  }
}


export default VueWaypoint

// in-browser load
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueWaypoint)
}
