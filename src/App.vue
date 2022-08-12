<template>
  <Waypoint
    v-for="i of Array.from({ length: testSize })"
    :key="i"
    @change="printCallback"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Waypoint, WaypointState } from "./components/Waypoint/index";

export default defineComponent({
  name: "App",
  components: {
    Waypoint,
  },
  setup() {
    const printCallback = (waypointState: WaypointState) => {
      console.info({
        el: waypointState.el,
        going: waypointState.going,
        direction: waypointState.direction,
      });
    };

    return { printCallback, testSize: 100 };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.waypoint {
  width: 100%;
  height: 50px;
  background-color: #41b883;
  margin: 40px 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 40px;
  align-content: center;
  justify-items: center;
  color: white;
  font-weight: bold;
}

.waypoint:nth-child(even) {
  background-color: #35495e;
}

.waypoint.going-in::before {
  content: "going-in";
}

.waypoint.going-out::before {
  content: "going-out";
}

.waypoint.direction-up::after {
  content: "direction-up";
}

.waypoint.direction-down::after {
  content: "direction-down";
}

.waypoint.direction-left::after {
  content: "direction-left";
}

.waypoint.direction-right::after {
  content: "direction-right";
}
</style>
