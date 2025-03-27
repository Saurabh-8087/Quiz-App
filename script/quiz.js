import { questions } from "./question.js";

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
      optionsContainer.appendChild(optionElement);
    });

    document.getElementById('current-question-number').textContent = this.currentQuestionIndex + 1;
  }

  handleAnswerSelection(selectedOption, selectedElement) {
    const currentQuestion = this.questions[this.currentQuestionIndex];

    // If the user already selected an option, remove the 'selected' class
    const previousSelectedOption = document.querySelector('.option.selected');
    if (previousSelectedOption) {
      previousSelectedOption.classList.remove('selected');
    }

    // Add the 'selected' class to the newly selected option
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

  displayResults() {
    document.getElementById('question-container').classList.add('hidden');
    document.getElementById('question-progress').classList.add('hidden');
    document.getElementById('next-button').classList.add('hidden');
    document.getElementById('result-container').classList.remove('hidden');

    // Calculate score (correct answers count)
    this.questions.forEach(question => {
      if (question.checkAnswer()) {
        this.score++;
      }
    });

    // Show score as "X out of Y"
    document.getElementById('score').textContent = `${this.score} out of ${this.totalQuestions}`;
    
    // Show answers with their respective colors at the end of the quiz
    const resultContainer = document.getElementById('answer-summary');
    resultContainer.innerHTML = ''; // Clear any previous content
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
  }

  startQuiz() {
    document.getElementById('total-questions').textContent = this.totalQuestions;
    this.loadQuestion();
  }
}

// Initialize the Quiz class and start the quiz
const quiz = new Quiz(questions);
quiz.startQuiz();

document.getElementById('next-button').addEventListener('click', () =>{
    quiz.nextQuestion();
});
