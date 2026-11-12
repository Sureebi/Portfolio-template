<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
  to: String,
  title: String,
  description: String,
  image: String,
  index: Number
})

const rotations = ['-4deg', '-2deg', '0deg', '2deg', '4deg']
const emit = defineEmits(['activate'])

function handlePointerMove(event) {
  const hitbox = event.currentTarget
  const card = hitbox.querySelector('.card-tilt')
  const rect = hitbox.getBoundingClientRect()

  if (!card) return

  const x = ((event.clientX - rect.left) / rect.width) * 100
  const y = ((event.clientY - rect.top) / rect.height) * 100

  card.style.setProperty('--glare-x', `${x}%`)
  card.style.setProperty('--glare-y', `${y}%`)
}

function resetGlare(event) {
  const card = event.currentTarget.querySelector('.card-tilt')

  card?.style.setProperty('--glare-x', '50%')
  card?.style.setProperty('--glare-y', '50%')
}

function getBaseRotate(index) {
  const rotations = ['-6deg', '-3deg', '0deg', '3deg', '6deg']
  return rotations[index] || '0deg'
}

</script>

<template>
  <component
    :is="props.to ? RouterLink : 'div'"
    :to="props.to"
    :aria-label="props.to ? props.title : undefined"
    class="card-hitbox"
    @focus="emit('activate', { title: props.title, description: props.description })"
    @pointermove="handlePointerMove"
    @pointerleave="resetGlare"
    @mouseenter="
      emit('activate', {
        title: props.title,
        description: props.description
      })
    "
  >
    <div class="card-sway">
      <div
        class="card-tilt"
        :style="{
          '--base-rotate': getBaseRotate(props.index)
        }"
      >
        <article class="highlight-card">
          <div class="card-visual">
            <img
              v-if="props.image"
              :src="props.image"
              :alt="props.title"
              decoding="async"
              draggable="false"
            />
          </div>

          <div class="card-glare"></div>
        </article>
      </div>
    </div>

    <span class="card-mobile-title">
      {{ props.title }}
    </span>
  </component>
</template>

<style scoped>

.highlight-card {
  width: var(--card-width, 360px);
  height: var(--card-height, 410px);

  position: relative;
  overflow: hidden;

  border-radius: 18px;
  overflow: hidden;

  transform:
    translateY(var(--offset-y, 0px))
    rotate(var(--rotation, 0deg));

  transform-origin: center center;

  transition:
    transform 180ms cubic-bezier(0.22, 1, 0.36, 1);
}

.highlight-card:hover {
  z-index: 20;
}

.card-visual {
  width: 100%;
  height: 100%;
  background: var(--card-color, var(--surface));
}

.card-hitbox {
  display: block;
  width: var(--card-width, 360px);
  height: var(--card-height, 410px);
  color: inherit;
  text-decoration: none;
  cursor: pointer;
}

.card-mobile-title {
  display: none;
}

.card-sway {
  width: 100%;
  height: 100%;
  animation:
    cardSway
    var(--sway-duration, 3.8s)
    ease-in-out
    var(--sway-delay, 0s)
    infinite
    alternate;
}

.card-tilt {
  width: 100%;
  height: 100%;
}

.card-hitbox:focus-visible {
  outline: 2px solid var(--accent-strong);
  outline-offset: 8px;
}

@keyframes cardSway {
  from {
    transform: translate3d(-5px, 3px, 0) rotate(-0.65deg);
  }

  to {
    transform: translate3d(5px, -3px, 0) rotate(0.65deg);
  }
}

.card-hitbox:hover .card-sway,
.card-hitbox:focus-visible .card-sway {
  animation-play-state: paused;
}

.card-hover {
  --glare-x: 50%;
  --glare-y: 50%;

  position: relative;

  transition:
    transform 220ms cubic-bezier(0.22, 1, 0.36, 1);

  will-change: transform;
}

.card-hover:hover {
  transform:
    translateY(-10px)
    scale(1.025);
}

.card-glare {
  position: absolute;
  inset: 0;

  pointer-events: none;

  background:
    radial-gradient(
      circle at var(--glare-x) var(--glare-y),
      rgba(255, 255, 255, 0.65) 0%,
      rgba(230, 255, 249, 0.28) 16%,
      rgba(210, 248, 240, 0.10) 30%,
      transparent 52%
    );

  opacity: 0;

  transition: opacity 180ms ease;
}

.card-hover:hover .card-glare {
  opacity: 0.55;
}

@media (prefers-reduced-motion: reduce) {
  .card-sway { animation: none; }
  .highlight-card, .card-hover, .card-glare { transition: none; }
}

@media (max-width: 1100px), (max-height: 600px) {
  .card-hitbox {
    position: relative;
    width: var(--card-width);
    height: var(--card-height);
  }

  .card-sway {
    width: 100%;
    height: 100%;
    animation: none;
  }

  .highlight-card {
    width: 100%;
    height: 100%;
  }

  .card-mobile-title {
    display: block;
    position: absolute;
    left: 18px;
    right: 18px;
    bottom: 18px;
    z-index: 4;
    margin: 0;
    color: #fff;
    font: 600 15px/1.35 var(--font-body);
    letter-spacing: 0;
    text-align: center;
    padding: 10px 12px;
    border-radius: 10px;
    background: rgba(22, 35, 30, .78);
    text-shadow: 0 2px 12px rgba(0,0,0,.52);
    pointer-events: none;
  }
}

</style>
