<template>
    <headView/>
    <div class="bodyBd">
      <div class="bodyBox">
        <!-- 側邊攔在這 -->
        <!-- <div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
        </div> -->
        <!-- 表格內容在這邊 -->
        <div class="w-100 p-3">
          <div class="bodyTitle">
            <div class="bodyTitleBox">
              <div>{{$t('SoccerEvents')}}</div>
            </div>
            <div class="bodyTitleBox">
              <input type="checkbox" v-model="isCheck" /> {{$t('TimeSorting')}}
            </div>
          </div>
          <div></div>
          <div class="bodyListBox">
            <div>時間</div>
            <div>場次</div>
            <div>隊伍</div>
            <div>比分</div>
            <div>隊伍</div>
            <div>HT 0-0</div>
            <div>直播</div>
          </div>
          <div v-for="match in matches" :key="match.matchID" class="bodyListBox">
            <div>{{ match.matchTime }}</div>
            <div>{{ match.matchName }}</div>
            <div>{{ match.team1.name }}</div>
            <div>{{ match.team1.score }} - {{ match.team2.score }}</div>
            <div>{{ match.team2.name }}</div>
            <div>{{ match.status }}</div>
            <div>{{ match.isLive ? '是' : '否' }}</div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import headView from '@/components/headView.vue'
  import matches from '@/matches.json'
  
  export default {
    name: 'HomeView',
    data(){
      return{
        isCheck: false,
        matches
      }
    },
    components: {
      headView
    }
  }
  </script>
  
  <style lang="scss">
  
  .bodyBd{
    display: flex;
      justify-content: center;
  }
  
  .bodyBox{
    width: 1200px;
      display: flex;
      justify-content: space-between;
  }
  
  .bodyTitle{
    display: flex;
    justify-content: space-between;
    padding: 3rem;
  }
  
  .bodyTitleBox{
    display: flex;
  }
  
  .bodyListBox{
    display: grid;
    grid-template-columns: repeat(7, 1fr); /* 创建五个等宽的列 */
    grid-gap: 10px; /* 设置列之间的间距 */
  }
  
  </style>
  