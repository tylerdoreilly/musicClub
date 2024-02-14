import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const seasonsStore = defineStore({
  id:'seasons',
  state: () => ({
    seasonsList:ref([]),
    season:[],
    pageLoad:false,
    error:null,
  }),

  getters:{
    getSeasonsList: (state) => {
      return state.seasonsList
    },
    getSeasonData: (state) => {
      return state.season
    }
  },

  actions:{
    async fetchSeasonsList() {
      this.seasonsList = []
      this.pageLoad = true
      try {
        this.seasonsList = await fetch('/api/seasons')
        .then((response) => response.json()) 
      } catch (error) {
        this.error = error
      } finally {
        this.pageLoad = false
      }
    },

    fetchSeasonData(selectedSeason){
      if(this.season.length){
        return
      }
      this.pageLoad = true
      let url = `/api/season/${selectedSeason}`
      axios
      .get(url)
      .then(response => {
        let data = response.data.slice(1);
        this.season.value = [...data];
        console.log('test response',data)
        console.log('test response',this.season)
        this.pageLoad = false
      })
      
      .catch(error => alert(error));
    }
  }
})
