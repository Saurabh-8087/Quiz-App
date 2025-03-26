function checkAnswer() {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');
  if (!selectedAnswer) {
      alert("Please select an answer.");
      return;
  }

  const correctAnswer = "Paris";  // Correct answer for this question

  if (selectedAnswer.value === correctAnswer) {
      alert("Correct answer!");
  } else {
      alert("Incorrect answer. The correct answer is " + correctAnswer);
  }
}