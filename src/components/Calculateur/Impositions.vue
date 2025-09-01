<template>
    <section class="imposition h-full">
        <div class="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 p-6">
            <h5 class="mb-4 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                <span class="text-gray-400">#4</span> Montant de votre imposition
            </h5>

            <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg mb-4 space-y-4">
                <!-- Type d'activité -->
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                    <label for="activity-type" class="text-base font-medium text-gray-900 dark:text-white">
                        Quelle est votre activité?
                    </label>
                    <select :value="calculator?.activityType?.value || 'commercial'" @change="updateActivityType" id="activity-type"
                        class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <option value="commercial">Industrielle / commerciale</option>
                        <option value="liberal">Libérale</option>
                        <option value="artisanal">Artisanale</option>
                        <option value="agricultural">Agricole</option>
                    </select>
                </div>

                <!-- Versement libératoire -->
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                    <label for="versement-liberatoire" class="text-base font-medium text-gray-900 dark:text-white">
                        Avez vous opté pour le versement libératoire ?
                    </label>
                    <select :value="calculator?.hasVersementLiberatoire?.value || false" @change="updateHasVersementLiberatoire" id="versement-liberatoire"
                        class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-32 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <option :value="false">Non</option>
                        <option :value="true">Oui</option>
                    </select>
                </div>

                <!-- Taux d'imposition -->
                <div v-if="!calculator?.hasVersementLiberatoire?.value"
                    class="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                    <label for="tax-rate" class="text-base font-medium text-gray-900 dark:text-white">
                        Quel est votre taux d'imposition (en %) ?
                    </label>
                    <input :value="calculator?.customTaxRate?.value || 15" @input="updateCustomTaxRate" type="number" id="tax-rate" min="0" max="100"
                        class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-32 p-2.5 text-right dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                </div>

                <!-- Note sur le taux appliqué (visible uniquement si versement libératoire) -->
                <div v-if="calculator?.hasVersementLiberatoire?.value" class="text-sm text-gray-500 dark:text-gray-400 italic">
                    Taux appliqué automatiquement : {{ vlirTaxRateValue }}% selon votre activité
                </div>
            </div>

            <div class="flex justify-between items-center">
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Soit un total de</span>
                <div class="text-right">
                    <span class="text-xl font-bold text-indigo-800 dark:text-indigo-400">{{
                        formattedTotalImposition }} €</span>
                    <span class="text-xs text-gray-600 dark:text-gray-400 block">par an</span>
                </div>
            </div>
        </div>
    </section>
    
</template>

<script setup>
import { inject, computed } from 'vue'

const calculator = inject('calculator')

// Computed properties pour l'affichage
const formattedTotalImposition = computed(() => {
  if (calculator?.formatNumber && calculator?.totalImposition?.value) {
    return calculator.formatNumber(calculator.totalImposition.value)
  }
  return '0'
})

const vlirTaxRateValue = computed(() => {
  return calculator?.vlirTaxRate?.value || 0
})

// Fonctions pour mettre à jour les valeurs
const updateActivityType = (event) => {
  if (calculator && calculator.activityType) {
    calculator.activityType.value = event.target.value
  }
}

const updateHasVersementLiberatoire = (event) => {
  if (calculator && calculator.hasVersementLiberatoire) {
    calculator.hasVersementLiberatoire.value = event.target.value === 'true'
  }
}

const updateCustomTaxRate = (event) => {
  if (calculator && calculator.customTaxRate) {
    calculator.customTaxRate.value = Number(event.target.value)
  }
}
</script>