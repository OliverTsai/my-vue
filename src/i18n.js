import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    home: 'Home',
    soccer: 'Soccer',
    basketball: 'Basketball',
    chinese: '中文',
    english: 'English',
    AllEvents: 'All',
    SoccerEvents:'Soccer',
    BasketballEvents:'Basketball',
    TimeSorting:'Time sorting',
    Live:'Live',
    Finished:'Finished',
    Schedule:'Schedule',
    select_language:'select_language'
  },
  zh: {
    home: '首頁',
    soccer: '足球',
    basketball: '籃球',
    chinese: '中文',
    english: 'English',
    AllEvents: '全部',
    SoccerEvents:'足球',
    BasketballEvents:'籃球',
    TimeSorting:'時間排序',
    Live:'進行中',
    Finished:'已結束',
    Schedule:'賽程',
    select_language:'語言選擇'
  }
}

const i18n = createI18n({
  locale: 'zh', // 设置默认语言
  messages
})

export default i18n