import { fileURLToPath, URL } from 'node:url'
import dns from 'dns'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  server: {
    host: 'localhost',
    port: 8080,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:8080/',
      'Access-Control-Allow-Headers': 'http://localhost:8080/',
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3080',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css:{
    preprocessorOptions:{
      scss:{
        additionalData:`
        @use '@/styles/_variables' as *;
        @use '@/styles/_mixins' as *;
        `
      }
    }
  }
})