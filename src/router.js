import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from './pages/LandingPage.vue'
import CalculateurPage from './pages/CalculateurPage.vue'
import BypassPage from './pages/BypassPage.vue';
import FonctionnalitePage from './pages/FonctionnalitePage.vue'
import BlogPage from './pages/BlogPage.vue'
import BlogContentPage from './pages/BlogContentPage.vue'
import PolitiqueConfidentialitePage from './pages/PolitiqueConfidentialitePage.vue'
import Success from './pages/stripe/Success.vue'
import Cancel from './pages/stripe/Cancel.vue'

const routes = [
  { path: '/', component: LandingPage,
    meta: {
      title: 'BabyDose | Outil de comptage et calcul de doses pour bébé',
      description: 'Calculez facilement les doses pour votre bébé selon le poids et l’âge. Outil simple, clair et pratique pour les parents.'
    }
   },
  { path: '/calculateur', component: CalculateurPage,
    meta: {
      title: 'BabyDose | Calculateur de dose',
      description: 'Entrez le poids et l’âge de votre enfant pour obtenir un calcul de dose indicatif. À utiliser avec précaution et avis médical.'
    }
   },
  { path: '/fonctionnalites', component: FonctionnalitePage,
    meta: {
      title: 'BabyDose | Fonctionnalités',
      description: 'Découvrez les fonctionnalités de BabyDose : calcul de dose, unités compatibles, arrondis, historique et partage.'
    }
   },
   { path: '/blog', component: BlogPage,
    meta: {
      title: 'BabyDose | Blog',
      description: 'Conseils et articles autour du calcul de doses pédiatriques, bonnes pratiques et sécurité pour les parents.'
    }
   },
   { path: '/blog/:slug', name: 'BlogContent', component: BlogContentPage,
    meta: {
      title: 'BabyDose | Article',
      description: 'Lecture d’un article du blog BabyDose : informations et conseils pour le comptage de doses chez le nourrisson.'
    }
   },
   { path: '/politique-de-confidentialite', component: PolitiqueConfidentialitePage,
    meta: {
      title: 'BabyDose | Politique de confidentialité',
      description: 'En savoir plus sur la collecte, l’utilisation et la protection de vos données sur BabyDose.'
    }
   },
   { path: '/success', component: Success,
    meta: {
      title: 'BabyDose | Paiement réussi',
      description: 'Merci pour votre soutien ! Votre paiement a été confirmé et votre accès est activé.'
    }
   },
   { path: '/cancel', component: Cancel,
    meta: {
      title: 'BabyDose | Paiement annulé',
      description: 'Le paiement a été annulé. Vous pouvez réessayer à tout moment depuis la page de souscription.'
    }
   },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

if (import.meta.env.VITE_ENABLE_BYPASS === 'true') {
  router.addRoute({
    path: '/calculateur/bypass-mode',
    name: 'Bypass',
    component: BypassPage,
    meta: {
      title: 'BabyDose | Calculateur (mode admin)',
      description: 'Accès administrateur au calculateur de dose pour tests et vérifications.'
    }
  });
}

export default router