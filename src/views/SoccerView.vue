<template>
  <headView @select-match="handleSelectMatch"/>
  <div class="bodyBd">
    <div class="bodyBox">
      <!-- 側邊攔在這 -->
      <side @select-match="handleSelectMatch" />
      <!-- 表格內容在這邊 -->
      <div class="w-100 p-3">
        <!-- 列表 -->
        <!-- <div class="bodyListBox"> -->
        <div v-for="match in filteredMatches" :key="match.matchID" class="bodyListRow">
          <div class="bodyListTitle">
            <!-- <input type="checkbox" value="None" v-model="match.checked" :id="match.matchsID" @change="handleCheck(match)" name="check" /> -->
            <div>{{ match.matchName }}</div>
          </div>
          <div v-for="item in match.matchList" :key="item.matchID" class="bodyListBox">
            <div>{{ item.matchTime }}</div>
            <div>{{ item.status }}</div>
            <div class="bodyListLeft">{{ item.team1.name }}</div>
            <div>{{ item.team1.score }} - {{ item.team2.score }}</div>
            <div class="bodyListRight">{{ item.team2.name }}</div>
            <div v-if="item.isLive == true" class="bodyListLive">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-collection-play" viewBox="0 0 16 16">
                <path d="M2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3m2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1m2.765 5.576A.5.5 0 0 0 6 7v5a.5.5 0 0 0 .765.424l4-2.5a.5.5 0 0 0 0-.848z"/>
                <path d="M1.5 14.5A1.5 1.5 0 0 1 0 13V6a1.5 1.5 0 0 1 1.5-1.5h13A1.5 1.5 0 0 1 16 6v7a1.5 1.5 0 0 1-1.5 1.5zm13-1a.5.5 0 0 0 .5-.5V6a.5.5 0 0 0-.5-.5h-13A.5.5 0 0 0 1 6v7a.5.5 0 0 0 .5.5z"/>
              </svg>
            </div>
            <div v-else>

            </div>
            <div>
              -
            </div>
            <div>
              -
            </div>
            <div>
              -
            </div>
          </div>
        </div>
      </div>
      <!-- 右邊時間 -->
      <sideTime/>
    </div>
  </div>
  <footView/>
</template>

<script>
// @ is an alias to /src
import headView from '@/components/headView.vue'
import side from '@/components/sideView.vue'
import matches from '@/matches.json'
import sideTime from '@/components/sideRightView.vue'
import footView from '@/components/footView.vue'

export default {
  name: 'HomeView',
  data(){
    return{
      selectedMatchID: null,
      isCheck: false,
      matches: matches.map(match => ({ ...match, checked: false })),
      selectedMatches: [] 
    }
  },
  computed: {
    filteredMatches() {
      if (this.selectedMatchID) {
        return this.matches.filter(match => match.matchsID === this.selectedMatchID);
      }
      return this.matches;
    }
  },
  components: {
    headView,
    side,
    sideTime,
    footView
  },
  methods: {
    handleSelectMatch(id) {
      this.selectedMatchID = id;
    }
  //   handleCheck(match) {
  //     const matchData = {
  //       for item in match.matchList{

  //       }
  //       matchName: match.matchName,
  //       score: `${match.team1.score} - ${match.team2.score}`
  //     };

  //     if (match.checked) {
  //       // 檢查數據是否已經存在
  //       if (!this.selectedMatches.some(m => m.matchName === matchData.matchName)) {
  //         this.selectedMatches.push(matchData);
  //       }
  //     } else {
  //       // 移除數據
  //       this.selectedMatches = this.selectedMatches.filter(
  //         m => m.matchName !== matchData.matchName
  //       );
  //     }
  //     console.log(this.selectedMatches);
  //   }
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
  padding: 1rem 0 1rem 0;
}

.bodyTitleBox{
  display: flex;
  gap:0.2rem;
}

.bodyListBox{
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-gap: 10px; /* 设置列之间的间距 */

  .bodyListRow{
    display: contents;
  }

  .bodyListLeft{
    text-align:end;
  }

  .bodyListRight{
    text-align:start;
  }

  .bodyListLive{
    color: red;
  }
}

.bodyListTitle{
  display: flex;
  background: #f1f1f1;
  gap:0.5rem;
}

.pcListX{
  display: flex;
  justify-content: space-between;
}

.timeBd{
  padding: 1rem 0 1rem 1rem;

  .timeBox{
    display: flex;
    flex-direction:column;

    .timeText{
      text-align: start;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .timeText.title{
      background: #F2F2F2;
    }
  }
}

</style>
