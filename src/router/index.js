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

import LineUp from '@/components/Soccer_LineUpView.vue';
import mLineUp from '@/components/m/mSoccer_LineUpView.vue';

import Overview from '@/components/Soccer_OverviewView.vue';
import mOverview from '@/components/m/mSoccer_OverviewView.vue';

import Technical from '@/components/Soccer_TechnicalStatisticsView.vue';
import mTechnical from '@/components/m/mSoccer_TechnicalStatisticsView.vue';

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
    path: '/league/:id',
    name: 'league',
    component: store.isMobile ? mLeagueView : LeagueView,
  },
  {
    path: '/LineUp',
    name: 'LineUp',
    component: store.isMobile ? mLineUp : LineUp,
  },
  {
    path: '/Overview',
    name: 'Overview',
    component: store.isMobile ? mOverview : Overview,
  },
  {
    path: '/Technical',
    name: 'Technical',
    component: store.isMobile ? mTechnical : Technical,
  },

]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
})

export default router;
