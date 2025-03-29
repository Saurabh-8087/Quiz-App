import {Question} from "./question.js";


 const questions = [
  new Question("What does `var` mean in JavaScript?", ["Variable", "Value", "Function", "None of the above"], "Variable"),
  new Question("Which of the following is used to define a function in JavaScript?", ["def", "function", "func", "define"], "function"),
  new Question("What is the output of `typeof null` in JavaScript?", ["null", "object", "undefined", "NaN"], "object"),
  new Question("Which method is used to convert a string to an integer in JavaScript?", ["parseInt()", "parseString()", "int()", "toString()"], "parseInt()"),
  new Question("What will the following code log to the console: `console.log(1 + '1')`?", ["'11'", "2", "11", "Error"], "'11'"),
  new Question("What is the correct syntax to create an object in JavaScript?", ["let obj = {}", "let obj = []", "let obj = ()", "let obj = ''"], "let obj = {}"),
  new Question("Which of the following is NOT a JavaScript data type?", ["String", "Boolean", "Object", "Float"], "Float"),
  new Question("How do you write a comment in JavaScript?", ["# This is a comment", "// This is a comment", "<!-- This is a comment -->", "/* This is a comment */"], "// This is a comment"),
  new Question("What is the value of `x` after the following code: `let x = 10; x += 5;`?", ["5", "15", "10", "None of the above"], "15"),
  new Question("Which operator is used to compare both value and type in JavaScript?", ["==", "===", "=", "!="], "===")
];

class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.totalQuestions = questions.length;
  }

  loadQuestion() {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    document.getElementById('question-text').textContent = currentQuestion.questionText;
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    currentQuestion.options.forEach((option, index) => {
      const optionElement = document.createElement('div');
      optionElement.classList.add('option');
      optionElement.textContent = option;
      optionElement.onclick = () => this.handleAnswerSelection(option, optionElement);


      if(currentQuestion.selectedAnswer === option){
        optionElement.classList.add('selected');
      }

      optionsContainer.appendChild(optionElement);
    });

    document.getElementById('current-question-number').textContent = this.currentQuestionIndex + 1;
  }



  handleAnswerSelection(selectedOption, selectedElement) {
    const currentQuestion = this.questions[this.currentQuestionIndex];

    const previousSelectedOption = document.querySelector('.option.selected');
    if (previousSelectedOption) {
      previousSelectedOption.classList.remove('selected');
    }

    selectedElement.classList.add('selected');
    currentQuestion.selectedAnswer = selectedOption;

  
    
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.totalQuestions - 1) {
      this.currentQuestionIndex++;
      this.loadQuestion();
    } else {
      this.displayResults();
    }
  }
  previousQuestion() {
    
    if (this.currentQuestionIndex < this.totalQuestions - 1) {
      this.currentQuestionIndex--;
      this.loadQuestion();
    } else {
      this.displayResults();
    }
  }


  displayResults() {
    document.getElementById('question-container').classList.add('hidden');
    document.getElementById('question-progress').classList.add('hidden');
    document.getElementById('next-button').classList.add('hidden');
    document.getElementById('previous-button').classList.add('hidden');
    document.getElementById('result-container').classList.remove('hidden');

   
    this.questions.forEach(question => {
      if (question.checkAnswer()) {
        this.score++;
      }
    });

    
    document.getElementById('score').textContent = `${this.score} out of ${this.totalQuestions}`;
    
  
    const resultContainer = document.getElementById('answer-summary');
    resultContainer.innerHTML = ''; 
    this.questions.forEach((question, index) => {
      const questionResult = document.createElement('div');
      questionResult.classList.add('question-result');
      questionResult.innerHTML = `
          <strong>Question ${index + 1}: ${question.questionText}</strong><br>
          Your answer: <span class="${question.checkAnswer() ? 'correct' : 'incorrect'}">${question.selectedAnswer}</span><br>
          Correct answer: <span class="correct">${question.correctAnswer}</span><br><br>
      `;
      resultContainer.appendChild(questionResult);
    });

    document.getElementById('restart-button').classList.remove('hidden');
  }

  startQuiz() {
    document.getElementById('total-questions').textContent = this.totalQuestions;
    this.loadQuestion();
  }

  restartQuiz() {

    location.reload();
    
    this.loadQuestion();
  }
}


const quiz = new Quiz(questions);
quiz.startQuiz();

document.getElementById('next-button').addEventListener('click', () =>{
    quiz.nextQuestion();
});

document.getElementById('previous-button').addEventListener('click', () =>{
  quiz.previousQuestion();
});

document.getElementById('restart-button').addEventListener('click', () =>{
  quiz.restartQuiz();
});
