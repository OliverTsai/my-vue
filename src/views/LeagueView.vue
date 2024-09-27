<template>
    <headView />
    <div class="leagueBd">
        <div class="leagueBox p-2 mt-3">
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
        </div>
        <div class="leagueBox p-2">
            {{ '當日聯賽' }}
        </div>
        <div v-for="league in leagues" :key="league.leagueId" class="leagueBox p-2">
            <div class="bodyListBox w-100">
                <div class="ColumnW8">{{ formatTime(league.matchTime) }}</div>
                <div class="ColumnW8">
                    <div v-if="league.state === 0">{{ $t('Schedule') }}</div>
                    <div v-if="league.state === 1">{{ $t('first_half') }}</div>
                    <div v-if="league.state === 2">{{ $t('midfield') }}</div>
                    <div v-if="league.state === 3">{{ $t('second_half') }}</div>
                    <div v-if="league.state === 4">{{ $t('overtime') }}</div>
                    <div v-if="league.state === 5">{{ $t('penalty_kick') }}</div>
                    <div v-if="league.state === -10">{{ $t('cancel') }}</div>
                    <div v-if="league.state === -11">{{ $t('tbd') }}</div>
                    <div v-if="league.state === -12">{{ $t('cut_in_half') }}</div>
                    <div v-if="league.state === -13">{{ $t('discontinue') }}</div>
                    <div v-if="league.state === -14">{{ $t('postpone') }}</div>
                    <div v-if="league.state === -1">{{ $t('Finished') }}</div>
                </div>
                <div v-if="this.$i18n.locale === 'en'" class="ColumnW26 bodyListLeft">{{ league.homeEn }}</div>
                <div v-if="this.$i18n.locale === 'zh_cn'" class="ColumnW26 bodyListLeft">{{ league.homeChs }}</div>
                <div v-if="this.$i18n.locale === 'zh_hk'" class="ColumnW26 bodyListLeft">{{ league.homeCht }}</div>
                <div class="ColumnW8 teamImgFlex">
                    <div class="teamImgBox">
                        <img :src="getImageUrl(league.homeId)" class="w-100">
                    </div>
                </div>
                <div class="ColumnW8 text-danger">{{ league.homeScore }} - {{ league.awayScore }}</div>
                <div class="ColumnW8">
                    <div class="teamImgBox">
                        <img :src="getImageUrl(league.awayId)" class="w-100">
                    </div>
                </div>
                <div v-if="this.$i18n.locale === 'en'" class="ColumnW26 bodyListRight">{{ league.awayEn }}</div>
                <div v-if="this.$i18n.locale === 'zh_cn'" class="ColumnW26 bodyListRight">{{ league.awayChs }}</div>
                <div v-if="this.$i18n.locale === 'zh_hk'" class="ColumnW26 bodyListRight">{{ league.awayCht }}</div>
                <div v-if="[1, 2, 3, 4, 5].includes(league.state)" class="ColumnW8 bodyListLive">
                <router-link :to="{ name: 'live', params: { id: league.matchId } }" class="ImgRouterBox w-100">
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
</template>

<script>
import headView from '@/components/headView.vue'
import { ref, onMounted  } from 'vue'
import { useRoute } from 'vue-router';

export default {
    name:'mleagueView',
    components: {
        headView,
    },
    setup(){
        const route = useRoute();
        const leagueId = ref(String(route.params.id));

        const leagues = ref([]);
        const leagueContent = ref({});

        // 賽事搜尋
        const leaguesList = async() =>{
            try{
                const response = await fetch(`https://befenscore.net/api/get-data`);
                const data = await response.json();

                if (data && data.matchList) {
                    // 確保篩選時的類型一致
                    leagues.value = data.matchList.filter(league => leagueId.value.includes(Number(league.leagueId)));
                    // console.log('Filtered Leagues:', leagues.value);
                } else {
                    console.error('Invalid data format:', data);
                }
                // console.log(data)
            }catch(error){
                console.error('Error fetching leagues:', error);
            }
        }

        //單一賽事詳細資料
        const getleagues = async () =>{
            try{
                const response = await fetch(`https://befenscore.net/api/league-data`);
                const data = await response.json();

                const league = data.leagueList.find(league => league.leagueId == leagueId.value)
                
                if (league) {
                    leagueContent.value = league; // 赋值为对象而不是数组
                } else {
                    console.error('League not found');
                }

            }catch(error){
                console.error('Error fetching leagues:', error);
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

        // 隊伍圖片位置
        const getImageUrl = (teamId) =>{
            try{
                return require(`../assets/team_logos/${teamId}.png`);
            } catch (error) {
                return require(`../assets/team_logos/0.png`);
            }
        }

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
        
        onMounted(() => {
            leaguesList();
            getleagues();
        });

        return{
            leagueId,
            leagues,
            formatTime,
            getImageUrl,
            getImageLeague,
            leagueContent,
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

.leftBox {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.teamBd{
  display: flex;
  gap:0.5rem;
}

.teamImgBox{
  width: 20px;
  height: 20px;
}

.logoImgBox{
    height: 150px;
    max-width: 150px;
}

</style>