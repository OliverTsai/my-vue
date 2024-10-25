<template>
    <div class="msisdeBd">
        <div class="msideBox head">
            <div class="mb-2"> {{ $t('Popular') }} </div>
        </div>
        <div class="sideLine"></div>
        <!-- 迴圈顯示熱門賽事資料 -->
        <div v-if="leagues.length">
            <div v-for="league in leagues" :key="league.leagueId" class="msideBox body mbtnTM" @click="selectLeagues(league.leagueId)">
                <div class="sideImg">
                    <img :src="require(`../../assets/league_logos/${league.leagueId}.png`)" class="h-100">
                </div>
                <div v-if="this.$i18n.locale === 'zh_hk'" class="sideText">{{ league.nameCht }}</div>
                <div v-if="this.$i18n.locale === 'zh_cn'" class="sideText">{{ league.nameChs }}</div>
                <div v-if="this.$i18n.locale === 'en'" class="sideText">{{ league.nameEn }}</div>
            </div>
        </div>
        <!-- 迴圈顯示國家資料 -->
        <div class="msideBox head">
            <div class="mb-2"> {{ $t('National') }}</div>
        </div>
        <div class="sideLine"></div>
        <!-- 熱門國家下拉選單 -->
        <div v-for="(country, index) in topItems" :key="index" class="countryBox">
            <div class="msideBox body mbtnTM" @click="clickCountry(country.id)">
                <div class="sideImg">
                    <img :src="getImageCountry(country.id)" class="w-100">
                </div>
                <div v-if="this.$i18n.locale === 'zh_hk'" class="sideText">{{ country.zh_hk }}</div>
                <div v-if="this.$i18n.locale === 'en'" class="sideText">{{ country.en }}</div>
                <div v-if="this.$i18n.locale === 'zh_cn'" class="sideText">{{ country.zh_cn }}</div>
            </div>
            <div v-show="selectedCountry === country.id" class="matchList mbtnTM">
                <div v-for="match in countryLeagues" :key="match.leagueId" @click="selectLeagues(match.leagueId)">
                    <a v-if="this.$i18n.locale === 'zh_hk'" class="K-dropdown-item text-start">{{ match.nameCht }}</a>
                    <a v-if="this.$i18n.locale === 'zh_cn'" class="K-dropdown-item text-start">{{ match.nameChs }}</a>
                    <a v-if="this.$i18n.locale === 'en'" class="K-dropdown-item text-start">{{ match.nameEn }}</a>
                </div>
            </div>
        </div>

        <div @click="showMore = !showMore" class="msideBox body">
            <div class="sideText">{{ showMore ? '隱藏' : '其他' }}</div>
        </div>
        <!-- 其他國家 -->
        <div v-if="showMore == true">
            <div v-for="(country, index) in countList" :key="index" class="countryBox">
                <div class="msideBox body mbtnTM" @click="clickCountry(country.id)">
                    <div class="sideImg">
                        <img :src="getImageCountry(country.id)" class="w-100">
                    </div>
                    <div v-if="this.$i18n.locale === 'zh_hk'" class="sideText">{{ country.zh_hk }}</div>
                    <div v-if="this.$i18n.locale === 'en'" class="sideText">{{ country.en }}</div>
                    <div v-if="this.$i18n.locale === 'zh_cn'" class="sideText">{{ country.zh_cn }}</div>
                </div>
                <div v-show="selectedCountry === country.id" class="matchList mbtnTM">
                    <div v-for="match in countryLeagues" :key="match.leagueId" @click="selectLeagues(match.leagueId)">
                        <a v-if="this.$i18n.locale === 'zh_hk'" class="K-dropdown-item text-start">{{ match.nameCht }}</a>
                        <a v-if="this.$i18n.locale === 'zh_cn'" class="K-dropdown-item text-start">{{ match.nameChs }}</a>
                        <a v-if="this.$i18n.locale === 'en'" class="K-dropdown-item text-start">{{ match.nameEn }}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import countList from '@/countryList.json'
import { ref, onMounted, computed  } from 'vue'
import { useRouter } from 'vue-router';
import { useDataStore } from '@/store/dataStore'

export default {
    setup(){

        const dataStore = useDataStore()
        const leagueData = computed(() => dataStore.leagueData)

        const leaguesId = ref([]);
        const leagues = ref([]);
        const router = useRouter();
        // const route = useRoute();
        const showMore = ref(false)

        const country_leagues = ref([]);

        // const allMatches = ref([]);
        const countryLeagues = ref([]);
        const selectedCountry = ref(null);

        const topItems = ref([
            { id: 1, en: 'England', zh_hk: '英格蘭', zh_cn: "英格兰" },
            { id: 2, en: 'Italy', zh_hk: '意大利', zh_cn: "意大利" },
            { id: 4, en: 'Germany', zh_hk: '德國', zh_cn: "德国" },
            { id: 3, en: 'Spain', zh_hk: '西班牙', zh_cn: "西班牙" },
            { id: 5, en: 'France', zh_hk: '法國', zh_cn: "法国" }
        ]);

        const matchList = async() =>{
            try{
                const response = await fetch(`https://befenscore.net/api/get-data`);
                const data = await response.json();

                for (const raw of data.matchList) {
                    const leagueId = Number(raw.leagueId);
                    if (!leaguesId.value.includes(leagueId)) {
                        leaguesId.value.push(leagueId);
                    }
                }
            }catch(error){
                console.error('Error fetching today:', error);
            }
        }

        // 賽事搜尋
        const leaguesList = async() =>{
            try{
                const data = leagueData.value;

                if (data && data.leagueList) {
                    // 確保篩選時的類型一致
                    leagues.value = data.leagueList.filter(league => leaguesId.value.includes(Number(league.leagueId))).slice(0, 10);
                    console.log('Filtered Leagues:', leagues.value);
                } else {
                    console.error('Invalid data format:', data);
                }
                // console.log(data)
            }catch(error){
                console.error('Error fetching leagues:', error);
            }
        }

        // 國家搜尋
        const selectCountryasync = async(countryId) =>{
            try{
                const data = leagueData.value;
                console.log(leaguesId)
                console.log(data.leagueList)
                if (data && data.leagueList) {
                    countryLeagues.value = data.leagueList.filter(league => 
                        league.countryId === String(countryId) && leaguesId.value.includes(league.leagueId));
                    console.log('Filtered country:', countryLeagues.value);
                } else {
                    console.error('Invalid data format:', data);
                }
                console.log(countryLeagues)

            }catch(error){
                console.error('Error fetching country:', error);
            }
        } 

        // 賽事點擊
        const selectLeagues = async (leagueId) =>{
            router.push({ name: 'league', params: { id: leagueId }, query: { t: Date.now() } });
        }

        // 國家點擊
        const clickCountry = async (countryId) => {
            selectedCountry.value = countryId;
            await selectCountryasync(countryId);
        };

        // 國家圖片搜尋
        const getImageCountry = (countryId) =>{
            try{
                return require(`../../assets/count_logos/${countryId}.svg`);
            } catch (error) {
                return require(`../../assets/count_logos/1.svg`);
            }
        }

        onMounted(async () => {
            await matchList();
            await leaguesList();
        });

        return{
            leagues,
            selectLeagues,
            countList,
            selectCountryasync,
            country_leagues,
            clickCountry,
            getImageCountry,
            topItems,
            countryLeagues,
            showMore,
            selectedCountry
        }
    },
}
</script>

<style lang="scss">
// .sisdeBd{
//     display: flex;
//     flex-direction:column;
//     gap:0.3rem;
//     padding: 0rem 1rem 0rem 0rem; /*K*/
//     width: 22%; /*K*/
// }
// .sideBox{
//     display: flex;
//     gap:0.3rem;
//     align-items: center;
//     height: 1.3rem; /*K*/
// }
// .sideBox.head{
//     margin-top: 2rem;
// }
// .sideBox.body{

// }
// .sideBox.body:hover {
//     background-color: #d3d3d3; /* 灰色背景 */
//     cursor: pointer;
// }
// .sideBox.up{
//     flex-direction:column;
//     align-items:start;
// }
// .sideLine{
//     width: 100%;
//     height: 1px; 
//     background-color: #e0e1e2; 
//     margin: 3px 0 3px 0; /*K*/
// }
// .sideImg{
//     display: flex;
//     align-items: center;
//     width: 20px;
//     height: 20px;
// }
// .sideTitle{
//     white-space: nowrap;
//     font-size: 0.9rem; /*K*/
//     font-weight: bold; /*K*/
//     padding: 2px 0px 2px 0px; /*K*/
// }

// .sideText{
//     white-space: nowrap;
//     font-size: 0.9rem; /*K*/
//     padding: 2px 0px 2px 0px; /*K*/
// }


.msisdeBd{
    display: flex;
    flex-direction:column;
    // gap:0.3rem;
    padding: 0rem 0rem 0rem 0rem; /*K*/
    width: 100%; /*K*/
}
.msideBox{
    display: flex;
    gap:0.3rem;
    align-items: center;
    // height: 1.3rem; /*K*/
}
.msideBox.head{
    margin-top: 2rem;
}
.msideBox.body{

}
.msideBox.body:hover {
    // background-color: #d3d3d3; /* 灰色背景 */
    cursor: pointer;
}
.msideBox.up{
    flex-direction:column;
    align-items:start;
}
.msideLine{
    width: 100%;
    height: 1px; 
    background-color: #e0e1e2; 
    margin: 3px 0 3px 0; /*K*/
}
.msideImg{
    display: flex;
    align-items: center;
    width: 20px;
    height: 20px;
}
.msideTitle{
    white-space: nowrap;
    font-size: 0.9rem; /*K*/
    font-weight: bold; /*K*/
    padding: 2px 0px 2px 0px; /*K*/
}

.msideText{
    white-space: nowrap;
    font-size: 0.9rem; /*K*/
    // padding: 2px 0px 2px 0px; /*K*/
    text-decoration:none; /*K*/
    background-color: #ffffff;
    border: 0px #ffffff;
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