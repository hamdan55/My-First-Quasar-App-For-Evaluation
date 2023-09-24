
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    name: 'news-details',
    path: '/news-details',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'news-details', component: () => import('pages/news-details.vue') }
    ]
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
