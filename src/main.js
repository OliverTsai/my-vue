import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

import BootstrapVue3 from 'bootstrap-vue-3'
import i18n from './i18n'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { createPinia } from 'pinia'

const app = createApp(App);

// 設定映射表
const languageMap = {
    en: 'en',
    'en-US': 'en',
    'en-GB': 'en',
    'zh-HK': 'zh_hk',
    'zh-TW': 'zh_hk',
    'zh-CN': 'zh_cn',
    'zh-SG': 'zh_cn',
    th: 'thai',
    'th-TH': 'thai',
};

// 自動偵測使用者語言
const userLanguage = navigator.language || 'en';

// 設定 i18n 語言，若無支援則回退至預設
const i18nLanguage = languageMap[userLanguage] || 'en';
i18n.global.locale = i18nLanguage;

const pinia = createPinia();

app.use(router).use(BootstrapVue3).use(i18n).use(ElementPlus).use(pinia).mount('#app')
