<template>
  <div class="bg-gray-100 dark:bg-gray-900 min-h-screen">
    <LP_Header />

    <div class="py-8 px-4 mx-auto max-w-screen-lg sm:py-16 lg:px-6" id="calculateur">
      <div class="title">
        <h1
          class="mb-4 text-3xl font-extrabold text-center tracking-tight leading-none text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
          Calculateur de dosette pour biberon <br> (pour Amndine 🍼)
        </h1>
        <p
          class="mb-8 text-lg font-normal text-center text-gray-500 lg:text-xl sm:px-16 xl:px-28 dark:text-gray-400">
          Avec BabyDose™, préparez le biberon de votre bébé facilement et sans erreur.  
          Entrez le volume et laissez l’outil calculer automatiquement le nombre de dosettes à utiliser.
        </p>
      </div>

      <div class="w-full p-4">
        <div class="grid grid-cols-1 gap-4 auto-rows-auto">
          <section>
            <form @submit.prevent="calculer"
              class="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 p-6 content-fit">

              <!-- Volume du biberon -->
              <div class="mb-5">
                <label for="mlInput"
                  class="block mb-2 text-sm font-medium text-left text-gray-900 dark:text-white">
                  Volume du biberon (ml)
                </label>
                <input type="number" id="mlInput" v-model.number="ml"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Ex : 90ml" :max="999" required>
              </div>

              <div class="my-8">
                <h2 class="text-lg font-medium mb-3 text-gray-900 dark:text-white">Volumes courants <span class="text-small">Optionnel</span> </h2>
                <div class="flex flex-wrap gap-2">
                    <button 
                    v-for="vol in volumesCourants" 
                    :key="vol"
                    @click="setVolume(vol)"
                    class="px-4 py-2 rounded-full border text-sm bg-gray-50 text-gray-800 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-100">
                    {{ vol }} ml
                    </button>
                </div>
            </div>

              <!-- Ratio ml/dosette -->
              <div class="mb-5">
                <label for="ratioInput"
                  class="block mb-2 text-sm font-medium text-left text-gray-900 dark:text-white">
                  Nombre de ml par dosette
                </label>
                <input type="number" id="ratioInput" v-model.number="ratio"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Ex : 30" :max="999" required>
              </div>

              <!-- Bouton calculer -->
              <div class="my-5">
                <button type="submit"
                  class="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-700">
                  Calculer
                </button>
              </div>

              <!-- Affichage résultat -->
              <div
                class="block w-full p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <p class="font-normal text-gray-700 dark:text-gray-400">Nombre de dosette</p>
                <div class="flex items-center justify-between">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white" aria-live="polite">
                    {{ dosettes }}
                  </h5>
                  <svg class="w-6 h-6 text-gray-800 dark:text-white" xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M8 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8zm0 2h8v3H8V4zm0 5h8v11H8V9z" />
                  </svg>
                </div>
              </div>
            </form>

            <!-- Comment ça marche -->
            <div
              class="mt-10 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 p-6 text-gray-900 dark:text-white">
              <h2 class="text-lg font-semibold mb-3 text-gray-900 dark:text-white">ℹ️ Comment ça marche ?</h2>
              <p class="text-sm leading-relaxed text-gray-700 text-gray-900 dark:text-white">
                Le calcul est basé sur le ratio indiqué (par défaut 30 ml = 1 dosette).  <br><br>
                ⚠️ <strong>Pitié</strong>, vérifiez toujours le dosage recommandé sur la boîte de lait que vous utilisez.  <br><br>
                Cette application vous aide à réduire le stress et à éviter les erreurs fréquentes lors de la préparation du biberon. (Je ne veux pas de problème)
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>

    <LP_Testimonials />
    <LP_Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LP_Header from '../components/Landing/LP_Header.vue'
import LP_Testimonials from '../components/Landing/LP_Testimonials.vue'
import LP_Footer from '../components/Landing/LP_Footer.vue'

// Données réactives
const ml = ref(90)
const ratio = ref(30)
const dosettes = ref('')

// Fonction de calcul
function calculer() {
  if (ml.value <= 0) {
    dosettes.value = '⚠️ Volume invalide'
    return
  }
  if (ratio.value <= 0) {
    dosettes.value = '⚠️ Ratio invalide'
    return
  }

  const result = ml.value / ratio.value
  const arrondi = Math.round(result)
  dosettes.value = `${arrondi} dosette${arrondi > 1 ? 's' : ''}`
}

const volumesCourants = [90, 120, 150, 180, 210, 240]

function setVolume(mlValue) {
  ml.value = mlValue
  calculer() // recalculer automatiquement
}
</script>
