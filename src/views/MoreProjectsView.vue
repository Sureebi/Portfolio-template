<script setup>
import {
  computed
} from 'vue'

import '../more-projects.css'

import {
  useLanguage
} from '../composables/useLanguage'


const {
  t
} = useLanguage()




const projects =
  computed(() => [

    {
      index:
        '01',

      title:
        t(
          'projects.items.homelab'
        ),

      description:
        t(
          'projects.descriptions.homelab'
        ),

      tags: [
        t(
          'projects.tags.linux'
        ),
        t(
          'projects.tags.docker'
        ),
        t(
          'projects.tags.network'
        )
      ],

      url:
        '#'
    },


    {
      index:
        '02',

      title:
        t(
          'projects.items.mikrotik'
        ),

      description:
        t(
          'projects.descriptions.mikrotik'
        ),

      tags: [
        t(
          'projects.tags.mikrotik'
        ),
        t(
          'projects.tags.routing'
        ),
        t(
          'projects.tags.network'
        )
      ],

      url:
        '#'
    },


    {
      index:
        '03',

      title:
        t(
          'projects.items.immich'
        ),

      description:
        t(
          'projects.descriptions.immich'
        ),

      tags: [
        t(
          'projects.tags.storage'
        ),
        t(
          'projects.tags.docker'
        ),
        t(
          'projects.tags.privacy'
        )
      ],

      url:
        '#'
    }

  ])




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




const experience =
  computed(() => [

    {
      role:
        t(
          'projects.experience.itSpecialist'
        ),

      company:
        'Company / Organization'
    },


    {
      role:
        t(
          'projects.experience.hostingSupport'
        ),

      company:
        'Company / Organization'
    },


    {
      role:
        t(
          'projects.experience.hostingSpecialist'
        ),

      company:
        'Company / Organization'
    },


    {
      role:
        t(
          'projects.experience.techSupport'
        ),

      company:
        'Company / Organization'
    }

  ])
</script>


<template>

  <main class="projects-page">

    <div class="projects-layout">


      

      <section class="projects-left">

        <p class="projects-kicker">
          {{
            t(
              'projects.kicker'
            )
          }}
        </p>


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

          <a
            v-for="
              (
                project,
                index
              ) in projects
            "

            :key="index"

            :href="
              project.url
            "

            class="project-row"
          >

            <span class="project-index">
              {{
                project.index
              }}
            </span>


            <span class="project-copy">

              <strong>
                {{
                  project.title
                }}
              </strong>

              <small>
                {{
                  project.description
                }}
              </small>

              <span class="project-tags">

                <span
                  v-for="
                    (
                      tag,
                      tagIndex
                    ) in project.tags
                  "
                  :key="tagIndex"
                >
                  {{
                    tag
                  }}
                </span>

              </span>

            </span>


            <span
              class="project-arrow"
            >
              {{
                '↗'
              }}
            </span>

          </a>

        </div>

      </section>


      

      <section class="projects-middle">


        

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

    </div>

  </main>

</template>
