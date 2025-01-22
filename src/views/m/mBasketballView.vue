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
      <!-- <side @select-match="handleSelectMatch" /> -->
      <!-- 表格內容在這邊 -->
      <div class="w-100">
        <div class="bannerBox" data-v-d4c6fef0=""><img src="../../assets/banner/scoreBanner_01s_990x102.jpg" class="banner" data-v-d4c6fef0=""><i class="iconfont icon-guanbi close" data-v-d4c6fef0=""></i></div>
        <div class="area_score">
        <!-- 列表 -->
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
                  {{ newTime }}
                </button>
                <ul class="dropdown-menu">
                  <li v-for="date in selectableDates" :key="date" @click="handleValue(date)">
                    <a class="dropdown-item">{{ date }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="mbodyTitle">
            <div class="bodyTitleBox">
              <div class="me-3">
                <div class="dropdown">
                  <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    時區選擇
                  </button>
                  <ul class="dropdown-menu">
                    <li><button class="dropdown-item" type="button" @click="timeLag = 18">UTC-10</button></li>
                    <li><button class="dropdown-item" type="button" @click="timeLag = 8">UTC0</button></li>
                    <li><button class="dropdown-item" type="button" @click="timeLag = 0">UTC+8</button></li>
                    <li><button class="dropdown-item" type="button" @click="timeLag = -1">UTC+9</button></li>
                    <li><button class="dropdown-item" type="button" @click="timeLag = -4">UTC+12</button></li>
                  </ul>
                </div>
                <!-- <label for="timezone-select">選擇時區：</label>
                <select id="timezone-select" @change="handleTimezoneChange">
                  <option v-for="tz in timezones" :key="tz.value" :value="tz.value">
                    {{ tz.label }}
                  </option>
                </select> -->
              </div>
              <div>
                {{ newTime }}
              </div>
            </div>
          </div>
        </div>
        <div v-if="!posts.length">
          <div class="NoValueFrame">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-diamond-fill" viewBox="0 0 16 16">
                <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
            </svg><br>
            <div>無正在進行的賽事</div>
          </div>
        </div>
        <div v-else>
          <div v-for="post in posts" :key="post.matchId">
            <div class="bodyListRow">
              <div class="bodyListTitle">
                <div class="teamImgBox">
                  <img :src="getImageCountry(post.countryId)" class="rounded-circle w-100 h-100">
                </div>
                <router-link :to="{ name: 'bk_league', params: { bk_league_id: post.leagueId } }" class="bodyRouterBox nowrap">
                  <div class="ColumnW52 bodyListTitle-fontSize ms-2">{{ getLeagueName(post,'league') }}</div>
                </router-link>
              </div>
            </div>
            <router-link :to="{ name: 'bk_live', params: { date:newTime,id: post.matchId } }" class="bodyRouterBox w-100">
              <div class="bodyListBox w-100">
                <div class="ColumnW8">{{ foreTime(post.matchTimeTimestamp) }}</div>
                <div class="ColumnW8">
                  <div v-if="selectButtonValue === 'live'">
                    <div v-if="post.state === 3" class="text-danger">{{ proTime(post.startTime)+45 }}<span class="blinking">'</span></div>
                    <div v-else-if="post.state === 2">{{ $t('halftime') }}</div>
                    <div v-else class="text-danger">{{ proTime(post.startTime) }}<span class="blinking">'</span></div>
                  </div>
                  <div v-else>
                    <div>{{ $t(getMatchState(post.matchState)) }}</div>
                  </div>
                </div>
                <div class="ColumnW26 bodyListLeft">{{ getLeagueName(post,'homeTeam') }}</div>
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
                <div class="ColumnW26 bodyListRight">{{ getLeagueName(post,'awayTeam') }}</div>
                <div v-if="[1, 2, 3, 4, 5, 6, 7].includes(post.matchState)" class="ColumnW8 bodyListLive">
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
            <!-- <div>
              時間：{{ foreTime(post.matchTimeTimestamp) }}
              聯賽：{{ post.leagueChs }}
              主隊：{{ post.homeCht }}
              客隊：{{ post.awayCht }}
              主隊分：{{ post.homeScore }}
              客隊分：{{ post.awayScore }}
            </div> -->
            <!-- <div v-if="[1, 2, 3, 4, 5].includes(post.state)">
              時間：{{ foreTime(post.matchTimeTimestamp) }}
              聯賽：{{ post.leagueChs }}
              主隊：{{ post.homeCht }}
              客隊：{{ post.awayCht }}
              主隊分：{{ post.homeScore }}
              客隊分：{{ post.awayScore }}
            </div> -->
          </div>
        </div>
        <div>
          
        </div>
        </div>
      </div>
      <!-- 右邊時間 -->
      <!-- <sideTime @child-click="handleValue" /> -->
    </div>
  </div>
  <!-- <div style="background: #f5f5f5;">
    <div style="height: 13px;"><p>&nbsp;</p></div>
    <footView/>
    <div style="height: 13px;"><p>&nbsp;</p></div>
  </div> -->

</template>
<script>
// @ is an alias to /src
import headView from '@/components/m/mHeadView.vue'
// import side from '@/components/sideView.vue'
import { ref, onMounted ,watch ,computed } from 'vue'
// import { ref, onMounted ,watch } from 'vue'
// import sideTime from '@/components/sideRightView.vue'
// import footView from '@/components/footView.vue'
import { getImageTeam,getImageCountry  } from '@/composables/useImage.js';
import { fetchPosts  } from '@/composables/useApi.js';
import { useI18n } from 'vue-i18n';
// import { useDataStore } from '@/store/dataStore'

export default {
  name: 'SoccerView',
  components: {
    headView,
    // side,
    // sideTime,
    // footView
  },
  setup() {
    const allPosts = ref([]);
    let posts = ref([]);  //賽事

    const selectButtonValue = ref('live');  //按鈕
    const selectedMatchID = ref(null);  //單個比賽搜尋

    let loading = ref(true);

    const newTime = ref('')

    const { locale } = useI18n(); //翻譯

    // const negative = ref(true); //正負時差判定
    const timeLag = ref(0);
    const startTime = ref(null); //開始的時間
    const endTime = ref(null);  //結束的時間


    // const dataStore = useDataStore();
    // const leagueData = computed(() => dataStore.leagueData || { matchList: [] });


    // 根據日期和時差計算時間戳範圍
    const getTimestampRange = (dateStr, timezoneOffset) => {
      loading.value = true;
      try {
        console.log('getTimestampRange流程')
        const now = new Date(); // 當下時間

        if (!Array.isArray(allPosts.value)) {
          console.error('allPosts.value 不是陣列:', allPosts.value);
          posts.value = [];
          return;
        }

        const offsetMillis = timezoneOffset * 60 * 60 * 1000; // 時區偏移毫秒數

        const utcDate = new Date(dateStr + 'T00:00:00Z'); // 當天 UTC 零點
        if (isNaN(utcDate.getTime())) throw new Error(`無效的日期: ${dateStr}`);

        const seconds = now.getHours() * 60 * 60 *1000 + now.getMinutes() * 60 *1000

        const timeGap = seconds - offsetMillis;

        console.log(timeGap)

        // const adjustedTime = new Date(now.getTime() - offsetMillis);

        if(timeGap>24 * 60 * 60 * 1000){
          utcDate.setUTCDate(utcDate.getUTCDate() + 1);
        }
        if(timeGap<0){
          utcDate.setUTCDate(utcDate.getUTCDate() - 1);
        }
        
        const localStart = new Date(utcDate.getTime() + offsetMillis); // 前一天開始
        const localEnd = new Date(localStart.getTime() + 24 * 60 * 60 * 1000 - 1); // 當天結束

        // 計算時間範圍的 Unix 時間戳
        const startTimestamp = localStart.getTime();
        const endTimestamp = localEnd.getTime();

        // 更新全局響應式數據
        startTime.value = startTimestamp;
        endTime.value = endTimestamp;

        // const data = allPosts.value

        // 過濾符合條件的資料
        posts.value = allPosts.value.filter(
          (post) =>
            post.matchTimeTimestamp * 1000 >= startTimestamp &&
            post.matchTimeTimestamp * 1000 <= endTimestamp
        );

        loading.value = false;

      } catch (error) {
        console.error('Error in getTimestampRange:', error);
      }
    };

    //總篩選
    const filterAllData = async() =>{
      
      getTimestampRange(newTime.value,timeLag.value)
      console.log('filterAllData流程')
      
    }

    // 資料排列的整理
    const selectPost = async (button) =>{
      loading.value = true;
      selectButtonValue.value = button;
      if (button === 'live') {
        newTime.value = foreDay(new Date()/1000);
        const data = await fetchPosts('https://befenscore.net/basketball/today-data');
        posts.value = data.matchList.filter((post) => [1, 2, 3, 4, 5, 6, 7].includes(post.matchState))
      }
      if(button === 'allEvents'){
        filterAllData();
        updateScore()
      }
      if(button === 'finished'){
        filterAllData();
        updateScore()
        const data = posts.value;
        posts.value = data.filter((post) => post.state === -1)
      }
      if(button === 'schedule'){
        filterAllData();
        updateScore()
        const data = posts.value;
        posts.value = data.filter((post) => post.state === 0)
      }
      loading.value = false;
    }

    //更新分數資料的模組
    const updateScore = async() =>{
      console.log('更新分數')
      const url = "https://befenscore.net/basketball/today-data"
      const data = await fetchPosts(url);

      if (!data || !Array.isArray(data.matchList)) {
        console.error("API 回傳資料無效或 matchList 不是陣列:", data);
        return;
      }
      // 將 matchList 整理成 Map，以 matchId 作為鍵
      const liveMatchMap = new Map(
        data.matchList.map((liveMatch) => [liveMatch.matchId, liveMatch])
      );
      console.log(liveMatchMap.get(2683821))
      // 單次迴圈高效更新 posts.value
      posts.value.forEach((post) => {
        const liveMatch = liveMatchMap.get(post.matchId);
        if (liveMatch) {
          post.state = liveMatch.state;
          post.homeScore = liveMatch.homeScore;
          post.awayScore = liveMatch.awayScore;
        }
      });
    }

    // 監聽 timeLag 的變化，發生變化時執行
    watch(() => timeLag.value, () => {
      filterAllData(); 
      selectPost(selectButtonValue.value);
    });

    //時區時間顯示
    const foreTime = (beijingTimestamp) =>{
      try {
        const timezoneOffset = parseInt(timeLag.value)
        const offsetMillis = timezoneOffset * 60 * 60 * 1000;

        let utcDate
        
        if(selectButtonValue.value === "live"){
          utcDate = new Date(beijingTimestamp * 1000 - offsetMillis + 8 * 60 * 60 * 1000);
        }else{
          utcDate = new Date(beijingTimestamp * 1000 - offsetMillis);
        }

        const hours = String(utcDate.getUTCHours()).padStart(2, '0');
        const minutes = String(utcDate.getUTCMinutes()).padStart(2, '0');

        return `${hours}:${minutes}`;

        // return utcDate.toISOString().replace('T', ' ').substring(0, 19); // 格式化

      } catch (error) {
        console.error('Error converting Beijing timestamp:', error);
        return 'Invalid time';
      }
    }

    //時區日期顯示
    const foreDay = (beijingTimestamp) =>{
      try {
        // 確保 timezoneOffset 為數字
        const timezoneOffset = parseInt(timeLag.value)
        const offsetMillis = timezoneOffset * 60 * 60 * 1000;
        const utcDate = new Date(beijingTimestamp * 1000 - offsetMillis); // 北京時間戳轉換為 Date

        const year = utcDate.getUTCFullYear();
        const month = String(utcDate.getUTCMonth() + 1).padStart(2, '0'); // 月份需要 +1
        const day = String(utcDate.getUTCDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;

        // return utcDate.toISOString().replace('T', ' ').substring(0, 19); // 格式化

      } catch (error) {
        console.error('Error converting Beijing timestamp:', error);
        return 'Invalid time';
      }
    }

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
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }

    // 右側傳來訊息
    const handleValue = async(receivedValue) => {
      newTime.value = receivedValue;
      filterAllData()
      // selectButtonValue.value = 'allEvents';
    }


    // 第一次連接
    onMounted(async () => {

      loading.value = true;
      // loadData()
      const data = await fetchPosts('https://befenscore.net/basketball/get-data');
      allPosts.value = data.matchList

      newTime.value = foreDay(new Date()/1000)

      // filterAllData();

      // updateScore();

      selectPost('live')
      console.log('第一次連接')
      console.log(allPosts.value)

      loading.value = false;

      setInterval(() => {
        if(selectButtonValue.value =='live'){
          // updateScore();
        }
      },30000)
    });

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

    // 比賽進行時間
    const proTime = (time) =>{
      const newDay = new Date(); 
      const timezoneOffset = parseInt(timeLag.value)
      const offsetMillis = timezoneOffset * 60 * 60 * 1000; //時差
      const givenTime = new Date(time); //開賽時間(沒加時差)
      const offGivenTime = givenTime.getTime() + offsetMillis;

      const differentTime = newDay - offGivenTime;
      const matchMinutes = Math.floor(differentTime / 60000);
      // let match
      // if(matchMinutes > 90){
      //   match = "90+";
      // }else{
      //   match = String(matchMinutes);
      // }
      return matchMinutes;
    }

    // 比賽狀態
    const stateMap = {
      0: 'Schedule',
      1: 'one',
      2: 'two',
      3: 'three',
      4: 'four',
      5: 'one_ot',
      6: 'two_ot',
      7: 'three_ot',
      50:'midfield',
      '-1': 'Finished',
      '-2': 'tbd',
      '-3': 'discontinue',
      '-4': 'cancel',
      '-5': 'postpone',
    };

    const getMatchState = (state) => {
      return stateMap[state] || 'Unknown';  // 默認顯示 'Unknown'，如果 state 不在映射表中
    };

    // 先轉移過來 聯賽選擇會用
    const handleSelectMatch = (id) =>{
      selectedMatchID.value = id;
    }
  
    return {
      posts,
      selectButtonValue,
      selectPost,
      selectableDates,
      handleSelectMatch,
      getImageCountry,
      getImageTeam,
      getLeagueName,
      handleValue,
      getMatchState,
      newTime,
      timeLag,
      foreTime,
      foreDay,
      proTime,
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
  width: 16px;
  height: 16px;
  margin: -0.05rem 0px 0px 0px;
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
  margin-bottom: 5px;
}







/************* Over CSS class Start ***************/
.bannerBox .banner{
  padding: 0px 0px 0px 0px;
  border-radius: 5px;
  margin: 10px 0px 0px 0px;
}

/************* Over CSS class End ***************/
</style>
