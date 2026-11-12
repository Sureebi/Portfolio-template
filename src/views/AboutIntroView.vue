<script setup>
import { computed } from 'vue'
import { useLanguage } from '../composables/useLanguage'
import portrait from '../assets/highlights/sample-intro.svg'

const { locale } = useLanguage()
const copy = computed(() => locale.value === 'bg' ? {
  title: 'Здравей, аз съм Алекс.',
  lead: 'Разработвам уеб интерфейси и инструменти за екипи.',
  thought: 'Харесвам ясните интерфейси и добре документираните системи.',
  story1: 'Започнах с малки уеб проекти и постепенно преминах към приложения за екипи.',
  story2: 'В свободното си време уча нови инструменти и скицирам идеи.',
  journey: 'Професионален път', projects: 'Лични проекти', beyond: 'Извън работата'
} : {
  title: 'Hi, I’m Alex.',
  lead: 'I build web interfaces and tools for teams.',
  thought: 'I enjoy clear interfaces and well-documented systems.',
  story1: 'I started with small websites and moved on to applications for teams.',
  story2: 'In my spare time I explore new tools and sketch ideas.',
  journey: 'Professional journey', projects: 'Personal projects', beyond: 'Beyond work'
})
</script>

<template>
  <main class="intro-page">
    <div class="intro-inner">
      <section class="intro-layout">
        <div class="intro-narrative">
          <header class="intro-heading">
            <h1>{{ copy.title }}</h1>
            <p>{{ copy.lead }}</p>
          </header>

          <section class="intro-story">
            <p class="intro-thought">{{ copy.thought }}</p>
            <div class="intro-copy">
              <p>{{ copy.story1 }}</p>
              <p>{{ copy.story2 }}</p>
            </div>
          </section>

          <nav class="intro-links" aria-label="Explore">
            <RouterLink to="/professional-journey">{{ copy.journey }} &rarr;</RouterLink>
            <RouterLink to="/lab-projects">{{ copy.projects }} &rarr;</RouterLink>
            <RouterLink to="/beyond-work">{{ copy.beyond }} &rarr;</RouterLink>
          </nav>
        </div>

        <figure class="intro-portrait">
          <div class="intro-portrait-frame">
            <img :src="portrait" :alt="copy.title">
          </div>
        </figure>
      </section>
    </div>
  </main>
</template>

<style>
.intro-page { position: relative; z-index: 1; flex: 1; min-height: 0; overflow-y: auto; scrollbar-gutter: stable; padding: 28px clamp(24px, 6vw, 92px) 44px; }
.portfolio:has(.intro-page)::before { opacity: .15; }
.portfolio:has(.intro-page)::after { opacity: .06; }
.intro-inner { width: min(1240px, 100%); margin: auto; }
.intro-layout { display: grid; grid-template-columns: minmax(0,1fr) minmax(300px,380px); gap: clamp(72px,11vw,164px); align-items: center; padding: 28px 0 22px; }
.intro-narrative { max-width: 720px; }
.intro-heading h1 { max-width: none; margin: 0 0 24px; font: 600 48px/1.08 var(--font-display); letter-spacing: 0; white-space: nowrap; }
.intro-heading > p { max-width: 54ch; margin: 0; color: rgba(33,52,45,.8); font-size: 16px; font-weight: 400; line-height: 1.7; }
.intro-portrait { width: 100%; aspect-ratio: 4 / 5; margin: 0; }
.intro-portrait-frame { width: 100%; height: 100%; overflow: hidden; border-radius: 38% 12% 32% 14% / 28% 16% 26% 18%; box-shadow: 0 16px 36px -24px rgba(33,52,45,.35); }
.intro-portrait img { width: 100%; height: 100%; display: block; object-fit: cover; }

@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .intro-portrait-frame, .intro-portrait img { transition: transform var(--motion-ui) var(--ease-ui); }
  .intro-portrait:hover .intro-portrait-frame { transform: translateY(-4px) rotate(-1deg); }
  .intro-portrait:hover img { transform: scale(1.025); }
}
.intro-story { padding: 42px 0 30px; }
.intro-thought { max-width: 54ch; margin: 0 0 22px; color: rgba(33,52,45,.8); font: 400 16px/1.7 var(--font-body); letter-spacing: 0; }
.intro-copy { display: grid; gap: 18px; max-width: 62ch; }
.intro-copy p { margin: 0; color: rgba(33,52,45,.8); font-size: 16px; font-weight: 400; line-height: 1.7; }
.intro-links { display: flex; flex-wrap: wrap; gap: 12px 34px; padding-top: 10px; }
.intro-links a { position: relative; padding: 10px 0; color: var(--text); font-size: 16px; font-weight: 400; text-decoration: none; }
.intro-links a::after { content: ""; position: absolute; left: 0; bottom: 4px; width: 0; height: 1px; background: var(--accent-strong); transition: width 220ms ease; }
.intro-links a:hover::after, .intro-links a:focus-visible::after { width: 42%; }

.to-about-card-enter-active .intro-heading { animation: intro-heading-in 500ms 40ms var(--ease-out) both; }
.to-about-card-enter-active .intro-portrait { animation: intro-portrait-in 620ms 90ms var(--ease-out) both; }
.to-about-card-enter-active .intro-story { animation: intro-story-in 520ms 150ms var(--ease-out) both; }
.to-about-card-enter-active .intro-links { animation: intro-links-in 360ms 230ms var(--ease-out) both; }
@keyframes intro-heading-in { from { opacity: 0; transform: translate3d(-38px, 16px, 0); } }
@keyframes intro-portrait-in { from { opacity: 0; transform: translate3d(30px, 18px, 0) scale(.96); clip-path: inset(0 0 24% 0); } to { opacity: 1; transform: none; clip-path: inset(0); } }
@keyframes intro-story-in { from { opacity: 0; transform: translateY(22px); } }
@keyframes intro-links-in { from { opacity: 0; transform: translateX(24px); } }
:is(.from-about-card-leave-active, .to-journey-leave-active, .to-lab-leave-active, .to-beyond-leave-active) .intro-heading { animation: intro-heading-out 320ms var(--ease-in) both; }
:is(.from-about-card-leave-active, .to-journey-leave-active, .to-lab-leave-active, .to-beyond-leave-active) .intro-portrait { animation: intro-portrait-out 380ms var(--ease-in) both; }
:is(.from-about-card-leave-active, .to-journey-leave-active, .to-lab-leave-active, .to-beyond-leave-active) .intro-story,
:is(.from-about-card-leave-active, .to-journey-leave-active, .to-lab-leave-active, .to-beyond-leave-active) .intro-links { animation: intro-content-out 360ms var(--ease-in) both; }
@keyframes intro-heading-out { to { opacity: 0; transform: translate3d(-34px, -8px, 0); } }
@keyframes intro-portrait-out { to { opacity: 0; transform: translate3d(28px, 20px, 0) scale(.97); } }
@keyframes intro-content-out { to { opacity: 0; transform: translateY(22px); } }

@media (max-width: 800px) {
  .intro-page { padding: 20px; }
  .intro-layout { grid-template-columns: 1fr; gap: 34px; padding-top: 16px; }
  .intro-heading h1 { font-size: 40px; white-space: normal; }
  .intro-heading > p { font-size: 16px; }
  .intro-portrait { width: min(280px,100%); }
  .intro-story { padding-top: 34px; }
  .intro-copy { gap: 18px; }
  .intro-links { gap: 10px 28px; }
}

@media (prefers-reduced-motion: reduce) {
  .intro-portrait-frame, .intro-portrait img { transition: none; transform: none; }
  .to-about-card-enter-active .intro-portrait,
  :is(.from-about-card-leave-active, .to-journey-leave-active, .to-lab-leave-active, .to-beyond-leave-active) .intro-portrait { animation: none !important; }
  .to-about-card-enter-active .intro-heading, .to-about-card-enter-active .intro-portrait,
  .to-about-card-enter-active .intro-story, .to-about-card-enter-active .intro-links,
  .from-about-card-leave-active .intro-heading, .from-about-card-leave-active .intro-portrait,
  .from-about-card-leave-active .intro-story, .from-about-card-leave-active .intro-links,
  :is(.to-journey-leave-active, .to-lab-leave-active, .to-beyond-leave-active) .intro-heading,
  :is(.to-journey-leave-active, .to-lab-leave-active, .to-beyond-leave-active) .intro-portrait,
  :is(.to-journey-leave-active, .to-lab-leave-active, .to-beyond-leave-active) .intro-story,
  :is(.to-journey-leave-active, .to-lab-leave-active, .to-beyond-leave-active) .intro-links { animation-duration: 1ms !important; animation-delay: 0ms !important; }
}
</style>
