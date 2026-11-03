// lessonsData.js - Catalogue des leçons du Cursus Débutant Guidé (A0 Fusha)
window.LESSONS_CATALOG = [
  {
    id: "lesson_1",
    title: "Module 1 : L'identité et la phrase nominale",
    level: "Débutant",
    totalSteps: 5,
    steps: [
      {
        step: 1,
        type: "decouverte",
        teacherFr: "En arabe, le verbe 'être' n'existe pas au présent. Pour dire 'Je suis', on dit simplement 'Anā'. Écoutez et observez :",
        arabicText: "أَنَا مَرْوَان",
        phonetic: "Anā Marwān",
        translation: "Je suis Marouane",
        instruction: "Répétez la phrase au micro ou cliquez ci-dessous :",
        options: [
          { text: "أَنَا مَرْوَان (Anā Marwān)", value: "أَنَا مَرْوَان" },
          { text: "أَنَا طَالِب (Anā tālib - Je suis étudiant)", value: "أَنَا طَالِب" }
        ]
      },
      {
        step: 2,
        type: "repetition",
        teacherFr: "Excellent. Maintenant, voyons comment dire 'Tu es' quand on s'adresse à un homme : 'Anta'.",
        arabicText: "أَنْتَ صَدِيقِي",
        phonetic: "Anta sadīqī",
        translation: "Tu es mon ami",
        instruction: "À vous, répétez l'expression :",
        options: [
          { text: "أَنْتَ صَدِيقِي (Anta sadīqī)", value: "أَنْتَ صَدِيقِي" },
          { text: "أَنْتَ أُسْتَاذ (Anta ustādh - Tu es professeur)", value: "أَنْتَ أُسْتَاذ" }
        ]
      },
      {
        step: 3,
        type: "substitution",
        teacherFr: "Changeons simplement le mot de la fin. Comment dire 'Je suis content' ?",
        arabicText: "أَنَا سَعِيد",
        phonetic: "Anā sa'īd",
        translation: "Je suis content / heureux",
        instruction: "Choisissez ou prononcez votre état :",
        options: [
          { text: "أَنَا سَعِيد (Anā sa'īd - Je suis content)", value: "أَنَا سَعِيد" },
          { text: "أَنَا تَعْبَان (Anā ta'bān - Je suis fatigué)", value: "أَنَا تَعْبَان" }
        ]
      },
      {
        step: 4,
        type: "application",
        teacherFr: "Mise en situation réelle : je vous pose une question fermée : 'Hal anta bi-khayr ?' (Vas-tu bien ?)",
        arabicText: "هَلْ أَنْتَ بِخَيْرٍ ؟",
        phonetic: "Hal anta bi-khayr ?",
        translation: "Est-ce que tu vas bien ?",
        instruction: "Répondez avec l'une des deux affirmations :",
        options: [
          { text: "نَعَمْ، أَنَا بِخَيْر (Na'am, anā bi-khayr - Oui, je vais bien)", value: "نَعَمْ، أَنَا بِخَيْر" },
          { text: "الْحَمْدُ لِلَّه (Al-hamdu lillāh - Ça va, Dieu merci)", value: "الْحَمْدُ لِلَّه" }
        ]
      },
      {
        step: 5,
        type: "bilan",
        teacherFr: "Félicitations ! Vous avez terminé la leçon 1. Vous savez maintenant construire une phrase nominale sans verbe.",
        arabicText: "مُمْتَاز ! أَحْسَنْتَ",
        phonetic: "Mumtāz ! Ahsanta",
        translation: "Excellent ! Bravo à vous",
        instruction: "Voici les briques maîtrisées aujourd'hui : Anā (Je suis), Anta (Tu es), Sa'īd (Content), Bi-khayr (Bien).",
        options: [
          { text: "🎉 Valider et passer au Module 2", value: "ACTION_NEXT_MODULE" },
          { text: "🔄 Recommencer ce module", value: "ACTION_RESTART_MODULE" }
        ]
      }
    ]
  }
];
