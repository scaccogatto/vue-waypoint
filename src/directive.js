import {} from 'intersection-observer'
import R from 'ramda'

const VueWaypoint = {
  get observerOptions () {
    return {}
  },
  install (Vue) {
    Vue.directive('waypoint', {
      inserted (el, binding) {
        const { callback } = binding.value
        const observer = VueWaypoint.$_createObserver((entries, observer) => VueWaypoint.$_callbackWrapper(entries, observer, callback), VueWaypoint.observerOptions)
        observer.observe(el)
      }
    })
  },
  $_createObserver (callback, options) {
    return new window.IntersectionObserver(callback, options)
  },
  $_callbackWrapper (entries, observer, callback) {
    for (let entry of entries) {
      callback(VueWaypoint.$_mapEntry(entry))
    }
  },
  $_mapEntry (entry) {
    const { boundingClientRect, intersectionRatio, intersectionRect, isIntersecting, rootBounds, target, time } = entry
  }
}

export default VueWaypoint
