<template>
    <headView />
    <div v-if="isLoading">
        <div class="NoValueFrame">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hypnotize" viewBox="0 0 16 16">
                <path d="m7.949 7.998.006-.003.003.009zm.025-.028v-.03l.018.01zm0 .015.04-.022.01.006v.04l-.029.016-.021-.012zm.049.057v-.014l-.008.01zm-.05-.008h.006l-.006.004z"/>
                <path fill-rule="evenodd" d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M4.965 1.69a6.97 6.97 0 0 1 3.861-.642c.722.767 1.177 1.887 1.177 3.135 0 1.656-.802 3.088-1.965 3.766 1.263.24 2.655-.815 3.406-2.742.38-.975.537-2.023.492-2.996a7.03 7.03 0 0 1 2.488 3.003c-.303 1.01-1.046 1.966-2.128 2.59-1.44.832-3.09.85-4.26.173l.008.021.012-.006-.01.01c.42 1.218 2.032 1.9 4.08 1.586a7.4 7.4 0 0 0 2.856-1.081 6.96 6.96 0 0 1-1.358 3.662c-1.03.248-2.235.084-3.322-.544-1.433-.827-2.272-2.236-2.279-3.58l-.012-.003c-.845.972-.63 2.71.666 4.327a7.4 7.4 0 0 0 2.37 1.935 6.97 6.97 0 0 1-3.86.65c-.727-.767-1.186-1.892-1.186-3.146 0-1.658.804-3.091 1.969-3.768l-.002-.007c-1.266-.25-2.666.805-3.42 2.74a7.4 7.4 0 0 0-.49 3.012 7.03 7.03 0 0 1-2.49-3.018C1.87 9.757 2.613 8.8 3.696 8.174c1.438-.83 3.084-.85 4.253-.176l.005-.006C7.538 6.77 5.924 6.085 3.872 6.4c-1.04.16-2.03.55-2.853 1.08a6.96 6.96 0 0 1 1.372-3.667l-.002.003c1.025-.243 2.224-.078 3.306.547 1.43.826 2.269 2.23 2.28 3.573L8 7.941c.837-.974.62-2.706-.673-4.319a7.4 7.4 0 0 0-2.362-1.931Z"/>
            </svg><br>
            <div>加載中</div>
        </div>
    </div>
    <div v-else>
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
            <div v-if="leagues.length === 0" class="leagueBox p-2 mbodyListLine">
                <div class="NoValueFrame">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-diamond-fill" viewBox="0 0 16 16">
                            <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                        </svg><br>
                        <div>{{ '無當日聯賽' }}</div>
                </div>
            </div>
            <div v-else>
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
        </div>
    </div>
</template>

<script>
import headView from '@/components/headView.vue'
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router';
import { fetchPosts } from '@/composables/useApi.js';
import { useDataStore } from '@/store/dataStore'

export default {
    name:'mleagueView',
    components: {
        headView,
    },
    setup(){

        const dataStore = useDataStore()
        const leagueData = computed(() => dataStore.leagueData)

        const route = useRoute();
        const leagueId = ref(String(route.params.id));

        const matchData = ref(null);

        const leagues = ref([]);
        const leagueContent = ref({});

        const isLoading = ref(true);

        // 賽事搜尋
        const leaguesList = async() =>{
            try{
                isLoading.value = true;

                matchData.value = await fetchPosts('https://befenscore.net/api/get-data')

                isLoading.value = false;
            }catch(error){
                console.error('Error fetching leagues:', error);
                isLoading.value = false;
            }
        }

        //單一賽事詳細資料
        const getleagues = async () =>{
            try{
                isLoading.value = true;
                const league = leagueData.value.leagueList.find(league => league.leagueId == leagueId.value)
                
                if (league) {
                    leagueContent.value = league; // 赋值为对象而不是数组
                } else {
                    console.error('League not found');
                }

                if (matchData.value && matchData.value.matchList) {
                    // 確保篩選時的類型一致
                    leagues.value = matchData.value.matchList.filter(league => leagueId.value.includes(Number(league.leagueId)));
                    // console.log('Filtered Leagues:', leagues.value);
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

        // 監聽 leagueId 變化
        watch(() => route.params.id, (newId) => {
            leagueId.value = String(newId);  // 更新 leagueId
            getleagues();  // 重新篩選資料
        });
        
        onMounted(() => {
            isLoading.value = true;
            leaguesList();
            getleagues();
            isLoading.value = false;
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
}








</style>