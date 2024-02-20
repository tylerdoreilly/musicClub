import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const songsStore = defineStore({
  id:'songs',

  state: () => {
    return {
      songsList:[],
      songTableHeaders: [
        {
          title: 'Artist',
          field:'artist',
          sortType:'string',
          
        },
        {
          title: 'Song',
          field:'song',
          sortType:'string',
         
        },
        {
          title: 'Bracket',
          field:'bracket',
          sortType:'integer',
        },
      ],
      pageLoad:false,
      error:null
    }
  },

  getters:{

  },

  actions:{
    async fetchSongsList() {

      if(this.songsList.length){
        return this.songsList
      }

      this.songsList = [];
      this.pageLoad = true;

      try {
        let api = import.meta.env.VITE_API_URL
        let url = api + 'songs';
        this.songsList = await fetch(url)
        .then((response) => response.json()) 
      } catch (error) {
        this.error = error
      } finally {
        this.pageLoad = false
      }
    },
  }
})
