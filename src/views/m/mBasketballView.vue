<template>
  <headView @select-match="handleSelectMatch"/>
  <div v-if="loading" class="loading-box">
    <div class="spinner"></div> <!-- 這裡可以用自訂的 spinner 或文字 -->
    <p>Loading...</p>
  </div>
  <div v-else class="bodyBd">
    <div class="bodyBox">
      <div class="w-100">
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
                    <div class="NoValueFrame">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-diamond-fill" viewBox="0 0 16 16">
                            <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                        </svg><br>
                        <div>無正在進行的賽事</div>
                    </div>
            </div>
            <div v-else>
              <div v-for="league in leagues" :key="league.leagueId">
                <div class="mbodyLiveTitle">
                  <div class="teamImgBox">
                    <img :src="getImageCountry(league.countryId)" class="rounded-circle w-100 h-100">
                  </div>
                  <router-link :to="{ name: 'league', params: { id: league.leagueId } }" class="bodyRouterBox nowrap">
                    <div class="ColumnW52 bodyListTitle-fontSize ms-2">{{ getLeagueName(league,'name') }}</div>
                  </router-link>
                </div>
                <div v-if="matchesByLeague[league.leagueId]">
                  <div v-for="post in matchesByLeague[league.leagueId]" :key="post.matchId" class="mbodyListBox mbodyListLine">
                    <router-link :to="{ name: 'live', params: { date:newTime,id: post.matchId } }" class="bodyRouterBox w-100">
                      <div class="bodyListBox w-100">
                        <div v-if="selectButtonValue === 'live'" class="mColumnW18">
                          <div>{{ formatTime(post.matchTime) }}</div>
                          <div v-if="post.state === 3" class="text-danger">{{ proTime(post.startTime)+45 }}<span class="blinking">'</span></div>
                          <div v-else-if="post.state === 2">{{ $t('halftime') }}</div>
                          <div v-else class="text-danger">{{ proTime(post.startTime) }}<span class="blinking">'</span></div>
                        </div>
                        <div v-else class="mColumnW18">
                          <div>{{ formatTime(post.matchTime) }}</div>
                          <div>{{ $t(getMatchState(post.state)) }}</div>
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
                          <div class="bodyRouterBox rightBox">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-collection-play" viewBox="0 0 16 16">
                              <path d="M2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3m2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1m2.765 5.576A.5.5 0 0 0 6 7v5a.5.5 0 0 0 .765.424l4-2.5a.5.5 0 0 0 0-.848z" />
                              <path d="M1.5 14.5A1.5 1.5 0 0 1 0 13V6a1.5 1.5 0 0 1 1.5-1.5h13A1.5 1.5 0 0 1 16 6v7a1.5 1.5 0 0 1-1.5 1.5zm13-1a.5.5 0 0 0 .5-.5V6a.5.5 0 0 0-.5-.5h-13A.5.5 0 0 0 1 6v7a.5.5 0 0 0 .5.5z" />
                            </svg>
                          </div>
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
              <!-- <div v-for="post in posts.matchList" :key="post.matchId">
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
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    
    
  </div>

  <div id="footer"> Copyright @ 2024 BeFun Score </div>
    
</template>

<script>
// @ is an alias to /src
import headView from '@/components/m/mHeadView.vue';
// import { ref, onMounted ,watch ,computed, reactive } from 'vue'
import { ref, onMounted ,watch ,computed } from 'vue';
import { getImageTeam,getImageCountry  } from '@/composables/useImage.js';
import { fetchPosts ,fetchAllPosts } from '@/composables/useApi.js';
import { useI18n } from 'vue-i18n';
// import axios from 'axios';

export default {
  name: 'mSoccerView',
  setup() {
    let posts = ref([]);
    let leagues = ref(null);
    const timeButton = ref(1);
    const selectedDate = ref(new Date());
    const selectButtonValue = ref('live');
    const matchProTime = ref(new Date());
    const selectedMatchID = ref(null);
    let leagueIds  = ref([]);
    const leagueCache = ref(null);

    const urlMatch = ref('https://befenscore.net/api/get-data')

    const newTime = ref('');

    let loading = ref(true);

    const { locale } = useI18n();

    const matchesByLeague = ref({}); //照聯賽區分的數據

    // 翻譯
    const getLeagueName = (post, fieldName) => {
      const langMap = {
        en: 'En',
        zh_cn: 'Chs',
        zh_hk: 'Cht'
      };
      const langSuffix = langMap[locale.value] || 'En'; // 默認英文
      const key = `${fieldName}${langSuffix}`;  // 動態生成鍵名，例如 leagueNameEn, homeEn, awayEn
      const fallbackKey = `${fieldName}En`; 

      return post[key] || post[fallbackKey];
    };

    // 比賽狀態
    const stateMap = {
      0: 'Schedule',
      1: 'first_half',
      2: 'midfield',
      3: 'second_half',
      4: 'overtime',
      5: 'penalty_kick',
      '-10': 'cancel',
      '-11': 'tbd',
      '-12': 'cut_in_half',
      '-13': 'discontinue',
      '-14': 'postpone',
      '-1': 'Finished'
    };

    const getMatchState = (state) => {
      return stateMap[state] || 'Unknown';  // 默認顯示 'Unknown'，如果 state 不在映射表中
    };


    // 資料排列的整理
    const selectPost = async (button) =>{

    selectButtonValue.value = button;

      if (button === 'live') {

        loading.value = true;

        urlMatch.value = "https://befenscore.net/api/get-data"
        const data = await fetchPosts(urlMatch.value);
        posts.value = data
        timeList(posts.value)
        newTime.value = formatDate(new Date())

        leagueIds.value = [...new Set(posts.value.matchList.map(match => match.leagueId))];
        filterLeaguesById(leagueIds.value)
        processMatches()

        loading.value = false;

      }else{

        loading.value = true;

        urlMatch.value = "https://befenscore.net/api/get-data"
        const data = await fetchAllPosts(urlMatch.value, selectButtonValue.value);
        posts.value = data;
        posts.value.matchList.sort((a, b) => new Date(a.matchTime) - new Date(b.matchTime));
        newTime.value = formatDate(new Date())

        leagueIds.value = [...new Set(posts.value.matchList.map(match => match.leagueId))];
        filterLeaguesById(leagueIds.value)
        processMatches()

        loading.value = false;

      }
    };

    //篩選出今日賽事的聯賽
    const filterLeaguesById = async (leagueIds) => {
      leagues.value = leagueCache.value.leagueList.filter(league => leagueIds.includes(league.leagueId));
    }

    // 在获取数据后，处理比赛分组
    const processMatches = () => {
      matchesByLeague.value = {};
      if (posts.value.matchList) {
        posts.value.matchList.forEach(match => {
          const leagueId = match.leagueId;
          if (!matchesByLeague.value[leagueId]) {
            matchesByLeague.value[leagueId] = [];
          }
          matchesByLeague.value[leagueId].push(match);
        });
      }
    };

    // 第一次連接
    onMounted(async () => {
      loading.value = true;

      leagueCache.value = await fetchPosts('https://befenscore.net/api/league-data')
      urlMatch.value = "https://befenscore.net/api/get-data"
      const data = await fetchPosts(urlMatch.value);
      posts.value = data
      newTime.value = formatDate(new Date());
      console.log(newTime.value)
      timeList(posts.value)
      leagueIds.value = [...new Set(posts.value.matchList.map(match => match.leagueId))];
      filterLeaguesById(leagueIds.value)
      processMatches()

      loading.value = false;

      setInterval(() => {
        if(selectButtonValue.value =='live'){
          autoUpdate();
        }
      },30000)
    });

    // 自動更新函數
    const autoUpdate = async () => {
      try {
        // 不改變 loading 狀態，避免顯示載入畫面
        const data = await fetchPosts(urlMatch.value);
        posts.value = data;
        timeList(posts.value);
        newTime.value = formatDate(new Date());

        leagueIds.value = [...new Set(posts.value.matchList.map(match => match.leagueId))];
        await filterLeaguesById(leagueIds.value);
        processMatches();
      } catch (error) {
        console.error("自動更新錯誤：", error);
      }
    };

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
      return `${year}-${month}-${day}`;
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

      loading.value = true;

      const parts = dateString.split('/');
      const selectedDates = new Date();
      selectedDates.setMonth(parts[0] - 1);
      selectedDates.setDate(parts[1].split(' ')[0]);
      const formattedDate = selectmatDate(selectedDates);
      newTime.value = formattedDate
      urlMatch.value = `https://befenscore.net/api/get-days/${formattedDate}`;
      // urlMatch.value = `/api/football/schedule.aspx?date=${formattedDate}&key=4F85B2B3E6B54006`;
      posts.value = await fetchPosts(urlMatch.value);

      leagueIds.value = [...new Set(posts.value.matchList.map(match => match.leagueId))];
      filterLeaguesById(leagueIds.value)
      
      if (posts.value && posts.value.matchList) {
        processMatches(); // 將資料進行處理
      }

      selectedDate.value = selectedDates;

      loading.value = false;

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
      const newDay = new Date();
      const differentTime = newDay - new Date(time);
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
      leagues,
      timeButton,
      sortPosts,
      loading,
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
      matchesByLeague,
      getLeagueName,
      getMatchState,
      newTime,
      getImageTeam
    };
  },
  components: {
    headView
  },
}
</script>

<style lang="scss">
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
  padding: .1rem 0;
}

.teamImgBox{
  width: 18px;
  height: 18px;
  margin: -.2rem 0px 0px 0px;
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

.loading-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px; /* 可以根據實際需要調整 */
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #09f;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}



.NoValueFrame{
  padding: 50px;
  width: 100%;
  height: 150px;
  text-align: center;
  align-items: center;
  display: inline-block;
  vertical-align: middle;
  /***background-image: linear-gradient(to top, rgb(255 255 255) 0%, rgb(196, 196, 196) 50%, #5e5e5e 100%);***/
}

.NoValueFrame svg{
  color: #999999;
  width: 2rem;
  height: 2rem;
  text-align: center;
}


</style>