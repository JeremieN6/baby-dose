<template>
    <section class="frais-fonctionnement h-full md:col-span-2 grid grid-cols-1 gap-y-4 gap-x-1 auto-rows-auto">
        <div class="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 p-6">
            <h5 class="mb-4 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                <span class="text-gray-400">#2</span> Indiquez vos frais de fonctionnement
            </h5>

            <!-- En-tête avec dropdown -->
            <div class="flex items-center justify-between mb-4 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div class="font-medium text-gray-900 dark:text-white">Charges de fonctionnement</div>
                <div class="flex items-center">
                    <span class="text-xl font-bold text-indigo-800 dark:text-indigo-400 w-full mr-2">{{
                        formattedTotalMonthlyExpenses }}</span>
                    <span class="text-xs text-gray-600 dark:text-gray-400 mr-2">par mois</span>
                    <button @click="toggleExpenses" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                        <svg class="w-5 h-5 transition-transform duration-300" :class="{ 'rotate-180': !isExpanded }" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7">
                            </path>
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Liste des dépenses -->
            <div class="expand-transition" :class="{ 'expanded': isExpanded, 'collapsed': !isExpanded }">
                <!-- Loyer bureau -->
                <div class="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                    <div class="flex items-center">
                        <span class="mr-2">🏢</span>
                        <div>
                            <span class="text-gray-900 dark:text-white text-sm">Loyer bureau</span>
                            <span class="text-xs text-gray-500 dark:text-gray-400 block">(Eau, électricité,
                                etc.)</span>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <input :value="calculator?.expenses?.rent || 0" @input="updateExpense('rent', $event)" type="number" min="0"
                            class="w-16 text-right px-2 py-1 border border-gray-200 rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <span class="text-xs text-gray-500 dark:text-gray-400 mx-2">€ par mois</span>
                        <span class="text-sm font-medium text-indigo-800 dark:text-indigo-400 w-16 text-right">{{
                            calculator?.formatNumber ? calculator.formatNumber((calculator?.expenses?.rent || 0) * 12) : '0' }} €</span><sub>/an</sub>
                    </div>
                </div>

                <!-- Voyages -->
                <div class="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                    <div class="flex items-center">
                        <span class="mr-2">✈️</span>
                        <div>
                            <span class="text-gray-900 dark:text-white text-sm">Voyages</span>
                            <span class="text-xs text-gray-500 dark:text-gray-400 block">(avion...)</span>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <input :value="calculator.expenses.travel" @input="updateExpense('travel', $event)" type="number" min="0"
                            class="w-16 text-right px-2 py-1 border border-gray-200 rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <span class="text-xs text-gray-500 dark:text-gray-400 mx-2">€ par mois</span>
                        <span class="text-sm font-medium text-indigo-800 dark:text-indigo-400 w-16 text-right">{{
                            calculator.formatNumber(calculator.expenses.travel * 12) }} €</span><sub>/an</sub>
                    </div>
                </div>

                <!-- Logiciels -->
                <div class="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                    <div class="flex items-center">
                        <span class="mr-2">💻</span>
                        <div>
                            <span class="text-gray-900 dark:text-white text-sm">Logiciels</span>
                            <span class="text-xs text-gray-500 dark:text-gray-400 block">Adobe, Office,
                                etc.</span>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <input :value="calculator.expenses.software" @input="updateExpense('software', $event)" type="number" min="0"
                            class="w-16 text-right px-2 py-1 border border-gray-200 rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <span class="text-xs text-gray-500 dark:text-gray-400 mx-2">€ par mois</span>
                        <span class="text-sm font-medium text-indigo-800 dark:text-indigo-400 w-16 text-right">{{
                            calculator.formatNumber(calculator.expenses.software * 12) }} €</span><sub>/an</sub>
                    </div>
                </div>

                <!-- Comptabilité -->
                <div class="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                    <div class="flex items-center">
                        <span class="mr-2">📑</span>
                        <div>
                            <span class="text-gray-900 dark:text-white text-sm">Comptable</span>
                            <span class="text-xs text-gray-500 dark:text-gray-400 block">(Expert
                                comptable)</span>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <input :value="calculator.expenses.accounting" @input="updateExpense('accounting', $event)" type="number" min="0"
                            class="w-16 text-right px-2 py-1 border border-gray-200 rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <span class="text-xs text-gray-500 dark:text-gray-400 mx-2">€ par mois</span>
                        <span class="text-sm font-medium text-indigo-800 dark:text-indigo-400 w-16 text-right">{{
                            calculator.formatNumber(calculator.expenses.accounting * 12) }} €</span><sub>/an</sub>
                    </div>
                </div>

                <!-- Téléphone -->
                <div class="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                    <div class="flex items-center">
                        <span class="mr-2">📱</span>
                        <div>
                            <span class="text-gray-900 dark:text-white text-sm">Téléphone</span>
                            <span class="text-xs text-gray-500 dark:text-gray-400 block">(Abonnement
                                mobile)</span>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <input :value="calculator.expenses.phone" @input="updateExpense('phone', $event)" type="number" min="0"
                            class="w-16 text-right px-2 py-1 border border-gray-200 rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <span class="text-xs text-gray-500 dark:text-gray-400 mx-2">€ par mois</span>
                        <span class="text-sm font-medium text-indigo-800 dark:text-indigo-400 w-16 text-right">{{
                            calculator.formatNumber(calculator.expenses.phone * 12) }} €</span><sub>/an</sub>
                    </div>
                </div>

                <!-- Carburant -->
                <div class="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                    <div class="flex items-center">
                        <span class="mr-2">⛽</span>
                        <div>
                            <span class="text-gray-900 dark:text-white text-sm">Carburant</span>
                            <span class="text-xs text-gray-500 dark:text-gray-400 block">(Déplacements pro
                                voiture)</span>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <input :value="calculator.expenses.fuel" @input="updateExpense('fuel', $event)" type="number" min="0"
                            class="w-16 text-right px-2 py-1 border border-gray-200 rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <span class="text-xs text-gray-500 dark:text-gray-400 mx-2">€ par mois</span>
                        <span class="text-sm font-medium text-indigo-800 dark:text-indigo-400 w-16 text-right">{{
                            calculator.formatNumber(calculator.expenses.fuel * 12) }} €</span><sub>/an</sub>
                    </div>
                </div>

                <!-- Entretien Matériel -->
                <div class="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                    <div class="flex items-center">
                        <span class="mr-2">📱</span>
                        <div>
                            <span class="text-gray-900 dark:text-white text-sm">Entretien Matériel</span>
                            <span class="text-xs text-gray-500 dark:text-gray-400 block">(Réparation
                                matériel
                                informatique, Entretien matériel de bureau)</span>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <input :value="calculator.expenses.maintenance" @input="updateExpense('maintenance', $event)" type="number" min="0"
                            class="w-16 text-right px-2 py-1 border border-gray-200 rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <span class="text-xs text-gray-500 dark:text-gray-400 mx-2">€ par mois</span>
                        <span class="text-sm font-medium text-indigo-800 dark:text-indigo-400 w-16 text-right">{{
                            calculator.formatNumber(calculator.expenses.maintenance * 12) }} €</span><sub>/an</sub>
                    </div>
                </div>

                <!-- Fournitures -->
                <div class="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                    <div class="flex items-center">
                        <span class="mr-2">📝</span>
                        <div>
                            <span class="text-gray-900 dark:text-white text-sm">Fournitures</span>
                            <span class="text-xs text-gray-500 dark:text-gray-400 block">(Papeterie,
                                Fournitures
                                informatiques)</span>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <input :value="calculator.expenses.supplies" @input="updateExpense('supplies', $event)" type="number" min="0"
                            class="w-16 text-right px-2 py-1 border border-gray-200 rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <span class="text-xs text-gray-500 dark:text-gray-400 mx-2">€ par mois</span>
                        <span class="text-sm font-medium text-indigo-800 dark:text-indigo-400 w-16 text-right">{{
                            calculator.formatNumber(calculator.expenses.supplies * 12) }} €</span><sub>/an</sub>
                    </div>
                </div>

                <!-- Repas -->
                <div class="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                    <div class="flex items-center">
                        <span class="mr-2">🍽️</span>
                        <div>
                            <span class="text-gray-900 dark:text-white text-sm">Repas</span>
                            <span class="text-xs text-gray-500 dark:text-gray-400 block">(Repas
                                professionnel,
                                Repas d'affaires)</span>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <input :value="calculator.expenses.meals" @input="updateExpense('meals', $event)" type="number" min="0"
                            class="w-16 text-right px-2 py-1 border border-gray-200 rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <span class="text-xs text-gray-500 dark:text-gray-400 mx-2">€ par mois</span>
                        <span class="text-sm font-medium text-indigo-800 dark:text-indigo-400 w-16 text-right">{{
                            calculator.formatNumber(calculator.expenses.meals * 12) }} €</span><sub>/an</sub>
                    </div>
                </div>

                <!-- Services Bancaires -->
                <div class="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                    <div class="flex items-center">
                        <span class="mr-2">🏦</span>
                        <div>
                            <span class="text-gray-900 dark:text-white text-sm">Services Bancaires</span>
                            <span class="text-xs text-gray-500 dark:text-gray-400 block">(Frais de banque,
                                Frais
                                de gestion)</span>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <input :value="calculator.expenses.banking" @input="updateExpense('banking', $event)" type="number" min="0"
                            class="w-16 text-right px-2 py-1 border border-gray-200 rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <span class="text-xs text-gray-500 dark:text-gray-400 mx-2">€ par mois</span>
                        <span class="text-sm font-medium text-indigo-800 dark:text-indigo-400 w-16 text-right">{{
                            calculator.formatNumber(calculator.expenses.banking * 12) }} €</span><sub>/an</sub>
                    </div>
                </div>

                <!-- Materiel Informatique -->
                <div class="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                    <div class="flex items-center">
                        <span class="mr-2">🖥️</span>
                        <div>
                            <span class="text-gray-900 dark:text-white text-sm">Materiel Informatique</span>
                            <span class="text-xs text-gray-500 dark:text-gray-400 block">(Ordinateur
                                portable,
                                Périphériques)</span>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <input :value="calculator.expenses.computer" @input="updateExpense('computer', $event)" type="number" min="0"
                            class="w-16 text-right px-2 py-1 border border-gray-200 rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <span class="text-xs text-gray-500 dark:text-gray-400 mx-2">€ par mois</span>
                        <span class="text-sm font-medium text-indigo-800 dark:text-indigo-400 w-16 text-right">{{
                            calculator.formatNumber(calculator.expenses.computer * 12) }} €</span><sub>/an</sub>
                    </div>
                </div>

                <!-- Taxes -->
                <div class="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                    <div class="flex items-center">
                        <span class="mr-2">💸</span>
                        <div>
                            <span class="text-gray-900 dark:text-white text-sm">Taxes</span>
                            <span class="text-xs text-gray-500 dark:text-gray-400 block">(Taxes locales,
                                TVA)</span>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <input :value="calculator.expenses.taxes" @input="updateExpense('taxes', $event)" type="number" min="0"
                            class="w-16 text-right px-2 py-1 border border-gray-200 rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <span class="text-xs text-gray-500 dark:text-gray-400 mx-2">€ par mois</span>
                        <span class="text-sm font-medium text-indigo-800 dark:text-indigo-400 w-16 text-right">{{
                            calculator.formatNumber(calculator.expenses.taxes * 12) }} €</span><sub>/an</sub>
                    </div>
                </div>

                <!-- Autres -->
                <div class="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                    <div class="flex items-center">
                        <span class="mr-2">📦</span>
                        <div>
                            <span class="text-gray-900 dark:text-white text-sm">Autres</span>
                            <span class="text-xs text-gray-500 dark:text-gray-400 block">(Autres dépenses,
                                Abonnement services)</span>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <input :value="calculator.expenses.other" @input="updateExpense('other', $event)" type="number" min="0"
                            class="w-16 text-right px-2 py-1 border border-gray-200 rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <span class="text-xs text-gray-500 dark:text-gray-400 mx-2">€ par mois</span>
                        <span class="text-sm font-medium text-indigo-800 dark:text-indigo-400 w-16 text-right">{{
                            calculator.formatNumber(calculator.expenses.other * 12) }} €</span><sub>/an</sub>
                    </div>
                </div>

                <!-- Total -->
                <div class="flex justify-between items-center mt-4 pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Soit un total
                        de</span>
                    <div class="text-right">
                        <span class="text-xl font-bold text-indigo-800 dark:text-indigo-400">{{
                            formattedTotalAnnualExpenses }} €</span>
                        <span class="text-xs text-gray-600 dark:text-gray-400 block">par an</span>
                    </div>
                </div>
            </div>

        </div>
    </section>
</template>

<script setup>
import { inject, ref, computed } from 'vue'

// Récupération de toutes les données via inject
const calculator = inject('calculator')

// État local pour l'expansion/collapse
const isExpanded = ref(true)

// Computed properties pour l'affichage
const formattedTotalMonthlyExpenses = computed(() => {
  if (calculator?.formatNumber && calculator?.totalMonthlyExpenses?.value) {
    return calculator.formatNumber(calculator.totalMonthlyExpenses.value)
  }
  return '0'
})

const formattedTotalAnnualExpenses = computed(() => {
  if (calculator?.formatNumber && calculator?.totalAnnualExpenses?.value) {
    return calculator.formatNumber(calculator.totalAnnualExpenses.value)
  }
  return '0'
})

// Fonction pour basculer l'état d'expansion
const toggleExpenses = () => {
  isExpanded.value = !isExpanded.value
}



// Fonction pour mettre à jour les dépenses
const updateExpense = (key, event) => {
  if (calculator && calculator.expenses) {
    calculator.expenses[key] = Number(event.target.value)
  }
}
</script>

<style scoped>
/* Styles pour l'animation de collapse/expand */
.expand-transition {
  transition: max-height 0.3s ease-out;
  overflow: hidden;
}

.collapsed {
  max-height: 0;
}

.expanded {
  max-height: 1000px; /* Valeur suffisamment grande pour contenir tout le contenu */
}
</style>
