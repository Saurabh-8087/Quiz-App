export class Question {
  constructor(questionText, options, correctAnswer) {
    this.questionText = questionText;
    this.options = options;
    this.correctAnswer = correctAnswer;
    this.selectedAnswer = null; 
  }

  checkAnswer() {
    return this.selectedAnswer === this.correctAnswer;
  }
}
