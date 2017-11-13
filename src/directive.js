import { addObserver, removeObserver } from './intersectionObserver'

const defineDicrective = (Vue, options) => {
  // this translates in v-waypoint="{ active, callback }"
  Vue.directive('waypoint', {
    inserted (el, binding, vnode) {
      const { active, callback } = binding.value

      // if user asked for acivation, activate
      if (active) {
        const waypoint = addObserver(el, callback)
        vnode._waypoint = waypoint
      }
    },
    updated (el, binding, vnode, oldVnode) {
      const { active, callback } = binding.value

      // we remove the old observer anyways
      if (typeof oldVnode._waypoint !== 'undefined') {
        removeObserver(oldVnode._waypoint, el)
      }

      // if user asked for acivation, activate
      if (active) {
        const waypoint = addObserver(el, callback)
        vnode._waypoint = waypoint
      }
    },
    unbind (el, binding, vnode) {
      // free up some memory
      if (typeof vnode._waypoint !== 'undefined') {
        removeObserver(vnode._waypoint, el)
      }
    }
  })
}

export default defineDicrective
