import Vue from 'vue'
import Router from 'vue-router'

import Container from '../components/Container'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/in_theaters'
    },
    {
      path: '/:list',
      component: Container,
      props: true
    }
  ]
})
