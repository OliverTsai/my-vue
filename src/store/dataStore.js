import { defineStore } from 'pinia'
import { fetchPosts } from '@/composables/useApi.js';

export const useDataStore = defineStore('dataStore', {
    state: () => ({
        leagueData: null,
    }),
    actions: {
        async fetchLeagueData() {
            if (!this.leagueData) {  // 檢查快取中是否已有數據
                try {
                    this.leagueData = await fetchPosts('https://befenscore.net/api/league-data')
                } catch (error) {
                    console.error('Failed to fetch league data:', error)
                }
            }
        },
    },
})