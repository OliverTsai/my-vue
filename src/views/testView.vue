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
                <div class="me-3">
                  <label for="timezone-select">選擇時區：</label>
                  <select id="timezone-select" @change="handleTimezoneChange">
                    <option v-for="tz in timezones" :key="tz.value" :value="tz.value">
                      {{ tz.label }}
                    </option>
                  </select>
                </div>
                <div>
                  {{ newTime }}
                </div>
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
            <div v-for="post in posts" :key="post.matchId">
                <!-- 時間：{{ post.matchTimeTimestamp }} -->
                聯賽：{{ post.leagueChs }}
                主隊：{{ post.homeCht }}
                客隊：{{ post.awayCht }}
                日期：{{ post.matchTime }}
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
    <div style="background: #f5f5f5;">
      <div style="height: 13px;"><p>&nbsp;</p></div>
      <footView/>
      <div style="height: 13px;"><p>&nbsp;</p></div>
    </div>
  
  </template>
  <script>
  // @ is an alias to /src
  import headView from '@/components/headView.vue'
  import side from '@/components/sideView.vue'
  import { ref, onMounted ,watch ,computed } from 'vue'
  import sideTime from '@/components/sideRightView.vue'
  import footView from '@/components/footView.vue'
  import { getImageTeam,getImageCountry  } from '@/composables/useImage.js';
  import { fetchPosts  } from '@/composables/useApi.js';
  import { useI18n } from 'vue-i18n';
  import { useDataStore } from '@/store/dataStore'
  
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
      const selectedMatchID = ref(null); //聯賽轉移
      let leagueIds  = ref([]);
  
      let loading = ref(true);
  
      const urlMatch = ref('https://befenscore.net/football/get-data');
  
      const newTime = ref('')
  
      const { locale } = useI18n();
  
      const matchesByLeague = ref({}); //照聯賽區分的數據
  
      const dataStore = useDataStore();
      const leagueData = computed(() => dataStore.leagueData || { matchList: [] });

      // const selectedTimezone = ref({});

      // 篩選
      // const filteredPosts = computed(() => {
      //   return posts.value.filter(post =>
      //     convertToTimezone(post.matchTimeTimestamp, selectedTimezone.value).isToday
      //   );
      // });

      // const convertToTimezone = (utc,sele) =>{
      //   console.log(utc)
      //   console.log(sele)
      // }

      // 時區表單
      const timezones = ref([
        { label: "UTC-12:00", value: "-12" },
        { label: "UTC-11:00", value: "-11" },
        { label: "UTC-10:00", value: "-10" },
        { label: "UTC-09:00", value: "-9" },
        { label: "UTC-08:00", value: "-8" },
        { label: "UTC-07:00", value: "-7" },
        { label: "UTC-06:00", value: "-6" },
        // 正時區
        { label: "UTC+00:00", value: "0" },
        { label: "UTC+01:00", value: "1" },
        { label: "UTC+02:00", value: "2" },
        { label: "UTC+03:00", value: "3" },
        { label: "UTC+04:00", value: "4" },
        { label: "UTC+05:00", value: "5" },
        { label: "UTC+06:00", value: "6" },
        { label: "UTC+07:00", value: "7" },
        { label: "UTC+08:00", value: "8" },
        { label: "UTC+09:00", value: "9" },
        { label: "UTC+10:00", value: "10" },
        { label: "UTC+11:00", value: "11" },
        { label: "UTC+12:00", value: "12" },
        { label: "UTC+13:00", value: "13" },
        { label: "UTC+14:00", value: "14" },
      ]);

      // 處理下拉選單變更
      const handleTimezoneChange = (event) => {
        const selectedValue = parseInt(event.target.value, 10);
        if (selectedValue < 0){
          negative.value = false;
        }else{
          negative.value = true;
        }
        differenceTime.value = Math.abs(selectedValue); // 獲取時區絕對值

        

        // 在這裡可以根據需要處理 `negative` 和 `time` 的後續邏輯
      };
  
      // 時區的時間
      const startTime = ref(null);
      const endTime = ref(null);
      const differenceTime = ref(8);
      const negative = ref(true)
  
      // 處理時區範圍
      const timeZone = async (differenceTime) => {
        try {
          // 取得 UTC 的當天零點
          const utcDate = new Date(selectedDate.value);
          utcDate.setUTCHours(0, 0, 0, 0);
  
          // 根據時差計算當地的開始與結束時間
          const localStart = new Date(utcDate.getTime() - differenceTime * 60 * 60 * 1000);
          const localEnd = new Date(localStart.getTime() + 24 * 60 * 60 * 1000 - 1); // 當天的最後一毫秒
  
          // 設置時間範圍的時間戳
          startTime.value = localStart.getTime();
          endTime.value = localEnd.getTime();
  
          console.log('Start Time:', localStart.toISOString());
          console.log('End Time:', localEnd.toISOString());
        } catch (error) {
          console.error('Error calculating time zone range:', error);
        }
      };

      // 將時間戳轉換為日期字串，根據時區調整
      // const convertTimestampToDate = (timestamp, timezoneOffset) => {
      //   try {
      //     console.log('時間戳:', timestamp);
      //     const date = new Date(timestamp * 1000);
      //     const adjustedDate = new Date(date.getTime() + timezoneOffset * 60 * 60 * 1000);
      //     return adjustedDate.toISOString().replace('T', ' ').slice(0, 19);
      //   } catch (error) {
      //     console.error('Error converting timestamp:', error);
      //     return null;
      //   }
      // };

      // 根據日期和時差計算時間戳範圍
      // const getTimestampRange = (dateStr, timezoneOffset) => {
      //   try {

      //     timezoneOffset = Number(timezoneOffset);

      //     // 將日期字串轉換為當天 UTC 的零點
      //     const utcDate = new Date(dateStr + 'T00:00:00Z');

      //     if (isNaN(utcDate.getTime())) {
      //       throw new Error(`無效的日期格式: ${dateStr}`);
      //     }

      //     let localStart;

      //     // 根據時區偏移計算當地開始和結束時間
      //     if(negative.value){
      //       localStart = new Date(utcDate.getTime() - timezoneOffset * 60 * 60 * 1000);
      //     }else{
      //       localStart = new Date(utcDate.getTime() + timezoneOffset * 60 * 60 * 1000);
      //     }

      //     const localEnd = new Date(localStart.getTime() + 24 * 60 * 60 * 1000 - 1);

      //     startTime.value = localStart.getTime();
      //     endTime.value = localEnd.getTime();

      //   } catch (error) {
      //     console.error('Error calculating timestamp range:', error);
      //     return null;
      //   }
      // };
  
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
      // const stateMap = {
      //   0: 'Schedule',
      //   1: 'first_half',
      //   2: 'midfield',
      //   3: 'second_half',
      //   4: 'overtime',
      //   5: 'penalty_kick',
      //   '-10': 'cancel',
      //   '-11': 'tbd',
      //   '-12': 'cut_in_half',
      //   '-13': 'discontinue',
      //   '-14': 'postpone',
      //   '-1': 'Finished'
      // };
  
      // const getMatchState = (state) => {
      //   return stateMap[state] || 'Unknown';  // 默認顯示 'Unknown'，如果 state 不在映射表中
      // };
  
      // 資料排列的整理
      // const selectPost = async (button) =>{
  
      //   selectButtonValue.value = button;
  
      //   if (button === 'live') {
  
      //     loading.value = true;
  
      //     urlMatch.value = "https://befenscore.net/football/get-data"
      //     posts.value.matchList = leagueData.value.matchList

      //     newTime.value = formatDate(new Date())

      //     getTimestampRange(newTime.value,differenceTime.value)

      //     timeList(posts.value.matchList)
  
      //     loading.value = false;
  
      //   }else{
  
      //     loading.value = true;
  
      //     const data = leagueData.value.matchList

      //     newTime.value = formatDate(new Date())

      //     getTimestampRange(newTime.value,differenceTime.value)

      //     posts.value.matchList = data.matchList.filter(match=>match.matchTimeTimestamp * 1000 >= startTime.value && match.matchTimeTimestamp * 1000 <= endTime.value)
  
      //     loading.value = false;
      //   }
      // };
  
      // 第一次連接
      onMounted(async () => {
  
        loading.value = true;
  
        await timeZone(differenceTime.value);
        console.log('開始時間')
        console.log(leagueData.value.matchList)

        urlMatch.value = "https://befenscore.net/football/today-data"
        // const data = await fetchPosts(urlMatch.value);
        posts.value.matchList = leagueData.value.matchList
        console.log(posts.value.matchList)
  
        loading.value = false;
  
        setInterval(() => {
          if(selectButtonValue.value =='live'){
            autoUpdate();
          }
        },30000)
      });
  
      //監聽快取聯賽資料
      // watch(() => dataStore.leagueData, (newData) => {
      //   if (newData) {
      //     leagueData.value = newData;
      //     autoUpdate();
      //   }
      // });
  
      // 自動更新函數
      const autoUpdate = async () => {
        try {
          // 不改變 loading 狀態，避免顯示載入畫面
          // const data = await fetchPosts(urlMatch.value);
          // posts.value = data;

        } catch (error) {
          console.error("自動更新錯誤：", error);
        }
      };

      // 預設監聽分類
      // const sortPosts = () => {
      //   if (timeButton.value === 1) {
      //     posts.value.sort((a, b) => new Date(a.time) - new Date(b.time)); // 假設每個比賽有一個 time 屬性
      //   } else if (timeButton.value === 2) {
      //     posts.value.sort((a, b) => new Date(a.date) - new Date(b.date)); // 假設每個比賽有一個 date 屬性
      //   }
      // };
  
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
      // const timeList = (data) => {
      // // 檢查 data 和 data.matchList 是否存在且為數組
      //   if(data && Array.isArray(data.matchList)) {
      //     // 過濾 matchList 中的比賽
      //     posts.value.matchList.sort((a, b) => new Date(a.matchTime) - new Date(b.matchTime));
      //     posts.value.matchList = data.matchList.filter(match => match.state >= 1 && match.state <= 5);
      //   }else{
      //     console.error('Invalid data or matchList is not an array');
      //     posts.value.matchList = []; // 如果無效，設置為空數組
      //   }
      // };
  
      // 根據日期連接資料
      const handleDateChange = async () => {
  
        loading.value = true;
  
        const apiUrl = `https://befenscore.net/api/get-days/${newTime.value}`;
        const data = await fetchPosts(apiUrl);
        posts.value = data
  
        leagueIds.value = [...new Set(posts.value.matchList.map(match => match.leagueId))];
  
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
        // sortPosts();
        // selectPost();
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
        // sortPosts,
        fetchPosts,
        handleDateChange,
        formatDate,
        selectButtonValue,
        // selectPost,
        matchProTime,
        proTime,
        getImageCountry,
        handleSelectMatch,
        formatTime,
        handleValue,
        newTime,
        selectedDate,
        getImageTeam,
        getLeagueName,
        // getMatchState,
        // convertTimestampToDate,
        // getTimestampRange,
        handleTimezoneChange,
        timezones,
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
  