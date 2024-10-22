<template>
  <headView @select-match="handleSelectMatch"/>
  <!-- 載入中畫面 -->
  <div v-if="loading" class="loading-box">
    <div class="spinner"></div> <!-- 這裡可以用自訂的 spinner 或文字 -->
    <p>Loading...</p>
  </div>
  <div v-else class="bodyBd">
    <div class="bodyBox">
      <!-- 側邊攔在這 -->
      <side @select-match="handleSelectMatch" />
      <!-- 表格內容在這邊 -->
      <div class="w-100">
        <div class="bannerBox" data-v-d4c6fef0=""><img src="../assets/banner/scoreBanner_01s_990x102.jpg" class="banner" data-v-d4c6fef0=""><i class="iconfont icon-guanbi close" data-v-d4c6fef0=""></i></div>
        <div class="w-100 area_score">
        <!-- 列表 -->
        <div class="">
          <div class="bodyTitle">
            <div class="bodyTitleBox">
              <button type="button" class="btn btnBox" :class="{ active: selectButtonValue === 'allEvents' }" @click="selectPost('allEvents')">{{$t('AllEvents')}}</button>
              <button type="button" class="btn btnBox" :class="{ active: selectButtonValue === 'live' }" @click="selectPost('live')">{{$t('Live')}}</button>
              <button type="button" class="btn btnBox" :class="{ active: selectButtonValue === 'finished' }" @click="selectPost('finished')">{{$t('Finished')}}</button>
              <button type="button" class="btn btnBox" :class="{ active: selectButtonValue === 'schedule' }" @click="selectPost('schedule')">{{$t('Schedule')}}</button>
            </div>
            <div class="bodyTitleBox">
              {{ newTime }}
            </div>
          </div>
        </div>
        <div v-if="!posts.matchList || posts.matchList.length === 0">
          <div class="NoValueFrame">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-diamond-fill" viewBox="0 0 16 16">
                <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
            </svg><br>
            <div>無正在進行的賽事</div>
        </div>
        </div>
        <div v-else>
          <div v-for="league in leagues" :key="league.leagueId" class="bodyListRow">
            <div class="bodyListTitle">
              <div class="teamImgBox">
                <img :src="getImageCountry(league.countryId)" class="rounded-circle w-100 h-100">
              </div>
              <router-link :to="{ name: 'league', params: { id: league.leagueId } }" class="bodyRouterBox nowrap">
                <div class="ColumnW52 bodyListTitle-fontSize ms-2">{{ getLeagueName(league,'name') }}</div>
              </router-link>
            </div>
            <div v-if="matchesByLeague[league.leagueId]">
              <div v-for="post in matchesByLeague[league.leagueId]" :key="post.matchId" class="bodyListBox mbodyListLine">
                <router-link :to="{ name: 'live', params: { date:newTime,id: post.matchId } }" class="bodyRouterBox w-100">
                  <div v-if="selectButtonValue === 'live'" class="bodyListBox w-100">
                    <div class="ColumnW8">{{ formatTime(post.matchTime) }}</div>
                    <div class="ColumnW8">
                      <div v-if="post.state === 3" class="text-danger">{{ proTime(post.startTime)+45 }}<span class="blinking">'</span></div>
                      <div v-else-if="post.state === 2">{{ $t('halftime') }}</div>
                      <div v-else class="text-danger">{{ proTime(post.startTime) }}<span class="blinking">'</span></div>
                    </div>
                    <div class="ColumnW26 bodyListLeft">{{ getLeagueName(post,'home') }}</div>
                    <div class="ColumnW8 teamImgFlex">
                      <div class="teamImgBox">
                        <img :src="getImageTeam(post.homeId)" class="w-100">
                      </div>
                    </div>
                    <div class="ColumnW8 text-danger">{{ post.homeScore }} - {{ post.awayScore }}</div>
                    <div class="ColumnW8">
                      <div class="teamImgBox">
                        <img :src="getImageTeam(post.awayId)" class="w-100">
                      </div>
                    </div>
                    <div class="ColumnW26 bodyListRight">{{ getLeagueName(post,'away') }}</div>
                    <div v-if="[1, 2, 3, 4, 5].includes(post.state)" class="ColumnW8 bodyListLive">
                      <div class="ImgRouterBox w-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-collection-play" viewBox="0 0 16 16">
                          <path d="M2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3m2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1m2.765 5.576A.5.5 0 0 0 6 7v5a.5.5 0 0 0 .765.424l4-2.5a.5.5 0 0 0 0-.848z"/>
                          <path d="M1.5 14.5A1.5 1.5 0 0 1 0 13V6a1.5 1.5 0 0 1 1.5-1.5h13A1.5 1.5 0 0 1 16 6v7a1.5 1.5 0 0 1-1.5 1.5zm13-1a.5.5 0 0 0 .5-.5V6a.5.5 0 0 0-.5-.5h-13A.5.5 0 0 0 1 6v7a.5.5 0 0 0 .5.5z"/>
                        </svg>
                      </div>
                    </div>
                    <div v-else class="ColumnW8"></div>
                  </div>
                  <div v-else class="bodyListBox w-100">
                    <div class="ColumnW8">{{ formatTime(post.matchTime) }}</div>
                    <div class="ColumnW8">
                      <div>{{ $t(getMatchState(post.state)) }}</div>
                    </div>
                    <div class="ColumnW26 bodyListLeft">{{ getLeagueName(post,'home') }}</div>
                    <div class="ColumnW8 teamImgFlex">
                      <div class="teamImgBox">
                        <img :src="getImageTeam(post.homeId)" class="w-100">
                      </div>
                    </div>
                    <div class="ColumnW8 text-danger">{{ post.homeScore }} - {{ post.awayScore }}</div>
                    <div class="ColumnW8">
                      <div class="teamImgBox">
                        <img :src="getImageTeam(post.awayId)" class="w-100">
                      </div>
                    </div>
                    <div class="ColumnW26 bodyListRight">{{ getLeagueName(post,'away') }}</div>
                    <div v-if="[1, 2, 3, 4, 5].includes(post.state)" class="ColumnW8 bodyListLive">
                      <div class="ImgRouterBox w-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-collection-play" viewBox="0 0 16 16">
                          <path d="M2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3m2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1m2.765 5.576A.5.5 0 0 0 6 7v5a.5.5 0 0 0 .765.424l4-2.5a.5.5 0 0 0 0-.848z"/>
                          <path d="M1.5 14.5A1.5 1.5 0 0 1 0 13V6a1.5 1.5 0 0 1 1.5-1.5h13A1.5 1.5 0 0 1 16 6v7a1.5 1.5 0 0 1-1.5 1.5zm13-1a.5.5 0 0 0 .5-.5V6a.5.5 0 0 0-.5-.5h-13A.5.5 0 0 0 1 6v7a.5.5 0 0 0 .5.5z"/>
                        </svg>
                      </div>
                    </div>
                    <div v-else class="ColumnW8"></div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div>
          
        </div>
        </div>
      </div>
      <!-- 右邊時間 -->
      <sideTime @child-click="handleValue" />
    </div>
  </div>
  <footView/>
</template>
<script>
// @ is an alias to /src
import headView from '@/components/headView.vue'
import side from '@/components/sideView.vue'
import { ref, onMounted ,watch } from 'vue'
import sideTime from '@/components/sideRightView.vue'
import footView from '@/components/footView.vue'
import { getImageTeam,getImageCountry  } from '@/composables/useImage.js';
import { fetchPosts ,fetchAllPosts } from '@/composables/useApi.js';
import { useI18n } from 'vue-i18n';

export default {
  name: 'SoccerView',
  components: {
    headView,
    side,
    sideTime,
    footView
  },
  setup() {
    let posts = ref([]);  //賽事
    let leagues = ref(null);  //聯賽資料
    const timeButton = ref(1);
    const selectedDate = ref(new Date());
    const selectButtonValue = ref('live');
    const matchProTime = ref(new Date());
    const selectedMatchID = ref(null);
    let leagueIds  = ref([]);
    const leagueCache = ref(null);

    let loading = ref(true);

    const urlMatch = ref('https://befenscore.net/api/get-data');

    const newTime = ref('')

    const { locale } = useI18n();

    const matchesByLeague = ref({}); //照聯賽區分的數據

    // 右側傳來訊息
    const handleValue = async(receivedValue) => {
      newTime.value = receivedValue;
      selectButtonValue.value = 'allEvents';
      await handleDateChange();
    }

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

    //篩選出今日賽事的聯賽
    const filterLeaguesById = async (leagueIds) => {
      leagues.value = leagueCache.value.leagueList.filter(league => leagueIds.includes(league.leagueId));
    }

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
      timeList(posts.value)
      newTime.value = formatDate(new Date());

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
    const timeList = (data) => {
    // 檢查 data 和 data.matchList 是否存在且為數組
      if(data && Array.isArray(data.matchList)) {
        // 過濾 matchList 中的比賽
        posts.value.matchList.sort((a, b) => new Date(a.matchTime) - new Date(b.matchTime));
        posts.value.matchList = data.matchList.filter(match => match.state >= 1 && match.state <= 5);
      }else{
        console.error('Invalid data or matchList is not an array');
        posts.value.matchList = []; // 如果無效，設置為空數組
      }
    };

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
    const handleDateChange = async () => {

      loading.value = true;

      const apiUrl = `https://befenscore.net/api/get-days/${newTime.value}`;
      const data = await fetchPosts(apiUrl);
      posts.value = data

      leagueIds.value = [...new Set(posts.value.matchList.map(match => match.leagueId))];
      filterLeaguesById(leagueIds.value)

      if (posts.value && posts.value.matchList) {
        processMatches(); // 將資料進行處理
      }

      loading.value = false;

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
      const newTimes = new Date();
      const differentTime = newTimes - new Date(time);
      const matchMinutes = Math.floor(differentTime / 60000);
      return matchMinutes;
    }

    // 監聽 timeButton 的變化，並根據新的值對 posts 進行排序
    watch(timeButton, () => {
      sortPosts();
      selectPost();
      handleValue();
      posts;
    });

    // 先轉移過來 聯賽選擇會用
    const handleSelectMatch = (id) =>{
      selectedMatchID.value = id;
    }

    return {
      posts,
      leagues,
      matchesByLeague,
      timeButton,
      sortPosts,
      fetchPosts,
      handleDateChange,
      formatDate,
      selectButtonValue,
      selectPost,
      matchProTime,
      proTime,
      groupedMatch,
      getImageCountry,
      handleSelectMatch,
      formatTime,
      handleValue,
      newTime,
      selectedDate,
      getImageTeam,
      getLeagueName,
      getMatchState,
      loading
    };
  },
}
</script>

<style lang="scss">

.bodyBd{
  display: flex;
	justify-content: center;
  background-color: #f5f5f5; /*K*/
  padding-top: 20px; /*K*/
  padding-bottom: 20px; /*K*/
}

.bodyBox{
  width: 1200px;
	display: flex;
	justify-content: space-between;
}

// .bodyTitleBox{
//   display: flex;
//   gap:0.2rem;
// }

// .bodyListBox{
//   display: grid;
//   grid-template-columns: repeat(9, 1fr);
//   grid-gap: 10px; /* 设置列之间的间距 */
//   font-size: 0.8rem; /*K*/
//   padding: 3px 0px 3px 0px; /*K*/

//   .bodyListRow{
//     display: contents;
//   }

//   .bodyListLeft{
//     text-align:end;
//   }

//   .bodyListRight{
//     text-align:start;
//   }

//   .bodyListLive{
//     color: red;
//   }
// }

.pcListX{
  display: flex;
  justify-content: space-between;
}

.bodyRouterBox{
  color: #2c3e50;
  text-decoration:none;
  white-space: nowrap;
  transition: color 0.3s ease;
}

.ImgRouterBox{
  color: #ff1818;
}

.bodyRouterBox:hover {
  color: #3498db; /* 當鼠標移上去時，文字變成這個顏色 */
}


.teamImgFlex{
  display: flex;
  justify-content:flex-end;
  align-items:flex-end;
}

.teamImgBox{
  width: 18px;
  height: 18px;
  margin: -.2rem 0px 0px 0px;
}

// 一閃一閃的特效
.blinking {
  animation: blink 1s steps(1, end) infinite;
}

@keyframes blink {
  0% {
      opacity: 1;
  }
  50% {
      opacity: 0;
  }
  100% {
      opacity: 1;
  }
}

// 載入畫面
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
