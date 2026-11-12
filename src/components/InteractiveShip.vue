<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import shipIllustration from '../assets/highlights/beyond-work-ship.webp'

defineProps({ alt: String, loadingLabel: { type: String, default: 'Loading assets' } })

const scene = ref(null)
const image = ref(null)
const ready = ref(false)
const paused = ref(false)
let observer
let motionPreference
let visible = true
let pointerFrame

function resetTilt() {
  scene.value?.style.setProperty('--ship-x', '0deg')
  scene.value?.style.setProperty('--ship-y', '0deg')
}

function moveShip(event) {
  if (event.pointerType !== 'mouse' || motionPreference?.matches) return
  const x = Math.max(-1, Math.min(1, event.clientX / window.innerWidth * 2 - 1))
  const y = Math.max(-1, Math.min(1, event.clientY / window.innerHeight * 2 - 1))

  cancelAnimationFrame(pointerFrame)
  pointerFrame = requestAnimationFrame(() => {
    scene.value?.style.setProperty('--ship-x', `${-y * 6}deg`)
    scene.value?.style.setProperty('--ship-y', `${x * 9}deg`)
  })
}

function updatePlayback() {
  paused.value = document.hidden || !visible
}

async function revealImage() {
  try {
    await image.value?.decode?.()
  } catch {
    // The load event still confirms that the image can be displayed.
  }
  ready.value = true
}

onMounted(() => {
  motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
  motionPreference.addEventListener('change', resetTilt)
  document.addEventListener('visibilitychange', updatePlayback)
  window.addEventListener('pointermove', moveShip, { passive: true })
  window.addEventListener('blur', resetTilt)
  observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    updatePlayback()
  })
  observer.observe(scene.value)
  if (image.value.complete && image.value.naturalWidth > 0) revealImage()
  updatePlayback()
})

onBeforeUnmount(() => {
  observer?.disconnect()
  cancelAnimationFrame(pointerFrame)
  motionPreference?.removeEventListener('change', resetTilt)
  document.removeEventListener('visibilitychange', updatePlayback)
  window.removeEventListener('pointermove', moveShip)
  window.removeEventListener('blur', resetTilt)
})
</script>

<template>
  <div
    ref="scene"
    class="ship-scene"
    :class="{ 'is-ready': ready, 'is-paused': paused }"
  >
    <div v-if="!ready" class="ship-loader" role="status" aria-live="polite">
      <span>{{ loadingLabel }}</span>
      <i aria-hidden="true"></i>
    </div>
    <div class="ship-tilt">
      <div class="ship-float">
        <img
          ref="image"
          class="ship-detail"
          :src="shipIllustration"
          :alt="alt"
          width="1122"
          height="1402"
          @load="revealImage"
        >
        <!-- Structural strokes draw first, then blend into the original illustration. -->
        <svg class="ship-draft" viewBox="0 0 1122 1402" fill="none" aria-hidden="true">
          <g class="ship-lines" stroke="#789488" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path pathLength="1" style="--delay: 0ms" d="M70 920 Q370 1040 790 1020 L1040 850 Q955 1120 810 1260 Q380 1230 100 1150 Z" />
            <path pathLength="1" style="--delay: 120ms" d="M82 960 Q390 1090 820 1060 M89 996 Q420 1120 812 1094 M96 1040 Q430 1150 802 1130 M105 1100 Q430 1190 807 1200" />
            <path pathLength="1" style="--delay: 240ms" d="M288 950 L280 252 M480 995 L463 85 M737 1005 L717 155" />
            <path pathLength="1" style="--delay: 400ms" d="M173 424 L361 433 M133 565 L401 578 M91 709 L433 724 M331 238 L566 246 M276 405 L637 429 M213 659 L700 692 M537 337 L842 354 M524 519 L899 549 M493 766 L950 795" />
            <path pathLength="1" style="--delay: 580ms" d="M280 252 L116 922 M280 252 L411 975 M463 85 L154 931 M463 85 L699 1000 M717 155 L489 995 M717 155 L1010 905" />
            <path pathLength="1" style="--delay: 740ms" d="M280 277 L172 425 L135 565 L94 710 L150 933 M281 278 L360 433 L399 578 L430 724 L396 971 M463 109 L331 238 L277 405 L214 659 L274 961 M464 111 L566 246 L637 429 L700 692 L644 1000 M717 180 L538 337 L525 519 L494 766 L546 1002 M718 180 L842 354 L899 549 L950 795 L877 969" />
            <path pathLength="1" style="--delay: 920ms" d="M92 709 Q270 753 433 724 M133 565 Q269 600 401 578 M213 659 Q460 726 700 692 M276 405 Q461 454 637 429 M493 766 Q710 831 950 795 M524 519 Q712 567 899 549" />
            <path pathLength="1" style="--delay: 1080ms" d="M95 920 L90 697 M100 925 Q400 1015 797 995 L1080 757 M790 1014 L1085 756 M717 155 L1085 756 M1085 756 L866 985 M288 950 L258 441 L220 932 M480 994 L444 426 L410 983 M737 1005 L684 548 L649 1001" />
            <path pathLength="1" style="--delay: 1220ms" d="M126 954 L127 972 L149 976 L148 958 Z M199 976 L200 994 L222 999 L221 981 Z M277 993 L278 1012 L300 1017 L299 998 Z M356 1009 L357 1028 L379 1032 L378 1013 Z M442 1020 L443 1039 L465 1042 L464 1023 Z M530 1028 L530 1047 L552 1049 L552 1030 Z M617 1031 L617 1050 L639 1051 L639 1032 Z M704 1030 L704 1049 L726 1048 L726 1029 Z" />
            <path pathLength="1" style="--delay: 1380ms" d="M463 97 Q486 84 511 104 Q530 116 555 105 L549 118 Q524 129 505 117 Q483 104 465 116 M717 168 Q736 157 761 177 L789 181 L777 190 Q749 186 739 180 L717 188" />
          </g>
          <g class="ship-guides" stroke="#a9bbb2" stroke-width="1">
            <path pathLength="1" style="--delay: 100ms" d="M60 1290 H1050 M50 1280 V1300 M810 1280 V1300 M60 370 V1220 M50 380 H70 M50 1200 H70" />
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ship-scene {
  --ship-x: 0deg;
  --ship-y: 0deg;
  position: relative;
  width: min(100%, 408px);
  margin: auto;
  aspect-ratio: 1122 / 1402;
  perspective: 1000px;
}
.ship-loader { position: absolute; inset: 0; z-index: 3; display: grid; place-content: center; gap: 12px; color: var(--muted); font: 400 13px/1.4 var(--font-body); text-align: center; background: rgba(248,251,249,.72); }
.ship-loader i { display: block; width: 88px; height: 2px; overflow: hidden; background: rgba(49,124,112,.16); }
.ship-loader i::after { content: ""; display: block; width: 42%; height: 100%; background: var(--accent-strong); animation: ship-loading 900ms ease-in-out infinite alternate; }
@keyframes ship-loading { from { transform: translateX(0); } to { transform: translateX(138%); } }
.ship-tilt { transform: rotateX(var(--ship-x)) rotateY(var(--ship-y)); transition: transform 650ms cubic-bezier(.16, 1, .3, 1); }
.ship-float { position: relative; transform-origin: 50% 75%; }
.ship-detail { display: block; width: 100%; height: auto; opacity: 0; }
.ship-draft { display: none; }
.is-ready .ship-detail { animation: ship-arrive 520ms 60ms var(--ease-out) both; }
.is-ready .ship-float { animation: ship-sway 8s 580ms ease-in-out infinite; }
.is-paused .ship-float,
.is-paused .ship-detail,
.is-paused .ship-draft,
.is-paused .ship-draft path { animation-play-state: paused; }
@keyframes ship-arrive {
  from { opacity: 0; transform: translateY(14px) scale(.985); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes ship-sway {
  0%, 100% { transform: translateY(0) rotate(0); }
  25% { transform: translateY(-4px) rotate(.65deg); }
  75% { transform: translateY(3px) rotate(-.65deg); }
}
@media (max-width: 800px) { .ship-scene { max-width: 272px; } }
@media (prefers-reduced-motion: reduce) {
  .ship-tilt { transform: none; transition: none; }
  .ship-scene .ship-float, .ship-scene .ship-detail,
  .ship-scene .ship-draft, .ship-scene .ship-draft path { animation: none; }
  .ship-detail { opacity: 1; }
  .ship-draft { display: none; }
  .ship-loader i::after { animation: none; width: 100%; }
}
</style>
