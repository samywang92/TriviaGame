$(document).ready(function () {//  Variable that will hold our setInterval that runs the stopwatch
    $(".trivia-container").toggle();


    var intervalId;

    // prevents the clock from being sped up unnecessarily
    var clockRunning = false;

    var timer = {
        time: 60,
        start: function () {
            if (!clockRunning) {
                intervalId = setInterval(timer.count, 1000);
                clockRunning = true;
            }
        },
        reset: function () {
            clearInterval(intervalId);
            clockRunning = false;
            timer.time = 60;
        },
        count: function () {
            timer.time--;
            $("#timer").text(`${timer.time} seconds left`);
            if (timer.time === 0) {
                game.playerIncorrect++;
                game.answer(false);
            }
        }

    }

    var game = {
        questionNum: 0,
        playerChoice: "",
        playerCorrect: 0,
        playerIncorrect: 0,
        trivia: [
            {
                question: "What is the first Pokemon in the Pokedex",
                answer1: "Charmander",
                answer2: "Squritle",
                answer3: "Bulbasaur",
                answer4: "Pikachu",
                correctAnswer: "Bulbasaur"
            },
            {
                question: "Which type are Fire type Pokemon not weak to?",
                answer1: "Water",
                answer2: "Electric",
                answer3: "Ground",
                answer4: "Rock",
                correctAnswer: "Electric"
            },
            {
                question: "Which Pokemon eventually evolves into Charizard?",
                answer1: "Charmon",
                answer2: "Agumon",
                answer3: "Agumander",
                answer4: "Charmander",
                correctAnswer: "Charmander"
            },
            {
                question: "What Pokemon did James buy on the S.S. Anne?",
                answer1: "Magikarp",
                answer2: "Krabby",
                answer3: "Goldeen",
                answer4: "Staryu",
                correctAnswer: "Magikarp"
            },
            {
                question: "Which move can Starmie not learn?",
                answer1: "Thunderbolt",
                answer2: "Dark Pulse",
                answer3: "Icebeam",
                answer4: "Rapid Spin",
                correctAnswer: "Dark Pulse"
            }
        ],
        initBoard: function (num) {
            $("#timer").html("60 seconds left");
            $("#question").html(game.trivia[num].question);
            $("#a1").html(game.trivia[num].answer1);
            $("#a2").html(game.trivia[num].answer2);
            $("#a3").html(game.trivia[num].answer3);
            $("#a4").html(game.trivia[num].answer4);

            $("#a1").attr("choice", game.trivia[num].answer1);
            $("#a2").attr("choice", game.trivia[num].answer2);
            $("#a3").attr("choice", game.trivia[num].answer3);
            $("#a4").attr("choice", game.trivia[num].answer4);
        },
        answer: function (isCorrect) {
            timer.reset();
            if (isCorrect) {
                $("#dialog").text(`Correct!!`);
            } else {
                $("#dialog").text(`Snooze you lose! ${game.trivia[game.questionNum].correctAnswer} was the right answer!`);
            }
            setTimeout(
                function () {
                    game.questionNum++;
                    if (game.questionNum < game.trivia.length) {
                        game.initBoard(game.questionNum);
                        timer.start();
                        $("#dialog").empty();
                    } else {
                        var correctData = $(`<p>Correct: ${game.playerCorrect} </p>`);
                        var incorrectData = $(`<p>Incorrect: ${game.playerIncorrect} </p>`);
                        $(".correct-data").append(correctData, incorrectData);
                        $(".trivia-container").toggle();
                        $("#start-button").toggle();
                        game.questionNum = 0;
                        console.log("its ovah");
                    }

                }, 2000);
        }

    }

    $("#start-button").on("click", function () {
        game.initBoard(0);
        timer.start();
        $("#start-button").toggle();
        $(".trivia-container").toggle();
        $(".correct-data").empty();
    });

    $("body").on("click", ".answer", function () {
        var isCorrect = true;
        game.playerChoice = $(this).attr("choice");
        if (game.playerChoice === game.trivia[game.questionNum].correctAnswer) {
            game.playerCorrect++;
        } else {
            isCorrect = false;
            game.playerIncorrect++;
        }
        console.log(`Correct: ${game.playerCorrect} | Incorrect: ${game.playerIncorrect}`);

        game.answer(isCorrect);
    });

});