/* JavaScript for the Trivia Game.
This script is loaded by the index.html file
and will display questions and possible answers
that users can select from. The game will display
a new random question when the user clicks a radio
button to choose an answer and keep track of the
user's score. */

// Array of trivia questions
import { triviaQuestions } from "../data/triviaQuestions.js";

// Example usage of triviaQuestions
console.log(triviaQuestions);

let currentQuestionIndex = 0;
let score = 0;

function updateNavigationButtons() {
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');

    prevButton.disabled = currentQuestionIndex === 0;
    nextButton.disabled = currentQuestionIndex === triviaQuestions.length - 1;

    prevButton.classList.toggle('disabled', currentQuestionIndex === 0);
    nextButton.classList.toggle('disabled', currentQuestionIndex === triviaQuestions.length - 1);
}

function displayQuestion() {
    const questionContainer = document.getElementById('question');
    const answersForm = document.getElementById('answers-form');
    
    // Clear previous answers
    answersForm.innerHTML = '';

    // Get current question
    const currentQuestion = triviaQuestions[currentQuestionIndex];

    // Display question
    questionContainer.textContent = currentQuestion.question;

    // Display answers
    currentQuestion.answers.forEach((answer, index) => {
        const label = document.createElement('label');
        label.className = 'neon-button';
        label.innerHTML = `<input type="radio" name="answer" class="answer" value="${index}"> ${answer}`;
        answersForm.appendChild(label);
    });

    updateNavigationButtons();
}

function handleAnswerSelection(event) {
    if (event.target.name === 'answer') {
        const selectedAnswerIndex = parseInt(event.target.value);
        const currentQuestion = triviaQuestions[currentQuestionIndex];
        const isCorrect = selectedAnswerIndex === currentQuestion.correctAnswer;

        if (isCorrect) {
            score++;
        }

        currentQuestionIndex++;
        if (currentQuestionIndex < triviaQuestions.length) {
            displayQuestion();
        } else {
            displayResult();
        }
    }
}

function displayResult() {
    const questionContainer = document.getElementById('question');
    const answersForm = document.getElementById('answers-form');
    const newGameButton = document.getElementById('new-game-button');
    
    questionContainer.textContent = `You scored ${score} out of ${triviaQuestions.length}!`;
    answersForm.innerHTML = '';

    triviaQuestions.forEach((question, index) => {
        const questionElement = document.createElement('p');
        questionElement.textContent = question.question;
        questionElement.className = 'neon-text';

        const answerElement = document.createElement('p');
        const correctAnswer = question.answers[question.correctAnswer];
        answerElement.textContent = `Correct Answer: ${correctAnswer}`;
        answerElement.className = 'correct';

        answersForm.appendChild(questionElement);
        answersForm.appendChild(answerElement);
    });

    newGameButton.style.display = 'inline-block';
    alert('You have completed the trivia!');
}

function handleNavigation(event) {
    if (event.target.id === 'next-button' && currentQuestionIndex < triviaQuestions.length - 1) {
        currentQuestionIndex++;
    } else if (event.target.id === 'prev-button' && currentQuestionIndex > 0) {
        currentQuestionIndex--;
    }
    displayQuestion();
}

function startNewGame() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('new-game-button').style.display = 'none';
    displayQuestion();
}

// Initialize the game
document.addEventListener('DOMContentLoaded', () => {
    displayQuestion();
    document.getElementById('answers-form').addEventListener('change', handleAnswerSelection);
    document.getElementById('next-button').addEventListener('click', handleNavigation);
    document.getElementById('prev-button').addEventListener('click', handleNavigation);
    document.getElementById('new-game-button').addEventListener('click', startNewGame);
});