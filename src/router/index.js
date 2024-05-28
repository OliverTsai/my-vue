// import { createRouter, createWebHistory } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { store } from '@/store';

import MobileHome from '@/views/HomeView.vue';
import mHome from '@/views/m/mHomeView.vue';

import MobileSoccer from '@/views/SoccerView.vue';
import mSoccer from '@/views/m/mSoccerView.vue';

import MobileBasketball from '@/views/BasketballView.vue';
import mBasketball from '@/views/m/mBasketballView.vue';


const routes = [
  // 電腦網頁
  {
    path: '/',
    name: 'home',
    component: () => {
      return store.isMobile ? mHome : MobileHome;
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/soccer',
    name: 'soccer',
    component: () => {
      return store.isMobile ? mSoccer : MobileSoccer;
    }
  },
  {
    path: '/basketball',
    name: 'Basketball',
    component: () => {
      return store.isMobile ? mBasketball : MobileBasketball;
    }
  }
  // 手機網頁
  // {
  //   path: '/m',
  //   name: 'm-home',
  //   component: mHome
  // },
  // {
  //   path: '/m/soccer',
  //   name: 'm-soccer',
  //   component: mSoccer
  // },
  // {
  //   path: '/m/basketball',
  //   name: 'm-basketball',
  //   component: mBasketball
  // }
]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHistory(),
  routes
})

export default router
