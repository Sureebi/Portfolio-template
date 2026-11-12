import { ref, watch } from 'vue'
import { highlightPageContent } from '../data/highlightPageContent'

const STORAGE_KEY = 'portfolio-language'

const savedLanguage =
  localStorage.getItem(STORAGE_KEY)

const locale = ref(
  savedLanguage === 'bg'
    ? 'bg'
    : 'en'
)

watch(locale, (language) => {
  document.documentElement.lang = language
  document.title = language === 'bg'
    ? 'Алекс Морган | IT специалист'
    : 'Alex Morgan | IT Specialist'
}, { immediate: true })

const isLanguageChanging = ref(false)

const transitionFrom =
  ref(locale.value)

const transitionTo =
  ref(locale.value)

let switching = false


const messages = {

  /* =======================================================
     ENGLISH
  ======================================================= */

  en: {
    highlightPages: highlightPageContent.en,

    beyondWork: {
      title: 'When I’m away from the computer.',
      lead: 'I make time for model building and other hands-on projects.',
      story1: 'This model ship illustrates how small parts come together in a larger design.',
      story2: 'I sketch each build before cutting or assembling the parts.',
      outdoors1: 'Walks are another chance to observe shapes and textures.',
      outdoors2: 'I keep notes so I can revisit ideas later.',
      imageAlt: 'Fine green technical illustration of a three-masted sailing ship'
    },

    brand:
      'Alex Morgan - IT Specialist',

    nav: {
      highlights: 'Highlights',
      about: 'A little more personal',
      projects: 'More Projects',
      contact: 'Contact me'
    },

    loader: {
      assets:
        'Loading Portfolio Assets...'
    },


    /* =====================================================
       HIGHLIGHTS
    ===================================================== */

    highlights: {

      about: {
        title: 'About Me',
        description:
          'A short introduction.'
      },

      beyond: {
        title: 'Beyond Work',
        description:
          'Hobbies, Interests and life outside of work.'
      },

      journey: {
        title:
          'Professional Journey',

        description:
          'My experience In hosting, IT support and technical environments.'
      },

      lab: {
        title:
          'Lab & Projects',

        description:
          'Ideas, Infrastructure, self-hosting and hands-on projects.'
      },

      next: {
        title:
          "What's Next",

        description:
          'Where I want to grow and what I want to explore next.'
      }

    },


    /* =====================================================
       PERSONAL
    ===================================================== */


personal: {

  title1:
    'Life outside work',

  lead:
    'I set aside time for creative projects away from my desk.',

  story1:
    'I keep a small sketchbook for ideas that might become weekend projects.',

  story2:
    'I enjoy trying new materials and documenting what I learn.',

  side1:
    'A long walk often gives me a fresh perspective.',

  side2:
    'I like keeping some time free for unplanned ideas.'
},

    /* =====================================================
       PROJECTS
    ===================================================== */

    projects: {

      kicker:
        'More Projects',

      title1:
        'Projects &',

      title2:
        'Explorations',

      focusTitle:
        'Focus Areas',

      experienceTitle:
        'Experience',


      items: {

        homelab:
          'Home Lab Infrastructure',

        mikrotik:
          'MikroTik Home Network',

        immich:
          'Immich Self-Hosted Cloud',

        portfolio:
          'Editorial Portfolio',

        scripts:
          'Small Scripts & Automation',

        monitoring:
          'Monitoring & Troubleshooting Notes',

        storage:
          'Storage, Backups & Media Services',

        networkDocs:
          'Network Documentation'

      },


      details: {

        homelab:
          'Servers, services and experiments at home',

        mikrotik:
          'Routing, firewall rules and practical networking',

        immich:
          'Private photo cloud and self-hosted services',

        portfolio:
          'A bilingual portfolio built with Vue and Vite',

        scripts:
          'Utilities for repetitive technical tasks',

        monitoring:
          'Logs, checks and notes from real support work',

        storage:
          'Practical experiments around data, access and recovery',

        networkDocs:
          'Diagrams, configs and things worth writing down'

      },


      focus: {

        linux:
          'Linux & Server Administration',

        selfHosting:
          'Self-Hosting & Infrastructure',

        networking:
          'Networking & MikroTik',

        support:
          'Technical Support',

        hosting:
          'Web Hosting',

        frontend:
          'Frontend Development',

        automation:
          'Automation & Scripting'

      },


      experience: {

        itSpecialist:
          'IT Specialist',

        hostingSupport:
          'Customer Support Hosting Specialist',

        hostingSpecialist:
          'Hosting Specialist',

        techSupport:
          'Technical Support & Customer Care'

      }

    }

  },


  /* =======================================================
     BULGARIAN
  ======================================================= */

  bg: {
    highlightPages: highlightPageContent.bg,

    beyondWork: {
      title: 'Когато не съм пред компютъра.',
      lead: 'Отделям време за моделизъм и други практически занимания.',
      story1: 'Този модел на кораб показва как малките части оформят цялостен дизайн.',
      story2: 'Правя скица, преди да изрежа и сглобя частите.',
      outdoors1: 'Разходките ми дават възможност да наблюдавам форми и текстури.',
      outdoors2: 'Записвам идеи, към които да се върна по-късно.',
      imageAlt: 'Фина зелена техническа рисунка на тримачтов ветроход'
    },

    brand:
      'Алекс Морган - IT Специалист',

    nav: {
      highlights: 'Акценти',
      about: 'Малко по-лично',
      projects: 'Още проекти',
      contact: 'Контакт'
    },

    loader: {
      assets:
        'Зареждане на портфолиото'
    },


    /* =====================================================
       HIGHLIGHTS
    ===================================================== */

    highlights: {

      about: {
        title: 'За мен',
        description:
          'Кратко представяне.'
      },

      beyond: {
        title:
          'Извън работата',

        description:
          'Хобита, интереси и животът извън работата.'
      },

      journey: {
        title:
          'Професионален път',

        description:
          'Опитът ми в хостинг, IT поддръжка и технически среди.'
      },

      lab: {
        title:
          'Лаборатория & Проекти',

        description:
          'Инфраструктура, мрежи, self-hosting и практически проекти.'
      },

      next: {
        title:
          'Какво следва',

        description:
          'Накъде искам да се развивам и какво искам да изследвам занапред.'
      }

    },


    /* =====================================================
       PERSONAL
    ===================================================== */

    personal: {

      title1:
        'Животът ми извън работата',

      lead:
        'Отделям време за творчески проекти далеч от бюрото.',

      story1:
        'Записвам в скицник идеи за малки проекти.',

      story2:
        'Обичам да пробвам различни материали и да записвам наученото.',

      side1:
        'Дългата разходка често ми дава нова гледна точка.',

      side2:
        'Оставям време и за непланирани идеи.'

    },


    /* =====================================================
       PROJECTS
    ===================================================== */

    projects: {

      kicker:
        'Още проекти',

      title1:
        'Проекти &',

      title2:
        'Експерименти',

      focusTitle:
        'Основни направления',

      experienceTitle:
        'Опит',


      items: {

        homelab:
          'Home Lab инфраструктура',

        mikrotik:
          'Домашна MikroTik мрежа',

        immich:
          'Личен SMB облак',

        portfolio:
          'Editorial портфолио',

        scripts:
          'Малки скриптове & автоматизации',

        monitoring:
          'Monitoring & troubleshooting бележки',

        storage:
          'Storage, backup & media услуги',

        networkDocs:
          'Мрежова документация'

      },


      details: {

        homelab:
          'Сървъри, услуги и експерименти вкъщи',

        mikrotik:
          'Routing, firewall правила и практична мрежова работа',

        immich:
          'Личен фото облак и self-hosted услуги',

        portfolio:
          'Двуезично портфолио, Vue / Vite',

        scripts:
          'Малки помощници за повтарящи се технически задачи',

        monitoring:
          'Логове, проверки и бележки от реална поддръжка',

        storage:
          'Практични експерименти с данни, достъп и възстановяване',

        networkDocs:
          'Диаграми, конфигурации и неща, които си струва да останат описани'

      },


      focus: {

        linux:
          'Linux & Сървърна администрация',

        selfHosting:
          'Self-Hosting & Инфраструктура',

        networking:
          'Мрежи & MikroTik',

        support:
          'Техническа поддръжка',

        hosting:
          'Уеб хостинг',

        frontend:
          'Frontend разработка',

        automation:
          'Автоматизация & Скриптове'

      },


      experience: {

        itSpecialist:
          'IT Специалист',

        hostingSupport:
          'Хостинг специалист / Клиентска поддръжка',

        hostingSpecialist:
          'Хостинг специалист',

        techSupport:
          'Техническа поддръжка & Обслужване на клиенти'

      }

    }

  }

}


/* =========================================================
   TRANSLATE
========================================================= */

function t(path) {

  return path
    .split('.')
    .reduce(
      (object, key) =>
        object?.[key],

      messages[
        locale.value
      ]
    ) ?? path

}


/* =========================================================
   LANGUAGE TRANSITION
========================================================= */

function wait(ms) {

  return new Promise(
    resolve =>
      setTimeout(
        resolve,
        ms
      )
  )

}


async function setLanguage(language) {

  if (
    language === locale.value ||
    switching
  ) {
    return
  }


  switching = true


  transitionFrom.value =
    locale.value

  transitionTo.value =
    language


  isLanguageChanging.value =
    true

  const reducedMotion =
    window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches


  /*
    Wait until mint animation
    covers the page.
  */
  await wait(reducedMotion ? 10 : 330)


  locale.value =
    language


  localStorage.setItem(
    STORAGE_KEY,
    language
  )




  /*
    Vue paints the translated text
    behind the transition.
  */
  await wait(reducedMotion ? 10 : 370)


  isLanguageChanging.value =
    false


  await wait(reducedMotion ? 10 : 80)


  switching = false

}


/* =========================================================
   EXPORT
========================================================= */

export function useLanguage() {

  return {
    locale,
    isLanguageChanging,
    transitionFrom,
    transitionTo,
    setLanguage,
    t
  }

}
