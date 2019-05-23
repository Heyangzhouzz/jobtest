const notFound = () => import(/* webpackChunkName: "notFound" */ '@/views/error/404.vue')
const Home = () => import(/* webpackChunkName: "Home" */ '@/views/Home.vue')
const resume = () => import(/* webpackChunkName: "resume" */ '@/views/resume.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/resume',
    name: 'resume',
    component: resume
  },
  {
    path: '/404',
    component: notFound,
    hidden: true
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
export default routes
