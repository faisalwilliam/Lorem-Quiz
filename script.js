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
      question: "Vilket land vann fotbolls-VM 2018?", 
      options: ["Sverige", "Frankrike", "Tysland", "Spanien"], 
      correct: "Frankrike" 
    },
    { 
      question: "Vilken kommunen är mindre?", 
      options: ["Lycksele", "Nordmaling", "Bjurholm", "Vännas"], 
      correct: "Bjurholm" 
    },
    { 
      question: "Vilken kommun lägar i Bästerbotton?", 
      options: ["Umeå", "Borlänge", "Boden", "Piteå"], 
      correct: "Umeå" 
    },

    { 
      question: "Vilken kontinent har flest länder?", 
      options: ["Asien", "Europa", "Africa","Nordamerika"], 
      correct: "Africa" 
    },

    { 
      question: "Vilket land har den största befolkningen?", 
      options: ["China", "Sudan", "Amerika", "India"], 
      correct: "China" 
    },
    { 
      question: "Vilket år kollapsade Sovjetunionen?", 
      options: ["1991", "1985", "1994", "1992"], 
      correct: "1991" 
    },
    { 
      question: "Hur många ben finns det i människokroppen?", 
      options: ["205", "100", "206", "1"], 
      correct: "206" 
    }
    
  ];

  let currentQuestionIndex = 0;
  let points = 5;
  let timeLeft = 60;
  let unmaskLevel = 0;
  let timerInterval;
  let firstAttempt = true;
  
  // Hämta DOM-element
  const questionElement = document.getElementById('question');
  const answersContainer = document.getElementById('answers');
  const scoreDisplay = document.getElementById('points');
  const timerDisplay = document.getElementById('time');
  const resultMessage = document.getElementById('result-message');
  const resultPage = document.getElementById('result-page');
  const finalScore = document.getElementById('final-score');
  
  // Startar quizet
  function startQuiz() {
    timeLeft = 60; // Återställ tid
    startTimer();  // Startar timer
    showQuestion(); // Visar första frågan
    updateScore();  // Uppdaterar poängvisning
  }
  
  // Visar aktuell fråga
  function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    unmaskLevel = 0; // Nollställ avmaskningsnivå
    firstAttempt = true; // Nollställ första försöket
    questionElement.className = 'masked'; // Maskera fråga
    answersContainer.innerHTML = ''; // Töm svarsknappar
  
    // Skapa och visa svarsknappar
    currentQuestion.options.forEach(option => {
      const button = document.createElement('button');
      button.textContent = option;
      button.classList.add('answer');
      button.addEventListener('click', () => handleAnswer(option));
      answersContainer.appendChild(button);
    });
  
    resultMessage.textContent = ''; // Rensa tidigare feedback
  }
  
  // Hanterar svarsklick
  function handleAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
  
    // Om svaret är korrekt
    if (selectedOption === currentQuestion.correct) {
      if (firstAttempt) points += 2;  // Lägg till poäng vid första försöket
      showFeedback(true, "+2 poäng"); 
    } else {
      if (firstAttempt) points -= 2;  // Ta bort poäng vid första fel
      firstAttempt = false;
      unmaskQuestion(); // Avmaskera frågan gradvis
      showFeedback(false, "-2 poäng");
    }
  
    updateScore(); // Uppdatera poäng
  
    // Avsluta quiz om poäng är mindre än 0
    if (points < 0) {
      endQuiz();
    } else {
      // Gå vidare till nästa fråga efter 1 sekund
      setTimeout(nextQuestion, 1000);
    }
  }
  
  // Visar feedback med färg och text
  function showFeedback(isCorrect, pointsText) {
    resultMessage.textContent = isCorrect ? `Rätt! ${pointsText}` : `Fel! ${pointsText}`;
    resultMessage.style.color = isCorrect ? "green" : "red";
    resultMessage.classList.remove('hidden');
  }
  
  // Avmaskerar fråga stegvis
  function unmaskQuestion() {
    unmaskLevel++;
    if (unmaskLevel === 1) {
      questionElement.classList.add('unmask-1'); // Första avmaskningsnivå
    } else if (unmaskLevel === 2) {
      questionElement.classList.add('unmask-2'); // Full avmaskning
    }
  }
  
  // Uppdaterar poängdisplay
  function updateScore() {
    scoreDisplay.textContent = points;
  }
  
  // Går vidare till nästa fråga eller avslutar quizet
  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion(); // Visa nästa fråga
    } else {
      endQuiz(); // Avsluta quiz om inga fler frågor finns
    }
  }
  
  // Startar timer
  function startTimer() {
    clearInterval(timerInterval); // Rensa tidigare timer
    timerInterval = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = timeLeft;
  
      // Ändra färg när tiden är låg
      if (timeLeft <= 12) {
        timerDisplay.classList.add('low-time');
      }
  
      // Avsluta quiz om tiden tar slut
      if (timeLeft === 0) {
        endQuiz();
      }
    }, 1000);
  }
  
  // Avslutar quiz och visar resultat
  function endQuiz() {
    clearInterval(timerInterval); // Stoppa timer
    finalScore.textContent = `Du fick ${points} poäng!`; // Visa slutpoäng
    resultPage.classList.remove('hidden'); // Visa resultatsidan
  
    // Inaktivera svarsknappar
    const answerz = document.querySelectorAll('.answer');
    answerz.forEach((button) => {
      button.classList.add('disabled');
      button.disabled = true;
    });
  }
  
  // Startar quiz när sidan laddas
  startQuiz();
  