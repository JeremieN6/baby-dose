<template>
    <section class="calcul-tjm h-full md:col-span-2">
        <div class="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 p-6">
            <div class="mb-4 text-center">
                <p class="text-lg font-medium text-gray-900 dark:text-white">Si vous souhaitez réaliser un bénéfice de :
                </p>
                <div class="flex justify-center mt-2">
                    <select :value="calculator?.profitMargin?.value || 5" @change="updateProfitMargin"
                        class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-24 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <option value="5">5%</option>
                        <option value="10">10%</option>
                        <option value="15">15%</option>
                        <option value="20">20%</option>
                        <option value="25">25%</option>
                    </select>
                </div>
            </div>

            <p class="text-center mb-3 text-gray-900 dark:text-white">ainsi il faudrait fixer votre TJM à :</p>

            <div class="grid grid-cols-2 gap-4 mb-6">
                <div class="bg-indigo-900 text-white p-4 rounded-lg text-center">
                    <span class="text-xl font-bold">{{ formattedDailyRate }} €</span>
                    <span class="text-xs block">HT / jour</span>
                </div>
                <div class="bg-indigo-900 text-white p-4 rounded-lg text-center">
                    <span class="text-xl font-bold">{{ formattedAnnualRevenue }} €</span>
                    <span class="text-xs block">HT / an</span>
                </div>
            </div>

            <div class="mb-4">
                <h6 class="text-center font-medium text-gray-900 dark:text-white mb-2">Détail des jours facturés / Non
                    facturés</h6>
                <p class="text-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <span class="font-medium">{{ totalWorkingDaysValue }}</span> jours ouvrés dans une année
                </p>

                <div class="space-y-3">
                    <!-- Vacances -->
                    <div class="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                        <input :value="calculator?.nonBillableDays?.holidays || 0" @input="updateNonBillableDays('holidays', $event)" type="number" min="0"
                            class="w-20 text-center px-2 py-1 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 text-gray-700 dark:text-white">
                        <span class="text-gray-700 dark:text-gray-300">vacances et jours fériés</span>
                    </div>

                    <!-- Démarchage -->
                    <div class="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                        <input :value="calculator?.nonBillableDays?.business || 2" @input="updateNonBillableDays('business', $event)" type="number" min="0"
                            class="w-20 text-center px-2 py-1 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 text-gray-700 dark:text-white">
                        <span class="text-gray-700 dark:text-gray-300">démarchage commercial</span>
                    </div>

                    <!-- Compta -->
                    <div class="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                        <input :value="calculator?.nonBillableDays?.admin || 3" @input="updateNonBillableDays('admin', $event)" type="number" min="0"
                            class="w-20 text-center px-2 py-1 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 text-gray-700 dark:text-white">
                        <span class="text-gray-700 dark:text-gray-300">compta & admin.</span>
                    </div>

                    <!-- Maladie -->
                    <div class="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                        <input :value="calculator?.nonBillableDays?.sick || 5" @input="updateNonBillableDays('sick', $event)" type="number" min="0"
                            class="w-20 text-center px-2 py-1 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 text-gray-700 dark:text-white">
                        <span class="text-gray-700 dark:text-gray-300">maladie</span>
                    </div>
                    
                    <!-- Chômage technique -->
                    <div class="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                        <input :value="calculator?.nonBillableDays?.unemployment || 5" @input="updateNonBillableDays('unemployment', $event)" type="number" min="0"
                            class="w-20 text-center px-2 py-1 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 text-gray-700 dark:text-white">
                        <span class="text-gray-700 dark:text-gray-300">jours de chômage technique</span>
                    </div>

                    <!-- Total non facturés -->
                    <div class="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                        <span class="w-20 text-center font-bold text-red-600">{{ totalNonBillableDaysValue }}</span>
                        <span class="text-gray-700 dark:text-gray-300 font-medium">Jours au total non-facturés</span>
                    </div>

                    <!-- Jours facturés -->
                    <div class="flex items-center justify-between">
                        <span class="w-20 text-center font-bold text-green-600">{{ billableDaysValue }}</span>
                        <span class="text-gray-700 dark:text-gray-300 font-medium">Jours facturés</span>
                    </div>
                </div>
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

const totalWorkingDaysValue = computed(() => {
  return calculator?.totalWorkingDays?.value || 251
})

const totalNonBillableDaysValue = computed(() => {
  return calculator?.totalNonBillableDays?.value || 0
})

const billableDaysValue = computed(() => {
  return calculator?.billableDays?.value || 0
})

// Fonctions pour mettre à jour les valeurs
const updateProfitMargin = (event) => {
  if (calculator && calculator.profitMargin) {
    calculator.profitMargin.value = Number(event.target.value)
  }
}

const updateNonBillableDays = (key, event) => {
  if (calculator && calculator.nonBillableDays) {
    calculator.nonBillableDays[key] = Number(event.target.value)
  }
}
</script>