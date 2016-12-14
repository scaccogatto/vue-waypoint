<template>
  <div class="vue-waypoint__waypoint" :class="[position]">
    <waypoint-collider v-collision @collide="_vueWaypointHandle" @non-collide="_vueWaypointHandleOff">
    </waypoint-collider>
  </div>
</template>

<script>
  import WaypointCollider from './WaypointCollider.vue'

  export default {
    name: 'waypoint',
    components: { WaypointCollider },
    data: () => {
      return {
        colliding: false,
        lastScrollY: window.scrollY,
        lastScrollX: window.scrollX,
        direction: 'down',
        _throttledScrollListener: undefined
      }
    },
    computed: {
      _scrollHandler () {
        return this.horizontal ? this._handleCompleteScroll : this._handleVerticalScroll
      },
      _scrollVerticalDirection () {
        // positive: down, negative up
        return Math.sign(window.scrollY - this.lastScrollY)
      },
      _scrollHorizontalDirection () {
        // positive: right, negative left
        return Math.sign(window.scrollX - this.lastScrollX)
      },
      going () {
        return this.colliding ? 'in' : 'out'
      }
    },
    props: {
      active: {
        type: Boolean,
        default: true
      },
      position: {
        type: String,
        default: undefined
      },
      horizontal: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      _vueWaypointHandle (collider) {
        if (!this.colliding) {
          this.colliding = true
          this._emitWaypointEvent()
        }
      },
      _vueWaypointHandleOff (collider) {
        if (this.colliding) {
          this.colliding = false
          this._emitWaypointEvent()
        }
      },
      _handleVerticalScroll () {
        this.direction = this._getDirection()
        this.lastScrollY = window.scrollY
      },
      _handleCompleteScroll () {
        this.direction = this._getDirection()
        this.lastScrollY = window.scrollY
        this.lastScrollX = window.scrollX
      },
      _emitWaypointEvent () {
        this.$emit('waypoint-' + this.direction + '-' + this.going)

        // old fashioned way
        this.$emit('waypoint', this.direction, this.going)
      },
      _getDirection () {
        if (this._scrollVerticalDirection > 0)   return 'down'
        if (this._scrollVerticalDirection < 0)   return 'up'
        if (!this.horizontal)                    return undefined

        if (this._scrollHorizontalDirection > 0) return 'right'
        if (this._scrollHorizontalDirection < 0) return 'left'
                                                 return undefined
      },
      _addEventListeners () {
        this._throttledScrollListener = this.$throttle('scroll', 'v-waypoint-throttled-scroll', window)
        window.addEventListener('v-waypoint-throttled-scroll', this._scrollHandler)
      },
      _updateEventListeners () {
        window.removeEventListener('v-waypoint-throttled-scroll', this._scrollHandler)
        window.addEventListener('v-waypoint-throttled-scroll', this._scrollHandler)
      },
      _removeEventListeners () {
        window.removeEventListener('scroll', this._throttledScrollListener)
        window.removeEventListener('v-waypoint-throttled-scroll', this._scrollHandler)
      }
    },
    watch: {
      active () {
        if (this.active) { this._addEventListeners() }
        else { this._removeEventListeners() }
      }
    },
    created () {
      if (this.active) { this._addEventListeners() }
    },
    updated () {
      if (this.active) { this._updateEventListeners() }
    },
    beforeDestroy () {
      if (this.active) { this._removeEventListeners() }
    }
  }
</script>

<style scoped>
  .vue-waypoint__waypoint {
    width: 100%;
    height: 0;
    z-index: -1;
  }

  .vue-waypoint__waypoint.fill {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .vue-waypoint__waypoint.top {
    position: absolute;
    top: 0;
  }

  .vue-waypoint__waypoint.right {
    position: absolute;
    right: 0;
  }

  .vue-waypoint__waypoint.bottom {
    position: absolute;
    bottom: 0;
  }

  .vue-waypoint__waypoint.left {
    position: absolute;
    left: 0;
  }
</style>
