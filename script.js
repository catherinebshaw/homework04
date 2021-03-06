var countdownTimer
var countdownValue
var questionNum

var questions = [
  { question: "What is the standard markup language for Web pages?",
    answers: [ "English", "French", "HTML" ],
    correct: "HTML"},
  { question: "Which of the following could NOT be a Boolean value?",
    answers: [ "Maybe", "True", "False" ],
    correct:  "Maybe"},
  { question: "In the CSS declaration 'color:blue', color is the property and what is the blue?",
    answers: [ "color", "value", "element" ],
    correct: "value"},
]

function showNextQuestion(){
  var question = questions[questionNum]
  var questionEl = document.querySelector('#questionBox')
  questionEl.innerHTML = `<div class="card-title"><h5>${question.question}</h5></div>`
  
  //loop through three questions//
  for( var i=0; i < question.answers.length; i++ ){
    var answer = question.answers[i]
    questionEl.innerHTML += `<button onClick="selectAnswer(event,'${answer}')" class="btn btn-secondary mx-2">${answer}</button>`
  }
}

function selectAnswer( event, answer ){
  event.preventDefault()
  var correct = questions[questionNum].correct
  console.log( `question answer id: ${answer}`)
  if( answer===questions[questionNum].correct ){
    console.log( `correct answer: ${answer}`);
    document.querySelector('#rightAnswer').innerHTML= `${correct} is the RIGHT ANSWER. Way to go!`
  } else {
    console.log(`incorrect answer, -10`);
    document.querySelector('#rightAnswer').innerHTML= `Sorry, ${correct} is the right answer. Drop 10 seconds`
      timerDecreaseAndDisplay(10);
  }
  questionNum++
  if( questionNum<questions.length )
    showNextQuestion()
}

function timerDecreaseAndDisplay( byValue=1 ){
  // decrease by the value passed in, or if nothing, by 1
  countdownValue -= byValue
  document.querySelector('#timer').textContent = countdownValue
  if( countdownValue<1 )
    finishQuiz()
}

function finishQuiz(event){
  if( event ) event.preventDefault()
  console.log( "finished" )
  clearInterval ( countdownTimer )
  saveScore()
}

document.getElementById("finishQuiz").addEventListener("click", finishQuiz)



//collect initials and high score from user to register score//
function saveScore(){
  var initials = prompt("please enter your initals for high score",);
  var score = prompt("Please enter the time on the timer", ); 

  //save in local storage//
  localStorage.setItem("initials", JSON.stringify(initials));
  localStorage.setItem("score", JSON.stringify(score));
  //populate highscore in table 
  document.querySelector("#initials").innerHTML = initials 
  document.querySelector("#score").innerHTML = score
  
}
 



//Start - click begin quiz 
//starts the timer AND
//starts the questions
function startQuiz(){
  questionNum = 0
  countdownValue = 60
  countdownTimer = setInterval( timerDecreaseAndDisplay, 1000 )
  showNextQuestion()   
}

document.getElementById("start").addEventListener("click", startQuiz);
