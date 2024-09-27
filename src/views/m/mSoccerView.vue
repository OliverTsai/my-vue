<template>
  <headView @select-match="handleSelectMatch"/>
  <div class="bodyBd">
    <div class="bodyBox">
      <div class="">
        <div class="bannerBox" data-v-d4c6fef0=""><img src="../../assets/banner/scoreBanner_01s_990x102.jpg" class="banner" data-v-d4c6fef0=""><i class="iconfont icon-guanbi close" data-v-d4c6fef0=""></i></div>
        <div class="area_score">
          <div class="w-100">
            <div class="mbodyTitle">
              <div class="bodyTitleBox">
                <button type="button" class="btn btnBox" :class="{ active: selectButtonValue === 'allEvents' }" @click="selectPost('allEvents')">{{$t('AllEvents')}}</button>
                <button type="button" class="btn btnBox" :class="{ active: selectButtonValue === 'live' }" @click="selectPost('live')">{{$t('Live')}}</button>
                <button type="button" class="btn btnBox" :class="{ active: selectButtonValue === 'finished' }" @click="selectPost('finished')">{{$t('Finished')}}</button>
                <button type="button" class="btn btnBox" :class="{ active: selectButtonValue === 'schedule' }" @click="selectPost('schedule')">{{$t('Schedule')}}</button>
              </div>
              <div class="bodyTitleBox">
                <div v-if="selectButtonValue === 'allEvents'" class="btn-group">
                  <button type="button" class="btn btnBox" data-bs-toggle="dropdown" aria-expanded="false">
                    {{ formatDate(selectedDate) }}
                  </button>
                  <ul class="dropdown-menu">
                    <li v-for="date in selectableDates" :key="date" @click="handleDateChange(date)">
                      <a class="dropdown-item">{{ date }}</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="mbodyList">
            <div v-if="!posts.matchList || posts.matchList.length === 0">
              沒有正在進行的賽事
            </div>
            <div v-else>
              <div v-for="post in posts.matchList" :key="post.matchId">
                <div class="mbodyLiveTitle">
                  <div class="teamImgBox">
                    <img :src="getImageCountry(post.countryId)" class="rounded-circle w-100 h-100">
                  </div>
                  <div v-if="this.$i18n.locale === 'zh_hk'" class="ml-2">{{ post.leagueNameCht }}</div>
                  <div v-if="this.$i18n.locale === 'zh_cn'" class="ml-2">{{ post.leagueNameChs }}</div>
                  <div v-if="this.$i18n.locale === 'en'" class="ml-2">{{ post.leagueNameEn }}</div>
                </div>
                <router-link :to="{ name: 'live', params: { id: post.matchId } }" class="bodyRouterBox">
                  <div class="mbodyListBox mbodyListLine">
                    <div class="mColumnW18">
                      <div v-if="selectButtonValue === 'live'">
                        <div>{{ formatTime(post.matchTime) }}</div>
                        <div v-if="post.state === 3">{{ proTime(post.startTime)+45 }}</div>
                        <div v-else-if="post.state === 2">{{ $t('halftime') }}</div>
                        <div v-else>{{ proTime(post.startTime) }}</div>
                      </div>
                      <div v-else>
                        <div>{{ formatTime(post.matchTime) }}</div>
                        <div v-if="post.state === 0">{{ $t('Schedule') }}</div>
                        <div v-if="post.state === 1">{{ $t('first_half') }}</div>
                        <div v-if="post.state === 2">{{ $t('midfield') }}</div>
                        <div v-if="post.state === 3">{{ $t('second_half') }}</div>
                        <div v-if="post.state === 4">{{ $t('overtime') }}</div>
                        <div v-if="post.state === 5">{{ $t('penalty_kick') }}</div>
                        <div v-if="post.state === -10">{{ $t('cancel') }}</div>
                        <div v-if="post.state === -11">{{ $t('tbd') }}</div>
                        <div v-if="post.state === -12">{{ $t('cut_in_half') }}</div>
                        <div v-if="post.state === -13">{{ $t('discontinue') }}</div>
                        <div v-if="post.state === -14">{{ $t('postpone') }}</div>
                        <div v-if="post.state === -1">{{ $t('Finished') }}</div>
                      </div>
                      
                    </div>
                    <div class="mColumnW62 leftBox">
                      <div class="teamBd">
                        <div class="teamImgBox">
                          <img :src="getImageTeam(post.homeId)" class="w-100">
                        </div>
                        <div v-if="this.$i18n.locale === 'zh_hk'">{{ post.homeCht }}</div>
                        <div v-else-if="this.$i18n.locale === 'zh_cn'">{{ post.homeChs }}</div>
                        <div v-else>{{ post.homeEn }}</div>
                      </div>
                      <div class="teamBd">
                        <div class="teamImgBox">
                          <img :src="getImageTeam(post.awayId)" class="w-100">
                        </div>
                        <div v-if="this.$i18n.locale === 'zh_hk'">{{ post.awayCht }}</div>
                        <div v-else-if="this.$i18n.locale === 'zh_cn'">{{ post.awayChs }}</div>
                        <div v-else>{{ post.awayEn }}</div>
                      </div>
                    </div>
                    <div class="mColumnW10 rightBox" v-if="[1, 2, 3, 4, 5].includes(post.state)">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-collection-play" viewBox="0 0 16 16">
                        <path d="M2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3m2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1m2.765 5.576A.5.5 0 0 0 6 7v5a.5.5 0 0 0 .765.424l4-2.5a.5.5 0 0 0 0-.848z" />
                        <path d="M1.5 14.5A1.5 1.5 0 0 1 0 13V6a1.5 1.5 0 0 1 1.5-1.5h13A1.5 1.5 0 0 1 16 6v7a1.5 1.5 0 0 1-1.5 1.5zm13-1a.5.5 0 0 0 .5-.5V6a.5.5 0 0 0-.5-.5h-13A.5.5 0 0 0 1 6v7a.5.5 0 0 0 .5.5z" />
                      </svg>
                    </div>
                    <div class="mColumnW10 rightBox" v-else></div>
                    <div class="mColumnW10 mrightBox">
                      <div>{{ post.homeScore }}</div>
                      <div>{{ post.awayScore }}</div>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import headView from '@/components/m/mHeadView.vue';
// import { ref, onMounted ,watch ,computed, reactive } from 'vue'
import { ref, onMounted ,watch ,computed } from 'vue';
import { getImageTeam,getImageCountry  } from '@/composables/useImage.js';
import { fetchPosts ,fetchAllPosts } from '@/composables/useApi.js';
// import axios from 'axios';

export default {
  name: 'mSoccerView',
  setup() {
    let posts = ref([]);
    const timeButton = ref(1);
    const selectedDate = ref(new Date());
    const selectButtonValue = ref('live');
    const matchProTime = ref(new Date());
    const selectedMatchID = ref(null);

    const urlMatch = ref('https://befenscore.net/api/get-data')


    // 資料排列的整理
    const selectPost = async (button) =>{

    selectButtonValue.value = button;

      if (button === 'live') {
        urlMatch.value = "https://befenscore.net/api/get-data"
        const data = await fetchPosts(urlMatch.value);
        posts.value = data
        timeList(posts.value)

      }else{
        urlMatch.value = "https://befenscore.net/api/get-data"
        const data = await fetchAllPosts(urlMatch.value, selectButtonValue.value);
        posts.value = data;
      }
    };

    // 根據url連接資料(有時間排列)
    // const fetchPosts = async (url) => {
    //   try {
    //     const response = await fetch(url);
    //     const data = await response.json();  // 確保將響應轉換為JSON
    //     posts.value = data;
    //     timeList(posts.value)
    //     getCount();
    //   } catch (error) {
    //     console.error('Error fetching posts:', error);
    //   }
    // };

    // 連接資料(沒有時間排列)
    // const fetchAllPosts = async (url) => {
    //   try {
    //     const response = await fetch(url);
    //     const data = await response.json();  // 確保將響應轉換為JSON
    //     if (selectButtonValue.value === 'schedule') {
    //       posts.value.matchList = data.matchList.filter(post => post.state === 0);
    //       getCount();
    //     } else if (selectButtonValue.value === 'finished') {
    //       posts.value.matchList = data.matchList.filter(post => post.state === -1);
    //       getCount();
    //     }else{
    //       posts.value = data;
    //       getCount();
    //     }
    //   } catch (error) {
    //     console.error('Error fetching posts:', error);
    //   }
    // };

    //根據聯賽ID加入國家資料
    // const getCount = async () =>{

    //   try {
    //     const response = await  fetch(`https://befenscore.net/api/get-country`);
    //     const leagueData = await response.json(); // 确保将响应转换为JSON

    //     const leaguesMap = new Map();

    //     leagueData.leagueList.forEach(league => {
    //       leaguesMap.set(league.leagueId, league);
    //     });

    //     // 确保 posts.value.matchList 被正确处理
    //     if (posts.value.matchList && Array.isArray(posts.value.matchList)) {
    //       posts.value.matchList.forEach(match => {
    //         const league = leaguesMap.get(match.leagueId);
    //         if (league) {
    //           match.leagueNameCht = league.nameCht;
    //           match.leagueNameChs = league.nameChs;
    //           match.leagueNameEn = league.nameEn;
    //           match.countryId = league.countryId;
    //           match.country = league.countryCn; // 添加 country 属性
    //         }
    //       });
    //     }
        
    //   } catch (error) {
    //     console.error('Error fetching posts:', error);
    //   }
    // }

    // 第一次連接
    onMounted(async () => {
      urlMatch.value = "https://befenscore.net/api/get-data"
      const data = await fetchPosts(urlMatch.value);
      posts.value = data
      timeList(posts.value)
      setInterval(() => {
        urlMatch.value = "https://befenscore.net/api/get-data"
        fetchPosts(urlMatch.value);
      },30000)
    });

    // 預設監聽分類
    const sortPosts = () => {
      if (timeButton.value === 1) {
        posts.value.sort((a, b) => new Date(a.time) - new Date(b.time)); // 假設每個比賽有一個 time 屬性
      } else if (timeButton.value === 2) {
        posts.value.sort((a, b) => new Date(a.date) - new Date(b.date)); // 假設每個比賽有一個 date 屬性
      }
    };

    // 下拉日期選單的排列方式
    const selectableDates = computed(() =>{
      const dates = [];
      const today = new Date();
      for (let i = -5; i <= 5; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const formattedDate = formatDateMenu(date);
        dates.push(formattedDate);
      }
      return dates;
    });

    const formatDateMenu = (date) => {
      const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const weekday = weekdays[date.getDay()];
      return `${month}/${day} ${weekday}`;
    }

    // 處理顯示的日期
    const formatDate = (date) =>{
      const year = date.getFullYear();
      // const month = String(date.getMonth() + 1).padStart(2, '0');
      // const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1);
      const day = String(date.getDate());
      return `${year}/${month}/${day}`;
    }

    // 抓出有在比賽的排列
    const timeList = (data) =>{
      posts.value.matchList = data.matchList.filter(match => match.state >= 1 && match.state <= 5);
    }

    // 按照聯賽排列
    const groupedMatch = () =>{
      posts.value.matchList.reduce((acc, match) => {
        if (!acc[match.leagueEn]) {
          acc[match.leagueEn] = [];
        }
        acc[match.leagueEn].push(match);
        return acc;
      }, {})
    }

    // 根據日期連接資料
    const handleDateChange = async (dateString) => {
      const parts = dateString.split('/');
      const selectedDates = new Date();
      selectedDates.setMonth(parts[0] - 1);
      selectedDates.setDate(parts[1].split(' ')[0]);
      const formattedDate = selectmatDate(selectedDates);
      urlMatch.value = `https://befenscore.net/api/get-days/${formattedDate}`;
      // urlMatch.value = `/api/football/schedule.aspx?date=${formattedDate}&key=4F85B2B3E6B54006`;
      const data = await fetchPosts(urlMatch.value);
      posts.value = data
      selectedDate.value = selectedDates;
    };

    // 提供給日期連接資料的方法
    const selectmatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    // 轉時間戳成相應格式
    const formatTime = (datetime) => {
      const date = new Date(datetime);
      // const month = String(date.getMonth() + 1).padStart(2, '0');
      // const day = String(date.getDate()).padStart(2, '0');
      const hour = String(date.getHours()).padStart(2, '0');
      const minute = String(date.getMinutes()).padStart(2, '0');
      return `${hour}:${minute}`;
    };

    // 比賽進行時間
    const proTime = (time) =>{
      const newTime = new Date();
      const differentTime = newTime - new Date(time);
      const matchMinutes = Math.floor(differentTime / 60000);
      return matchMinutes;
    }

    // 監聽 timeButton 的變化，並根據新的值對 posts 進行排序
    watch(timeButton, () => {
      sortPosts();
      selectPost();
    });

    // 先轉移過來 聯賽選擇會用
    const handleSelectMatch = (id) =>{
      selectedMatchID.value = id;
    }

    return {
      posts,
      timeButton,
      sortPosts,
      fetchPosts,
      handleDateChange,
      selectableDates,
      formatDate,
      selectButtonValue,
      selectPost,
      matchProTime,
      proTime,
      groupedMatch,
      getImageCountry,
      handleSelectMatch,
      formatTime,
      selectedDate,
      getImageTeam
    };
  },
  components: {
    headView
  },
}
</script>

<style scoped>
.btnBox.active {
  background-color: #007bff;
  color: white;
}

.mbodyListBox {
  display: flex;
  justify-content: space-between;
}

.mColumnW18, .mColumnW62, .mColumnW10 {
  display: flex;
  flex-direction: column;
}

.mrightBox {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.leftBox {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.rightBox {
  display: flex;
  align-items: center;
  justify-content: center;
}

.banner {
  width: 100%;
  height: auto;
}

.bannerBox {
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.teamBd{
  display: flex;
  gap:0.5rem;
}

.teamImgBox{
  width: 20px;
  height: 20px;
}

.bodyRouterBox{
  color: #2c3e50;
  text-decoration:none;
}

.rounded-circle {
  border-radius: 50%; /* 將寬度和高度的一半設為圓角半徑 */
  background-color: #000; /* 圓形的背景顏色 */
}

.mbodyLiveTitle{
  display: flex;
  background: #f1f1f1;
  gap:0.8rem;
  border-radius: 4px;
  padding: 1px 0px 1px 5px;
}

</style>