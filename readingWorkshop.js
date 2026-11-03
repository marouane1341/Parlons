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

// Nettoyage des voyelles pour une comparaison robuste des racines
window.stripTashkeel = function(text) {
  return (text || '').replace(/[\u064B-\u065F\u0670]/g, '').trim();
};

window.openReadingWorkshop = function() {
  const views = document.querySelectorAll('.app-view, section[id$="Section"], #home, #chatScreen, .tab-view, .tab-content, .view');
  views.forEach(v => {
    if (v && v.id !== 'readingWorkshopSection' && v.id !== 'app' && v.id !== 'body') {
      v.style.display = 'none';
      v.style.pointerEvents = 'none';
    }
  });

  const section = document.getElementById('readingWorkshopSection');
  if (section) {
    section.style.display = 'block';
    section.style.pointerEvents = 'auto';
    window.loadReadingText(window.currentReadingIndex || 0);
  }
};

window.closeReadingWorkshop = function() {
  if (window.isReadingRecording) window.toggleReadingRecording();
  const section = document.getElementById('readingWorkshopSection');
  if (section) {
    section.style.display = 'none';
    section.style.pointerEvents = 'none';
  }
  // Réactive l'écran principal sans recharger la page
  const home = document.getElementById('home') || document.getElementById('tutorSection') || document.querySelector('.main-view');
  if (home) {
    home.style.display = 'flex';
    home.style.pointerEvents = 'auto';
    home.classList.add('active');
  }
  const lessons = document.getElementById('lessonsScreen');
  if (lessons) {
    lessons.style.display = 'block';
    lessons.style.pointerEvents = 'auto';
    lessons.classList.add('active');
  }
  const bottomNav = document.getElementById('bottomNav');
  if (bottomNav) {
    bottomNav.style.display = 'flex';
    bottomNav.style.pointerEvents = 'auto';
  }
};

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

  if (window.isReadingRecording) {
    // Arrêt de l'enregistrement
    window.isReadingRecording = false;
    if (window.readingRecognizer) {
      try { window.readingRecognizer.stop(); } catch (e) {}
    }
    if (btn) {
      btn.style.background = '#2563eb';
      btn.innerText = '🎙️';
    }
    if (label) label.innerText = "Analyse de votre lecture en cours...";
    return;
  }

  // Démarrage de l'enregistrement
  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRec) {
    alert("La reconnaissance vocale n'est pas supportée sur ce navigateur.");
    return;
  }

  window.readingRecognizer = new SpeechRec();
  window.readingRecognizer.lang = 'ar-SA';
  window.readingRecognizer.continuous = true;
  window.readingRecognizer.interimResults = false;

  let capturedTranscript = '';

  window.readingRecognizer.onstart = () => {
    window.isReadingRecording = true;
    if (btn) {
      btn.style.background = '#dc2626';
      btn.innerText = '⏹️';
    }
    if (label) label.innerText = "Lecture en cours... Touchez pour terminer et analyser.";
  };

  window.readingRecognizer.onresult = (evt) => {
    for (let i = 0; i < evt.results.length; i++) {
      capturedTranscript += ' ' + evt.results[i][0].transcript;
    }
  };

  window.readingRecognizer.onerror = () => {
    window.isReadingRecording = false;
    if (btn) { btn.style.background = '#2563eb'; btn.innerText = '🎙️'; }
    if (label) label.innerText = "Erreur micro. Touchez pour recommencer.";
  };

  window.readingRecognizer.onend = () => {
    window.isReadingRecording = false;
    if (btn) { btn.style.background = '#2563eb'; btn.innerText = '🎙️'; }
    if (capturedTranscript.trim()) {
      window.analyzeReadingResult(capturedTranscript.trim());
    } else {
      if (label) label.innerText = "Aucune parole détectée. Réessayez.";
    }
  };

  window.readingRecognizer.start();
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
