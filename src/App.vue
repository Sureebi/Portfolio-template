<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLanguage } from './composables/useLanguage'

const router = useRouter()

const transitionName = ref('page')

const detailRouteNames = [
  'intro',
  'outside-work',
  'journey',
  'lab-projects',
  'next'
]




const {
  locale,
  isLanguageChanging,
  transitionFrom,
  transitionTo,
  setLanguage,
  t
} = useLanguage()


const copiedEmail = ref(false)

async function copyEmail() {
  const email = 'hello@example.com'

  try {
    await navigator.clipboard.writeText(email)

    copiedEmail.value = true

    window.setTimeout(() => {
      copiedEmail.value = false
    }, 1600)
  } catch {
    const textarea =
      document.createElement('textarea')

    textarea.value = email
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'

    document.body.appendChild(textarea)

    textarea.select()
    document.execCommand('copy')

    document.body.removeChild(textarea)

    copiedEmail.value = true

    window.setTimeout(() => {
      copiedEmail.value = false
    }, 1600)
  }
}



router.beforeEach((to, from) => {

  if (
    from.name === 'highlights' &&
    detailRouteNames.includes(to.name)
  ) {
    transitionName.value = 'to-highlight-detail'
  }

  else if (
    detailRouteNames.includes(from.name) &&
    to.name === 'highlights'
  ) {
    transitionName.value = 'page'
  }

  else if (
    from.name === 'highlights' &&
    to.name === 'about-me'
  ) {
    transitionName.value = 'to-about'
  }

  else if (
    from.name === 'about-me' &&
    to.name === 'highlights'
  ) {
    transitionName.value = 'from-about'
  }

  else if (
    from.name === 'highlights' &&
    to.name === 'more-projects'
  ) {
    transitionName.value = 'to-projects'
  }

  else if (
    from.name === 'more-projects' &&
    to.name === 'highlights'
  ) {
    transitionName.value = 'from-projects'
  }

  else if (
    from.name === 'about-me' &&
    to.name === 'more-projects'
  ) {
    transitionName.value = 'about-to-projects'
  }

  else if (
    from.name === 'more-projects' &&
    to.name === 'about-me'
  ) {
    transitionName.value = 'projects-to-about'
  }

  else {
    transitionName.value = 'page'
  }

})
</script>


<template>

  <div class="portfolio">

    

    <header class="site-header">

      

      <div class="header-left">

        <RouterLink
          to="/"
          class="header-brand"
          exact-active-class="header-brand-active"
        >
          {{ t('brand') }}
        </RouterLink>

      </div>


      

      <nav class="header-center">

        <RouterLink
          to="/"
          class="nav-link"
          exact-active-class="nav-link-active"
        >
          {{ t('nav.highlights') }}
        </RouterLink>


        <span class="nav-separator">
          |
        </span>


        <RouterLink
          to="/about-me"
          class="nav-link"
          exact-active-class="nav-link-active"
        >
          {{ t('nav.about') }}
        </RouterLink>


        <span class="nav-separator">
          |
        </span>


        <RouterLink
          to="/more-projects"
          class="nav-link"
          exact-active-class="nav-link-active"
        >
          {{ t('nav.projects') }}
        </RouterLink>

      </nav>


      

      <div class="header-right">

        <div
          class="language-switcher"
          aria-label="Change language"
        >

          <button
            type="button"
            :class="{
              'is-active': locale === 'en'
            }"
            :disabled="isLanguageChanging"
            :aria-pressed="locale === 'en'"
            @click="setLanguage('en')"
          >
            EN
          </button>


          <span class="language-separator">
            —
          </span>


          <button
            type="button"
            :class="{
              'is-active': locale === 'bg'
            }"
            :disabled="isLanguageChanging"
            :aria-pressed="locale === 'bg'"
            @click="setLanguage('bg')"
          >
            BG
          </button>

        </div>


        <span class="header-divider">
          
        </span>


<div class="contact-wrap">

  <button
    type="button"
    class="contact-button"
    @click="copyEmail"
  >
    {{
      locale === 'bg'
        ? 'Свържи се'
        : 'Get in Touch'
    }}
  </button>


  <Transition name="contact-toast">

    <div
      v-if="copiedEmail"
      class="contact-toast"
    >
      {{
        locale === 'bg'
          ? 'Имейлът е копиран'
          : 'Mail copied to clipboard'
      }}
    </div>

  </Transition>

</div>

      </div>

    </header>


    

    <RouterView v-slot="{ Component, route }">

      <Transition
        :name="transitionName"
        mode="out-in"
        :duration="{
          enter: 950,
          leave: 730
        }"
      >

        <component
          :is="Component"
          :key="route.path"
        />

      </Transition>

    </RouterView>


    

    <div
      class="language-transition"
      :class="{
        'is-active': isLanguageChanging
      }"
      aria-hidden="true"
    >

      

      <div
        class="language-transition__wash"
      ></div>


      

      <div
        class="language-transition__label"
      >

        <span>
          {{ transitionFrom.toUpperCase() }}
        </span>


        <i></i>


        <strong>
          {{ transitionTo.toUpperCase() }}
        </strong>

      </div>

    </div>


    

    <footer class="site-footer">

      <div class="footer-links">

        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>


        <span>|</span>


        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          CV
        </a>


        <span>|</span>


        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>

      </div>

    </footer>

  </div>

</template>
