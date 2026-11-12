<script setup>
import {
  computed
} from 'vue'

import {
  RouterLink
} from 'vue-router'

import '../more-projects.css'

import {
  useLanguage
} from '../composables/useLanguage'


const {
  t,
  locale
} = useLanguage()


/* =========================================================
   PROJECTS
========================================================= */

const projects =
  computed(() => [

    {
      title: locale.value === 'bg' ? 'Каталог за студио' : 'Studio catalog',
      detail: locale.value === 'bg'
        ? 'Примерен каталог с категории и филтри.'
        : 'A sample catalog with categories and filters.',
      href: 'https://example.com/'
    },
    {
      title:
        t(
          'projects.items.homelab'
        ),

      detail:
        t(
          'projects.details.homelab'
        ),

      to:
        '/lab-projects?project=homelab-design'
    },


    {
      title:
        t(
          'projects.items.mikrotik'
        ),

      detail:
        t(
          'projects.details.mikrotik'
        ),

      to:
        '/lab-projects?project=network'
    },


    {
      title:
        t(
          'projects.items.immich'
        ),

      detail:
        t(
          'projects.details.immich'
        ),

      to:
        '/lab-projects?project=photos'
    },


    {
      title:
        t(
          'projects.items.portfolio'
        ),

      detail:
        t(
          'projects.details.portfolio'
        ),

      to:
        '/'
    },


    {
      title:
        t(
          'projects.items.scripts'
        ),

      detail:
        t(
          'projects.details.scripts'
        )
    },


    {
      title:
        t(
          'projects.items.monitoring'
        ),

      detail:
        t(
          'projects.details.monitoring'
        )
    },


    {
      title:
        t(
          'projects.items.storage'
        ),

      detail:
        t(
          'projects.details.storage'
        )
    },


    {
      title:
        t(
          'projects.items.networkDocs'
        ),

      detail:
        t(
          'projects.details.networkDocs'
        )
    }

  ])


/* =========================================================
   FOCUS AREAS
========================================================= */

const focusAreas =
  computed(() => [

    t(
      'projects.focus.linux'
    ),

    t(
      'projects.focus.selfHosting'
    ),

    t(
      'projects.focus.networking'
    ),

    t(
      'projects.focus.support'
    ),

    t(
      'projects.focus.hosting'
    ),

    t(
      'projects.focus.frontend'
    ),

    t(
      'projects.focus.automation'
    )

  ])


/* =========================================================
   EXPERIENCE
========================================================= */

const experience =
  computed(() => [

    {
      role:
        t(
          'projects.experience.itSpecialist'
        ),

      company:
        'Example Studio'
    },


    {
      role:
        t(
          'projects.experience.hostingSupport'
        ),

      company:
        'Sample Hosting'
    },


    {
      role:
        t(
          'projects.experience.hostingSpecialist'
        ),

      company:
        'Demo Cloud'
    },


    {
      role:
        t(
          'projects.experience.techSupport'
        ),

      company:
        'Example Support'
    }

  ])
</script>


<template>

  <main class="projects-page">

    <div class="projects-layout">


      <!-- LEFT -->

      <section class="projects-left">
        <h1 class="projects-title">

          {{
            t(
              'projects.title1'
            )
          }}

          <br>

          {{
            t(
              'projects.title2'
            )
          }}

        </h1>


        <div class="projects-list">

          <component
            v-for="
              (
                project,
                index
              ) in projects
            "

            :key="index"

            :is="
              project.to
                ? RouterLink
                : project.href ? 'a' : 'div'
            "

            :to="
              project.to
            "
            :href="project.href"
            :target="project.href ? '_blank' : undefined"
            :rel="project.href ? 'noopener noreferrer' : undefined"

            class="project-row"
          >

            <span class="project-copy">

              <span class="project-title">
                {{
                  project.title
                }}
              </span>


              <span class="project-detail">
                {{
                  project.detail
                }}
              </span>

            </span>


            <span
              v-if="project.to || project.href"
              class="project-arrow"
              aria-hidden="true"
            >
              {{ project.href ? '↗' : '→' }}
            </span>

          </component>

        </div>

      </section>


      <!-- MIDDLE -->

      <section class="projects-middle">


        <!-- FOCUS -->

        <div class="projects-section">

          <h2 class="section-title">
            {{
              t(
                'projects.focusTitle'
              )
            }}
          </h2>


          <div class="focus-list">

            <span
              v-for="
                (
                  area,
                  index
                ) in focusAreas
              "

              :key="index"

              class="focus-row"
            >
              {{
                area
              }}
            </span>

          </div>

        </div>


        <!-- EXPERIENCE -->

        <div
          class="
            projects-section
            experience-section
          "
        >

          <h2 class="section-title">
            {{
              t(
                'projects.experienceTitle'
              )
            }}
          </h2>


          <div class="experience-list">

            <div
              v-for="
                (
                  item,
                  index
                ) in experience
              "

              :key="index"

              class="experience-row"
            >

              <span
                class="experience-role"
              >
                {{
                  item.role
                }}
              </span>


              <span
                class="
                  experience-company
                "
              >
                {{
                  item.company
                }}
              </span>

            </div>

          </div>

        </div>

      </section>


      <!-- VISUAL -->

      <aside
        class="projects-visual"
        aria-hidden="true"
      >

        <div class="projects-sculpture">
          <span
            v-for="index in 22"
            :key="index"
          />
        </div>

      </aside>

    </div>

  </main>

</template>
