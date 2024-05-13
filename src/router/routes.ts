export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/index.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/pages/about.vue')
  }
]
