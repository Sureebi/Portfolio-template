<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import personalPhoto from '../assets/highlights/sample-profile.svg'
import { useLanguage } from '../composables/useLanguage'

const { t } = useLanguage()

const photo = ref(null)
let motionPreference
let pointerFrame

function resetPhoto() {
  photo.value?.style.setProperty('--photo-x', '0deg')
  photo.value?.style.setProperty('--photo-y', '0deg')
}

function movePhoto(event) {
  if (event.pointerType !== 'mouse' || motionPreference?.matches) return

  const x = Math.max(-1, Math.min(1, event.clientX / window.innerWidth * 2 - 1))
  const y = Math.max(-1, Math.min(1, event.clientY / window.innerHeight * 2 - 1))

  cancelAnimationFrame(pointerFrame)
  pointerFrame = requestAnimationFrame(() => {
    photo.value?.style.setProperty('--photo-x', `${-y * 5}deg`)
    photo.value?.style.setProperty('--photo-y', `${x * 7}deg`)
  })
}

onMounted(() => {
  motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
  motionPreference.addEventListener('change', resetPhoto)
  window.addEventListener('pointermove', movePhoto, { passive: true })
  window.addEventListener('blur', resetPhoto)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(pointerFrame)
  motionPreference?.removeEventListener('change', resetPhoto)
  window.removeEventListener('pointermove', movePhoto)
  window.removeEventListener('blur', resetPhoto)
})
</script>

<template>
  <main class="personal-page">
    <section class="personal-layout">
      <div class="personal-main">
        <h1 class="personal-title">{{ t('personal.title1') }}</h1>

        <div class="personal-story">
          <p class="personal-lead">{{ t('personal.lead') }}</p>
          <p>{{ t('personal.story1') }}</p>
          <p>{{ t('personal.story2') }}</p>
          <p>{{ t('personal.side1') }}</p>
        </div>
      </div>

      <div class="personal-side">
        <figure ref="photo" class="personal-photo">
          <img :src="personalPhoto" alt="Abstract sample artwork">
        </figure>

        <div class="personal-side-copy">
          <p>{{ t('personal.side2') }}</p>
        </div>
      </div>
    </section>
  </main>
</template>
<style src="../personal.css"></style>
