import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'pages' ? '/Portfolio-template/' : '/',
  plugins: [vue()],
}))
