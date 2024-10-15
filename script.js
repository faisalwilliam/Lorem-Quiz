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
    },
    { 
        question: "Vad heter Sveriges längsta flod?", 
        options: ["Klarälven", "Göta älv", "Dalälven", "Torne älv"], 
        correct: "Klarälven" 
      },
      { 
        question: "Vilken planet är närmast solen?", 
        options: ["Merkurius", "Venus", "Jorden", "Mars"], 
        correct: "Merkurius" 
      },
      { 
        question: "Vilken metall är huvudingrediensen i stål?", 
        options: ["Järn", "Koppar", "Aluminium", "Silver"], 
        correct: "Järn" 
      },
      { 
        question: "Vilket hav ligger mellan Sverige och Finland?", 
        options: ["Östersjön", "Nordsjön", "Atlanten", "Medelhavet"], 
        correct: "Östersjön" 
      },
      { 
        question: "Vilken stad är känd för sitt lutande torn?", 
        options: ["Pisa", "Rom", "Paris", "Venedig"], 
        correct: "Pisa" 
      },
      { 
        question: "Vad heter den högsta bergstoppen i världen?", 
        options: ["Mount Everest", "K2", "Kilimanjaro", "Mont Blanc"], 
        correct: "Mount Everest" 
      },
      { 
        question: "Vilken gas utgör största delen av jordens atmosfär?", 
        options: ["Kväve", "Syre", "Koldioxid", "Argon"], 
        correct: "Kväve" 
      }
  ];
  
  let currentQuestionIndex = 0;
  let points = 10;
  let currentTime = 60;
  let unmaskLevel = 0;  // Spårar avmaskningsnivån
  
  const questionElement = document.getElementById('question');
  const answersContainer = document.getElementById('answers');
  const scoreDisplay = document.getElementById('points');
  const timerDisplay = document.getElementById('time');
  const resultPage = document.getElementById('result-page');
  const finalScore = document.getElementById('final-score');
  
  // Starta timer
  const timer = setInterval(() => {
    currentTime--;
    timerDisplay.textContent = currentTime;
    if (currentTime === 0) {
      endQuiz();
    }
  }, 1000);
  
  // Visa fråga och svarsalternativ
  function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
  
    // Återställ avmaskningsnivå och stil för varje ny fråga
    unmaskLevel = 0;
    questionElement.className = '';
  
    answersContainer.innerHTML = '';
    currentQuestion.options.forEach(option => {
      const button = document.createElement('button');
      button.textContent = option;
      button.classList.add('answer');
      button.addEventListener('click', () => checkAnswer(option));
      answersContainer.appendChild(button);
    });
  }
  
  // Kontrollera svar
  function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
  
    if (selectedOption === currentQuestion.correct) {
      nextQuestion();  // Om rätt svar, gå till nästa fråga
    } else {
      points -= 2;  // -1 för avmaskning, -1 för fel svar
      unmaskQuestion();  // Avmaskera fråga lite mer
      updateScore();
    }
  }
  
  // Avmaskera fråga gradvis
  function unmaskQuestion() {
    unmaskLevel++;
    if (unmaskLevel === 1) {
      questionElement.classList.add('unmask-1');
    } else if (unmaskLevel === 2) {
      questionElement.classList.add('unmask-2');
    }
  }
  
  // Uppdatera poäng
  function updateScore() {
    scoreDisplay.textContent = points;
  }
  
  // Visa nästa fråga eller avsluta quiz
  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      endQuiz();
    }
  }
  
  // Avsluta quiz och visa resultat
  function endQuiz() {
    clearInterval(timer);
    finalScore.textContent = `Du fick ${points} poäng!`;
    resultPage.classList.remove('hidden');
  }
  
  // Starta quiz när sidan laddas
  showQuestion();
   /* Hej Marrii Tack för hjälp*/