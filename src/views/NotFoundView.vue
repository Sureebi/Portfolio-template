<script setup>
import { useLanguage } from '../composables/useLanguage'

const { locale } = useLanguage()
</script>

<template>
  <main class="not-found">
    <p class="not-found-code" aria-hidden="true">404</p>
    <h1>{{ locale === 'bg' ? 'Тази страница не е намерена.' : 'This page could not be found.' }}</h1>
    <p>{{ locale === 'bg' ? 'Адресът може да е променен или да съдържа грешка.' : 'The address may have changed or contain a typo.' }}</p>
    <RouterLink to="/" class="contact-button">{{ locale === 'bg' ? 'Към началото' : 'Back to home' }}</RouterLink>
  </main>
</template>

<style scoped>
.not-found { flex: 1; min-height: 55vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 20px; padding: 48px 24px; text-align: center; }
.not-found-code { font-size: clamp(80px, 18vw, 180px); line-height: 1; color: var(--accent-strong, #048977); margin: 0; font-weight: 700; }
.not-found h1 { font-size: clamp(24px, 5vw, 36px); margin: 0; }
.not-found p { max-width: 50ch; }
.not-found a { display: inline-flex; align-items: center; text-decoration: none; }
</style>
