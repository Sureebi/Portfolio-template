<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLanguage } from './composables/useLanguage'
import { finishNavigationScroll } from './router'

const router = useRouter()

const transitionName = ref('page')


/* =========================================================
   LANGUAGE
========================================================= */

const {
  locale,
  isLanguageChanging,
  transitionFrom,
  transitionTo,
  setLanguage,
  t
} = useLanguage()


const copiedEmail = ref(false)
const copyFailed = ref(false)
const contactOpen = ref(false)
const contactWrap = ref(null)
const contactTrigger = ref(null)
const sendEmail = ref(null)
const mobileContact = ref(false)
let contactMedia
let copyTimeout

function updateContactPosition() {
  mobileContact.value = contactMedia.matches
  contactOpen.value = false
}

async function toggleContact() {
  contactOpen.value = !contactOpen.value
  if (contactOpen.value) {
    await nextTick()
    sendEmail.value?.focus()
  }
}

function closeContact(event) {
  if (!contactOpen.value) return
  if (event.type === 'keydown') {
    if (event.key !== 'Escape') return
    contactOpen.value = false
    contactTrigger.value?.focus()
  } else if (!contactWrap.value?.contains(event.target)) {
    contactOpen.value = false
  }
}

onMounted(() => {
  contactMedia = window.matchMedia('(max-width: 700px)')
  updateContactPosition()
  contactMedia.addEventListener('change', updateContactPosition)
  document.addEventListener('pointerdown', closeContact)
  document.addEventListener('keydown', closeContact)
  document.addEventListener('focusin', closeContact)
})

function copyEmailWithSelection(email) {
  const previousFocus = document.activeElement
  const selection = window.getSelection()
  const ranges = selection
    ? Array.from({ length: selection.rangeCount }, (_, index) => selection.getRangeAt(index).cloneRange())
    : []
  const textarea = document.createElement('textarea')
  textarea.value = email
  textarea.readOnly = true
  textarea.tabIndex = -1
  textarea.style.cssText = 'position:fixed;top:0;left:0;opacity:0;font-size:16px;pointer-events:none;'

  try {
    contactWrap.value.appendChild(textarea)
    textarea.focus({ preventScroll: true })
    textarea.select()
    textarea.setSelectionRange(0, email.length)
    return document.execCommand('copy') === true
  } catch {
    return false
  } finally {
    textarea.remove()
    previousFocus?.focus({ preventScroll: true })
    if (selection) {
      selection.removeAllRanges()
      ranges.forEach(range => selection.addRange(range))
    }
  }
}

async function copyEmail() {
  const email = 'hello@example.com'
  let succeeded = copyEmailWithSelection(email)
  if (!succeeded) {
    try {
      await navigator.clipboard.writeText(email)
      succeeded = true
    } catch {
      succeeded = false
    }
  }
  copiedEmail.value = succeeded
  copyFailed.value = !succeeded
  window.clearTimeout(copyTimeout)
  copyTimeout = window.setTimeout(() => {
    copiedEmail.value = false
    copyFailed.value = false
  }, 4000)
}

onBeforeUnmount(() => {
  contactMedia?.removeEventListener('change', updateContactPosition)
  window.clearTimeout(copyTimeout)
  document.removeEventListener('pointerdown', closeContact)
  document.removeEventListener('keydown', closeContact)
  document.removeEventListener('focusin', closeContact)
})

/* =========================================================
   ROUTE TRANSITIONS
========================================================= */

router.beforeEach((to, from) => {

  const cardRoutes = {
    'about-card': 'about-card',
    'beyond-work': 'beyond',
    'professional-journey': 'journey',
    'lab-projects': 'lab',
    'whats-next': 'next'
  }

  if (cardRoutes[to.name] && to.name !== from.name) {
    transitionName.value = `to-${cardRoutes[to.name]}`
    return
  }

  if (cardRoutes[from.name] && to.name !== from.name) {
    transitionName.value = `from-${cardRoutes[from.name]}`
    return
  }

  /* Highlights → About */
  if (
    from.name === 'highlights' &&
    to.name === 'personal'
  ) {
    transitionName.value = 'to-personal'
  }

  /* About → Highlights */
  else if (
    from.name === 'personal' &&
    to.name === 'highlights'
  ) {
    transitionName.value = 'from-personal'
  }

  /* Highlights → Projects */
  else if (
    from.name === 'highlights' &&
    to.name === 'more-projects'
  ) {
    transitionName.value = 'to-projects'
  }

  /* Projects → Highlights */
  else if (
    from.name === 'more-projects' &&
    to.name === 'highlights'
  ) {
    transitionName.value = 'from-projects'
  }

  /* About → Projects */
  else if (
    from.name === 'personal' &&
    to.name === 'more-projects'
  ) {
    transitionName.value = 'personal-to-projects'
  }

  /* Projects → About */
  else if (
    from.name === 'more-projects' &&
    to.name === 'personal'
  ) {
    transitionName.value = 'projects-to-personal'
  }

  else {
    transitionName.value = 'page'
  }

})
</script>


<template>

  <div class="portfolio">

    <!-- =====================================================
         HEADER
    ====================================================== -->

    <header class="site-header">

      <!-- BRAND -->

      <div class="header-left">

        <RouterLink
          to="/"
          class="header-brand"
          exact-active-class="header-brand-active"
        >
          {{ t('brand') }}
        </RouterLink>

      </div>


      <!-- NAVIGATION -->

      <nav class="header-center">

        <RouterLink
          to="/"
          class="nav-link"
          exact-active-class="nav-link-active"
        >
          <span class="nav-desktop-label">{{ t('nav.highlights') }}</span>
          <span class="nav-mobile-label">{{ locale === 'bg' ? 'Акценти' : 'Highlights' }}</span>
        </RouterLink>


        <span class="nav-separator">
          |
        </span>


        <RouterLink
          to="/personal"
          class="nav-link"
          exact-active-class="nav-link-active"
        >
          <span class="nav-desktop-label">{{ t('nav.about') }}</span>
          <span class="nav-mobile-label">{{ locale === 'bg' ? 'За мен' : 'About me' }}</span>
        </RouterLink>


        <span class="nav-separator">
          |
        </span>


        <RouterLink
          to="/more-projects"
          class="nav-link"
          exact-active-class="nav-link-active"
        >
          <span class="nav-desktop-label">{{ t('nav.projects') }}</span>
          <span class="nav-mobile-label">{{ locale === 'bg' ? 'Проекти' : 'Projects' }}</span>
        </RouterLink>

      </nav>


      <!-- LANGUAGE / CONTACT -->

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


<Teleport to="#footer-contact" :disabled="!mobileContact" defer>
<div ref="contactWrap" class="contact-wrap">

  <button
    ref="contactTrigger"
    type="button"
    :aria-expanded="contactOpen"
    aria-controls="contact-panel"
    @click="toggleContact"
    class="contact-button"
  >
    {{
      locale === 'bg'
        ? 'Свържи се'
        : 'Get in Touch'
    }}
  </button>


  <section v-if="contactOpen" id="contact-panel" class="contact-panel" :aria-label="locale === 'bg' ? 'Контакт по имейл' : 'Contact by email'">
    <p class="contact-panel-label">{{ locale === 'bg' ? 'Пиши ми на' : 'Email me at' }}</p>
    <p class="contact-email">hello@example.com</p>
    <div class="contact-panel-actions">
      <a ref="sendEmail" href="mailto:hello@example.com" class="contact-send" :aria-label="locale === 'bg' ? 'Изпрати имейл' : 'Send email'">{{ locale === 'bg' ? 'Изпрати имейл' : 'Send email' }} <span aria-hidden="true">↗</span></a>
      <button type="button" class="contact-copy" @click="copyEmail">{{ copiedEmail ? (locale === 'bg' ? 'Копирано!' : 'Copied!') : (locale === 'bg' ? 'Копирай' : 'Copy') }}</button>
    </div>
    <p class="contact-feedback" role="status" aria-live="polite">{{ copyFailed ? (locale === 'bg' ? 'Копирането не успя. Маркирай адреса и го копирай ръчно.' : 'Could not copy. Select the address and copy it manually.') : copiedEmail ? (locale === 'bg' ? 'Имейлът е копиран.' : 'Email copied to clipboard.') : '' }}</p>
  </section>

</div>

      </Teleport>
      </div>

    </header>


    <!-- =====================================================
         PAGE ROUTER
    ====================================================== -->

    <RouterView v-slot="{ Component, route }">

      <Transition
        :name="mobileContact ? 'mobile-page' : transitionName"
        mode="out-in"
        @enter="finishNavigationScroll"
        :duration="mobileContact ? { enter: 240, leave: 180 } : {
          enter: 620,
          leave: 500
        }"
      >

        <component
          :is="Component"
          :key="route.path"
        />

      </Transition>

    </RouterView>


    <!-- =====================================================
         LANGUAGE TRANSITION
    ====================================================== -->

    <div
      class="language-transition"
      :class="{
        'is-active': isLanguageChanging
      }"
      aria-hidden="true"
    >

      <!-- expanding mint layer -->

      <div
        class="language-transition__wash"
      ></div>


      <!-- EN ─── BG -->

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


    <!-- =====================================================
         FOOTER
    ====================================================== -->

    <footer class="site-footer">

      <div class="footer-links">

        <a
          href="https://example.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>


        <span>|</span>


        <a
          href="https://example.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          CV
        </a>


        <span>|</span>


        <a
          href="https://example.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>

      </div>

      <div id="footer-contact"></div>
    </footer>

  </div>

</template>
