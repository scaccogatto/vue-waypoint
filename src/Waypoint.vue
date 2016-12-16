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
        colliding: false
      }
    },
    computed: {
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
      _emitWaypointEvent () {
        if (this.active) {
          // basic Waypoint event
          this.$emit('waypoint-' + this.going)

          // complete event with full description
          this.$emit('waypoint', this.$scrollDirection(), this.going)
        }
      }
    }
  }
</script>

<style>
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
