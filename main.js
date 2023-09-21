
//Get and initialize data
let currentQustionIndex = 0;
let score = 0;
let questions = [];
const apiUrl = 'https://opentdb.com/api.php?amount=15&category=25&type=multiple';

function fetchData() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            questions = data.results;
            showQuestion();
        });
};

function checkAnswer(selectedAnswer) {
    const currentQuestion = questions[currentQustionIndex];
    const resultElement = document.getElementById('result');

    if (selectedAnswer === currentQuestion.correct_answer) {
        resultElement.innerText = 'Correct!';
        resultElement.style.backgroundColor = 'green';
        score++;
    } else {
        resultElement.innerText = 'Wrong:('
        resultElement.style.backgroundColor = 'red';
    }

    document.getElementById('next-btn').style.display = 'block';

    const answerBtn = document.querySelectorAll('.answer-btn');
    answerBtn.forEach(button => button.disabled = true);
};

function endQuiz() {
    const questionDisplay = document.getElementById('question');
    const answerBtn = document.querySelectorAll('.answer-btn');
    const resultElement = document.getElementById('result');
    const nextBtn = document.getElementById('next-btn');

    questionDisplay.innerText = 'Completed! Your socore is' + score;
    answerBtn.forEach(button => button.style.display = 'none');
    resultElement.style.display = 'none';
    nextBtn.style.display = 'none';
};

function showQuestion() {
    if (currentQustionIndex < questions.length) {
        const currentQuestion = questions[currentQustionIndex];
        const questionDisplay = document.getElementById('question');
        const answerBtn = document.querySelectorAll('.answer-btn');

        questionDisplay.innerText = currentQuestion.question;

        const answers = [...currentQuestion.incorrect_answers];
        answers.splice(Math.floor(Math.random() * 4), 0, currentQuestion.correct_answer);

        answerBtn.forEach((button, index) => {
            button.innerText = answers[index];
            button.addEventListener('click', () => checkAnswer(button.innerText));
        });

        document.getElementById('next-btn').style.display = 'none';
    } else {
        endQuiz();
    }
}

document.getElementById('next-btn').addEventListener('click', () => {
    currentQustionIndex++;
    showQuestion();
});

fetchData();


