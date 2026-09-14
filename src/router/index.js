import { createRouter, createWebHistory } from 'vue-router'

import HighlightsView from '../views/HighlightsView.vue'
import AboutMeView from '../views/AboutMeView.vue'
import MoreProjectsView from '../views/MoreProjectsView.vue'
import HighlightDetailView from '../views/HighlightDetailView.vue'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      name: 'highlights',
      component: HighlightsView
    },
    {
      path: '/about-me',
      name: 'about-me',
      component: AboutMeView
    },
    {
      path: '/intro',
      name: 'intro',
      component: HighlightDetailView,
      props: {
        pageKey: 'intro'
      }
    },
    {
      path: '/outside-work',
      name: 'outside-work',
      component: HighlightDetailView,
      props: {
        pageKey: 'outside'
      }
    },
    {
      path: '/journey',
      name: 'journey',
      component: HighlightDetailView,
      props: {
        pageKey: 'journey'
      }
    },
    {
      path: '/lab-projects',
      name: 'lab-projects',
      component: HighlightDetailView,
      props: {
        pageKey: 'lab'
      }
    },
    {
      path: '/next',
      name: 'next',
      component: HighlightDetailView,
      props: {
        pageKey: 'next'
      }
    },
    {
      path: '/more-projects',
      name: 'more-projects',
      component: MoreProjectsView
    }
  ]
})

export default router
