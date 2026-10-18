# 🗣️ Parlons (Application d'apprentissage des langues)

Application web progressive (PWA) d'apprentissage oral et interactif des langues : **Anglais**, **Arabe littéraire**, **Néerlandais**. Conçue selon une philosophie résolument **anti-scolaire**, axée sur la boucle naturelle **Écouter $\rightarrow$ Parler $\rightarrow$ Lire**, sans bloquer l'apprenant par de la grammaire abstraite sur papier.

---

## 📂 Fichiers du projet

- **[`parlons.html`](./parlons.html)** : Application complète autonome (100 % côté client, responsive mobile & desktop).
- **[`manifest.json`](./manifest.json)** : Configuration PWA (installable sur Android, iOS, Windows et macOS).
- **[`sw.js`](./sw.js)** : Service Worker assurant le cache et le fonctionnement hors-ligne.
- **[`icon.svg`](./icon.svg)** : Icône vectorielle haute résolution.

---

## ✨ Fonctionnalités majeures

### 1. Pratique orale et situations réelles
- **3 modes d'expression** :
  - **Mains libres (Hands-Free)** : conçu comme un véritable appel téléphonique. L'IA parle, puis le micro s'ouvre automatiquement sans toucher l'écran.
  - **Voix (Push-to-talk)** : dictée fluide avec envoi direct et réponse vocale.
  - **Écrit guidé** : autocorrection bienveillante (repérer ses erreurs avant la correction finale).
- **Scénarios de jeux de rôle thématiques** :
  - Prise de contact (*Ta'âruf* en arabe : salutations, nom, origine).
  - La maison et les objets (pratique orale des prépositions : *sur, sous, dans, devant, derrière, entre*).
  - Au café, entretien d'embauche, chez le médecin, en voyage, au bureau, conversation libre.
- **Passerelle immédiate** : *« Je viens d'étudier un cours ailleurs »* pour convertir instantanément n'importe quelle leçon extérieure en pratique orale active.

### 2. Module « Lire l'arabe » (Al-Qā'idah An-Nūrāniyyah & Almadrassa)
- **100 % gratuit, autonome et hors-ligne**.
- **Alphabet en 7 leçons** : les 28 lettres et leurs 4 formes graphiques (isolée, initiale, médiane, finale).
- **Écran des règles phonétiques (*Nourāniyyah*)** :
  - Les voyelles courtes (*Harakat*) : *Fatha* (ـَ), *Kasra* (ـِ), *Damma* (ـُ) et le *Soukoun* (ـْ).
  - Le *Tanwīn* : *Fathatān* (ـً), *Kasratān* (ـٍ), *Dammatān* (ـٌ).
  - Les prolongations (*Madd* : â, î, û) et diphtongues douces (*Lyn* : aw, ay).
  - La *Shaddah* (ـّ) et consonnes dédoublées.
  - Écoute sonore instantanée au toucher sur chaque symbole.
- **Décomposition syllabique analytique** :
  - Mode *« Lire des mots »* avec découpage syllabique interactif au clic (méthode Nourāniyyah).
  - Filtrage dynamique : l'apprenant ne voit **que des mots dont il maîtrise déjà 100 % des lettres**.
  - Banque lexicale enrichie : mots trilitères fondamentaux de la Nourāniyyah et univers quotidiens d'Almadrassa (études, mobilier, maison, ville).

### 3. Moteur IA agnostique et souverain
- Compatible avec les API **Anthropic (Claude)**, **Google Gemini**, **Groq**, **Cerebras** et **Mistral**.
- Aucune donnée personnelle ni clé API ne quitte le navigateur de l'utilisateur (`localStorage`).

---

## 🎯 Prochaines étapes

1. Déployer en **PWA (HTTPS)** sur GitHub Pages, Cloudflare Pages ou Vercel pour débloquer l'accès au micro sur mobile.
2. Développer et enrichir les modules avancés du parcours **Néerlandais** (B1/B2).
