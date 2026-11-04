// readingWorkshop.js - Logique isolée de l'Atelier Lecture (Fusha)
window.readingTextsCatalog = [
  {
    id: "read_1",
    level: "Texte 1 • Débutant",
    arabic: "أَنَا أَتَكَلَّمُ اللُّغَةَ الْعَرَبِيَّةَ بِهُدُوءٍ وَوُضُوحٍ.",
    words: ["أَنَا", "أَتَكَلَّمُ", "اللُّغَةَ", "الْعَرَبِيَّةَ", "بِهُدُوءٍ", "وَوُضُوحٍ"],
    translation: "Je parle la langue arabe calmement et avec clarté."
  },
  {
    id: "read_2",
    level: "Texte 2 • Quotidien",
    arabic: "أُرِيدُ أَنْ أَشْرَبَ الْمَاءَ الْبَارِدَ فِي الصَّبَاحِ.",
    words: ["أُرِيدُ", "أَنْ", "أَشْرَبَ", "الْمَاءَ", "الْبَارِدَ", "فِي", "الصَّبَاحِ"],
    translation: "Je veux boire de l'eau fraîche le matin."
  }
];

window.currentReadingIndex = 0;
window.isReadingRecording = false;
window.readingRecognizer = null;
window.capturedReadingTranscript = '';

// Nettoyage des voyelles pour une comparaison robuste des racines
window.stripTashkeel = function(text) {
  return (text || '').replace(/[\u064B-\u065F\u0670]/g, '').trim();
};

window.openReadingWorkshop = function() {
  // Si on est dans le chat, revenir aux leçons
  if (typeof window.closeChat === 'function') {
    try { window.closeChat(); } catch(e){}
  }
  if (typeof window.switchTab === 'function') {
    try { window.switchTab('lessons'); } catch(e){}
  }

  const panel = document.getElementById('readingWorkshopPanel');
  if (panel) {
    panel.style.display = 'block';
    try {
      panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch(e){}
    if (typeof window.loadReadingText === 'function') {
      window.loadReadingText(window.currentReadingIndex || 0);
    }
  }
};

window.closeReadingPanel = function() {
  if (window.isReadingRecording && typeof window.toggleReadingRecording === 'function') {
    window.toggleReadingRecording();
  }
  const panel = document.getElementById('readingWorkshopPanel');
  if (panel) {
    panel.style.display = 'none';
  }
};
window.closeReadingWorkshop = window.closeReadingPanel;

window.loadReadingText = function(index) {
  window.currentReadingIndex = (index >= 0 && index < window.readingTextsCatalog.length) ? index : 0;
  const item = window.readingTextsCatalog[window.currentReadingIndex] || window.readingTextsCatalog[0];
  const badge = document.getElementById('readingLevelBadge');
  const targetText = document.getElementById('targetReadingText');
  const transText = document.getElementById('targetReadingTranslation');
  const feedbackCard = document.getElementById('readingFeedbackCard');

  if (badge) badge.innerText = item.level;
  if (targetText) targetText.innerText = item.arabic;
  if (transText) transText.innerText = `« ${item.translation} »`;
  if (feedbackCard) feedbackCard.style.display = 'none';
};

window.playTargetReadingAudio = function() {
  const item = window.readingTextsCatalog[window.currentReadingIndex];
  if (item && window.playTutorAudio) {
    window.playTutorAudio(item.arabic);
  }
};

window.toggleReadingRecording = function() {
  const btn = document.getElementById('btnRecordReading');
  const label = document.getElementById('readingStatusLabel');

  // CAS 1 : L'utilisateur appuie pour ARRÊTER
  if (window.isReadingRecording) {
    window.isReadingRecording = false; // Marqueur d'arrêt volontaire
    
    if (window.readingRecognizer) {
      try {
        window.readingRecognizer.stop();
      } catch (e) {
        console.warn("Arrêt micro:", e);
      }
    }

    if (btn) {
      btn.style.background = '#2563eb';
      btn.innerText = '🎙️';
    }
    if (label) label.innerText = "Analyse de votre lecture en cours...";

    // Analyse immédiate de tout ce qui a été collecté
    setTimeout(() => {
      if (window.capturedReadingTranscript.trim()) {
        window.analyzeReadingResult(window.capturedReadingTranscript.trim());
      } else {
        if (label) label.innerText = "Aucun mot détecté. Touchez le micro et réessayez.";
      }
    }, 400);
    return;
  }

  // CAS 2 : L'utilisateur appuie pour DÉMARRER
  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRec) {
    alert("Reconnaissance vocale non supportée sur ce navigateur.");
    return;
  }

  window.capturedReadingTranscript = '';
  window.isReadingRecording = true;

  function initRecognizer() {
    const recognizer = new SpeechRec();
    recognizer.lang = 'ar-SA';
    recognizer.continuous = true;
    recognizer.interimResults = false;

    recognizer.onstart = () => {
      if (btn) {
        btn.style.background = '#dc2626';
        btn.innerText = '⏹️';
      }
      if (label) label.innerText = "À vous de lire ! Touchez le bouton rouge quand vous avez fini.";
    };

    recognizer.onresult = (evt) => {
      for (let i = evt.resultIndex; i < evt.results.length; i++) {
        if (evt.results[i].isFinal) {
          window.capturedReadingTranscript += ' ' + evt.results[i][0].transcript;
        }
      }
    };

    recognizer.onerror = (err) => {
      // Ignorer les erreurs mineures de silence (no-speech) sur mobile
      if (err.error === 'no-speech' && window.isReadingRecording) {
        return;
      }
      console.warn("Info micro lecture:", err.error);
    };

    recognizer.onend = () => {
      // SI l'utilisateur n'a PAS appuyé sur STOP, on redémarre instantanément le micro
      // pour éviter qu'Android ne coupe la parole pendant qu'il hésite ou respire
      if (window.isReadingRecording) {
        try {
          recognizer.start();
        } catch (e) {
          // Si le redémarrage immédiat échoue, réinstancier après un court délai
          setTimeout(() => {
            if (window.isReadingRecording) initRecognizer();
          }, 200);
        }
      }
    };

    try {
      recognizer.start();
      window.readingRecognizer = recognizer;
    } catch (e) {
      console.error("Erreur démarrage recognizer:", e);
    }
  }

  initRecognizer();
};

window.analyzeReadingResult = function(spokenText) {
  const item = window.readingTextsCatalog[window.currentReadingIndex];
  const label = document.getElementById('readingStatusLabel');
  const feedbackCard = document.getElementById('readingFeedbackCard');
  const scoreHeader = document.getElementById('readingScoreHeader');
  const compView = document.getElementById('readingComparisonView');
  const adviceText = document.getElementById('readingAdviceText');

  if (label) label.innerText = "Lecture analysée avec succès !";
  if (!feedbackCard) return;

  const targetCleanWords = item.words.map(w => window.stripTashkeel(w));
  const spokenWords = window.stripTashkeel(spokenText).split(/\s+/);

  let successCount = 0;
  const markupWords = item.words.map(origWord => {
    const cleanOrig = window.stripTashkeel(origWord);
    const isFound = spokenWords.some(sw => sw.includes(cleanOrig) || cleanOrig.includes(sw));
    if (isFound) {
      successCount++;
      return `<span style="color: #16a34a; font-weight: bold; margin: 0 3px;">${origWord}</span>`;
    } else {
      return `<span style="color: #dc2626; text-decoration: underline; margin: 0 3px;">${origWord}</span>`;
    }
  });

  const accuracy = Math.round((successCount / item.words.length) * 100);

  if (scoreHeader) {
    scoreHeader.innerHTML = accuracy >= 75
      ? `🎉 Excellente lecture (${accuracy}% de précision)`
      : `🔎 Bonne tentative (${accuracy}% de précision)`;
    scoreHeader.style.color = accuracy >= 75 ? '#16a34a' : '#d97706';
  }

  if (compView) {
    compView.innerHTML = markupWords.join(' ');
  }

  if (adviceText) {
    adviceText.innerHTML = accuracy >= 75
      ? "Bravo ! Les mots soulignés en vert ont été parfaitement articulés. Vous pouvez passer au texte suivant."
      : "Les mots en rouge méritent une attention particulière. Écoutez le modèle audio et réessayez à votre rythme.";
  }

  feedbackCard.style.display = 'block';
};
