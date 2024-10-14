// Array med frågor och svar
const questions = [
    { 
      question: "Vilken stad är huvudstad i Sverige?", 
      options: ["Stockholm", "Göteborg", "Malmö", "Uppsala"], 
      correct: "Stockholm" 
    },
    { 
      question: "Vilket år började andra världskriget?", 
      options: ["1939", "1914", "1945", "1925"], 
      correct: "1939" 
    },
    { 
      question: "Vilket djur är känt som 'kungen av djungeln'?", 
      options: ["Lejon", "Elefant", "Tiger", "Gorilla"], 
      correct: "Lejon" 
    }
  ];
  
  let currentQuestionIndex = 0;
  let points = 5;
  let currentTime = 60;
  
  const questionElement = document.getElementById('question');
  const answersContainer = document.getElementById('answers');
  const scoreDisplay = document.getElementById('points');
  const timerDisplay = document.getElementById('time');
  const resultPage = document.getElementById('result-page');
  const finalScore = document.getElementById('final-score');
  
  // Starta timer när sidan laddas
  const timer = setInterval(() => {
    currentTime--;
    timerDisplay.textContent = currentTime;
    if (currentTime === 0) {
      endQuiz();
    }
  }, 1000);
  
  // Funktion för att visa nästa fråga
  function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    questionElement.classList.add('masked');  // Maskera frågan från början
  
    // Rensa gamla svar och skapa nya knappar för aktuella alternativ
    answersContainer.innerHTML = '';
    currentQuestion.options.forEach(option => {
      const button = document.createElement('button');
      button.textContent = option;
      button.classList.add('answer');
      button.addEventListener('click', () => checkAnswer(option));
      answersContainer.appendChild(button);
    });
  }
  
  // Kontrollera om svaret är korrekt
  function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
  
    if (selectedOption === currentQuestion.correct) {
      // Om rätt svar -> gå till nästa fråga
      nextQuestion();
    } else {
      // Om fel svar -> minska poäng och avmaskera fråga
      points -= 2;  // -1 för avmaskning och -1 för fel svar
      unmaskQuestion();
      updateScore();
    }
  }
  
  // Avmaskera frågan
  function unmaskQuestion() {
    questionElement.classList.remove('masked');
    questionElement.classList.add('unmasked');
  }
  
  // Uppdatera poängvisningen
  function updateScore() {
    scoreDisplay.textContent = points;
  }
  
  // Visa nästa fråga eller avsluta quiz
  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();  // Visa nästa fråga
    } else {
      endQuiz();  // Om inga fler frågor -> avsluta quiz
    }
  }
  
  // Avsluta quiz och visa resultat
  function endQuiz() {
    clearInterval(timer);
    finalScore.textContent = `Du fick ${points} poäng!`;
    resultPage.classList.remove('hidden');
  }
  
  // Starta quiz vid sidladdning
  showQuestion();
   /* Hej Marrii Tack för hjälp*/