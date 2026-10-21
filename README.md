# 🗣️ Parlons (Application d'apprentissage oral et immersif)

Application web progressive (PWA) d'apprentissage oral et interactif des langues : **Anglais**, **Arabe littéraire (Fusha)**, **Néerlandais**. Conçue selon une philosophie résolument **anti-scolaire**, axée sur la boucle naturelle **Écouter $\rightarrow$ Parler $\rightarrow$ Lire**, sans bloquer l'apprenant par de la grammaire abstraite sur papier.

---

## 📂 Fichiers du projet

- **[`index.html`](./index.html)** & **[`parlons.html`](./parlons.html)** : Application complète autonome (100 % côté client, responsive mobile & desktop).
- **[`manifest.json`](./manifest.json)** : Configuration PWA (installable sur Android, iOS, Windows et macOS).
- **[`sw.js`](./sw.js)** : Service Worker assurant le cache (PWA v3) et le fonctionnement hors-ligne.
- **[`icon.svg`](./icon.svg)** : Icône vectorielle haute résolution.

---

## ✨ Fonctionnalités majeures & Nouveautés

### 1. Moteur vocal de nouvelle génération
- **Transcription haute précision via Whisper IA** : Compatible avec l'API Groq Whisper (`whisper-large-v3-turbo`) pour une reconnaissance vocale parfaite, même avec du bruit ou un accent débutant.
- **Auto-écoute comparative (Playback)** : Après chaque message parlé ou répétition de phrase, un bouton **« 🔊 Réécouter ma voix »** permet à l'apprenant d'entendre son propre enregistrement et de comparer son articulation avec la voix du modèle.
- **Modes d'expression** :
  - **Mains libres (Hands-Free)** : conçu comme un véritable appel téléphonique.
  - **Voix (Push-to-talk)** : dictée fluide avec envoi instantané.
  - **Écrit guidé** : repérer ses erreurs avant la correction finale.

### 2. Module Phonétique Néerlandaise (Klankleer)
- **100 % dédié aux francophones** pour surmonter les pièges phonétiques du néerlandais :
  - **Les diphtongues magiques** : `UI`, `IJ/EI`, `OE`, `EU`, `OU/AU`.
  - **Paires minimales (voyelle brève vs longue)** : *man* vs *maan*, *les* vs *lees*, *bom* vs *boom*, *bus* vs *buur*, *wit* vs *wiet*.
  - **Les consonnes pièges** : le `G/CH` raclé et le `W` néerlandais.
  - **Quiz auditif de discrimination** : écouter et deviner le mot prononcé pour aiguiser son oreille.
- **Scénarios du quotidien aux Pays-Bas et en Flandre** :
  - À la commune (*Gemeentehuis*), en gare (*NS*), au supermarché (*Albert Heijn*), visite de logement (*Woning*), pause-café (*Koffiehoek*).

### 3. Module « Lire l'arabe » & Al-Qā'idah An-Nūrāniyyah
- **Makhārij al-Hurūf (Points d'articulation)** : description anatomique et conseil francophone pour chacune des 28 lettres (gorge profonde, luette, dents, lèvres).
- **Alphabet en 7 leçons** avec 4 formes graphiques et écoute audio instantanée.
- **Règles phonétiques Nourāniyyah** : Harakat, Soukoun, Tanwīn, Madd, Lyn et Shaddah.
- **Décomposition syllabique analytique** : mode lecture de mots réservé aux lettres déjà maîtrisées.

### 4. Répétition Espacée SuperMemo SM-2 & Export Anki
- **Algorithme SM-2** : calcul dynamique de l'Ease Factor et des intervalles de révision optimaux.
- **Export Anki (.tsv) en un clic** : emportez vos révisions et votre vocabulaire ciblé dans votre application Anki habituelle.

### 5. Mini-Missions Orales à objectifs
- Jeux de rôle scénarisés sous contrainte de tours de parole :
  - *Le taxi new-yorkais pressé* (Anglais).
  - *Négocier au Souk Khan el-Khalili* (Arabe).
  - *Décrocher une visite de logement ce soir* (Néerlandais).

### 6. Résilience technique & Hors-ligne
- **Double stockage synchrone** : `localStorage` + base de données **IndexedDB** (`parlons_db`) pour éviter les purges intempestives sur iOS Safari.
- **Fournisseurs IA agnostiques** : Anthropic Claude, Google Gemini, Groq, Cerebras et Mistral.
- **100 % hors-ligne** pour les modules de lecture, quiz, règles phonétiques et révisions.
