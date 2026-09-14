<script setup>
import {
  useLanguage
} from '../composables/useLanguage'


const {
  t
} = useLanguage()
</script>


<template>

  <main class="about-page">

    <section class="about-layout">


      

      <div class="about-main">

        <p class="about-kicker">
          {{
            t(
              'about.kicker'
            )
          }}
        </p>


        <h1 class="about-title">

          {{
            t(
              'about.title1'
            )
          }}

          <br>

          {{
            t(
              'about.title2'
            )
          }}

          <br>

          {{
            t(
              'about.title3'
            )
          }}

        </h1>


        <div class="about-story">

          <p class="about-lead">
            {{
              t(
                'about.lead'
              )
            }}
          </p>


          <p>
            {{
              t(
                'about.story1'
              )
            }}
          </p>


          <p>
            {{
              t(
                'about.story2'
              )
            }}
          </p>

        </div>

      </div>


      

      <div class="about-side">

        <figure
          class="about-photo"
          aria-hidden="true"
        >

          <div class="about-photo-placeholder">
            <span></span>
            <span></span>
            <span></span>
          </div>

        </figure>


        <div class="about-side-copy">

          <span
            class="about-side-label"
          >
            {{
              t(
                'about.sideLabel'
              )
            }}
          </span>


          <p>
            {{
              t(
                'about.side1'
              )
            }}
          </p>


          <p>
            {{
              t(
                'about.side2'
              )
            }}
          </p>

        </div>

      </div>


    </section>

  </main>

</template>


<style src="../about.css"></style>
