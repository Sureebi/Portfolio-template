<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useLanguage } from '../composables/useLanguage'
import nextImage from '../assets/highlights/sample-next.svg'
import commandCenterImage from '../assets/projects/sample-dashboard.svg'
import fishspotImage from '../assets/projects/sample-field.svg'
import plovdivFlowImage from '../assets/projects/sample-routes.svg'
import portfolioTemplateImage from '../assets/projects/sample-portfolio.svg'

const props = defineProps({ section: { type: String, required: true } })
const { t, locale } = useLanguage()
const content = computed(() => t(`highlightPages.${props.section}`))
const isJourney = computed(() => props.section === 'journey')
const isLab = computed(() => props.section === 'lab')
const isNext = computed(() => props.section === 'next')
const activeJourneyRole = ref(0)
const activeJourneyItem = computed(() => content.value?.rows?.[activeJourneyRole.value] ?? content.value?.rows?.[0])
const activeLabProject = ref(0)
const route = useRoute()
watch(() => route.query.project, project => {
  const index = content.value?.rows?.findIndex(row => row.visual === project) ?? -1
  activeLabProject.value = index >= 0 ? index : 0
}, { immediate: true })
const homelabDiagram = `                     INTERNET
                        |
                        v
               +-----------------+
               |  Demo gateway   |
               |                 |
               | Router / FW     |
               +--------+--------+
                        |
         +--------------+--------------+
         |              |              |
      TEST LAN       DEMO LAB        Wi-Fi
         |              |              |
         |        +-----+-----+        +-- Phones
         |        |           |        +-- Laptops
         |        v           v        +-- IoT
         |     Node A       Node B
         |       |             |
         |   Containers    Virtual hosts
         |       |             |
         |   +---+---+     +---+------+
         |   |   |   |     |   |      |
         | Dashboard |   Ubuntu Debian Kali
         |   Services     Test VMs
         |     |
         | +---+------------+
         | |   |            |
         |Photos Proxy Monitoring
         |
         +-------- Local Services`
const nextPhoto = ref(null)
let nextMotionPreference
let nextPointerFrame
const activeLabItem = computed(() => content.value?.rows?.[activeLabProject.value] ?? content.value?.rows?.[0])
const activeLabImage = computed(() => ({
  'command-center': commandCenterImage,
  'field-map': fishspotImage,
  'route-map': plovdivFlowImage,
  'portfolio-template': portfolioTemplateImage
})[activeLabItem.value?.visual])
const next = computed(() => ({
  journey: { to: '/lab-projects', key: 'lab' },
  lab: { to: '/whats-next', key: 'next' },
  next: { to: '/', key: 'about' }
})[props.section])

function moveJourneyContext(event) {
  if (window.matchMedia('(prefers-reduced-motion: reduce), (hover: none), (pointer: coarse)').matches) return
  const bounds = event.currentTarget.getBoundingClientRect()
  const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2
  const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2
  event.currentTarget.style.setProperty('--context-x', `${x * 7}px`)
  event.currentTarget.style.setProperty('--context-y', `${y * 7}px`)
}

function resetJourneyContext(event) {
  event.currentTarget.style.setProperty('--context-x', '0px')
  event.currentTarget.style.setProperty('--context-y', '0px')
}

function resetNextPhoto() {
  nextPhoto.value?.style.setProperty('--next-photo-x', '0deg')
  nextPhoto.value?.style.setProperty('--next-photo-y', '0deg')
  nextPhoto.value?.style.setProperty('--next-shift-x', '0px')
  nextPhoto.value?.style.setProperty('--next-shift-y', '0px')
  nextPhoto.value?.style.setProperty('--next-image-x', '0px')
  nextPhoto.value?.style.setProperty('--next-image-y', '0px')
}

function moveNextPhoto(event) {
  if (!isNext.value || event.pointerType !== 'mouse' || nextMotionPreference?.matches) return

  const x = Math.max(-1, Math.min(1, event.clientX / window.innerWidth * 2 - 1))
  const y = Math.max(-1, Math.min(1, event.clientY / window.innerHeight * 2 - 1))

  cancelAnimationFrame(nextPointerFrame)
  nextPointerFrame = requestAnimationFrame(() => {
    nextPhoto.value?.style.setProperty('--next-photo-x', `${-y * 5}deg`)
    nextPhoto.value?.style.setProperty('--next-photo-y', `${x * 7.5}deg`)
    nextPhoto.value?.style.setProperty('--next-shift-x', `${x * 8}px`)
    nextPhoto.value?.style.setProperty('--next-shift-y', `${y * 5}px`)
    nextPhoto.value?.style.setProperty('--next-image-x', `${-x * 5}px`)
    nextPhoto.value?.style.setProperty('--next-image-y', `${-y * 4}px`)
  })
}

onMounted(() => {
  nextMotionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
  nextMotionPreference.addEventListener('change', resetNextPhoto)
  window.addEventListener('pointermove', moveNextPhoto, { passive: true })
  window.addEventListener('blur', resetNextPhoto)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(nextPointerFrame)
  nextMotionPreference?.removeEventListener('change', resetNextPhoto)
  window.removeEventListener('pointermove', moveNextPhoto)
  window.removeEventListener('blur', resetNextPhoto)
})
</script>

<template>
  <main class="highlight-detail-page" :class="{ 'is-resume-page': isJourney, 'is-lab-page': isLab }">
    <div class="highlight-detail-inner">
      <section v-if="isLab" class="lab-showcase-page" aria-labelledby="detail-title">
        <header class="lab-showcase-heading">
          <div>
            <h1 id="detail-title">{{ content.title }}</h1>
            <p>{{ content.lead }}</p>
          </div>
        </header>

        <section class="lab-showcase" :aria-label="content.label">
          <div class="lab-showcase-list">
            <button
              v-for="(row, index) in content.rows"
              :key="row.title"
              type="button"
              :aria-pressed="activeLabProject === index"
              class="lab-showcase-link"
              :class="{ 'is-active': activeLabProject === index }"
              @mouseenter="activeLabProject = index"
              @focus="activeLabProject = index"
              @click="activeLabProject = index"
            >
              <span>
                <strong>{{ row.title }}</strong>
              </span>
              <i aria-hidden="true">→</i>
            </button>
          </div>

          <aside class="lab-project-preview" aria-live="polite">
            <Transition name="lab-image" mode="out-in">
              <a v-if="activeLabImage" :key="activeLabItem.visual" class="lab-preview-image" :class="`is-${activeLabItem.visual}`" :href="activeLabItem.url" target="_blank" rel="noopener noreferrer" :aria-label="activeLabItem.title">
                <img :src="activeLabImage" :alt="activeLabItem.title">
              </a>
              <a v-else-if="activeLabItem.visual === 'homelab-design'" :key="activeLabItem.visual" class="lab-topology-preview" :href="activeLabItem.url" target="_blank" rel="noopener noreferrer" :aria-label="activeLabItem.title">
                <span class="topology-toolbar" aria-hidden="true">
                  <i></i><i></i><i></i>
                  <small>homelab-topology.txt</small>
                </span>
                <pre>{{ homelabDiagram }}</pre>
              </a>
            </Transition>
            <div class="lab-preview-caption">
              <span>{{ activeLabItem.text }}</span>
              <a v-if="activeLabItem.url" class="lab-project-open" :href="activeLabItem.url" target="_blank" rel="noopener noreferrer">
                {{ locale === 'bg' ? 'Отвори проекта' : 'Open project' }} ↗
              </a>
            </div>
          </aside>
        </section>
      </section>

      <section v-if="isNext" class="next-editorial" aria-labelledby="detail-title">
        <header class="next-editorial-header">
          <div>
            <h1 id="detail-title">{{ content.title }}</h1>
          </div>
        </header>

        <div class="next-editorial-content">
          <figure ref="nextPhoto" class="next-editorial-photo">
            <div class="next-photo-image">
              <img :src="nextImage" :alt="content.imageAlt">
            </div>
          </figure>

          <section class="next-directions" :aria-label="content.label">
            <p class="next-statement">{{ content.statement }}</p>
            <div class="next-focus-grid">
              <article v-for="row in content.rows" :key="row.title" class="next-direction">
                <h2>{{ row.title }}</h2>
                <span>{{ row.text }}</span>
              </article>
            </div>
            <p class="next-editorial-lead">{{ content.lead }}</p>
          </section>
        </div>
      </section>

      <section v-if="isJourney" class="journey-page" aria-labelledby="detail-title">
        <section class="journey-screen journey-primary">
          <header class="journey-profile">
            <h1 id="detail-title">{{ content.title }}</h1>
            <p>{{ content.lead }}</p>
          </header>

          <div class="journey-experience">
            <section class="journey-roles" :aria-label="content.label">
              <h2>{{ content.label }}</h2>
              <button
                v-for="(row, index) in content.rows"
                :key="row.title"
                type="button"
                class="journey-role"
                :class="{ 'is-active': activeJourneyRole === index }"
                :aria-pressed="activeJourneyRole === index"
                @mouseenter="activeJourneyRole = index"
                @focus="activeJourneyRole = index"
                @click="activeJourneyRole = index"
              >
                <span class="journey-year">{{ row.year }}</span>
                <span class="journey-track" aria-hidden="true"><i></i></span>
                <span class="journey-role-copy">
                  <strong>{{ row.title }}</strong>
                  <span>{{ row.subtitle }}</span>
                </span>
              </button>
            </section>

            <section
              class="journey-context"
              aria-live="polite"
              @mousemove="moveJourneyContext"
              @mouseleave="resetJourneyContext"
            >
              <Transition name="journey-context" mode="out-in">
                <div :key="activeJourneyItem.title" class="journey-context-inner">
                  <p class="journey-context-company">{{ activeJourneyItem.subtitle }}</p>
                  <h2>{{ activeJourneyItem.title }}</h2>
                  <p>{{ activeJourneyItem.text }}</p>
                  <div class="journey-tools" aria-label="Technologies">
                    <span v-for="tool in activeJourneyItem.tools" :key="tool">{{ tool }}</span>
                  </div>
                  <p class="journey-insight">{{ activeJourneyItem.insight }}</p>
                </div>
              </Transition>
            </section>
          </div>
        </section>

        <section class="journey-screen journey-credentials">
          <h2 class="journey-screen-title">{{ content.credentialsTitle }}</h2>
          <div class="journey-overview">
            <section class="journey-education">
              <h3>{{ content.educationTitle }}</h3>
              <article v-for="item in content.education" :key="item.title">
                <h4>{{ item.title }}</h4>
                <p>{{ item.subtitle }}</p>
                <span>{{ item.text }}</span>
              </article>
            </section>

            <section class="journey-certificates">
              <h3>{{ content.certificatesTitle }}</h3>
              <ul>
                <li v-for="item in content.certificates" :key="item">{{ item }}</li>
              </ul>
            </section>

            <section class="journey-skills">
              <h3>{{ content.skillsTitle }}</h3>
              <ul>
                <li v-for="item in content.skills" :key="item">{{ item }}</li>
              </ul>
            </section>
          </div>

          <nav class="detail-navigation journey-navigation" :aria-label="t('nav.highlights')">
            <RouterLink :to="next.to">{{ t('highlightPages.nextPage') }}: {{ t(`highlights.${next.key}.title`) }} &rarr;</RouterLink>
          </nav>
        </section>
      </section>

      <nav v-if="!isJourney" class="detail-navigation" :aria-label="t('nav.highlights')">
        <RouterLink :to="next.to"><template v-if="!isNext">{{ t('highlightPages.nextPage') }}: {{ t(`highlights.${next.key}.title`) }}</template><template v-else>{{ t('nav.highlights') }}</template> &rarr;</RouterLink>
      </nav>
    </div>
  </main>
</template>

<style>
.portfolio:has(.highlight-detail-page)::before { opacity: .2; }
.portfolio:has(.highlight-detail-page)::after { opacity: .08; }
.highlight-detail-page { position: relative; z-index: 1; flex: 1; min-height: 0; overflow-y: auto; scrollbar-gutter: stable; padding: 18px clamp(22px, 5vw, 76px) 38px; }
.highlight-detail-inner { width: min(1320px, 100%); margin: 0 auto; }
.detail-navigation { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 18px; padding-top: 8px; font-size: 13px; }
.detail-navigation a { position: relative; padding: 10px 0; text-decoration: none; transition: opacity 180ms ease; }
.detail-navigation a::after { content: ""; position: absolute; left: 50%; bottom: 2px; width: 0; height: 2px; border-radius: 2px; background: var(--accent-strong); transform: translateX(-50%); transition: width 220ms ease; }
.detail-navigation a:hover { opacity: .65; }
.detail-navigation a:hover::after, .detail-navigation a:focus-visible::after { width: 35%; }
.is-lab-page .highlight-detail-inner { width: min(1380px, 100%); }
.lab-showcase-page { padding: 12px 0 6px; }
.lab-showcase-heading { padding: 18px 0 38px; }
.lab-showcase-heading > div { max-width: 650px; }
.lab-showcase-heading h1 { margin: 0 0 10px; font: 550 22px/1.25 var(--font-display); letter-spacing: 0; }
.lab-showcase-heading p { max-width: 58ch; margin: 0; color: rgba(33,52,45,.78); font-size: 15px; line-height: 1.6; }
.lab-showcase { display: grid; grid-template-columns: minmax(300px, .76fr) minmax(480px, 1.24fr); gap: clamp(58px, 9vw, 144px); padding: 8px 0 28px; align-items: start; }
.lab-showcase-list { min-width: 0; }
.lab-showcase-link { position: relative; width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 18px; min-height: 48px; padding: 7px 2px; border: 0; border-radius: 0; background: transparent; color: var(--text); font: inherit; text-align: left; text-decoration: none; cursor: pointer; transition: padding-left 240ms var(--ease-out), color 180ms ease; }
.lab-showcase-link:hover, .lab-showcase-link:focus-visible, .lab-showcase-link.is-active { padding-left: 9px; color: var(--accent-strong); outline: none; }
.lab-showcase-link > span { min-width: 0; }
.lab-showcase-link strong { color: inherit; font: 400 15px/1.4 var(--font-body); letter-spacing: 0; }
.lab-showcase-link i { color: inherit; font-size: 17px; font-style: normal; opacity: 0; transform: translateX(-8px); transition: opacity 180ms ease, transform 240ms var(--ease-out); }
.lab-showcase-link:hover i, .lab-showcase-link:focus-visible i, .lab-showcase-link.is-active i { opacity: 1; transform: translateX(0); }
.lab-project-preview { min-width: 0; align-self: start; }
.lab-preview-image { position: relative; display: grid; place-items: center; width: 100%; aspect-ratio: 16 / 9; overflow: hidden; padding: clamp(14px, 1.7vw, 24px); border-radius: 3px; background: rgba(49,124,112,.07); }
.lab-preview-image img { width: 100%; height: 100%; display: block; object-fit: contain; object-position: center; filter: saturate(.86) contrast(.94); box-shadow: 0 12px 28px rgba(33,52,45,.1); transition: transform 520ms var(--ease-out), filter 320ms ease; }
.lab-preview-image:hover img, .lab-preview-image:focus-visible img { transform: scale(1.006); filter: saturate(.96) contrast(.98); }
.lab-preview-image.is-command-center { background: rgba(49,124,112,.1); }
.lab-preview-image.is-command-center img { filter: brightness(1.16) saturate(.68) contrast(.82); box-shadow: 0 12px 30px rgba(33,52,45,.14); }
.lab-preview-image.is-command-center:hover img, .lab-preview-image.is-command-center:focus-visible img { filter: brightness(1.13) saturate(.76) contrast(.88); }
.lab-topology-preview { position: relative; display: flex; flex-direction: column; width: 100%; aspect-ratio: 16 / 9; overflow: hidden; border: 1px solid rgba(49,124,112,.22); border-radius: 4px; background: #17231f; color: #b8ded1; text-decoration: none; box-shadow: 0 16px 36px rgba(23,35,31,.13); }
.topology-toolbar { flex: 0 0 34px; display: flex; align-items: center; gap: 6px; padding: 0 13px; border-bottom: 1px solid rgba(184,222,209,.12); background: rgba(255,255,255,.025); }
.topology-toolbar i { width: 6px; height: 6px; border-radius: 50%; background: rgba(184,222,209,.25); }
.topology-toolbar i:nth-child(2) { background: rgba(97,184,158,.55); }
.topology-toolbar small { margin-left: 8px; color: rgba(213,235,227,.58); font: 400 10px/1 var(--font-body); letter-spacing: 0; }
.lab-topology-preview pre { flex: 1; display: grid; place-items: center; margin: 0; padding: 12px 18px 16px; overflow: hidden; color: inherit; font: 500 clamp(8px, .72vw, 11px)/1.12 ui-monospace, SFMono-Regular, Consolas, monospace; letter-spacing: 0; white-space: pre; text-shadow: 0 0 18px rgba(110,220,184,.12); transform: scale(.96); transition: transform 420ms var(--ease-out), color 240ms ease; }
.lab-topology-preview::after { content: ""; position: absolute; inset: 34px 0 0; pointer-events: none; background: linear-gradient(rgba(255,255,255,.018) 50%, transparent 50%); background-size: 100% 4px; opacity: .45; }
.lab-topology-preview:hover pre, .lab-topology-preview:focus-visible pre { color: #d0eee4; transform: scale(.98); }
.lab-image-enter-active { transition: opacity 320ms ease, transform 430ms var(--ease-out), clip-path 430ms var(--ease-out); }
.lab-image-leave-active { transition: opacity 180ms ease, transform 220ms var(--ease-in), clip-path 220ms var(--ease-in); }
.lab-image-enter-from { opacity: 0; transform: translateX(28px) scale(.985); clip-path: inset(0 0 0 16%); }
.lab-image-leave-to { opacity: 0; transform: translateX(-18px) scale(.992); clip-path: inset(0 14% 0 0); }
.lab-image-enter-active img { animation: lab-preview-focus 520ms var(--ease-out) both; }
@keyframes lab-preview-focus {
  from { transform: scale(1.035); filter: saturate(.72) contrast(.88); }
}
.lab-preview-canvas { position: relative; width: 100%; aspect-ratio: 16 / 9; overflow: hidden; border-radius: 3px; background: rgba(49,124,112,.045); transition: background 260ms ease; }
.preview-grid { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(49,124,112,.045), rgba(248,251,249,.2)); }
.preview-object, .preview-route { position: absolute; transition: inset 420ms var(--ease-out), width 420ms var(--ease-out), height 420ms var(--ease-out), border-radius 420ms var(--ease-out), transform 420ms var(--ease-out), background 240ms ease; }
.preview-object { z-index: 2; border: 1px solid rgba(49,124,112,.42); background: rgba(248,251,249,.94); box-shadow: 0 14px 30px rgba(33,52,45,.08); }
.preview-route { z-index: 1; height: 1px; background: rgba(49,124,112,.4); transform-origin: left center; }
.is-homelab .preview-object { left: 25%; width: 50%; height: 13%; border-radius: 3px; }
.is-homelab .preview-object-a { top: 18%; }
.is-homelab .preview-object-b { top: 35%; }
.is-homelab .preview-object-c { top: 52%; }
.is-homelab .preview-object-d { top: 69%; }
.is-homelab .preview-object::after { content: ""; position: absolute; right: 7%; top: 50%; width: 7px; height: 7px; border-radius: 50%; background: var(--accent-strong); transform: translateY(-50%); box-shadow: -16px 0 rgba(49,124,112,.22); }
.is-network .preview-object { width: 82px; height: 42px; border-radius: 4px; }
.is-network .preview-object-a { left: 10%; top: 18%; }
.is-network .preview-object-b { right: 11%; top: 19%; }
.is-network .preview-object-c { left: 42%; top: 43%; border-radius: 50%; }
.is-network .preview-object-d { right: 20%; bottom: 14%; }
.is-network .preview-route-a { left: 20%; top: 35%; width: 52%; transform: rotate(12deg); }
.is-network .preview-route-b { left: 50%; top: 57%; width: 33%; transform: rotate(28deg); }
.is-photos .preview-object { border: 0; border-radius: 3px; background: rgba(49,124,112,.18); }
.is-photos .preview-object-a { left: 12%; top: 14%; width: 44%; height: 46%; }
.is-photos .preview-object-b { right: 12%; top: 14%; width: 27%; height: 28%; background: rgba(33,52,45,.12); }
.is-photos .preview-object-c { left: 12%; bottom: 12%; width: 25%; height: 20%; background: rgba(33,52,45,.12); }
.is-photos .preview-object-d { right: 12%; bottom: 12%; width: 44%; height: 38%; }
.is-portfolio .preview-object-a { inset: 12% 10%; width: auto; height: auto; border-radius: 5px; }
.is-portfolio .preview-object-a::before { content: ""; position: absolute; left: 6%; top: 17%; width: 37%; height: 54%; background: linear-gradient(rgba(49,124,112,.8) 0 14%, transparent 14% 25%, rgba(33,52,45,.16) 25% 31%, transparent 31% 43%, rgba(33,52,45,.1) 43% 49%, transparent 49%); }
.is-portfolio .preview-object-b { right: 16%; top: 26%; width: 31%; height: 48%; border-radius: 3px; background: rgba(49,124,112,.14); }
.is-portfolio .preview-object-c, .is-portfolio .preview-object-d { display: none; }
.is-scripts .preview-object-a { inset: 14% 12%; width: auto; height: auto; border-radius: 5px; background: rgba(25,39,34,.92); }
.is-scripts .preview-object-a::after { content: "> status --all\A  services: running\A  backup: complete\A  network: online"; position: absolute; left: 8%; top: 18%; white-space: pre; color: #a7d9cf; font: 500 clamp(10px, 1.2vw, 14px)/1.8 monospace; }
.is-scripts .preview-object-b, .is-scripts .preview-object-c, .is-scripts .preview-object-d { display: none; }
.lab-preview-caption { padding-top: 16px; }
.lab-preview-caption span { display: block; max-width: 66ch; color: rgba(33,52,45,.76); font-size: 15px; line-height: 1.6; }
.next-editorial { padding: 58px 0 24px; }
.next-editorial-header { padding-bottom: 50px; }
.next-editorial-header h1 { margin: 0; font: 550 38px/1.15 var(--font-display); letter-spacing: 0; white-space: nowrap; }
.next-editorial-lead { max-width: 62ch; margin: 46px 0 0; color: rgba(33,52,45,.78); font-size: 16px; line-height: 1.65; }
.next-editorial-content { display: grid; grid-template-columns: minmax(300px,.62fr) minmax(580px,1.38fr); gap: clamp(58px, 8vw, 126px); align-items: start; }
.next-editorial-photo { --next-photo-x: 0deg; --next-photo-y: 0deg; --next-shift-x: 0px; --next-shift-y: 0px; --next-image-x: 0px; --next-image-y: 0px; position: sticky; top: 24px; width: min(350px,100%); aspect-ratio: 4/5; margin: 0; overflow: hidden; border-radius: 9px; background: rgba(49,124,112,.38); clip-path: polygon(0 0, 88% 0, 100% 10%, 100% 100%, 12% 100%, 0 90%); transform: perspective(900px) translate3d(var(--next-shift-x), var(--next-shift-y), 0) rotateX(var(--next-photo-x)) rotateY(var(--next-photo-y)); transform-style: preserve-3d; transition: transform 700ms cubic-bezier(.16,1,.3,1); will-change: transform; }
.next-photo-image { position: absolute; inset: 1px; overflow: hidden; border-radius: 8px; clip-path: polygon(0 0, 88% 0, 100% 10%, 100% 100%, 12% 100%, 0 90%); }
.next-editorial-photo img { width: calc(100% + 12px); height: calc(100% + 12px); display: block; object-fit: cover; transform: translate3d(calc(-6px + var(--next-image-x)), calc(-6px + var(--next-image-y)), 0) scale(1.025); transition: transform 800ms cubic-bezier(.16,1,.3,1); will-change: transform; }
.next-directions { padding: 4px 0 24px; }
.next-statement { max-width: 52ch; margin: 0 0 clamp(44px,6vh,66px); font: 450 16px/1.65 var(--font-body); letter-spacing: 0; }
.next-focus-grid { display: grid; grid-template-columns: minmax(0,.95fr) minmax(0,.95fr) minmax(0,1.2fr); gap: clamp(26px,3vw,42px); }
.next-direction { max-width: 28ch; }
.next-direction:last-child { max-width: 34ch; }
.next-direction h2 { margin: 0 0 12px; font: 550 18px/1.4 var(--font-display); letter-spacing: 0; }
.next-direction span { display: block; color: rgba(33,52,45,.74); font-size: 16px; line-height: 1.65; }
.is-lab-page .detail-navigation { padding-top: 18px; }

.to-next-enter-active .next-editorial-header { animation: next-heading-in 430ms 30ms var(--ease-out) both; }
.to-next-enter-active .next-editorial-photo { animation: next-photo-in 540ms 60ms var(--ease-out) both; }
.to-next-enter-active .next-direction { opacity: 0; animation: next-row-in 360ms var(--ease-out) forwards; }
.to-next-enter-active .next-direction:nth-child(1) { animation-delay: 120ms; }
.to-next-enter-active .next-direction:nth-child(2) { animation-delay: 170ms; }
.to-next-enter-active .next-direction:nth-child(3) { animation-delay: 220ms; }
.to-next-enter-active .detail-navigation { animation: next-footer-in 320ms 230ms var(--ease-out) both; }
@keyframes next-heading-in { from { opacity: 0; transform: translate3d(-24px, 12px, 0); } }
@keyframes next-photo-in {
  from { opacity: 0; transform: translate3d(0, 34px, 0) scale(.97); clip-path: inset(0 0 24% 0); }
  to { opacity: 1; transform: none; clip-path: inset(0); }
}
@keyframes next-row-in { from { opacity: 0; transform: translate3d(30px, 10px, 0); } to { opacity: 1; transform: none; } }
@keyframes next-footer-in { from { opacity: 0; transform: translateY(14px); } }
.from-next-leave-active .next-editorial-header { animation: next-hero-out 300ms var(--ease-in) both; }
.from-next-leave-active .next-editorial-photo { animation: next-photo-out 380ms var(--ease-in) both; }
.from-next-leave-active .next-directions { animation: next-content-out 390ms 20ms var(--ease-in) both; }
.from-next-leave-active .detail-navigation { animation: next-footer-out 280ms var(--ease-in) both; }
@keyframes next-hero-out { to { opacity: 0; transform: translate3d(-30px, -8px, 0); } }
@keyframes next-photo-out { to { opacity: 0; transform: translate3d(0, 40px, 0) scale(.96); } }
@keyframes next-content-out { to { opacity: 0; transform: translate3d(48px, 0, 0); } }
@keyframes next-footer-out { to { opacity: 0; transform: translateX(28px); } }

.to-lab-enter-active .lab-showcase-heading > div { animation: lab-heading-in 500ms 50ms var(--ease-out) both; }
.to-lab-enter-active .lab-showcase-heading p { animation: lab-copy-in 480ms 110ms var(--ease-out) both; }
.to-lab-enter-active .lab-showcase-link { opacity: 0; animation: lab-row-in 430ms var(--ease-out) forwards; }
.to-lab-enter-active .lab-showcase-link:nth-of-type(1) { animation-delay: 180ms; }
.to-lab-enter-active .lab-showcase-link:nth-of-type(2) { animation-delay: 220ms; }
.to-lab-enter-active .lab-showcase-link:nth-of-type(3) { animation-delay: 260ms; }
.to-lab-enter-active .lab-showcase-link:nth-of-type(4) { animation-delay: 300ms; }
.to-lab-enter-active .lab-showcase-link:nth-of-type(5) { animation-delay: 340ms; }
.to-lab-enter-active .lab-project-preview { animation: lab-preview-in 620ms 120ms var(--ease-out) both; }
.to-lab-enter-active .detail-navigation { animation: lab-footer-in 420ms 310ms var(--ease-out) both; }

@keyframes lab-heading-in {
  from { opacity: 0; transform: translate3d(-34px, 10px, 0); }
}
@keyframes lab-copy-in {
  from { opacity: 0; transform: translate3d(0, 16px, 0); }
}
@keyframes lab-row-in {
  from { opacity: 0; transform: translate3d(-22px, 0, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
@keyframes lab-preview-in {
  from { opacity: 0; transform: translate3d(48px, 16px, 0) scale(.965); clip-path: inset(0 0 0 18%); }
  to { opacity: 1; transform: translate3d(0, 0, 0) scale(1); clip-path: inset(0); }
}
@keyframes lab-footer-in {
  from { opacity: 0; transform: translateY(10px); }
}

.from-lab-leave-active .lab-showcase-heading { animation: lab-heading-out 340ms 20ms var(--ease-in) both; }
.from-lab-leave-active .lab-showcase-list { animation: lab-list-out 380ms var(--ease-in) both; }
.from-lab-leave-active .lab-project-preview { animation: lab-preview-out 430ms 30ms var(--ease-in) both; }
.from-lab-leave-active .detail-navigation { animation: lab-footer-out 260ms var(--ease-in) both; }

@keyframes lab-heading-out {
  to { opacity: 0; transform: translate3d(-28px, -8px, 0); }
}
@keyframes lab-list-out {
  to { opacity: 0; transform: translate3d(-42px, 8px, 0); }
}
@keyframes lab-preview-out {
  to { opacity: 0; transform: translate3d(58px, -10px, 0) scale(.97); clip-path: inset(0 0 0 20%); }
}
@keyframes lab-footer-out {
  to { opacity: 0; transform: translateY(10px); }
}
.is-resume-page { overflow-y: auto; padding-inline: clamp(24px, 5vw, 80px); scroll-behavior: smooth; scroll-snap-type: y mandatory; }
.is-resume-page .highlight-detail-inner { width: min(1380px, 100%); }
.journey-page { margin: -10px 0 -24px; }
.journey-screen { min-height: calc(100svh - 116px); display: flex; flex-direction: column; justify-content: center; scroll-snap-align: start; scroll-snap-stop: always; padding: 34px 0 42px; }
.journey-profile { width: min(440px, 100%); margin-bottom: clamp(38px, 6vh, 66px); }
.journey-profile h1, .journey-screen-title { margin: 0; font: 600 38px/1.15 var(--font-display); letter-spacing: 0; }
.journey-profile p { max-width: 42ch; margin: 18px 0 0; color: rgba(33,52,45,.78); font-size: 16px; line-height: 1.65; }
.journey-roles > h2, .journey-overview h3 { margin: 0 0 20px; font: 600 18px/1.4 var(--font-display); letter-spacing: 0; }
.journey-overview { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(42px, 7vw, 104px); margin-top: clamp(42px, 8vh, 82px); }
.journey-overview article + article { margin-top: 22px; }
.journey-overview h4 { margin: 0 0 5px; font: 500 16px/1.45 var(--font-body); letter-spacing: 0; }
.journey-overview p, .journey-overview article span, .journey-overview li { margin: 0; color: rgba(33,52,45,.7); font-size: 15px; line-height: 1.52; }
.journey-overview article span { display: block; margin-top: 4px; }
.journey-overview ul { display: grid; gap: 7px; list-style: none; margin: 0; padding: 0; }
.journey-experience { display: grid; grid-template-columns: minmax(300px, 32%) minmax(0, 1fr); gap: clamp(48px, 7vw, 110px); align-items: stretch; padding-bottom: 30px; }
.journey-roles { display: flex; flex-direction: column; align-items: stretch; }
.journey-role { min-height: 72px; border: 0; background: transparent; padding: 0; display: grid; grid-template-columns: 48px 28px minmax(0, 1fr); align-items: stretch; text-align: left; cursor: pointer; color: rgba(33,52,45,.48); transition: color 180ms ease; }
.journey-year { align-self: center; color: inherit; font-size: 13px; line-height: 1; font-variant-numeric: tabular-nums; transition: color 180ms ease; }
.journey-track { position: relative; align-self: stretch; }
.journey-track::before { content: ""; position: absolute; left: 7px; top: 0; bottom: 0; width: 1px; background: rgba(49,124,112,.24); }
.journey-role:first-of-type .journey-track::before { top: 50%; }
.journey-role:last-of-type .journey-track::before { bottom: 50%; }
.journey-track i { position: absolute; left: 7px; top: 50%; width: 10px; height: 1px; background: rgba(49,124,112,.42); transform: translateY(-50%); transform-origin: left center; transition: width 300ms var(--ease-out), background 180ms ease; }
.journey-track i::before { content: ""; position: absolute; left: -3px; top: 50%; width: 7px; height: 7px; border-radius: 50%; background: var(--page-bg, #f5faf7); border: 1px solid rgba(49,124,112,.48); transform: translateY(-50%) scale(.75); transition: transform 260ms var(--ease-out), border-color 180ms ease, background 180ms ease; }
.journey-role-copy { align-self: center; display: grid; gap: 4px; transition: transform 300ms var(--ease-out); }
.journey-role-copy strong { font: 500 16px/1.35 var(--font-body); letter-spacing: 0; }
.journey-role-copy > span { color: inherit; font-size: 14px; line-height: 1.4; }
.journey-role:hover, .journey-role:focus-visible, .journey-role.is-active { color: var(--text); outline: none; }
.journey-role:hover .journey-role-copy, .journey-role:focus-visible .journey-role-copy, .journey-role.is-active .journey-role-copy { transform: translateX(8px); }
.journey-role:hover .journey-track i, .journey-role:focus-visible .journey-track i, .journey-role.is-active .journey-track i { width: 23px; background: var(--accent-strong); }
.journey-role:hover .journey-track i::before, .journey-role:focus-visible .journey-track i::before, .journey-role.is-active .journey-track i::before { border-color: var(--accent-strong); background: var(--accent-strong); transform: translateY(-50%) scale(1); }
.journey-role:hover .journey-year, .journey-role:focus-visible .journey-year, .journey-role.is-active .journey-year { color: var(--accent-strong); }
.journey-context { --context-x: 0px; --context-y: 0px; position: relative; left: 24px; box-sizing: border-box; height: 390px; margin: -56px 0 56px; display: flex; align-items: center; padding: clamp(28px, 3.5vw, 48px); overflow: hidden; border-radius: 3px; background: rgba(49,124,112,.055); transform: translate3d(var(--context-x), var(--context-y), 0); transition: transform 650ms cubic-bezier(.16,1,.3,1); }
.journey-context-inner { max-width: 680px; }
.journey-context-company { margin: 0 0 12px; color: var(--accent-strong); font-size: 15px; line-height: 1.5; }
.journey-context h2 { margin: 0 0 18px; font: 600 25px/1.25 var(--font-display); letter-spacing: 0; }
.journey-context-inner > p:not(.journey-context-company):not(.journey-insight) { margin: 0; color: rgba(33,52,45,.82); font-size: 16px; line-height: 1.65; }
.journey-tools { display: flex; flex-wrap: wrap; gap: 8px 18px; margin: 28px 0 24px; }
.journey-tools span { color: var(--accent-strong); font-size: 15px; }
.journey-tools span:not(:last-child)::after { content: "/"; margin-left: 18px; color: rgba(33,52,45,.28); }
.journey-insight { max-width: 60ch; margin: 0; color: rgba(33,52,45,.72); font-size: 16px; line-height: 1.65; }
.journey-context-enter-active, .journey-context-leave-active { transition: opacity 210ms ease, transform 280ms var(--ease-out); }
.journey-context-enter-from { opacity: 0; transform: translateY(14px); }
.journey-context-leave-to { opacity: 0; transform: translateY(-10px); }
.journey-navigation { margin-top: auto; padding: 46px 0 0; }
.to-journey-enter-active .journey-overview { animation: journey-heading-in 440ms 30ms var(--ease-out) both; }
.to-journey-enter-active .journey-roles { animation: journey-roles-in 500ms 80ms var(--ease-out) both; }
.to-journey-enter-active .journey-context { animation: journey-panel-in 560ms 100ms var(--ease-out) both; }
.to-journey-enter-active .journey-navigation { animation: journey-support-in 420ms 180ms var(--ease-out) both; }
@keyframes journey-heading-in { from { opacity: 0; transform: translateY(-18px); } }
@keyframes journey-roles-in { from { opacity: 0; transform: translateX(-34px); } }
@keyframes journey-panel-in { from { opacity: 0; transform: translate3d(42px, 12px, 0); clip-path: inset(0 0 0 18%); } }
@keyframes journey-support-in { from { opacity: 0; transform: translateY(16px); } }
.from-journey-leave-active .journey-overview { animation: journey-heading-out 280ms var(--ease-in) both; }
.from-journey-leave-active .journey-roles { animation: journey-roles-out 330ms var(--ease-in) both; }
.from-journey-leave-active .journey-context { animation: journey-panel-out 360ms var(--ease-in) both; }
.from-journey-leave-active .journey-navigation { animation: journey-support-out 260ms var(--ease-in) both; }
@keyframes journey-heading-out { to { opacity: 0; transform: translateY(-16px); } }
@keyframes journey-roles-out { to { opacity: 0; transform: translateX(-36px); } }
@keyframes journey-panel-out { to { opacity: 0; transform: translate3d(48px, -8px, 0); clip-path: inset(0 0 0 20%); } }
@keyframes journey-support-out { to { opacity: 0; transform: translateY(14px); } }
@media (max-width: 1100px) {
  .journey-experience { grid-template-columns: 280px minmax(0, 1fr); gap: 40px; }
  .journey-overview { gap: 38px; }
}
@media (max-width: 800px) {
  .highlight-detail-page { overflow-x: hidden; padding: 20px; scrollbar-width: none; }
  .highlight-detail-page::-webkit-scrollbar { display: none; }
  .lab-showcase-heading { padding-bottom: 28px; }
  .lab-showcase-heading h1 { font-size: 22px; }
  .lab-showcase { grid-template-columns: 1fr; gap: 34px; }
  .lab-preview-caption { grid-template-columns: 1fr; gap: 5px; }
  .lab-showcase-link { min-height: 50px; }
  .next-editorial { padding-top: 16px; }
  .next-editorial-header { padding-bottom: 36px; }
  .next-editorial-header h1 { font-size: 32px; white-space: normal; }
  .next-editorial-content { grid-template-columns: 1fr; gap: 38px; }
  .next-editorial-photo { position: static; width: min(280px, 100%); }
  .next-directions { padding-top: 0; }
  .next-statement { margin-bottom: 38px; }
  .next-focus-grid { grid-template-columns: 1fr; gap: 30px; }
  .next-direction { max-width: 34ch; }
  .next-editorial-lead { margin-top: 38px; }
  .is-resume-page { scroll-snap-type: none; }
  .journey-screen { min-height: auto; justify-content: flex-start; padding: 30px 0 54px; }
  .journey-overview, .journey-experience { grid-template-columns: 1fr; gap: 30px; }
  .journey-profile { margin-bottom: 34px; }
  .journey-profile h1, .journey-screen-title { font-size: 32px; }
  .journey-overview { margin-top: 38px; }
  .journey-role { grid-template-columns: 44px 26px minmax(0, 1fr); }
  .journey-context { left: 0; width: 100%; height: auto; min-height: 0; margin: 0; padding: 26px; }
  .journey-context h2 { font-size: 22px; }
}
@media (prefers-reduced-motion: reduce) {
  .next-editorial-photo, .next-editorial-photo img { transition: none; }
  .lab-showcase-link, .lab-showcase-link i, .preview-object, .preview-route { transition: none; }
  .lab-image-enter-active, .lab-image-leave-active { transition-duration: 1ms !important; }
  .lab-image-enter-active img { animation: none; }
  .to-lab-enter-active .lab-showcase-heading > div,
  .to-lab-enter-active .lab-showcase-heading p,
  .to-lab-enter-active .lab-showcase-link,
  .to-lab-enter-active .lab-project-preview,
  .to-lab-enter-active .detail-navigation,
  .from-lab-leave-active .lab-showcase-heading,
  .from-lab-leave-active .lab-showcase-list,
  .from-lab-leave-active .lab-project-preview,
  .from-lab-leave-active .detail-navigation,
  .to-next-enter-active .next-editorial-header,
  .to-next-enter-active .next-editorial-photo,
  .to-next-enter-active .next-direction,
  .to-next-enter-active .detail-navigation,
  .from-next-leave-active .next-editorial-header,
  .from-next-leave-active .next-editorial-photo,
  .from-next-leave-active .next-directions,
  .from-next-leave-active .detail-navigation,
  .journey-context { transform: none; transition: none; }
  .journey-context-enter-active, .journey-context-leave-active { transition-duration: 1ms !important; }
  .to-journey-enter-active .journey-overview,
  .to-journey-enter-active .journey-roles,
  .to-journey-enter-active .journey-context,
  .to-journey-enter-active .journey-navigation,
  .from-journey-leave-active .journey-overview,
  .from-journey-leave-active .journey-roles,
  .from-journey-leave-active .journey-context,
  .from-journey-leave-active .journey-navigation { animation-duration: 1ms !important; animation-delay: 0ms !important; }
}
</style>
