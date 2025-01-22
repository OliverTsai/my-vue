<template>
    <headView />
    <div v-if="isLoading" class="loading-box p-3">
        <div class="spinner"></div>
        <p>Loading...</p>
    </div>
    <div v-else>
        <div class="leagueBd">
            <!-- <div class="leagueBox p-2 mt-3">
                <div class="leagueBoxFlex">
                    <div class="leagueBoxFlex">
                        <div class="logoImgBox">
                            <img :src="getImageLeague()" class="h-100">
                        </div>
                        <div>
                            <div>{{ leagueContent.nameCht }}</div>
                            <div>{{ '賽事國家：' }}{{ leagueContent.countryCn }}</div>
                            <div>{{ '當前賽季：' }}{{ leagueContent.currSeason }}</div>
                        </div>
                    </div>
                    <div>
                        <button @click="goBack">上一頁</button>
                    </div>
                </div>
            </div> -->
            <div v-if="leagues.length === 0" class="leagueBox p-2 mbodyListLine">
                <div class="NoValueFrame">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-diamond-fill" viewBox="0 0 16 16">
                        <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                    </svg><br>
                    <div>{{ $t('no_data') }}</div>
                </div>
            </div>
            <div v-else>
                <div v-for="league in leagues" :key="league.leagueId" class="leagueBox p-2">
                    <div class="bodyListBox w-100">
                        <div class="ColumnW8">{{ formatTime(league.matchTime) }}</div>
                        <div class="ColumnW8">
                            <div>{{ $t(getMatchState(league.state)) }}</div>
                        </div>
                        <div v-if="this.$i18n.locale === 'zh_cn'" class="ColumnW26 bodyListLeft">{{ league.homeChs }}</div>
                        <div v-else-if="this.$i18n.locale === 'zh_hk'" class="ColumnW26 bodyListLeft">{{ league.homeCht }}</div>
                        <div v-else class="ColumnW26 bodyListLeft">{{ league.homeEn }}</div>
                        <div class="ColumnW8 teamImgFlex">
                            <div class="teamImgBox">
                                <img :src="getImageTeam(league.homeId)" class="w-100">
                            </div>
                        </div>
                        <div class="ColumnW8 text-danger">{{ league.homeScore }} - {{ league.awayScore }}</div>
                        <div class="ColumnW8">
                            <div class="teamImgBox">
                                <img :src="getImageTeam(league.awayId)" class="w-100">
                            </div>
                        </div>
                        <div v-if="this.$i18n.locale === 'en'" class="ColumnW26 bodyListRight">{{ league.awayEn }}</div>
                        <div v-if="this.$i18n.locale === 'zh_cn'" class="ColumnW26 bodyListRight">{{ league.awayChs }}</div>
                        <div v-if="this.$i18n.locale === 'zh_hk'" class="ColumnW26 bodyListRight">{{ league.awayCht }}</div>
                        <div v-if="[1, 2, 3, 4, 5].includes(league.state)" class="ColumnW8 bodyListLive">
                        <router-link :to="{ name: 'live', params: { date:newTime,id: league.matchId } }" class="ImgRouterBox w-100">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-collection-play" viewBox="0 0 16 16">
                                <path d="M2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3m2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1m2.765 5.576A.5.5 0 0 0 6 7v5a.5.5 0 0 0 .765.424l4-2.5a.5.5 0 0 0 0-.848z"/>
                                <path d="M1.5 14.5A1.5 1.5 0 0 1 0 13V6a1.5 1.5 0 0 1 1.5-1.5h13A1.5 1.5 0 0 1 16 6v7a1.5 1.5 0 0 1-1.5 1.5zm13-1a.5.5 0 0 0 .5-.5V6a.5.5 0 0 0-.5-.5h-13A.5.5 0 0 0 1 6v7a.5.5 0 0 0 .5.5z"/>
                            </svg>
                        </router-link>
                        </div>
                        <div v-else class="ColumnW8"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import headView from '@/components/headView.vue'
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router';
import { fetchPosts } from '@/composables/useApi.js';
import { getImageTeam } from '@/composables/useImage.js';
import { useDataStore } from '@/store/dataStore'

export default {
    name:'leagueView',
    components: {
        headView,
    },
    setup(){

        const dataStore = useDataStore()
        const leagueData = computed(() => dataStore.leagueData)

        const route = useRoute();
        const leagueId = ref(String(route.params.league_id));

        const matchData = ref(null);

        const leagues = ref([]);

        const isLoading = ref(true);

        const newTime = ref('2024-11-11')

        // 賽事搜尋
        const leaguesList = async() =>{
            try{
                isLoading.value = true;

                matchData.value = await fetchPosts('https://befenscore.net/api/get-data')
                console.log('123')
                console.log(leagueId.value)
                console.log(matchData.value)

                if (matchData.value && matchData.value.matchList) {
                    // 確保篩選時的類型一致
                    leagues.value = matchData.value.matchList.filter(league => leagueId.value.includes(Number(league.leagueId)));
                    console.log('Filtered Leagues:', leagues.value);
                } else {
                    console.error('Invalid data format:', matchData.value);
                }

                isLoading.value = false;
            }catch(error){
                console.error('Error fetching leagues:', error);
                isLoading.value = false;
            }
        }

        // 顯示時間
        const formatTime = (datetime) =>{
            const date = new Date(datetime);
            // const month = String(date.getMonth() + 1).padStart(2, '0');
            // const day = String(date.getDate()).padStart(2, '0');
            const hour = String(date.getHours()).padStart(2, '0');
            const minute = String(date.getMinutes()).padStart(2, '0');
            return `${hour}:${minute}`;
        }

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

        // 聯賽圖片位置
        const getImageLeague = () =>{
            try{
                return require(`../assets/league_logos/${leagueId.value}.png`);
            } catch (error) {
                return require(`../assets/league_logos/1.png`);
            }
        }

        const goBack = () => {
            window.history.back(); // 回到上一頁
        };

        // 監聽 leagueId 變化
        watch(() => route.params.league_id, (newId) => {
            leagueId.value = String(newId);  // 更新 leagueId
            leaguesList();  // 重新篩選資料
        });
        
        onMounted(() => {
            leaguesList();
        });

        return{
            leagueId,
            leagues,
            formatTime,
            getImageLeague,
            getMatchState,
            leagueData,
            getImageTeam,
            newTime,
            goBack
        }
    },
}
</script>





<style scoped>

.leagueBd{
    display: flex;
    align-items:center;
    flex-direction:column;
    width: 100%;
}

.leagueBox{
    width: 1200px;        
}

.leagueBoxFlex{
    display: flex;
    justify-content: space-between;
    align-items: center;
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

.mleftBox {
    display: flex;
    justify-content: center;
    flex-direction: column;
}

.rightBox {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.leftBox {
    display: flex;
    justify-content: center;
    flex-direction: column;
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

.logoImgBox{
    height: 150px;
    max-width: 150px;
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








</style>