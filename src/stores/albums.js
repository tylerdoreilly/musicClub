import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const albumsStore = defineStore({
  id:'albums',

  state: () => {
    return {
      albumsList:[],
      albumTableHeaders: [
        {
          title: 'Artist',
          field:'artist',
          style:{
            width:350,
          }
        },
        {
          title: 'Album',
          field:'album',
          style:{
            width:400,
          }
        },
        {
          title: 'Submitted By',
          field:'by',
          style:{
            width:150,
          }
        },
        {
          title: 'Season',
          field:'season'
        },
        {
          title: 'Matt',
          field:'matt'
        },
        {
          title: 'Bill',
          field:'bill'
        },
        {
          title: 'Dan',
          field:'dan'
        },
        {
          title: 'Ty',
          field:'ty'
        },
        {
          title: 'Joel',
          field:'joel'
        },
        {
          title: 'Dwayne',
          field:'dwayne'
        },
        {
          title: 'Joe',
          field:'joe'
        },
        {
          title: 'Bart',
          field:'bart'
        },
        {
          title: 'Kris',
          field:'kris'
        },
        {
          title: 'Avg',
          field:'avg'
        }
      ],
      albumTrackHeaders: [
        {
          title: '#',
          field:'track_number',
          style:{
            width:50,
          }
        },
        {
          title: 'Title',
          field:'name',
          style:{
            width:400,
          }
        },
        {
          title: 'Artist',
          field:'artist',
        },
        {
          title: 'Length',
          field:'length'
        }     
      ],
      album: {},
      albumData:[],
      pageLoad:false,
      error:null
    }
  },
  persist: {
    storage: sessionStorage,
    paths: ['album'],
  },

  getters:{

  },

  actions:{
    async fetchAlbumsList() {

      if(this.albumsList.length){
        return this.albumsList
      }

      this.albumsList = [];
      this.pageLoad = true;

      try {
        let api = import.meta.env.VITE_API_URL
        let url = api + 'albums';
        this.albumsList = await fetch(url)
        .then((response) => response.json()) 
      } catch (error) {
        this.error = error
      } finally {
        this.pageLoad = false
      }
    },

    async fetchAlbumData() {

      this.albumData = [];
      this.pageLoad = true;
      let album = this.album.album
      let artist = this.album.artist
      
      try {
        let api = import.meta.env.VITE_API_URL
        this.albumData = await fetch(`${api}album?albumName=${album}&artistName=${artist}`)
        .then((response) => response.json()) 
      } catch (error) {
        this.error = error
      } finally {
        this.pageLoad = false
      }
    },

    addAlbumDetails(albumData){
      this.album = albumData;
    }
   
  }
})
