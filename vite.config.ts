import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import manifest from './mainfest.config.js'
import zip from 'vite-plugin-zip-pack'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    crx({ manifest }),
    zip({
      outDir: 'release',
      outFileName: 'release.zip'
    })
  ],
  server: {
    host: false,
    port: 3000,
    open: false,
    cors: {
      origin: [
        /chrome-extension:\/\//,
      ]
    }
  },
  build: {
    outDir: './dist',
    sourcemap: true,
    // sourcemap: false
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
