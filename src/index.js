import { addObserver, removeObserver } from './intersectionObeserver'

const VueWaypoint = {
  install (Vue, options) {
    // directive's declaration
    defineDicrective(Vue, options)

    // public api
    Vue.prototype.$addObserver = addObserver
    Vue.prototype.$removeObserver = removeObserver
  }
}

export default VueWaypoint

// in-browser load
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueWaypoint)
}
