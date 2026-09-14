<script setup>
import {
  ref,
  computed,
  onMounted
} from 'vue'

import HighlightCards
  from './HighlightCards.vue'

import {
  useLanguage
} from '../composables/useLanguage'


const {
  t
} = useLanguage()




const highlights =
  computed(() => [

    {
      id:
        '01',

      title:
        t(
          'highlights.about.title'
        ),

      description:
        t(
          'highlights.about.description'
        ),

      to:
        '/intro'
    },


    {
      id:
        '02',

      title:
        t(
          'highlights.beyond.title'
        ),

      description:
        t(
          'highlights.beyond.description'
        ),

      to:
        '/outside-work'
    },


    {
      id:
        '03',

      title:
        t(
          'highlights.journey.title'
        ),

      description:
        t(
          'highlights.journey.description'
        ),

      to:
        '/journey'
    },


    {
      id:
        '04',

      title:
        t(
          'highlights.lab.title'
        ),

      description:
        t(
          'highlights.lab.description'
        ),

      to:
        '/lab-projects'
    },


    {
      id:
        '05',

      title:
        t(
          'highlights.next.title'
        ),

      description:
        t(
          'highlights.next.description'
        ),

      to:
        '/next'
    }

  ])




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




const ASSET_VERSION =
  'portfolio-highlights-v1'


const APP_READY_FLAG =
  '__portfolioHighlightsReady'


const firstEverVisit =
  localStorage.getItem(
    ASSET_VERSION
  ) !== 'true'


const alreadyReadyThisApp =
  window[
    APP_READY_FLAG
  ] === true


const assetsReady =
  ref(
    alreadyReadyThisApp
  )


const loadingProgress =
  ref(
    alreadyReadyThisApp
      ? 100
      : 0
  )


const playInitialIntro =
  ref(
    !alreadyReadyThisApp
  )




function preloadImage(src) {

  return new Promise(
    resolve => {

      const img =
        new Image()


      let finished =
        false


      const finish =
        async () => {

          if (finished) {
            return
          }


          finished =
            true


          try {

            if (
              typeof img.decode ===
              'function'
            ) {

              await img.decode()

            }

          } catch {}


          resolve()

        }


      img.onload =
        finish


      img.onerror =
        finish


      img.src =
        src


      if (
        img.complete &&
        img.naturalWidth > 0
      ) {

        finish()

      }

    }
  )

}


function waitForPaint() {

  return new Promise(
    resolve => {

      requestAnimationFrame(
        () => {

          requestAnimationFrame(
            resolve
          )

        }
      )

    }
  )

}




async function preloadAssets() {

  if (
    window[
      APP_READY_FLAG
    ] === true
  ) {

    loadingProgress.value =
      100


    assetsReady.value =
      true


    playInitialIntro.value =
      false


    return
  }


  const images =
    highlights.value
      .map(
        item =>
          item.image
      )
      .filter(Boolean)


  if (
    images.length === 0
  ) {

    loadingProgress.value =
      100


    window[
      APP_READY_FLAG
    ] =
      true


    localStorage.setItem(
      ASSET_VERSION,
      'true'
    )


    assetsReady.value =
      true


    return
  }


  const startedAt =
    performance.now()


  let loaded =
    0


  await Promise.all(

    images.map(
      async src => {

        await preloadImage(
          src
        )


        loaded += 1


        loadingProgress.value =
          Math.round(
            (
              loaded /
              images.length
            ) *
            100
          )

      }
    )

  )


  const minimumLoaderTime =
    firstEverVisit
      ? 900
      : 0


  const elapsed =
    performance.now() -
    startedAt


  if (
    elapsed <
    minimumLoaderTime
  ) {

    await new Promise(
      resolve => {

        setTimeout(
          resolve,

          minimumLoaderTime -
            elapsed
        )

      }
    )

  }


  loadingProgress.value =
    100


  await waitForPaint()


  window[
    APP_READY_FLAG
  ] =
    true


  localStorage.setItem(
    ASSET_VERSION,
    'true'
  )


  assetsReady.value =
    true


  window.setTimeout(
    () => {

      playInitialIntro.value =
        false

    },

    1300
  )

}




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

    '--glint-delay':
      index *
        820 +
      'ms',

    '--sway-delay':
      index *
        -420 +
      'ms',

    '--sway-direction':
      index % 2 === 0
        ? 'alternate'
        : 'alternate-reverse',

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




onMounted(() => {

  if (
    !assetsReady.value
  ) {

    preloadAssets()

  }

})
</script>


<template>

  <main class="highlights-page">


    

    <Transition
      name="asset-loader"
    >

      <div
        v-if="!assetsReady"
        class="highlights-loader"
      >

        <div
          class="loader-copy"

          :data-text="
            t(
              'loader.assets'
            )
          "
        >

          <span>
            {{
              t(
                'loader.assets'
              )
            }}
          </span>

        </div>


        <div
          class="loader-progress"
        >
          {{
            loadingProgress
          }}%
        </div>

      </div>

    </Transition>


    

    <div
      v-if="assetsReady"

      class="highlights-stage"

      :class="{
        'cards-intro':
          playInitialIntro
      }"
    >


      

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

              <HighlightCards
                :number="
                  highlight.id
                "

                :title="
                  highlight.title
                "

                :description="
                  highlight.description
                "

                :action-label="
                  t(
                    'highlights.open'
                  )
                "

                :image="
                  highlight.image
                "

                :index="
                  index
                "

                :to="
                  highlight.to
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

  </main>

</template>
