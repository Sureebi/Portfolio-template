<script setup>
import { computed } from 'vue'
import { useLanguage } from '../composables/useLanguage'
import InteractiveShip from '../components/InteractiveShip.vue'

const { t, locale } = useLanguage()
const coverageLinks = computed(() => [
  {
    label: locale.value === 'bg' ? 'Примерна публикация' : 'Sample feature',
    href: 'https://example.com/'
  }
])
</script>

<template>
  <main class="beyond-page">
    <div class="beyond-content">
      <section class="beyond-intro" aria-labelledby="beyond-title">
        <figure class="beyond-illustration">
          <InteractiveShip :alt="t('beyondWork.imageAlt')" :loading-label="t('loader.assets')" />
        </figure>
        <div class="beyond-story">
          <h1 id="beyond-title">{{ t('beyondWork.title') }}</h1>
          <p class="beyond-lead">{{ t('beyondWork.lead') }}</p>
          <p>{{ t('beyondWork.story1') }}</p>
          <p>{{ t('beyondWork.story2') }}</p>
          <p>{{ t('beyondWork.outdoors1') }}</p>
          <p>{{ t('beyondWork.outdoors2') }}</p>
          <nav class="beyond-coverage" aria-label="Press coverage">
            <a v-for="link in coverageLinks" :key="link.href" :href="link.href" target="_blank" rel="noopener noreferrer">
              {{ link.label }} <span aria-hidden="true">&nearr;</span>
            </a>
          </nav>
        </div>
      </section>
    </div>
  </main>
</template>

<style>
.portfolio:has(.beyond-page)::before { opacity: .2; }
.portfolio:has(.beyond-page)::after { opacity: .07; }

.beyond-page {
  position: relative;
  z-index: 1;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 24px max(24px, 6%) 40px;
  scrollbar-gutter: stable;
  font-family: var(--font-body);
}

.beyond-content { width: min(1240px, 100%); margin: auto; }
.beyond-intro {
  display: grid;
  grid-template-columns: minmax(0, .85fr) minmax(0, 1.15fr);
  gap: 64px;
  align-items: center;
  padding: 8px 0 32px;
}
.beyond-illustration { margin: 0; mix-blend-mode: multiply; }
.beyond-illustration img {
  display: block;
  width: 100%;
  height: auto;
  max-height: 510px;
  object-fit: contain;
}
.beyond-kicker {
  margin: 0 0 18px;
  color: var(--muted);
  font-size: 12px;
  text-transform: uppercase;
}
.beyond-story h1 {
  margin: 0 0 24px;
  max-width: none;
  font-family: var(--font-display);
  font-size: 38px;
  line-height: 1.12;
  font-weight: 600;
  letter-spacing: 0;
  white-space: nowrap;
}
.beyond-story p {
  margin: 0 0 16px;
  font-size: 16px;
  line-height: 1.7;
  max-width: 65ch;
}
.beyond-story .beyond-lead {
  font-size: 16px;
}
.beyond-coverage { display: grid; align-content: start; gap: 8px; max-width: 65ch; margin-top: 30px; }
.beyond-coverage a { color: rgba(33,52,45,.8); font-size: 16px; line-height: 1.5; text-decoration: none; transition: color 180ms ease, transform 220ms var(--ease-out); }
.beyond-coverage a:hover, .beyond-coverage a:focus-visible { color: var(--accent-strong); transform: translateX(5px); }
.beyond-coverage span { margin-left: 5px; }

.to-beyond-enter-active .beyond-illustration { animation: beyond-ship-arrive 680ms 40ms var(--ease-out) both; }
.to-beyond-enter-active .beyond-story > * { opacity: 0; animation: beyond-copy-arrive 420ms var(--ease-out) forwards; }
.to-beyond-enter-active .beyond-story > :nth-child(1) { animation-delay: 110ms; }
.to-beyond-enter-active .beyond-story > :nth-child(2) { animation-delay: 150ms; }
.to-beyond-enter-active .beyond-story > :nth-child(3) { animation-delay: 190ms; }
.to-beyond-enter-active .beyond-story > :nth-child(4) { animation-delay: 230ms; }
.to-beyond-enter-active .beyond-story > :nth-child(5) { animation-delay: 270ms; }
.to-beyond-enter-active .beyond-story > :nth-child(6) { animation-delay: 310ms; }
.to-beyond-enter-active .beyond-story > :nth-child(7) { animation-delay: 350ms; }
@keyframes beyond-ship-arrive {
  0% { opacity: 0; transform: translate3d(-76px, 42px, 0) rotate(-5deg) scale(.9); }
  68% { opacity: 1; transform: translate3d(8px, -5px, 0) rotate(1deg) scale(1.015); }
  100% { opacity: 1; transform: none; }
}
@keyframes beyond-copy-arrive { from { opacity: 0; transform: translate3d(36px, 14px, 0); } to { opacity: 1; transform: none; } }

/* Keep the staggered exit inside the router's 730ms leave duration. */
.beyond-page.from-beyond-leave-active {
  pointer-events: none;
  overflow: hidden;
}
.from-beyond-leave-active .beyond-illustration {
  transform-origin: 50% 75%;
  animation: beyond-ship-depart 560ms var(--ease-in) both;
}
.from-beyond-leave-active .beyond-story > * {
  animation: beyond-copy-depart 350ms var(--ease-in) both;
}
.from-beyond-leave-active .beyond-story > :nth-child(1) { animation-delay: 20ms; }
.from-beyond-leave-active .beyond-story > :nth-child(2) { animation-delay: 45ms; }
.from-beyond-leave-active .beyond-story > :nth-child(3) { animation-delay: 70ms; }
.from-beyond-leave-active .beyond-story > :nth-child(4) { animation-delay: 95ms; }
.from-beyond-leave-active .beyond-story > :nth-child(5) { animation-delay: 120ms; }
.from-beyond-leave-active .beyond-story > :nth-child(6) { animation-delay: 145ms; }
.from-beyond-leave-active .beyond-story > :nth-child(7) { animation-delay: 170ms; }
.from-beyond-enter-active {
  transition: opacity 300ms ease-out, transform 420ms var(--ease-out);
}
.from-beyond-enter-from { opacity: 0; transform: translateY(14px); }

@keyframes beyond-ship-depart {
  0% { opacity: 1; transform: translate3d(0, 0, 0) rotate(0) scale(1); }
  22% { opacity: 1; transform: translate3d(8px, -5px, 0) rotate(1deg) scale(1.015); }
  100% { opacity: 0; transform: translate3d(-90px, -32px, 0) rotate(-7deg) scale(.92); }
}
@keyframes beyond-copy-depart {
  from { opacity: 1; transform: translate3d(0, 0, 0); }
  to { opacity: 0; transform: translate3d(56px, -18px, 0); }
}
@media (prefers-reduced-motion: reduce) {
  .to-beyond-enter-active .beyond-illustration,
  .to-beyond-enter-active .beyond-story > *,
  .from-beyond-leave-active .beyond-illustration,
  .from-beyond-leave-active .beyond-story > * {
    animation: none;
  }
  .beyond-page.from-beyond-leave-active { transition: opacity 120ms linear; }
  .beyond-page.from-beyond-leave-to { opacity: 0; }
  .from-beyond-enter-active { transition: opacity 120ms linear; }
  .from-beyond-enter-from { transform: none; }
}
@media (max-width: 800px) {
  .beyond-intro { grid-template-columns: 1fr; gap: 24px; }
  .beyond-illustration img { max-height: 340px; }
  .beyond-story h1 { max-width: 22ch; font-size: 34px; white-space: normal; }
}
@media (max-width: 420px) {
  .beyond-story h1 { font-size: 30px; }
  .beyond-page { padding-inline: 20px; }
}
</style>
