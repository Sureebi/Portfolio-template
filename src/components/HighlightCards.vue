<script setup>
import {
  computed
} from 'vue'

import {
  RouterLink
} from 'vue-router'

const props = defineProps({
  number: String,
  title: String,
  description: String,
  actionLabel: String,
  image: String,
  index: Number,
  to: String
})

const emit = defineEmits(['activate'])

const cardTag =
  computed(() =>
    props.to
      ? RouterLink
      : 'div'
  )

const cardAttrs =
  computed(() =>
    props.to
      ? {
          to: props.to,
          'aria-label': props.title
        }
      : {
          role: 'group',
          'aria-label': props.title
        }
  )

function handlePointerMove(event) {
  const card = event.currentTarget
  const rect = card.getBoundingClientRect()

  const x = ((event.clientX - rect.left) / rect.width) * 100
  const y = ((event.clientY - rect.top) / rect.height) * 100

  card.style.setProperty('--glare-x', `${x}%`)
  card.style.setProperty('--glare-y', `${y}%`)
}

function resetGlare(event) {
  event.currentTarget.style.setProperty('--glare-x', '50%')
  event.currentTarget.style.setProperty('--glare-y', '50%')
}

function getBaseRotate(index) {
  const rotations = ['-6deg', '-3deg', '0deg', '3deg', '6deg']
  return rotations[index] || '0deg'
}

</script>

<template>
  <div class="card-sway">
    <component
      :is="cardTag"
      v-bind="cardAttrs"
      class="card-tilt"
      :style="{
        '--base-rotate': getBaseRotate(props.index)
      }"
      @pointermove="handlePointerMove"
      @pointerleave="resetGlare"
      @mouseenter="
        emit('activate', {
          title: props.title,
          description: props.description
        })
      "
      @focus="
        emit('activate', {
          title: props.title,
          description: props.description
        })
      "
    >
      <article class="highlight-card">
        <div class="card-visual">
          <img
            v-if="props.image"
            :src="props.image"
            :alt="props.title"
          />

          <div
            v-else
            class="card-abstract"
            aria-hidden="true"
          >
            <span></span>
            <span></span>
            <span></span>
            <i></i>
          </div>
        </div>

        <div class="card-label">
          <span class="card-number">
            {{
              props.number
            }}
          </span>
        </div>

        <div class="card-details">
          <span class="card-cta">
            {{
              props.actionLabel
            }}
          </span>
        </div>

        <div class="card-glare"></div>
      </article>
    </component>
  </div>
</template>

<style scoped>

.highlight-card {
  width: 360px;
  height: 410px;

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

.highlight-card::before {
  content: "";

  position: absolute;
  inset: -42%;

  z-index: 2;
  pointer-events: none;

  background:
    linear-gradient(
      112deg,
      transparent 34%,
      rgba(255, 255, 255, 0.00) 42%,
      rgba(255, 255, 255, 0.30) 48%,
      rgba(255, 247, 214, 0.42) 50%,
      rgba(255, 255, 255, 0.22) 53%,
      rgba(255, 255, 255, 0.00) 60%,
      transparent 68%
    );

  opacity: 0;

  transform:
    translate3d(-52%, 16%, 0)
    rotate(6deg);

  animation:
    sunGlint
    4.8s
    ease-in-out
    var(--glint-delay, 0ms)
    infinite;
}

.highlight-card::after {
  content: "";

  position: absolute;
  inset: auto 0 0;

  height: 38%;

  background:
    linear-gradient(
      180deg,
      transparent 0%,
      rgba(12, 28, 24, 0.08) 42%,
      rgba(12, 28, 24, 0.46) 100%
    );

  pointer-events: none;
  z-index: 1;
}

.highlight-card:hover {
  z-index: 20;
}

.card-visual {
  width: 100%;
  height: 100%;
  background: var(--card-color, var(--surface));
}

.card-visual img {
  filter:
    saturate(0.96)
    contrast(1.02);
}

.card-abstract {
  width: 100%;
  height: 100%;

  position: relative;

  background:
    linear-gradient(
      145deg,
      rgba(136, 196, 175, 0.92),
      rgba(76, 145, 127, 0.92)
    ),
    repeating-linear-gradient(
      0deg,
      transparent 0,
      transparent 23px,
      rgba(255, 255, 255, 0.09) 24px,
      transparent 25px
    );
}

.card-abstract::before {
  content: "";

  position: absolute;
  inset: 58px 46px auto;

  height: 104px;

  border:
    1px solid
    rgba(255, 255, 255, 0.20);

  border-radius: 16px;

  background:
    linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.18),
      rgba(255, 255, 255, 0.04)
    );
}

.card-abstract span {
  position: absolute;
  left: 68px;
  right: 68px;

  height: 8px;

  border-radius: 999px;

  background:
    rgba(255, 255, 255, 0.34);
}

.card-abstract span:nth-child(1) {
  top: 86px;
}

.card-abstract span:nth-child(2) {
  top: 112px;
  opacity: 0.72;
}

.card-abstract span:nth-child(3) {
  top: 138px;
  opacity: 0.50;
}

.card-abstract i {
  position: absolute;
  left: 46px;
  right: 46px;
  bottom: 70px;

  height: 1px;

  background:
    linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.38),
      transparent
    );
}

.card-tilt {
  display: block;

  color: inherit;
  text-decoration: none;

  outline: 0;
}

.card-sway {
  animation:
    cardSway
    var(--sway-duration, 2.8s)
    ease-in-out
    var(--sway-delay, 0s)
    infinite
    var(--sway-direction, alternate);
}

@keyframes cardSway {
  from {
    transform:
      translateX(-5px)
      rotate(-0.55deg);
  }

  to {
    transform:
      translateX(5px)
      rotate(0.55deg);
  }
}

@keyframes sunGlint {
  0%,
  58%,
  100% {
    opacity: 0;

    transform:
      translate3d(-58%, 18%, 0)
      rotate(6deg);
  }

  66% {
    opacity: 0.72;
  }

  78% {
    opacity: 0;

    transform:
      translate3d(58%, -18%, 0)
      rotate(6deg);
  }
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

.card-label {
  position: absolute;
  left: 16px;
  right: auto;
  top: 16px;
  bottom: auto;

  z-index: 3;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-width: 38px;
  height: 30px;

  padding: 0 10px;

  border: 1px solid rgba(255, 255, 255, 0.20);
  border-radius: 999px;

  background:
    rgba(12, 28, 24, 0.22);

  color: #ffffff;

  box-shadow:
    0 6px 16px rgba(12, 28, 24, 0.10);

  backdrop-filter: blur(9px);
  -webkit-backdrop-filter: blur(9px);

  transition:
    transform 220ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 180ms ease;
}

.card-number {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.08em;

  opacity: 0.72;
}

.card-details {
  position: absolute;
  left: 50%;
  bottom: 20px;

  z-index: 4;

  opacity: 0;

  transform:
    translateX(-50%)
    translateY(12px);

  transition:
    opacity 180ms ease,
    transform 220ms cubic-bezier(0.22, 1, 0.36, 1);
}

.card-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-width: 76px;

  padding: 9px 14px;

  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 999px;

  background:
    rgba(12, 28, 24, 0.40);

  color: #ffffff;

  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.13em;
  text-transform: uppercase;

  box-shadow:
    0 8px 20px rgba(12, 28, 24, 0.16);

  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.card-tilt:hover .card-label,
.card-tilt:focus-visible .card-label {
  opacity: 0;

  transform:
    translateY(-8px)
    scale(0.98);
}

.card-tilt:hover .card-details,
.card-tilt:focus-visible .card-details {
  opacity: 1;

  transform:
    translateX(-50%)
    translateY(0);
}

.card-tilt:focus-visible .highlight-card {
  box-shadow:
    0 0 0 3px rgba(248, 251, 249, 0.95),
    0 0 0 6px rgba(49, 124, 112, 0.45),
    0 28px 60px rgba(0, 0, 0, 0.16);
}

.card-glare {
  position: absolute;
  inset: 0;

  z-index: 2;
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

.card-tilt:hover .card-glare,
.card-tilt:focus-visible .card-glare {
  opacity: 0.55;
}

@media (prefers-reduced-motion: reduce) {
  .card-sway,
  .highlight-card::before {
    animation-duration: 1ms !important;
    animation-delay: 0ms !important;
  }
}

</style>
