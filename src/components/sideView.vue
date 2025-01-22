<template>
    <div class="sisdeBd">
        <div class="sideBox">
            <div class="sideText"> {{ $t('Popular') }} </div>
        </div>
        <div class="sideLine"></div>
        <!-- 迴圈顯示熱門賽事資料 -->
        <div v-if="leagues.length">
            <div v-for="league in matchData" :key="league.leagueId" class="sideBox body" @click="selectLeagues(league.leagueId)">
                <div class="sideImg">
                    <img :src="getImageLeague(league.leagueId)" class="h-100" loading="lazy">
                </div>
                <div v-if="this.$i18n.locale === 'zh_hk'" class="sideText">{{ league.leagueCht }}</div>
                <div v-else-if="this.$i18n.locale === 'zh_cn'" class="sideText">{{ league.leagueChs }}</div>
                <div v-else-if="this.$i18n.locale === 'en'" class="sideText">{{ league.leagueEn }}</div>
                <div v-else class="sideText">{{ league.leagueEn }}</div>
            </div>
        </div>
        <!-- 迴圈顯示國家資料 -->
        <div class="sideBox head">
            <div class="sideText"> {{ $t('National') }}</div>
        </div>
        <div class="sideLine"></div>
        <!-- 熱門國家下拉選單 -->
        <div v-for="(country, index) in topItems" :key="index" class="countryBox">
            <div class="sideBox body" @click="clickCountry(country.id)">
                <div class="sideImg">
                    <img :src="getImageCountry(country.id)" class="w-100">
                </div>
                <div v-if="this.$i18n.locale === 'zh_hk'" class="sideText">{{ country.zh_hk }}</div>
                <div v-else-if="this.$i18n.locale === 'en'" class="sideText">{{ country.en }}</div>
                <div v-else-if="this.$i18n.locale === 'zh_cn'" class="sideText">{{ country.zh_cn }}</div>
                <div v-else class="sideText">{{ country.en }}</div>
            </div>
            <div v-show="selectedCountry === country.id" class="matchList mbtnTM">
                <div v-for="match in countryLeagues" :key="match.leagueId" @click="selectLeagues(match.leagueId)">
                    <a v-if="this.$i18n.locale === 'zh_hk'" class="K-dropdown-item text-start">{{ match.leagueCht }}</a>
                    <a v-else-if="this.$i18n.locale === 'zh_cn'" class="K-dropdown-item text-start">{{ match.leagueChs }}</a>
                    <a v-else-if="this.$i18n.locale === 'en'" class="K-dropdown-item text-start">{{ match.leagueEn }}</a>
                    <div v-else class="K-dropdown-item text-start">{{  match.leagueEn}}</div>
                </div>
            </div>
        </div>

        <div @click="showMore = !showMore" class="msideBox body">
            <div class="sideText">{{ showMore ? '隱藏' : '其他' }}</div>
        </div>
        <!-- 其他國家 -->
        <div v-if="showMore == true">
            <div v-for="(country, index) in countList" :key="index" class="countryBox">
                <div class="sideBox body" @click="clickCountry(country.id)">
                    <div class="sideImg">
                        <img :src="getImageCountry(country.id)" class="w-100">
                    </div>
                    <div v-if="this.$i18n.locale === 'zh_hk'" class="sideText">{{ country.zh_hk }}</div>
                    <div v-else-if="this.$i18n.locale === 'en'" class="sideText">{{ country.en }}</div>
                    <div v-else-if="this.$i18n.locale === 'zh_cn'" class="sideText">{{ country.zh_cn }}</div>
                    <div v-else class="sideText">{{ country.en }}</div>
                </div>
                <div v-show="selectedCountry === country.id" class="matchList mbtnTM">
                    <div v-for="match in countryLeagues" :key="match.leagueId" @click="selectLeagues(match.leagueId)">
                        <a v-if="this.$i18n.locale === 'zh_hk'" class="K-dropdown-item text-start">{{ match.leagueCht }}</a>
                        <a v-else-if="this.$i18n.locale === 'zh_cn'" class="K-dropdown-item text-start">{{ match.leagueChs }}</a>
                        <a v-else-if="this.$i18n.locale === 'en'" class="K-dropdown-item text-start">{{ match.leagueEn }}</a>
                        <a v-else class="K-dropdown-item text-start">{{ match.leagueEn }}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import countList from '@/countryList.json'
import { ref, onMounted } from 'vue'
// import { ref, onMounted, computed,watch } from 'vue'
import { useRouter } from 'vue-router';
import { getImageCountry ,getImageLeague } from '@/composables/useImage.js';
import { fetchPosts } from '@/composables/useApi.js';
// import { useDataStore } from '@/store/dataStore'

export default {
    setup(){

        const leagues = ref([]);
        const router = useRouter();
        const showMore = ref(false)

        const country_leagues = ref([]);
        const countryLeagues = ref([]);
        const selectedCountry = ref(null);

        const matchData = ref([])

        const topItems = ref([
            { id: 1, en: 'England', zh_hk: '英格蘭', zh_cn: "英格兰" },
            { id: 2, en: 'Italy', zh_hk: '意大利', zh_cn: "意大利" },
            { id: 4, en: 'Germany', zh_hk: '德國', zh_cn: "德国" },
            { id: 3, en: 'Spain', zh_hk: '西班牙', zh_cn: "西班牙" },
            { id: 5, en: 'France', zh_hk: '法國', zh_cn: "法国" }
        ]);


        const fetchData = async () => {
            try {
                // 使用 Promise.all 並行請求
                const data = await fetchPosts(`https://befenscore.net/football/today-data/0`);
                leagues.value = data.matchList

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // 國家搜尋
        const selectCountryasync = async(countryId) =>{
            try{
                const data = leagues.value

                const id = String(countryId)

                if (data){
                    countryLeagues.value = data.filter(league => 
                    league.countryId === id);
                }
                else if (data.leagueList) {
                    countryLeagues.value = data.matchList.filter(league => 
                        league.countryId === id);
                    console.log('Filtered country:', countryLeagues.value);
                } else {
                    console.error('Invalid data format:', data);
                }

                console.log(data)

            }catch(error){
                console.error('Error fetching country:', error);
            }
        } 

        // 賽事點擊
        const selectLeagues = async (leagueId) =>{
            router.push({ name: 'league', params: { league_id: leagueId }, query: { t: Date.now() } });
        }

        // 國家點擊
        const clickCountry = async (countryId) => {
            selectedCountry.value = countryId;
            await selectCountryasync(countryId);
        };

        onMounted(async () => {
            fetchData();
            matchData.value = await fetchPosts(`https://befenscore.net/football/hot`); 
        });

        return{
            leagues,
            selectLeagues,
            countList,
            selectCountryasync,
            country_leagues,
            clickCountry,
            getImageCountry,
            getImageLeague,
            topItems,
            countryLeagues,
            showMore,
            matchData,
            selectedCountry
        }
    },
}
</script>

<style lang="scss">
.sisdeBd{
    display: flex;
    flex-direction:column;
    gap:0.3rem;
    padding: 0rem 1rem 0rem 0rem; /*K*/
    width: 22%; /*K*/
}
.sideBox{
    display: flex;
    gap:0.3rem;
    align-items: center;
    height: 1.3rem; /*K*/
    margin: 3px 0px 3px 0px; /*K*/
}
.sideBox.head{
    margin-top: 2rem;
}
.sideBox.body{

}
.sideBox.body:hover {
    background-color: #d3d3d3; /* 灰色背景 */
    cursor: pointer;
}
.sideBox.up{
    flex-direction:column;
    align-items:start;
}
.sideLine{
    width: 100%;
    height: 1px; 
    background-color: #e0e1e2; 
    margin: 3px 0 3px 0; /*K*/
}
.sideImg{
    display: flex;
    align-items: center;
    width: 20px;
    height: 20px;
}
.sideTitle{
    white-space: nowrap;
    font-size: 0.9rem; /*K*/
    font-weight: bold; /*K*/
    padding: 2px 0px 2px 0px; /*K*/
}

.sideText{
    white-space: nowrap;
    font-size: 0.8rem; /*K*/
    padding: 2px 0px 2px 0px; /*K*/
}

.dropdownContainer {
    margin-bottom: 1rem;
}
label {
    display: block;
    margin-bottom: 0.5rem;
}
select {
    width: 100%;
    padding: 0.5rem;
}

.matchList {
    display: flex;
    flex-direction: column;
    margin-left: 1.5rem;
}

.countryBox {
    display: flex;
    flex-direction: column;
}

.matchList div:hover {
    background-color: #d3d3d3; /* 灰色背景 */
    cursor: pointer;
}
</style>