import { ref } from 'vue'

const STORAGE_KEY = 'portfolio-language'

const savedLanguage =
  localStorage.getItem(STORAGE_KEY)

const locale = ref(
  savedLanguage === 'bg'
    ? 'bg'
    : 'en'
)

document.documentElement.lang = locale.value

const isLanguageChanging = ref(false)

const transitionFrom =
  ref(locale.value)

const transitionTo =
  ref(locale.value)

let switching = false


const messages = {

  

  en: {

    brand:
      'Your Name - Your Role',

    nav: {
      highlights: 'Highlights',
      about: 'About me',
      projects: 'More Projects',
      contact: 'Contact me'
    },

    loader: {
      assets:
        'Loading Portfolio Assets'
    },


    

    highlights: {

      open:
        'Open',

      about: {
        title: 'Intro',
        description:
          'A short personal introduction.'
      },

      beyond: {
        title: 'Beyond Work',
        description:
          'Hobbies, interests and life outside of work.'
      },

      journey: {
        title:
          'Journey',

        description:
          'Experience, background and key milestones.'
      },

      lab: {
        title:
        'Lab & Projects',

        description:
          'Infrastructure, networking, self-hosting and hands-on projects.'
      },

      next: {
        title:
          "What's Next",

        description:
          'Future goals, interests and next steps.'
      }

    },


    highlightPages: {

      intro: {
        kicker:
          '01 / Intro',

        title:
          'A short introduction',

        lead:
          'Use this page to introduce who you are, what you do and what kind of work you want to be known for.',

        story:
          'Write a concise personal story here. Keep it practical, specific and easy to scan.',

        note:
          'Replace this placeholder copy with your own background, interests and direction.'
      },

      outside: {
        kicker:
          '02 / Beyond Work',

        title:
          'Beyond the work',

        lead:
          'Use this page for the human side of your portfolio: interests, hobbies and the things that shape your perspective.',

        story:
          'This section works best when it feels personal but still relevant to the overall portfolio.',

        note:
          'Add details that help visitors remember you without turning the page into a biography.'
      },

      journey: {
        kicker:
          '03 / Journey',

        title:
          'Experience and direction',

        lead:
          'Use this page to describe your path, your strongest skills and the environments you have worked in.',

        story:
          'Focus on the kind of problems you solve and the value you bring.',

        note:
          'You can later turn this into a timeline, case study or more detailed experience page.'
      },

      lab: {
        kicker:
          '04 / Lab & Projects',

        title:
          'Projects and experiments',

        lead:
          'Use this page to show practical work, experiments, prototypes, systems or technical explorations.',

        story:
          'Keep the page grounded in outcomes: what you built, why it matters and what tools were involved.',

        note:
          'Add screenshots, diagrams or project cards when your project material is ready.'
      },

      next: {
        kicker:
          '05 / Next',

        title:
          'What comes next',

        lead:
          'Use this page to share what you want to learn, build or explore next.',

        story:
          'This is a good place for goals, open directions and the type of opportunities you are looking for.',

        note:
          'Keep it focused so it feels intentional, not like a generic wishlist.'
      }

    },


    

    about: {

      kicker:
        'About Me',

      title1:
        'Curious mind.',

      title2:
        'Tech-driven.',

      title3:
        'Always building.',

      lead:
        'Write a short lead paragraph about who you are, what you do and what kind of work you care about.',

      story1:
        'Use this paragraph to describe your approach, strengths and the problems you enjoy solving.',

      story2:
        'Use this paragraph for background, learning style, tools or experience that support your story.',

      sideLabel:
        'Beyond the job title',

      side1:
        'Add a few details that make the portfolio feel human and specific without exposing private information.',

      side2:
        'This block can be replaced with a portrait, workspace image or another visual that fits your brand.'

    },


    

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
          'Featured Project 01',

        mikrotik:
          'Featured Project 02',

        immich:
          'Featured Project 03'

      },


      descriptions: {

        homelab:
          'A short project summary explaining the goal, role and result.',

        mikrotik:
          'A short project summary focused on process, tools and impact.',

        immich:
          'A short project summary that can later link to a case study.'

      },


      tags: {

        linux:
          'Linux',

        docker:
          'Docker',

        network:
          'Network',

        mikrotik:
          'Tooling',

        routing:
          'Process',

        storage:
          'Storage',

        privacy:
          'Research'

      },


      focus: {

        linux:
          'Linux & Server Administration',

        selfHosting:
          'Self-Hosting & Infrastructure',

        networking:
          'Networking & Systems',

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


  

  bg: {

    brand:
      'Твоето име - Твоята роля',

    nav: {
      highlights: 'Акценти',
      about: 'За мен',
      projects: 'Още проекти',
      contact: 'Контакт'
    },

    loader: {
      assets:
        'Зареждане на портфолиото'
    },


    

    highlights: {

      open:
        'Отвори',

      about: {
        title: 'Въведение',
        description:
          'Кратко лично представяне.'
      },

      beyond: {
        title:
          'Извън работата',

        description:
          'Хобита, интереси и животът извън работата.'
      },

      journey: {
        title:
          'Път',

        description:
          'Опит, развитие и ключови моменти.'
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
          'Бъдещи цели, интереси и следващи стъпки.'
      }

    },


    highlightPages: {

      intro: {
        kicker:
          '01 / Въведение',

        title:
          'Кратко представяне',

        lead:
          'Използвай тази страница, за да представиш кой си, какво правиш и с каква работа искаш да те свързват.',

        story:
          'Напиши кратка лична история тук. Нека бъде конкретна, практична и лесна за преглед.',

        note:
          'Замени този текст със собствен фон, интереси и посока.'
      },

      outside: {
        kicker:
          '02 / Извън работата',

        title:
          'Извън работата',

        lead:
          'Използвай тази страница за по-човешката страна на портфолиото: интереси, хобита и нещата, които оформят гледната ти точка.',

        story:
          'Тази секция работи най-добре, когато е лична, но остава свързана с цялостното портфолио.',

        note:
          'Добави детайли, които помагат посетителите да те запомнят, без страницата да става биография.'
      },

      journey: {
        kicker:
          '03 / Път',

        title:
          'Опит и посока',

        lead:
          'Използвай тази страница, за да опишеш пътя си, силните си умения и средите, в които си работил.',

        story:
          'Фокусирай се върху проблемите, които решаваш, и стойността, която носиш.',

        note:
          'По-късно можеш да превърнеш това в timeline, case study или по-подробна страница за опита.'
      },

      lab: {
        kicker:
          '04 / Проекти',

        title:
          'Проекти и експерименти',

        lead:
          'Използвай тази страница, за да покажеш практическа работа, експерименти, прототипи, системи или технически проучвания.',

        story:
          'Дръж страницата конкретна: какво си направил, защо има значение и какви инструменти са използвани.',

        note:
          'Добави screenshots, диаграми или project cards, когато материалите са готови.'
      },

      next: {
        kicker:
          '05 / Следващо',

        title:
          'Какво следва',

        lead:
          'Използвай тази страница, за да споделиш какво искаш да учиш, създаваш или изследваш занапред.',

        story:
          'Това е добро място за цели, отворени посоки и типа възможности, които търсиш.',

        note:
          'Нека е фокусирано, за да звучи целенасочено, не като общ списък с желания.'
      }

    },


    

    about: {

      kicker:
        'За мен',

      title1:
        'Любопитен ум.',

      title2:
        'Воден от технологиите.',

      title3:
        'Винаги създавам.',

      lead:
        'Напиши кратък водещ параграф за това кой си, какво правиш и какъв тип работа те интересува.',

      story1:
        'Използвай този параграф, за да опишеш подхода си, силните си страни и проблемите, които обичаш да решаваш.',

      story2:
        'Използвай този параграф за фон, начин на учене, инструменти или опит, които подкрепят историята ти.',

      sideLabel:
        'Извън длъжността',

      side1:
        'Добави няколко детайла, които правят портфолиото по-човешко и конкретно, без да разкриват лична информация.',

      side2:
        'Този блок може да бъде заменен с портрет, снимка на работно място или друг визуален елемент, който пасва на бранда ти.'

    },


    

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
          'Избран проект едно',

        mikrotik:
          'Избран проект две',

        immich:
          'Избран проект три'

      },


      descriptions: {

        homelab:
          'Кратко описание на проекта, целта, ролята и резултата.',

        mikrotik:
          'Кратко описание с фокус върху процеса, инструментите и ефекта.',

        immich:
          'Кратко описание, което по-късно може да води към case study.'

      },


      tags: {

        linux:
          'Linux',

        docker:
          'Docker',

        network:
          'Системи',

        mikrotik:
          'Инструменти',

        routing:
          'Процес',

        storage:
          'Storage',

        privacy:
          'Проучване'

      },


      focus: {

        linux:
          'Linux & Сървърна администрация',

        selfHosting:
          'Self-Hosting & Инфраструктура',

        networking:
          'Мрежи & Системи',

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


  
  await wait(390)


  locale.value =
    language


  localStorage.setItem(
    STORAGE_KEY,
    language
  )


  document.documentElement.lang =
    language


  
  await wait(430)


  isLanguageChanging.value =
    false


  await wait(120)


  switching = false

}




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
