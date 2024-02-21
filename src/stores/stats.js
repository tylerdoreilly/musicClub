import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const statsStore = defineStore({
  id:'stats',

  state: () => {
    return {
      albumsList:[],
      statsTableHeaders: [
        {
          title: 'Artist',
          field:'artist',
          sortType:'string',
          style:{
            width:350,
          }
        },
        {
          title: 'Album',
          field:'album',
          sortType:'string',
          style:{
            width:400,
          }
        },
        {
          title: 'Submitted By',
          field:'by',
          sortType:'string',
          style:{
            width:150,
          }
        },
        {
          title: 'Season',
          field:'season',
          sortType:'integer'
        },
        {
          title: 'Avg',
          field:'avg',
          sortType:'integer'
        }
      ],
      pageLoad:false,
      error:null
    }
  },

  getters:{

  },

  actions:{
   
  }
})
