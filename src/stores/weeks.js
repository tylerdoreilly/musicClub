import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const weeksStore = defineStore({
  id:'weeks',
  state: () => ({
    weeksList:[],
    week:[],
    pageLoad:false,
  }),

  getters:{
    getSeasonsList: (state) => {
      return state.weeksList
    },
    getSeasonData: (state) => {
      return state.week
    }
  },

  actions:{
    async fetchWeeksList() {
      this.weeksList = []
      this.pageLoad = true
      try {
        this.weeksList = await fetch('/api/weeks')
        .then((response) => response.json()) 
      } catch (error) {
        this.error = error
      } finally {
        this.pageLoad = false
      }
    },
    // fetchWeeksList(){
    //   if(this.weeksList.length){
    //     return
    //   }
    //   axios
    //   .get("/api/weeks")
    //   .then(response => {
    //     let data = response.data;
    //     this.weeksList.push(...data)
    //   })     
    //   .catch(error => alert(error));
    // },

    fetchWeekData(selectedWeek){
      if(this.week.length){
        return
      }
      this.pageLoad = true
      let url = `/api/week/${selectedWeek}`
      axios
      .get(url)
      .then(response => {
        let data = response.data;
        this.week.value = [...data];
        console.log('test response',data)
        console.log('test response',this.week)
        this.pageLoad = false
      })
      
      .catch(error => alert(error));
    },
    
  }
})
