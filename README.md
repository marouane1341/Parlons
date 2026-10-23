# Parlons

Application web (PWA) pour apprendre à parler **anglais**, **arabe littéraire (fusha)** et **néerlandais** avec un professeur virtuel. Approche antiscolaire : on parle dès le début, la grammaire reste en arrière-plan.

Tout tourne dans le navigateur, sans serveur : `index.html` (copie identique : `parlons.html`) + `manifest.json` + `sw.js`.

## Utilisation

1. Ouvrir l'application dans **Chrome** (Android ou ordinateur) ou Edge. Brave et Safari bloquent la reconnaissance vocale : l'écrit et la lecture à voix haute y fonctionnent quand même.
2. Ouvrir « Fournisseur d'IA et clé API », coller une clé, cliquer sur **Tester la connexion**.
3. Le test se fait en 3 étapes (clé, message simple, consignes + format JSON) et affiche, en cas d'échec, l'étape, le code HTTP et le message exact du fournisseur.

### Clé Google Gemini (gratuit)

Clé à créer sur <https://aistudio.google.com/apikey> (elle commence par `AIza`). L'application appelle l'API `v1beta` de Gemini avec la clé dans l'en-tête `x-goog-api-key`. Si Google refuse une option (`thinkingConfig`, `responseMimeType`, `systemInstruction`), l'application réessaie automatiquement avec une requête plus simple. Si le modèle choisi n'existe pas, elle choisit le meilleur modèle « flash » stable de la liste de la clé. Les quotas gratuits sont limités : une erreur « Limite de requêtes » signifie d'attendre un peu.

Fournisseurs gérés : Google Gemini, Groq, Claude (Anthropic), Mistral. Chaque fournisseur a sa propre clé, enregistrée uniquement dans le navigateur (jamais exportée).

## Fonctionnalités

- **Conversation** par scénarios, en trois modes : écrit (la correction s'affiche après une tentative de reformulation), voix (touche pour parler) et mains libres (comme un appel). Micro-sessions de 2 minutes en option, immersion progressive (avec aide, mélangé, totale).
- **Parcours** par langue (12 étapes en anglais et en arabe, 8 en néerlandais), chacune avec 3 capacités à démontrer. Le bilan de séance valide les capacités ; le diagnostic place le point de départ ; un contrôle hebdomadaire mesure le niveau.
- **Bilan écrit** après chaque séance : niveau estimé, erreurs récurrentes, prononciation, éléments à revoir.
- **Révision espacée** (1, 3, 7, 14, 30 jours) des expressions et des erreurs relevées.
- **Répéter à voix haute** (comparaison mot à mot avec la transcription) et **écoute** d'un court texte adapté au niveau.
- **Lire l'arabe** : 28 lettres en 7 leçons (formes, mot d'exemple, son), quiz de 3 minutes avec révision espacée, lecture de mots composés des lettres connues, règles de lecture (voyelles, tanwīn, madd, shadda). Hors ligne pour cette partie.
- **Néerlandais** : paires minimales voyelle courte / longue à écouter.
- **PWA** : installable, cache hors ligne (le service worker charge toujours la dernière version des pages quand le réseau est disponible).
- Export / import des données (parcours, révisions, historique) en JSON.

## Limites connues

- La reconnaissance vocale est celle du navigateur (Chrome envoie la voix aux serveurs de Google). Elle comprend mal l'arabe d'un débutant.
- Les voix de synthèse dépendent de l'appareil : sur Android, installer la voix arabe de Google si besoin.
- La qualité de l'arabe des modèles gratuits n'est pas garantie.
