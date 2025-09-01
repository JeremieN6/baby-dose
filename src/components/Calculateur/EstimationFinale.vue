<template>
    <section class="estimation-finale h-full md:col-span-2">
        <div class="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 p-6">
            <div id="calculator-content" class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                    <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Estimation de votre TJM :</p>
                    <div
                        class="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center dark:bg-gray-700 dark:border-gray-600">
                        <span class="text-3xl font-bold text-indigo-800 dark:text-indigo-400">{{ formattedDailyRate }} €</span>
                        <span class="text-xs text-gray-600 dark:text-gray-400 block">HT / jour</span>
                    </div>
                </div>
                <div>
                    <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Soit un CA annuel de :</p>
                    <div
                        class="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center dark:bg-gray-700 dark:border-gray-600">
                        <span class="text-3xl font-bold text-indigo-800 dark:text-indigo-400">{{ formattedAnnualRevenue }} €</span>
                        <span class="text-xs text-gray-600 dark:text-gray-400 block">HT / an</span>
                    </div>
                </div>
            </div>

            <div class="flex justify-center">
                <button @click="downloadSimulation"
                    class="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
                    <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                            clip-rule="evenodd"></path>
                    </svg>
                    Télécharger la simulation
                </button>
            </div>
        </div>
    </section>
</template>

<script setup>
import { inject, computed } from 'vue'

const calculator = inject('calculator')

// Computed properties pour l'affichage
const formattedDailyRate = computed(() => {
  if (calculator?.formatNumber && calculator?.dailyRate?.value) {
    return calculator.formatNumber(calculator.dailyRate.value)
  }
  return '0'
})

const formattedAnnualRevenue = computed(() => {
  if (calculator?.formatNumber && calculator?.annualRevenue?.value) {
    return calculator.formatNumber(calculator.annualRevenue.value)
  }
  return '0'
})

// Fonction pour télécharger la simulation
const downloadSimulation = () => {
  if (calculator && calculator.downloadSimulation) {
    calculator.downloadSimulation()
  }
}
</script>