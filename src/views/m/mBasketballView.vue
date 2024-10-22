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
                <button type="button" class="btn btnBox" :class="{ active: selectedButton === 'allEvents' }" @click="selectButton('allEvents')">{{$t('AllEvents')}}</button>
                <button type="button" class="btn btnBox" :class="{ active: selectedButton === 'live' }" @click="selectButton('live')">{{$t('Live')}}</button>
                <button type="button" class="btn btnBox" :class="{ active: selectedButton === 'finished' }" @click="selectButton('finished')">{{$t('Finished')}}</button>
                <button type="button" class="btn btnBox" :class="{ active: selectedButton === 'schedule' }" @click="selectButton('schedule')">{{$t('Schedule')}}</button>
              </div>
              <div class="bodyTitleBox">
                <div v-if="this.selectedButton === 'allEvents'" class="btn-group">
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
            <div v-for="post in posts.matchList" :key="post.matchId">
              <div class="bodyListTitle">
                {{ post.leagueChtShort }}{{ post.subLeagueCht }}
              </div>
              <div class="mbodyListBox mbodyListLine">
                <div class="mColumnW18">
                  <div>{{ forTeamTime(post.matchTime) }}</div>
                  <div v-if="post.state === 0">{{ $t('Schedule') }}</div>
                  <div v-if="post.state === 1">{{ '上半場' }}</div>
                  <div v-if="post.state === 2">{{ '中場' }}</div>
                  <div v-if="post.state === 3">{{ '下半場' }}</div>
                  <div v-if="post.state === 4">{{ '加時' }}</div>
                  <div v-if="post.state === 5">{{ '點球' }}</div>
                  <div v-if="post.state === -10">{{ '取消' }}</div>
                  <div v-if="post.state === -11">{{ '待定' }}</div>
                  <div v-if="post.state === -12">{{ '腰斬' }}</div>
                  <div v-if="post.state === -13">{{ '中斷' }}</div>
                  <div v-if="post.state === -14">{{ '推遲' }}</div>
                  <div v-if="post.state === -1">{{ $t('Finished') }}</div>
                </div>
                <div class="mColumnW62 leftBox">
                  <div class="teamBd">
                    <div class="teamImgBox">
                      <img :src="getImageUrl(post.homeId)" class="w-100">
                    </div>
                    <div>{{ post.homeCht }}</div>
                  </div>
                  <div class="teamBd">
                    <div class="teamImgBox">
                      <img :src="getImageUrl(post.awayId)" class="w-100">
                    </div>
                    <div>{{ post.awayCht }}</div>
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
            </div>
            <!-- <div v-for="(matches, league) in groupedMatches" :key="league">
              <div class="bodyListTitle">
                <div v-if="this.$i18n.locale === 'en'">{{ league }}</div>
                <div v-if="this.$i18n.locale === 'zh_hk'">{{ matches[0].leagueChtShort }}{{ matches[0].subLeagueCht }}</div>
                <div v-if="this.$i18n.locale === 'zh_cn'">{{ matches[0].leagueChsShort }}{{ matches[0].subLeagueChs }}</div>
              </div>
              <div v-for="match in matches" :key="match.matchId" class="mbodyListBox mbodyListLine">
                <div class="mColumnW18">
                  <div>{{ formatTime(match.matchTime) }}</div>
                  <div v-if="match.state === 0">{{ $t('Schedule') }}</div>
                  <div v-if="match.state === 1">{{ '上半場' }}</div>
                  <div v-if="match.state === 2">{{ '中場' }}</div>
                  <div v-if="match.state === 3">{{ '下半場' }}</div>
                  <div v-if="match.state === 4">{{ '加時' }}</div>
                  <div v-if="match.state === 5">{{ '點球' }}</div>
                  <div v-if="match.state === -10">{{ '取消' }}</div>
                  <div v-if="match.state === -11">{{ '待定' }}</div>
                  <div v-if="match.state === -12">{{ '腰斬' }}</div>
                  <div v-if="match.state === -13">{{ '中斷' }}</div>
                  <div v-if="match.state === -14">{{ '推遲' }}</div>
                  <div v-if="match.state === -1">{{ $t('Finished') }}</div>
                </div>
                <div class="mColumnW62 leftBox">
                  <div v-if="this.$i18n.locale === 'en'">{{ match.homeEn }}</div>
                  <div v-if="this.$i18n.locale === 'zh_hk'">{{ match.homeCht }}</div>
                  <div v-if="this.$i18n.locale === 'zh_cn'">{{ match.homeChs }}</div>
                  <div v-if="this.$i18n.locale === 'en'">{{ match.awayEn }}</div>
                  <div v-if="this.$i18n.locale === 'zh_hk'">{{ match.awayCht }}</div>
                  <div v-if="this.$i18n.locale === 'zh_cn'">{{ match.awayChs }}</div>
                </div>
                <div class="mColumnW10 rightBox" v-if="match.state === 0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-collection-play" viewBox="0 0 16 16">
                    <path d="M2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3m2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1m2.765 5.576A.5.5 0 0 0 6 7v5a.5.5 0 0 0 .765.424l4-2.5a.5.5 0 0 0 0-.848z" />
                    <path d="M1.5 14.5A1.5 1.5 0 0 1 0 13V6a1.5 1.5 0 0 1 1.5-1.5h13A1.5 1.5 0 0 1 16 6v7a1.5 1.5 0 0 1-1.5 1.5zm13-1a.5.5 0 0 0 .5-.5V6a.5.5 0 0 0-.5-.5h-13A.5.5 0 0 0 1 6v7a.5.5 0 0 0 .5.5z" />
                  </svg>
                </div>
                <div class="mColumnW10 rightBox" v-else></div>
                <div class="mColumnW10 mrightBox">
                  <div>{{ match.homeScore }}</div>
                  <div>{{ match.awayScore }}</div>
                </div>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>

    
  </div>
<div id="footer"> Copyright @ 2024 BeFun Score </div>
    
</template>

<script>
// @ is an alias to /src
import headView from '@/components/m/mHeadView.vue'
import matchesData from '@/mathList.json'
import { ref, onMounted } from 'vue'
// import axios from 'axios';

export default {
  name: 'mSoccerView',
  setup() {
    const posts = ref([]);

    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/football/today.aspx?key=4F85B2B3E6B54006');
        const data = await response.json();  // 確保將響應轉換為JSON
        posts.value = data;
        console.log(posts)
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    onMounted(() => {
      fetchPosts();
    });

    return {
      posts
    };
  },
  data() {
    return {
      selectedMatchID: null,
      isLive: false,
      isCheck: false,
      selectedButton: 'live',
      matches: matchesData.matchList.map(match => ({ ...match, checked: false })),
      selectedMatches: [],
      // selectedDate: null,
      selectedDate: new Date(),
      showDatePicker: false,
      imageCache: {},
    }
  },
  computed: {
    filteredMatches() {
      let filtered = this.matches;

      if (this.selectedButton === 'allEvents') {
        return filtered;
      }
      if (this.selectedDate) {
        const selectedDateString = this.formatDate(this.selectedDate);
        filtered = filtered.filter((match) => match.matchTime.startsWith(selectedDateString));
      }
      if (this.selectedMatchID) {
        filtered = filtered.filter(match => match.matchId === this.selectedMatchID);
      }
      if (this.selectedButton === 'live') {
        // filtered = filtered.filter(match => match.state === 0);
        const today = new Date();
        const todayString = `${today.getFullYear()}/${String(today.getMonth() + 1)}/${String(today.getDate())}`;
        console.log(todayString);
        filtered = this.matches.filter(match => match.matchTime.startsWith(todayString));
        filtered.sort((a, b) => {
          const now = new Date();
          const timeA = new Date(a.matchTime);
          const timeB = new Date(b.matchTime);
          return Math.abs(timeA - now) - Math.abs(timeB - now);
        }); 
      }
      if (this.selectedButton === 'finished') {
        filtered = filtered.filter(match => match.state === 1);
      }
      if (this.selectedButton === 'schedule') {
        filtered = filtered.filter(match => match.state === -1);
      }
      return filtered;
    },
    // 按照聯賽排列
    groupedMatches() {
      return this.filteredMatches.reduce((acc, match) => {
        if (!acc[match.leagueEn]) {
          acc[match.leagueEn] = [];
        }
        acc[match.leagueEn].push(match);
        return acc;
      }, {});
    },
    selectableDates() {
      const dates = [];
      const today = new Date();
      for (let i = -5; i <= 5; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const formattedDate = this.formatDateForDropdown(date);
        dates.push(formattedDate);
      }
      return dates;
    }
  },
  components: {
    headView
  },
  methods: {
    getImageUrl(teamId) {
      try{
        return require(`../../assets/team_logos/${teamId}.png`);
      } catch (error) {
        return require(`../../assets/team_logos/0.png`);
      }
      
    },
    handleSelectMatch(id) {
      this.selectedMatchID = id;
      this.isLive = false;
      // this.selectedDate = null;
      this.selectedButton = 'allEvents';
    },
    liveSelectMatch(value) {
      this.isLive = value;
      this.selectedMatchID = null;
      this.selectedButton = 'live';
    },
    selectButton(button) {
      this.selectedButton = button;
      if (button === 'allEvents') {
        this.handleSelectMatch(null);
      } else if (button === 'live') {
        this.liveSelectMatch(true);
      } else {
        this.isLive = false;
        this.selectedMatchID = null;
      }
    },
    handleDateChange(dateString) {
      this.selectedMatchID = null;
      this.selectedButton = 'Date';
      this.showDatePicker = false;
      let parts = dateString.split('/');
      let selectedDates = new Date();
      selectedDates.setMonth(parts[0]-1);
      parts = parts[1].split(' ');
      selectedDates.setDate(parts[0]);
      console.log(selectedDates)
      this.selectedDate = selectedDates;
    },
    // handleDateChange(value) {
    //   this.selectedMatchID = null;
    //   this.selectedButton = 'Date';
    //   this.selectedDate = value;
    //   this.showDatePicker = false;
    // },
    disabledDate(time) {
      const now = new Date();
      const fiveDaysBefore = new Date();
      fiveDaysBefore.setDate(now.getDate() - 6);
      const fiveDaysAfter = new Date();
      fiveDaysAfter.setDate(now.getDate() + 5);
      return time < fiveDaysBefore || time > fiveDaysAfter;
    },
    formatTime(datetime) {
      const date = new Date(datetime);
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hour = String(date.getHours()).padStart(2, '0');
      const minute = String(date.getMinutes()).padStart(2, '0');
      return `${month}/${day} ${hour}:${minute}`;
    },
    forTeamTime(datetime) {
      const date = new Date(datetime);
      const hour = String(date.getHours()).padStart(2, '0');
      const minute = String(date.getMinutes()).padStart(2, '0');
      return `${hour}:${minute}`;
    },
    // 這邊是日期篩選跟時間按鈕共同使用
    formatDate(date) {
      const year = date.getFullYear();
      // const month = String(date.getMonth() + 1).padStart(2, '0');
      // const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1);
      const day = String(date.getDate());
      return `${year}/${month}/${day}`;
    },
    openDatePicker() {
      this.showDatePicker = true;
      this.$nextTick(() => {
        const datePickerComponent = this.$refs.datePicker;
        if (datePickerComponent && datePickerComponent.focus) {
          datePickerComponent.focus();
        }
      });
    },
    formatDateForDropdown(date) {
      const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const weekday = weekdays[date.getDay()];
      return `${month}/${day} ${weekday}`;
    },
  }
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


</style>