<template>
        <section class="charges-sociales h-full">
            <div class="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 p-6">
                <div class="flex flex-row justify-between">
                    <h5 class="mb-4 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        <span class="text-gray-400">#3</span> Montant de vos charges sociales
                    </h5>
                    <label class="inline-flex items-center cursor-pointer">
                        <input :checked="calculator?.showAnnualSocialCharges?.value || false" @change="updateShowAnnualSocialCharges" type="checkbox" class="sr-only peer">
                        <div
                            class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600">
                        </div>

                    </label>
                </div>

                <div class="pb-4">
                    <p class="text-gray-500 dark:text-gray-400">
                        C'est le chiffre d'affaires que vous devez générer pour vous verser vos <span
                            class="font-bold">{{ formattedSalaryTarget }} € nets par mois</span>, après avoir payé
                        ses cotisations sociales.
                    </p>
                </div>
                <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg mb-4">
                    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                        <label for="social-charges-type"
                            class="text-base font-medium text-gray-900 dark:text-white">Charges sociales</label>
                        <select :value="calculator?.socialChargesRate?.value || 14" @change="updateSocialChargesRate" id="social-charges-type"
                            class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            <option value="14">14% - Ventes de marchandises</option>
                            <option value="21.2">21,2% - Prestations de services, commerciales ou artisanales</option>
                            <option value="21.1">21,1% - Professions libérales non réglementées</option>
                            <option value="22">22% - Professions libérales réglementées</option>
                        </select>
                    </div>
                </div>

                <div class="flex justify-between items-center">
                    <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Soit un total de</span>
                    <div class="text-right">
                        <span class="text-xl font-bold text-indigo-800 dark:text-indigo-400">
                            {{ formattedSocialCharges }} €
                        </span>
                        <span class="text-xs text-gray-600 dark:text-gray-400 block">
                            {{ calculator?.showAnnualSocialCharges?.value ? 'par an' : 'par mois' }}
                        </span>
                    </div>
                </div>
            </div>
        </section>
</template>

<script setup>
import { inject, computed } from 'vue'

// Récupération de toutes les données via inject
const calculator = inject('calculator')

// Computed properties pour l'affichage
const formattedSalaryTarget = computed(() => {
  if (calculator?.formatNumber && calculator?.salaryTarget?.value) {
    return calculator.formatNumber(calculator.salaryTarget.value)
  }
  return '5 000'
})

const formattedSocialCharges = computed(() => {
  if (calculator?.formatNumber) {
    const amount = calculator?.showAnnualSocialCharges?.value
      ? calculator?.annualSocialCharges?.value
      : calculator?.monthlySocialCharges?.value
    return calculator.formatNumber(amount || 0)
  }
  return '0'
})

// Fonctions pour mettre à jour les valeurs
const updateShowAnnualSocialCharges = (event) => {
  if (calculator && calculator.showAnnualSocialCharges) {
    calculator.showAnnualSocialCharges.value = event.target.checked
  }
}

const updateSocialChargesRate = (event) => {
  if (calculator && calculator.socialChargesRate) {
    calculator.socialChargesRate.value = Number(event.target.value)
  }
}
</script>
