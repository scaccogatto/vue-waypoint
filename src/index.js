import defineDirective from './directive'
import { GOING_IN, GOING_OUT, DIRECTION_TOP, DIRECTION_RIGHT, DIRECTION_BOTTOM, DIRECTION_LEFT } from './waypointInterface'
import { addObserver, removeObserver } from './intersectionObserver'

const VueWaypoint = {
  install (Vue) {
    // directive's declaration
    defineDirective(Vue)

    // public api
    Vue.prototype.$addObserver = addObserver
    Vue.prototype.$removeObserver = removeObserver
    Vue.prototype.$waypointMap = { GOING_IN, GOING_OUT, DIRECTION_TOP, DIRECTION_RIGHT, DIRECTION_BOTTOM, DIRECTION_LEFT }
  },
  addObserver,
  removeObserver,
  map: { GOING_IN, GOING_OUT, DIRECTION_TOP, DIRECTION_RIGHT, DIRECTION_BOTTOM, DIRECTION_LEFT }
}

export default VueWaypoint

// in-browser load
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueWaypoint)
}
