import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

import NotFoundView from '../views/NotFoundView.vue'
import HighlightsView from '../views/HighlightsView.vue'
import PersonalView from '../views/PersonalView.vue'
import MoreProjectsView from '../views/MoreProjectsView.vue'
import BeyondWorkView from '../views/BeyondWorkView.vue'
import HighlightPageView from '../views/HighlightPageView.vue'
import AboutIntroView from '../views/AboutIntroView.vue'

let pendingScroll

export function finishNavigationScroll() {
  pendingScroll?.()
  pendingScroll = undefined
}

const router = createRouter({
  history: import.meta.env.MODE === 'pages'
    ? createWebHashHistory(import.meta.env.BASE_URL)
    : createWebHistory(import.meta.env.BASE_URL),

  scrollBehavior(to, from, savedPosition) {
    if (to.path === from.path) return false
    if (from.matched.length && window.matchMedia('(max-width: 700px)').matches) {
      finishNavigationScroll()
      return new Promise(resolve => {
        pendingScroll = () => resolve(savedPosition || { top: 0, behavior: 'instant' })
      })
    }
    return savedPosition || { top: 0 }
  },

  routes: [
    {
      path: '/about-card',
      alias: '/intro',
      name: 'about-card',
      component: AboutIntroView
    },
    {
      path: '/cv',
      redirect: '/about-card'
    },
    {
      path: '/professional-journey',
      alias: '/journey',
      name: 'professional-journey',
      component: HighlightPageView,
      props: { section: 'journey' }
    },
    {
      path: '/lab-projects',
      name: 'lab-projects',
      component: HighlightPageView,
      props: { section: 'lab' }
    },
    {
      path: '/whats-next',
      alias: '/next',
      name: 'whats-next',
      component: HighlightPageView,
      props: { section: 'next' }
    },
    {
      path: '/beyond-work',
      alias: '/outside-work',
      name: 'beyond-work',
      component: BeyondWorkView
    },
    {
      path: '/',
      name: 'highlights',
      component: HighlightsView
    },
    {
      path: '/about-me',
      redirect: '/personal'
    },
    {
      path: '/personal',
      name: 'personal',
      component: PersonalView
    },
    {
      path: '/more-projects',
      name: 'more-projects',
      component: MoreProjectsView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView
    }
  ]
})

export default router
