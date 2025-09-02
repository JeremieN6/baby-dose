import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [vue()],
    // Base dépend de la variable d'environnement VITE_BASE_PATH
    base: env.VITE_BASE_PATH || '/',
  }
})