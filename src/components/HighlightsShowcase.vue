<script setup>
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount
} from 'vue'

import HighlightCard
  from './HighlightCard.vue'

import {
  useLanguage
} from '../composables/useLanguage'


import beyondImg
  from '../assets/highlights/sample-beyond.svg'

import professionalImg
  from '../assets/highlights/sample-journey.svg'

import futureImg
  from '../assets/highlights/sample-next.svg'

import aboutImg
  from '../assets/highlights/sample-profile.svg'

import labprojects
  from '../assets/highlights/sample-lab.svg'

const {
  t
} = useLanguage()

const highlightsMotion = ref(null)
let pointerFrame = null
let motionPreference = null

function resetPointerMotion() {
  const motion = highlightsMotion.value

  if (!motion) return

  motion
    .querySelectorAll('.card-pointer-motion')
    .forEach((card) => {
      card.style.setProperty('--pointer-x', '0px')
      card.style.setProperty('--pointer-y', '0px')
      card.style.setProperty('--pointer-rx', '0deg')
      card.style.setProperty('--pointer-ry', '0deg')
    })
}

function updatePointerMotion(event) {
  if (
    event.pointerType !== 'mouse' ||
    motionPreference?.matches
  ) return

  const motion = highlightsMotion.value

  if (!motion) return

  const x = (event.clientX / window.innerWidth) * 2 - 1
  const y = (event.clientY / window.innerHeight) * 2 - 1

  cancelAnimationFrame(pointerFrame)

  pointerFrame = requestAnimationFrame(() => {
    const depths = [0.68, 0.84, 1, 0.82, 0.66]

    motion
      .querySelectorAll('.card-pointer-motion')
      .forEach((card, index) => {
        const depth = depths[index] ?? 0.75

        card.style.setProperty('--pointer-x', `${x * 5 * depth}px`)
        card.style.setProperty('--pointer-y', `${y * 3.5 * depth}px`)
        card.style.setProperty('--pointer-rx', `${y * -1.25 * depth}deg`)
        card.style.setProperty('--pointer-ry', `${x * 2.1 * depth}deg`)
      })
  })
}


/* =========================================================
   HIGHLIGHTS
========================================================= */

const highlights =
  computed(() => [

    {
      title:
        t(
          'highlights.about.title'
        ),

      description:
        t(
          'highlights.about.description'
        ),

      to: '/about-card',

      image:
        aboutImg
    },


    {
      title:
        t(
          'highlights.beyond.title'
        ),

      description:
        t(
          'highlights.beyond.description'
        ),

      to: '/beyond-work',

      image:
        beyondImg
    },


    {
      title:
        t(
          'highlights.journey.title'
        ),

      description:
        t(
          'highlights.journey.description'
        ),

      to: '/professional-journey',

      image:
        professionalImg
    },


    {
      title:
        t(
          'highlights.lab.title'
        ),

      description:
        t(
          'highlights.lab.description'
        ),

      to: '/lab-projects',

      image:
        labprojects
    },


    {
      title:
        t(
          'highlights.next.title'
        ),

      description:
        t(
          'highlights.next.description'
        ),

      to: '/whats-next',

      image:
        futureImg
    }

  ])


/* =========================================================
   ACTIVE CARD
========================================================= */

const activeIndex =
  ref(null)


const activeHighlight =
  computed(() => {

    if (
      activeIndex.value ===
      null
    ) {
      return null
    }


    return (
      highlights.value[
        activeIndex.value
      ] ??
      null
    )

  })


function showHighlight(
  _data,
  index
) {

  activeIndex.value =
    index

}


function clearHighlight() {

  activeIndex.value =
    null

}


const playInitialIntro = ref(true)
let introTimeout

/* =========================================================
   CARD MOVEMENT
========================================================= */

function getDanceOffset(index) {

  if (
    activeIndex.value ===
    null
  ) {
    return '0px'
  }


  const distance =
    index -
    activeIndex.value


  const absoluteDistance =
    Math.abs(
      distance
    )


  if (
    distance === 0
  ) {
    return '0px'
  }


  const movement = {
    1: 32,
    2: 20,
    3: 12,
    4: 8
  }


  const amount =
    movement[
      absoluteDistance
    ] || 0


  return distance < 0
    ? '-' +
        amount +
        'px'

    : amount +
        'px'

}


function getCardStyle(index) {

  return {

    '--dance-x':
      getDanceOffset(
        index
      ),

    '--card-delay':
      index *
        45 +
      'ms',

    '--intro-delay':
      index *
        90 +
      'ms',

    '--intro-x':
      (
        index -
        2
      ) *
        110 +
      'px',

    '--intro-r':
      (
        index -
        2
      ) *
        4 +
      'deg'

  }

}


function getCardClasses(index) {

  return {

    'is-left':
      activeIndex.value !==
        null &&
      index <
        activeIndex.value,


    'is-active':
      index ===
      activeIndex.value,


    'is-right':
      activeIndex.value !==
        null &&
      index >
        activeIndex.value

  }

}


/* =========================================================
   MOUNT
========================================================= */

onMounted(() => {

  motionPreference = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  )

  window.addEventListener(
    'pointermove',
    updatePointerMotion,
    { passive: true }
  )

  window.addEventListener(
    'blur',
    resetPointerMotion
  )

  introTimeout = window.setTimeout(() => { playInitialIntro.value = false }, 1300)

})

onBeforeUnmount(() => {
  window.clearTimeout(introTimeout)
  cancelAnimationFrame(pointerFrame)
  window.removeEventListener('pointermove', updatePointerMotion)
  window.removeEventListener('blur', resetPointerMotion)
})
</script>


<template>

  <main class="highlights-page">


    <!-- HIGHLIGHTS -->

    <div

      class="highlights-stage"

      :class="{
        'cards-intro':
          playInitialIntro
      }"
    >

      <div
        ref="highlightsMotion"
        class="highlights-motion"
      >


      <!-- TITLE -->

      <div
        class="highlight-heading"
      >

        <h1
          v-if="activeHighlight"

          :key="
            activeHighlight.title
          "

          class="title-rise"
        >
          {{
            activeHighlight.title
          }}
        </h1>

      </div>


      <!-- CARDS -->

      <div
        class="highlights-cards"

        @mouseleave="
          clearHighlight
        "
      >

        <div
          v-for="
            (
              highlight,
              index
            ) in highlights
          "

          :key="index"

          class="card-slot"

          :style="
            getCardStyle(
              index
            )
          "

          :class="
            getCardClasses(
              index
            )
          "
        >

          <div
            class="card-intro"
          >

            <div
              class="card-flight"
            >

              <div
                class="card-pointer-motion"
              >

              <HighlightCard
                :to="highlight.to"
                :title="
                  highlight.title
                "

                :description="
                  highlight.description
                "

                :image="
                  highlight.image
                "

                :index="
                  index
                "

                @activate="
                  showHighlight(
                    $event,
                    index
                  )
                "
              />

              </div>

            </div>

          </div>

        </div>

      </div>


      <!-- DESCRIPTION -->

      <div
        class="highlight-description"
      >

        <p
          v-if="activeHighlight"

          :key="
            activeHighlight.description
          "

          class="description-rise"
        >
          {{
            activeHighlight.description
          }}
        </p>

      </div>

      </div>

    </div>

  </main>

</template>
