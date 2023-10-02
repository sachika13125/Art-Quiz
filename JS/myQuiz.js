$(document).ready(function() {
    console.log('Hello')

    let currentQuestion = 0;
    let score = 0;

    function displayQuestion(questionIndex) {
        $.ajax({
            url: '../data/quiz.json',
            dataType: 'json',
            success: function(data) {
                let quizData = data.questions;
                $('#question').text(quizData[questionIndex].question);

                let optionsList = $('#answer');
                optionsList.empty();

                quizData[questionIndex].options.forEach(function(option) {
                    let li = $('<li></li>');
                    li.text(option);
                    li.click(checkAnswer);
                    optionsList.append(li);
                });
            },
            error: function() {
                $('#question').text('Error');
                $('#answer').empty();
            }
        });
    }

    function checkAnswer() {
        let selectedOption = $('this').text();
        if(selectedOption === quizData[currentQuestion].answer) {
            score++;
        }

        currentQuestion++;

        if(currentQuestion < quizData.length) {
            displayQuestion(currentQuestion);
        } else {
            showResult();
        }
    }

    function showResult() {
        $('#question').text('Completed!');
        $('#answer').empty();
        $('#result').text('Your score is ' + score + '/' + quizData.length);
        $('#next-btn').hide();
    }

    displayQuestion(currentQuestion);

    $('#next-btn').click(function() {
        if(currentQuestion < quizData.length) {
            displayQuestion(currentQuestion);
        } else {
            showResult();
        }
    });



});