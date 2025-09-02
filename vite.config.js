import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  // Priorité : VITE_BASE_PATH > VITE_BASE_URL > fallback
  // VITE_BASE_PATH est l'URL faisant référence à là ou se trouve le site sur l'hébergeur mutualisé hostinger (donc /projets/labo/babydose/ (chez jeremiecode.fr))
  // VITE_BASE_URL pour faire fonctionner le site sur netlify en même que le mutualisé. Comme il n'est pas à la racine ils n'ont pas la meme url donc le basePath doit être dynamique 
  const basePath = env.VITE_BASE_PATH || env.VITE_BASE_URL || '/projets/labo/babydose/'

  return {
    plugins: [vue()],
    base: basePath,
  }
})