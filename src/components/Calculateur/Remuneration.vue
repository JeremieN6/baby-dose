<template>
    <section class="remuneration">
        <div
            class="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 p-6 content-fit">
            <h5 class="mb-4 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                <span class="text-gray-400">#1</span> Votre rémunération nette souhaitée?
            </h5>

            <div class="mb-2 text-center">
                <span class="text-3xl font-bold text-indigo-800 dark:text-indigo-400">{{ formattedSalaryTarget }}
                    €</span>
                <span class="text-sm text-gray-600 dark:text-gray-400">net par mois</span>
            </div>

            <input :value="salaryTargetValue" @input="updateSalaryTarget" type="range" min="1000" max="10000" step="100"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 mb-4">

            <div class="flex justify-between items-center">
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Soit un total de</span>
                <div class="text-right">
                    <span class="text-xl font-bold text-indigo-800 dark:text-indigo-400">{{ formattedAnnualSalary
                        }} €</span>
                    <span class="text-xs text-gray-600 dark:text-gray-400 block">net par an</span>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { inject, computed } from 'vue'

// Récupération de toutes les données via inject
const calculator = inject('calculator')



// Computed properties pour accéder aux valeurs réactives
const salaryTargetValue = computed(() => {
  return calculator?.salaryTarget?.value || 5000
})

const formattedSalaryTarget = computed(() => {
  if (calculator?.formatNumber && calculator?.salaryTarget?.value) {
    return calculator.formatNumber(calculator.salaryTarget.value)
  }
  return '5 000'
})

const formattedAnnualSalary = computed(() => {
  if (calculator?.formatNumber && calculator?.annualSalary?.value) {
    return calculator.formatNumber(calculator.annualSalary.value)
  }
  return '60 000'
})

// Fonction pour mettre à jour le salaire cible
const updateSalaryTarget = (event) => {
  if (calculator && calculator.salaryTarget) {
    calculator.salaryTarget.value = Number(event.target.value)
  }
}

</script>
