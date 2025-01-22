<template>
    <headView @select-match="handleSelectMatch"/>
    <div v-if="isLoading" class="loading-box p-3">
        <div class="spinner"></div>
        <p>Loading...</p>
    </div>
    <div v-else class="bodyBd">
        <div class="w-100">
            <div class="bannerBox" data-v-d4c6fef0="">
                <img src="../../assets/banner/scoreBanner_01s_990x102.jpg" class="banner" data-v-d4c6fef0=""><i class="iconfont icon-guanbi close" data-v-d4c6fef0=""></i>
            </div>
            <div class="area_score">
                <div v-if="leagues.length === 0">
                    <div class="NoValueFrame">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-diamond-fill" viewBox="0 0 16 16">
                            <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                        </svg><br>
                        <div>{{ $t('no_data') }}</div>
                    </div>
                </div>

                <div v-else>
                    <div class="p-3 LeagueNameTitle">聯賽今日賽事</div>
                    <div v-for="league in leagues" :key="league.leagueId" class="mbodyListBox mbodyListLine">
                        <router-link :to="{ name: 'live', params: { date:'2024-10-18',id: league.matchId } }" class="bodyRouterBox w-100">
                            <div class="mbodyListBox mbodyListLine">
                                <div class="mColumnW18">
                                    <div>{{ formatTime(league.matchTime) }}</div>
                                    <div>{{ $t(getMatchState(league.matchState)) }}</div>
                                    </div>
                                <div class="mColumnW62 leftBox">
                                    <div class="teamBd">
                                        <div class="teamImgBox">
                                            <img :src="getImageTeam(league.homeId)" class="w-100">
                                        </div>
                                        <div v-if="this.$i18n.locale === 'zh_hk'">{{ league.homeTeamCht }}</div>
                                        <div v-else-if="this.$i18n.locale === 'zh_cn'">{{ league.homeTeamChs }}</div>
                                        <div v-else>{{ league.homeTeamEn }}</div>
                                    </div>
                                    <div class="teamBd">
                                        <div class="teamImgBox">
                                            <img :src="getImageTeam(league.awayId)" class="w-100">
                                        </div>
                                        <div v-if="this.$i18n.locale === 'zh_hk'">{{ league.awayTeamCht }}</div>
                                        <div v-else-if="this.$i18n.locale === 'zh_cn'">{{ league.awayTeamChs }}</div>
                                        <div v-else>{{ league.awayTeamEn }}</div>
                                    </div>
                                </div>
                                <div class="mColumnW10 rightBox" v-if="[1, 2, 3, 4, 5].includes(league.state)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-collection-play" viewBox="0 0 16 16">
                                    <path d="M2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3m2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1m2.765 5.576A.5.5 0 0 0 6 7v5a.5.5 0 0 0 .765.424l4-2.5a.5.5 0 0 0 0-.848z" />
                                    <path d="M1.5 14.5A1.5 1.5 0 0 1 0 13V6a1.5 1.5 0 0 1 1.5-1.5h13A1.5 1.5 0 0 1 16 6v7a1.5 1.5 0 0 1-1.5 1.5zm13-1a.5.5 0 0 0 .5-.5V6a.5.5 0 0 0-.5-.5h-13A.5.5 0 0 0 1 6v7a.5.5 0 0 0 .5.5z" />
                                    </svg>
                                </div>
                                <div class="mColumnW10 rightBox" v-else></div>
                                <div class="mColumnW10 mrightBox">
                                    <div>{{ league.homeScore }}</div>
                                    <div>{{ league.awayScore }}</div>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

        
    </div>
    <div id="footer"> Copyright @ 2024 BeFun Score </div>
    
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router';
import headView from '@/components/m/mHeadView.vue';
import { getImageTeam } from '@/composables/useImage.js';
import { fetchPosts } from '@/composables/useApi.js';

export default {
    name:'mleagueView',
    components: {
        headView
    },
    setup(){
        const route = useRoute();
        const leagueId = ref(String(route.params.id));

        const matchData = ref(null)

        const leagues = ref([]);

        const isLoading = ref(true);

        // 賽事搜尋
        const leaguesList = async() =>{
            try{
                isLoading.value = true;
                matchData.value = await fetchPosts('https://befenscore.net/bk/get-data')

                if (matchData.value && matchData.value.matchList) {
                    // 確保篩選時的類型一致
                    leagues.value = matchData.value.matchList.filter(league => leagueId.value.includes(Number(league.leagueId)));
                    console.log('Filtered Leagues:', leagues.value);
                } else {
                    console.error('Invalid data format:', matchData.value);
                }
                isLoading.value = false;
                // console.log(data)
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

        // 圖片位置
        const getImageUrl = (teamId) =>{
        try{
            return require(`../../assets/team_logos/${teamId}.png`);
        } catch (error) {
            return require(`../../assets/team_logos/0.png`);
        }
        }

        // 監聽 leagueId 變化
        watch(() => route.params.id, (newId) => {
            leagueId.value = String(newId);  // 更新 leagueId
            leaguesList();  // 重新篩選資料
        });
        
        onMounted(() => {
            leaguesList()
        });

        return{
            leagueId,
            leagues,
            formatTime,
            getImageUrl,
            getImageTeam,
            isLoading,
            getMatchState,
        }
    },
}
</script>

<style scoped>

.mbodyListBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
    margin: 0rem 0px 0px 0px;
}

.LeagueNameTitle{
    background: #ffffff;
    border-bottom: 1px solid #cccccc;
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



#footer {
    text-align: center;
    color: #ffffff;
    background: #003e5d;
    padding: 30px 5px 5px 5px;
    height: 80px;
    font-size: 0.8rem;
}
</style>