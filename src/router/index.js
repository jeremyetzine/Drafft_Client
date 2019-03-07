import Vue from 'vue'
import Router from 'vue-router'
import Signin from '@/components/Signin'
import Signup from '@/components/Signup'
import Drafts from '@/components/drafts/Drafts'
import Draft from '@/components/drafts/Draft'
import Squad from '@/components/Squad'

Vue.use(Router)

// const Draft = {
//   template: `<div>Draft {{ $route.params.id }}</div>`
// }

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/draft',
      name: 'Draft',
      component: Draft
    },
    {
      path: '/drafts',
      name: 'Drafts',
      component: Drafts
    },
    {
      path: '/squad',
      name: 'Squad',
      component: Squad
    }
  ]
})
