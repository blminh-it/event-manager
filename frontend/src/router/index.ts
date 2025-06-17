import { isAuthenticated } from '@/services/auth.service';
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/events',
      name: 'Events',
      component: () => import('../views/Events.vue'),
    },
    {
      path: '/events/:id',
      name: 'EventDetails',
      component: () => import('../views/EventDetails.vue'),
      props: true,
    },
    {
      path: '/my-tickets',
      name: 'MyTickets',
      component: () => import('../views/MyTickets.vue'),
      // meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue'),
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/Register.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: 'Login' })
  }
  else {
    next()
  }
})

export default router
