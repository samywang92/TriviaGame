
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
            answer3: "Bublasaur",
            answer4: "Pikachu",
            correctAnswer: "Bulbasaur"
        },
        {
            question: "",
            answer1: "",
            answer2: "",
            answer3: "",
            answer4: "",
            correctAnswer: ""
        },
        {
            question: "",
            answer1: "",
            answer2: "",
            answer3: "",
            answer4: "",
            correctAnswer: ""
        },
        {
            question: "",
            answer1: "",
            answer2: "",
            answer3: "",
            answer4: "",
            correctAnswer: ""
        },
        {
            question: "",
            answer1: "",
            answer2: "",
            answer3: "",
            answer4: "",
            correctAnswer: ""
        }
    ],
    initBoard: function(num){
        $("#timer").html("59 seconds left");
        $("#question").html(game.trivia[num].question);
        $("#a1").html(game.trivia[num].answer1);
        $("#a2").html(game.trivia[num].answer2);
        $("#a3").html(game.trivia[num].answer3);
        $("#a4").html(game.trivia[num].answer4);

        $("#a1").attr("choice",game.trivia[num].answer1);
        $("#a2").attr("choice",game.trivia[num].answer2);
        $("#a3").attr("choice",game.trivia[num].answer3);
        $("#a4").attr("choice",game.trivia[num].answer4);
    },
    
}


$(document).ready(function () {
    

});

$("#start-button").on("click", function () {
    game.initBoard(0);
});

$("body").on("click", ".answer" ,function () {
    game.playerChoice = $(this).attr("choice");
    var correctAnswer = game.trivia[game.questionNum].correctAnswer;
    console.log("selected: "+game.playerChoice);
    console.log("correct: "+game.trivia[game.questionNum].correctAnswer);
    if(game.playerChoice === correctAnswer){
        game.playerCorrect ++;
    } else {
        game.playerIncorrect ++;
    }
    console.log(`Correct: ${game.playerCorrect} | Incorrect: ${game.playerIncorrect}`);
    game.questionNum++;
    game.initBoard(game.questionNum);
});