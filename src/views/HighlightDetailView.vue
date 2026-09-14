<script setup>
import {
  computed
} from 'vue'

import {
  useLanguage
} from '../composables/useLanguage'

import '../highlight-detail.css'

const props = defineProps({
  pageKey: {
    type: String,
    required: true
  }
})

const {
  t
} = useLanguage()

const page =
  computed(() => ({
    kicker:
      t(
        `highlightPages.${props.pageKey}.kicker`
      ),

    title:
      t(
        `highlightPages.${props.pageKey}.title`
      ),

    lead:
      t(
        `highlightPages.${props.pageKey}.lead`
      ),

    story:
      t(
        `highlightPages.${props.pageKey}.story`
      ),

    note:
      t(
        `highlightPages.${props.pageKey}.note`
      )
  }))
</script>


<template>

  <main class="highlight-detail-page">

    <section class="highlight-detail-layout">

      <div class="highlight-detail-copy">

        <p class="highlight-detail-kicker">
          {{
            page.kicker
          }}
        </p>

        <h1 class="highlight-detail-title">
          {{
            page.title
          }}
        </h1>

        <p class="highlight-detail-lead">
          {{
            page.lead
          }}
        </p>

      </div>

      <aside class="highlight-detail-panel">

        <div
          class="highlight-detail-visual"
          aria-hidden="true"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div class="highlight-detail-text">

          <p>
            {{
              page.story
            }}
          </p>

          <p>
            {{
              page.note
            }}
          </p>

        </div>

      </aside>

    </section>

  </main>

</template>
