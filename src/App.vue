<template>
  <header class="hero">
    <h1>vue-waypoint</h1>
    <p>
      Trigger functions and events based on an element's position on screen.
      Scroll down.
    </p>
    <p class="hint">↓</p>
  </header>

  <main>
    <section class="demo">
      <h2>1. CSS helpers</h2>
      <p>
        The component adds <code>waypoint</code>,
        <code>going-in</code>/<code>going-out</code> and
        <code>direction-*</code> classes. No JavaScript needed to animate.
      </p>
      <Waypoint v-for="card in 4" :key="card" class="card" @change="onChange">
        <h3>Card {{ card }}</h3>
        <p>Fades and slides in when it enters the viewport.</p>
      </Waypoint>
    </section>

    <section class="demo">
      <h2>2. Slot props</h2>
      <p>The default slot receives the current state.</p>
      <Waypoint #default="{ going, direction }" class="card state-card">
        <dl>
          <dt>going</dt>
          <dd>{{ going ?? "—" }}</dd>
          <dt>direction</dt>
          <dd>{{ direction ?? "—" }}</dd>
        </dl>
      </Waypoint>
    </section>

    <section class="demo">
      <h2>3. Observer options</h2>
      <p>
        Fires only when <code>{{ threshold }}%</code> of the box is visible.
        Drag to change it: the observer is rebuilt on the fly.
      </p>
      <label class="control">
        threshold
        <input v-model.number="threshold" type="range" min="0" max="100" step="10" />
      </label>
      <Waypoint
        :options="observerOptions"
        #default="{ going }"
        class="card tall"
      >
        <h3>{{ going === "IN" ? "Visible enough" : "Not yet" }}</h3>
      </Waypoint>
    </section>

    <section class="demo">
      <h2>4. active toggle</h2>
      <p>Turn the observer off without unmounting the element.</p>
      <label class="control">
        <input v-model="active" type="checkbox" />
        active
      </label>
      <Waypoint :active="active" #default="{ going }" class="card">
        <h3>{{ active ? (going ?? "waiting") : "paused" }}</h3>
      </Waypoint>
    </section>

    <section class="demo">
      <h2>5. useWaypoint composable</h2>
      <p>Same engine, no component: bring your own element and template ref.</p>
      <div ref="composableTarget" class="card" :class="composableClass">
        <h3>{{ composableState?.going ?? "waiting" }}</h3>
        <p>{{ composableState?.direction ?? "no direction yet" }}</p>
      </div>
    </section>
  </main>

  <aside class="log">
    <h2>@change</h2>
    <ol>
      <li v-for="entry in log" :key="entry.id">
        <b>{{ entry.going }}</b>
        <span>{{ entry.direction ?? "—" }}</span>
      </li>
      <li v-if="log.length === 0" class="empty">nothing yet</li>
    </ol>
  </aside>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { Waypoint, useWaypoint, type WaypointState } from "./components/Waypoint";

const threshold = ref(50);
const observerOptions = computed(() => ({ threshold: threshold.value / 100 }));

const active = ref(true);

const composableTarget = ref<HTMLElement | null>(null);
const { state: composableState } = useWaypoint(composableTarget);
const composableClass = computed(() => {
  const { going, direction } = composableState.value ?? {};
  return [
    going && `going-${going.toLowerCase()}`,
    direction && `direction-${direction.toLowerCase()}`,
  ];
});

let nextId = 0;
const log = ref<
  { id: number; going: string | undefined; direction: string | undefined }[]
>([]);

function onChange({ going, direction }: WaypointState) {
  log.value.unshift({ id: nextId++, going, direction });
  log.value = log.value.slice(0, 8);
}
</script>

<style>
:root {
  --green: #41b883;
  --navy: #35495e;
  color-scheme: light dark;
}

body {
  margin: 0;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  color: var(--navy);
  background: #fbfdfc;
  line-height: 1.5;
}

.hero {
  min-height: 100vh;
  display: grid;
  place-content: center;
  text-align: center;
  padding: 0 1rem;
  background: linear-gradient(160deg, var(--green), var(--navy));
  color: white;
}

.hero h1 {
  font-size: clamp(2.5rem, 10vw, 6rem);
  margin: 0;
}

.hint {
  font-size: 2rem;
  animation: bob 1.6s ease-in-out infinite;
}

@keyframes bob {
  50% {
    transform: translateY(0.5rem);
  }
}

main {
  max-width: 42rem;
  margin: 0 auto;
  padding: 0 1rem 60vh;
}

.demo {
  padding: 30vh 0 0;
}

code {
  background: rgba(53, 73, 94, 0.1);
  padding: 0.1em 0.35em;
  border-radius: 4px;
}

.control {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 1rem;
  font-weight: 600;
}

/* the component tags every element with .waypoint */
.waypoint,
.card {
  background: white;
  border: 1px solid rgba(53, 73, 94, 0.15);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  box-shadow: 0 10px 30px rgba(53, 73, 94, 0.08);
  opacity: 0;
  transform: translateY(2rem);
  transition:
    opacity 0.5s ease,
    transform 0.5s ease,
    border-color 0.3s ease;
}

.card h3 {
  margin: 0 0 0.25rem;
}

.card.tall {
  min-height: 70vh;
  display: grid;
  place-content: center;
}

.going-in {
  opacity: 1;
  transform: none;
  border-color: var(--green);
}

.going-out.direction-up {
  transform: translateY(-2rem);
}

.state-card dl {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.25rem 1rem;
  margin: 0;
}

.state-card dt {
  font-weight: 700;
}

.state-card dd {
  margin: 0;
  font-family: ui-monospace, monospace;
}

.log {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  width: 12rem;
  background: var(--navy);
  color: white;
  border-radius: 12px;
  padding: 0.75rem 1rem;
  font-size: 0.8rem;
}

.log h2 {
  margin: 0 0 0.5rem;
  font-size: 0.8rem;
  font-family: ui-monospace, monospace;
}

.log ol {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.2rem;
}

.log li {
  display: flex;
  justify-content: space-between;
  font-family: ui-monospace, monospace;
}

.log .empty {
  opacity: 0.6;
}

@media (prefers-reduced-motion: reduce) {
  .waypoint,
  .card,
  .hint {
    transition: none;
    animation: none;
    opacity: 1;
    transform: none;
  }
}
</style>
