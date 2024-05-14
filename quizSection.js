//a list of questions
const questions = [
    {
        question: "How many variables can I make?" ,
        answers: [
            {text: "Only 1", correct: false}, 
            {text: "Less than 3", correct: false}, 
            {text: "Less than 10", correct: false}, 
            {text: "As many as you want", correct: true}, 
        ]
    },
    {
        question: "What are variables used for in EV3 robotics?" ,
        answers: [
            {text: "Variables store important information for the robot", correct: true}, 
            {text: "Variables are used to build physical structures", correct: false}, 
            {text: "Variables provide power to the robot motors", correct: false}, 
            {text: "Variables make the robot move slower", correct: false}, 
        ]
    },
    {
        question: "What is the purpose of giving names to variables?" ,
        answers: [
            {text: "To confuse the programmer", correct: false}, 
            {text: "To make the program look pretty", correct: false}, 
            {text: "To help the robot remember what's inside the variable", correct: true}, 
            {text: "To make the variable disappear", correct: false}, 
        ]
    },
    {
        question: "How can variables help a robot make decisions?" ,
        answers: [
            {text: "By controlling the robot's movements", correct: false}, 
            {text: "By making the robot think", correct: false}, 
            {text: "By storing information that the robot can use to decide what to do", correct: true}, 
            {text: "By talking to other robots", correct: false}, 
        ]
    },
    {
        question: "Which of the following is an example of a variable?" ,
        answers: [
            {text: "Brick", correct: false}, 
            {text: "Sensor", correct: false}, 
            {text: "Motor", correct: false}, 
            {text: "Speed", correct: true}, 
        ]
    },
    {
        question: "If a variable 'distance' stores the value 20, what does this mean?" ,
        answers: [
            {text: "The robot has moved 20 steps", correct: false}, 
            {text: "The robot is 20 centimeters tall", correct: false}, 
            {text: "The robot's speed is 20", correct: false}, 
            {text: "The robot is 20 centimeters away from an object", correct: true}, 
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons"); //This is the damn problem why i got stuck: answerElement instead of answerButton.
const nextButton = document.getElementById("next-button");

// To keep track of the scores and start the questions
let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0; //when start the quiz, the question 1
    score = 0;
    nextButton.innerHTML = 'Next'; //display teh next button once you select an asnwer
    showQuestion(); //calling the next question.
}

function showQuestion(){
    resetState();

    //display  the questions:
    let currentQuestion = questions[currentQuestionIndex]; //keep track of the questions: begin with question 1 and continue.
    
    let questionNumber = currentQuestionIndex + 1; //next question, computer will know that the 1st question it's answered

    questionElement.innerHTML = questionNumber + ". " + currentQuestion.question; //replace the text in the HTML to the texts from the list.


    //displat the multiple questions asnwer texts
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button"); //in the button:....
        button.innerHTML = answer.text; //get into the list: the answer element
        button.classList.add("btn");
        answerButton.appendChild(button); //Thios is to append a child element to an existing parent element
        
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

}

function resetState(){ //this function it's to remove the asnwers 1 answer 2 ... from the html
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){ //the amount of questions I have.
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();
