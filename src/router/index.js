// import { createRouter, createWebHistory } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import { store } from '@/store';

import HomeView from '@/views/HomeView.vue';
import mHomeView from '@/views/m/mHomeView.vue';
import mLiveView from '@/views/m/mLiveView.vue';
import LiveView from '@/views/LiveView.vue';
import SoccerView from '@/views/SoccerView.vue';
import mSoccerView from '@/views/m/mSoccerView.vue';
import BasketballView from '@/views/BasketballView.vue';
import mBasketballView from '@/views/m/mBasketballView.vue';
import mLeagueView from '@/views/m/mLeagueView.vue';
import LeagueView from '@/views/LeagueView.vue';
import mBkLeagueView from '@/views/m/mBkLeagueView.vue';
import BkLeagueView from '@/views/BkLeagueView.vue';
import mBkLiveView from '@/views/m/mBkLiveView.vue';
import BkLiveView from '@/views/BkLiveView.vue';

import testView from '@/views/test2View.vue';


const routes = [
  // 電腦網頁
  {
    path: '/',
    name: 'home',
    component: store.isMobile ? mHomeView : HomeView,
  },
  {
    path: '/live/:date/:id',
    name: 'live',
    component: store.isMobile ? mLiveView : LiveView,
  },
  {
    path: '/bk_live/:date/:id',
    name: 'bk_live',
    component: store.isMobile ? mBkLiveView : BkLiveView,
  },
  {
    path: '/soccer',
    name: 'soccer',
    component: store.isMobile ? mSoccerView : SoccerView,
  },
  {
    path: '/basketball',
    name: 'basketball',
    component: store.isMobile ? mBasketballView : BasketballView,
  },
  {
    path: '/league/:league_id',
    name: 'league',
    component: store.isMobile ? mLeagueView : LeagueView,
  },
  {
    path: '/bk_league/:bk_league_id',
    name: 'bk_league',
    component: store.isMobile ? mBkLeagueView : BkLeagueView,
  },
  {
    path: '/test',
    name: 'test',
    component: store.isMobile ? testView : testView,
  },

]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
})

export default router;
