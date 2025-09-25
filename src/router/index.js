import { createRouter, createWebHistory } from 'vue-router'
import BlogHome from '../views/BlogHome.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: BlogHome,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/guestbook',
      name: 'guestbook',
      component: () => import('../views/GuestbookView.vue'),
    },
    {
      path: '/archive',
      name: 'archive',
      component: () => import('../views/ArchiveView.vue'),
    },
    {
      path: '/post/:id(.+)', // 使用正则表达式匹配所有字符，包括斜杠
      name: 'post',
      component: () => import('../views/BlogPost.vue'),
      props: true
    },
    {
      path: '/category/:category',
      name: 'category',
      component: () => import('../views/CategoryView.vue'),
      props: true
    },
    {
      path: '/tag/:tag',
      name: 'tag',
      component: () => import('../views/TagView.vue'),
      props: true
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchView.vue'),
      props: route => ({ query: route.query.q })
    },
    {
      path: '/profile-test',
      name: 'profile-test',
      component: () => import('../views/ProfileTest.vue')
    },

    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFound.vue')
    },
  ],
})

export default router
