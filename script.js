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
      question: "Villken kommunen är mindre?", 
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
      options: ["191", "185", "194", "192"], 
      correct: "191" 
    },
    { 
      question: "Hur många ben finns det i människokroppen?", 
      options: ["205", "100", "206", "1"], 
      correct: "206" 
    }
    
  ];

  let currentQuestionIndex = 0;
  let points = 5; // Startpoäng
  let timeLeft = 60; // Tid kvar i sekunder
  let unmaskLevel = 0; // Spårar hur mycket frågan har avmaskerats
  let timerInterval; // Sparar intervallet för timer
  let firstAttempt = true; // Flagga för att spåra om det är första försöket
  
  // Hämta element från DOM
  const questionElement = document.getElementById('question');
  const answersContainer = document.getElementById('answers');
  const scoreDisplay = document.getElementById('points');
  const timerDisplay = document.getElementById('time');
  const resultPage = document.getElementById('result-page');
  const finalScore = document.getElementById('final-score');
  
  // Startar quizet
  function startQuiz() {
    showQuestion(); // Visa första frågan
    startTimer(); // Starta timer
    updateScore(); // Uppdatera poäng direkt vid start
  }
  
  // Visar aktuell fråga och svarsalternativ
  function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question; // Sätter texten för frågan
    unmaskLevel = 0; // Nollställer avmaskeringsnivån
    firstAttempt = true; // Återställer flaggan för första försöket
    questionElement.className = 'masked'; // Återställ stil
  
    answersContainer.innerHTML = ''; // Rensar tidigare svarsalternativ
  
    // Skapar knappar för varje svarsalternativ
    currentQuestion.options.forEach(option => {
      const button = document.createElement('button');
      button.textContent = option;
      button.classList.add('answer');
      button.addEventListener('click', () => checkAnswer(option)); // Lägg till klickhändelse
      answersContainer.appendChild(button);
    });
  }
  
  // Kontrollera om svaret är korrekt
  function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
  
    if (selectedOption === currentQuestion.correct) {
      if (firstAttempt) {
        points += Math.floor(timeLeft / 10); // Bonuspoäng för snabb svar vid första försöket
      }
      updateScore(); // Uppdaterar poäng
      nextQuestion(); // Går till nästa fråga
    } else {
      if (firstAttempt) {
        points -= 2; // Straff (-1 för avmaskering och -1 för fel) vid första försöket
      } else {
        points = points; // Poängen förändras inte efter första försöket
      }
      firstAttempt = false; // Ändrar flaggan för att visa att första försöket har passerat
      unmaskQuestion(); // Avmaskerar lite mer av frågan
      updateScore(); // Uppdaterar poäng
    }
  }
    function handleAnswerClick(event) {
      const selectedAnswer = event.target;
      const answerValue = parseInt(selectedAnswer.dataset.answer);
      // Byt ut "red" och "green" mot dina egna färger
      if (answerValue === -1) {
        selectedAnswer.style.color = "red"; 
      } else if (answerValue === +1) {
        selectedAnswer.style.color = "green"; 
      }
    }
    


  
  
  // Avmaskerar frågan steg för steg
  function unmaskQuestion() {
    unmaskLevel++; // Ökar avmaskeringsnivån
    if (unmaskLevel === 1) {
      questionElement.classList.add('unmask-1'); // Första avmaskeringsnivån
    } else if (unmaskLevel === 2) {
      questionElement.classList.add('unmask-2'); // Full avmaskering
    }
  }
  
  // Uppdaterar poäng på sidan
  function updateScore() {
    scoreDisplay.textContent = points; // Sätter poängen i DOM
  }
  
  // Går vidare till nästa fråga eller avslutar quizet
  function nextQuestion() {
    currentQuestionIndex++; // Ökar frågeindex
    if (currentQuestionIndex < questions.length) {
      showQuestion(); // Visar nästa fråga
    } else {
      endQuiz(); // Avslutar quizet
    }
  }
  
  // Startar timer och räknar ned
  function startTimer() {
    timerInterval = setInterval(() => {
      timeLeft--; // Minskar tiden med 1 sekund
      timerDisplay.textContent = timeLeft; // Uppdaterar tidsvisning
  
      if (timeLeft <= 12) {
        timerDisplay.classList.add('low-time'); // Ändrar färg om mindre än 20% återstår
      }
  
      if (timeLeft === 0) {
        clearInterval(timerInterval); // Stoppar timern
        nextQuestion(); // Går vidare om tiden tar slut
      }
    }, 1000);
  }
  
  // Avslutar quizet och visar resultatet
  function endQuiz() {
    clearInterval(timerInterval); // Stoppar timern
    finalScore.textContent = `Du fick ${points} poäng!`; // Visar slutpoängen
    resultPage.classList.remove('hidden'); // Visar resultatsidan
  }
  
  // Starta quiz när sidan laddas
  showQuestion();
   /* Hej Marrii Tack för hjälp*/
   function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.correct) {
      points += 2; // Ge 2 poäng för rätt svar
      nextQuestion(); // Gå till nästa fråga
      
    } else {
      points -= 2; // Ta bort 2 poäng för fel svar
      unmaskQuestion(); // Avmaskera frågan lite mer
      updateScore();
    }
 
   }

  function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.correct) {
      points += 2; // Award 2 points for a correct answer
      nextQuestion(); // Go to the next question
     
    } else {
      points -= 2; // Deduct 2 points for a wrong answer
      unmaskQuestion(); // Unmask the question slightly more
      updateScore();
     
    }
    // Show the "Rättresult-page" after checking the answer 
    if (selectedOption === currentQuestion.correct) {
      document.getElementById('result-page').innerHTML = '<p>Du har svarat rätt!</p>';
      document.getElementById('result-page').classList.remove('hidden');
    } else {
      document.getElementById('result-page').innerHTML = '<p>Du har svarat fel!</p>';
      document.getElementById('result-page').classList.remove('hidden');
    }
  }
  

// Function to handle answer clicks
function handleAnswerClick(event) {
  const selectedAnswer = event.target;
  const answerValue = parseInt(selectedAnswer.dataset.answer);

  if (answerValue === -1) {
    selectedAnswer.style.color = "red"; 
  } else if (answerValue === +1) {
    selectedAnswer.style.color = "green";                 
  }
    
  // Now call checkAnswer to evaluate the selected option
  checkAnswer(selectedAnswer.textContent);

  let totalPoints = 10;
  // Loopa igenom alla frågor och addera poängen
  for (let i = 0; i < questions.length; i++) {
    totalPoints += questions[i].points;
  }
  console.log("Total poäng:", totalPoints);


}
// Function to check the answer
function checkAnswer(selectedOption) {
  const currentQuestion = questions[currentQuestionIndex];
  
  if (selectedOption === currentQuestion.correct) {
    points += 2; // Award 2 points for a correct answer
    nextQuestion(); // Go to the next question
   
  } else {
    points -= 2; // Deduct 2 points for a wrong answer
    unmaskQuestion(); // Unmask the question slightly more
    updateScore();
   
  }
    
}
  

// Function to check the answer
function checkAnswer(selectedOption) {
  const currentQuestion = questions[currentQuestionIndex];
  if (selectedOption === currentQuestion.correct) {
    points += 2; // Award 2 points for a correct answer
    nextQuestion(); // Go to the next question
    
  } else {
    points -= 2; // Deduct 2 points for a wrong answer
    unmaskQuestion(); // Unmask the question slightly more
    updateScore();
    
  }
                                                                                                                         
}
  // Avmaskera fråga gradvis
  function unmaskQuestion() {
    unmaskLevel++;
    if (unmaskLevel === 1) {
      questionElement.classList.add("unmask-1");
    } else if (unmaskLevel === 2) {
      questionElement.classList.add("unmask-2");
    }
  }
  // Uppdatera poängdisplayen
  function updateScore() {
    scoreDisplay.textContent = points;
  }
  // Visa nästa fråga eller avsluta quizet
  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      endQuiz();
    }
  }
  // Avsluta quizet och visa resultatet
  function endQuiz() {
    clearInterval(timer); // Stoppar timern
    finalScore.textContent = `Du fick ${points} poäng!`;
    resultPage.classList.remove("hidden"); // Visar resultat-sidan
  }
  // Starta quizet när sidan laddas
  showQuestion();


  // Färghantering för svar (detta är nu separat)
  const answers = document.querySelectorAll(".answers");
    answers.forEach((answer) => {
    answers.addEventListener("click", handleAnswerClick);
  });
  
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
     
  
    
    

  