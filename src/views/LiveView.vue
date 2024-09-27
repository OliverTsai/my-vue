<template>
    <headView />
    <div class="liveBd">
      <div class="liveBox p-2 mt-3">
        <div style="width: 667px; height: 500px;" class="mt-5">
          <iframe id="testIframe" :src="url" frameborder="0" style="width: 100%; height: 100%;"></iframe>
        </div>
        <div v-if="posts.matchList && posts.matchList.length > 0" class="mt-5">
          天氣狀態：{{ posts.matchList[0].weatherCn }}
        </div>
      </div>
    </div>
    
    <!-- <div v-if="posts.matchList && posts.matchList.length > 0">
      <div v-if="posts.matchList[0].state === 0">{{ $t('Schedule') }}</div>
      <div v-if="posts.matchList[0].state === 1">{{ '上半場' }}{{ proTime(posts.matchList[0].startTime) }}</div>
      <div v-if="posts.matchList[0].state === 2">{{ '中場' }}</div>
      <div v-if="posts.matchList[0].state === 3">{{ '下半場' }}{{ proTime(posts.matchList[0].startTime)+45 }}</div>
      <div v-if="posts.matchList[0].state === 4">{{ '加時' }}</div>
      <div v-if="posts.matchList[0].state === 5">{{ '點球' }}</div>
      <div v-if="posts.matchList[0].state === -10">{{ '取消' }}</div>
      <div v-if="posts.matchList[0].state === -11">{{ '待定' }}</div>
      <div v-if="posts.matchList[0].state === -12">{{ '腰斬' }}</div>
      <div v-if="posts.matchList[0].state === -13">{{ '中斷' }}</div>
      <div v-if="posts.matchList[0].state === -14">{{ '推遲' }}</div>
      <div v-if="posts.matchList[0].state === -1">{{ $t('Finished') }}</div>
      <div class="proBox">
        <div>
          <div>紅牌:{{ posts.matchList[0].homeRed }}</div>
          <div>黃牌:{{ posts.matchList[0].homeYellow }}</div>
          <div>角球:{{ posts.matchList[0].homeCorner }}</div>
        </div>
        <div>{{ posts.matchList[0].homeCht }}</div>
        <div>{{ posts.matchList[0].homeScore }}</div>
        <div>:</div>
        <div>{{ posts.matchList[0].awayScore }}</div>
        <div>{{ posts.matchList[0].awayCht }}</div>
        <div>
          <div>紅牌:{{ posts.matchList[0].awayRed }}</div>
          <div>黃牌:{{ posts.matchList[0].awayYellow }}</div>
          <div>角球:{{ posts.matchList[0].awayCorner }}</div>
        </div>
      </div>
    </div> -->
  </template>
  
  <script>
  // @ is an alias to /src
  import headView from '@/components/headView.vue'
  import { ref, onMounted  } from 'vue'
  import md5 from 'js-md5'; // Assuming you use crypto-js for hashing
  import { useRoute } from 'vue-router';
  
  export default {
    name: 'LiveView',
    setup() {
      const accessKey = ref('aJLBMV5nq4henA3cDQvcK4YuIpKIFzmCx0q5');
      const secret = ref('Z4DoZcPnCPb1fFU5D7KnJlq1SJN9Y8UIJ6oW');
      const ts = ref(Math.floor(Date.now())); // Unix timestamp
      const auth = ref('');
      const url = ref('');
      const route = useRoute();
      const matchId = ref(String(route.params.id));
      let posts = ref({ matchList: [] });
  
      const updateUrl  = () => {
        auth.value = md5(accessKey.value + ts.value + secret.value).toUpperCase();
        url.value = `https://zhibo.feijing88.com/football/detail.html?matchId=${matchId.value}&accessKey=${accessKey.value}&ts=${ts.value}&auth=${auth.value}&statsPanel=HIDE`;
        console.log(url.value)
      }
  
      const dateUrl = async() => {
        try {
          const response = await fetch(`https://befenscore.net/api/get-pro/${matchId.value}`);
          const data = await response.json();  // 确保将响应转换为JSON
          posts.value = { matchList: [] };
          const matchIdNum = Number(matchId.value);
          posts.value.matchList = data.matchList.filter(post => post.matchId === matchIdNum);
          console.log('Data updated:', data.matchList);
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      }
  
      // 比賽進行時間
      const proTime = (time) =>{
        const newTime = new Date();
        const differentTime = newTime - new Date(time);
        const matchMinutes = Math.floor(differentTime / 60000);
        return matchMinutes;
      }
  
      // function ji3(){
  
      // }
  
      onMounted(() => {
        updateUrl();
        dateUrl();
        // setInterval(() => {
        //   ts.value = Math.floor(Date.now()); // Update ts every second
        //   auth.value = md5(accessKey.value + ts.value + secret.value).toUpperCase();
        // }, 1000000);
        setInterval(dateUrl, 60000);
      });
  
      // watch(ts, () => {
      //   updateUrl();
      // });
  
      return {
        proTime,
        posts,
        dateUrl,
        url
      }
    },
    components: {
      headView
    },
  }
  </script>
  
  <style scoped>
  .liveBd{
    display: flex;
    align-items:center;
    flex-direction:column;
    width: 100%;
  }

  .liveBox{
    display: flex;
    width: 1200px; 
    gap:1rem;       
  }
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
  
  .teamBd{
    display: flex;
    gap:0.5rem;
  }
  
  .teamImgBox{
    width: 20px;
    height: 20px;
  }
  
  .proBox{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  
  </style>