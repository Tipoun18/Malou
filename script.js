console.log("Le script est bien chargé !");

const questions = [
    {
        title: "Vie personnelle (10 questions)",
        question: "Quelle est la destination que tu rêves de visiter depuis toujours ?",
        answers: [
            { text: "Bernes sur Oise", correct: true },
            { text: "Chambly", correct: false },
            { text: "Miami", correct: false }
        ]
    },
    {
        title: "Musique des années 90/2000",
        question: "Quel duo mythique a chanté The Boy is Mine en 1998 ?",
        answers: [
            { text: "Bob l'éponge", correct: false },
            { text: "Brandy & Monica", correct: true },
            { text: "En sah le poulet c bon", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

const titleElement = document.getElementById("titre");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
const scoreDisplay = document.getElementById("score");

function showPage() {
    document.getElementById("hiddenPage").style.display = "flex";
    document.getElementById("showed").style.display = "none";
    startQuiz();  // Démarre le quiz après avoir montré la page cachée
}

function startQuiz() {
    currentQuestionIndex = 0; // Réinitialisation de l'indice de la question
    score = 0; // Réinitialisation du score

    nextButton.innerText = "Suivant"; // On remet le bouton à "Suivant"
    nextButton.style.display = "none"; // On cache le bouton au début

    scoreDisplay.innerText = ""; // Réinitialise l'affichage du score
    showQuestion(); // Affiche la première question
}

function showQuestion() {
    resetState(); // Réinitialiser l'état à chaque nouvelle question
    let currentQuestion = questions[currentQuestionIndex];

    // Mise à jour du titre et de la question
    titleElement.innerText = currentQuestion.title;
    questionElement.innerText = currentQuestion.question;

    // Ajout des boutons de réponse dynamiquement
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("answer");
        button.addEventListener("click", () => selectAnswer(answer.correct));
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none"; // Cache le bouton "Suivant" avant de sélectionner une réponse
    answerButtons.innerHTML = ""; // Réinitialise les boutons de réponses
}

function selectAnswer(correct) {
    document.querySelectorAll(".answer").forEach(button => {
        button.classList.remove("selected");
    });

    const selectedButton = event.target;
    selectedButton.classList.add("selected");

    if (correct) {
        score++;
    }

    nextButton.style.display = "block"; // Affiche le bouton "Suivant"
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++; // Passe à la question suivante
    if (currentQuestionIndex < questions.length) {
        showQuestion(); // Affiche la question suivante
    } else {
        showScore(); // Affiche le score une fois toutes les questions répondues
    }
});

function showScore() {
    questionElement.innerText = "Quiz terminé !";
    answerButtons.innerHTML = "";
    scoreDisplay.innerText = `Score : ${score} / ${questions.length}`;

    // Remplacer le texte du bouton par "Aller à la page suivante"
    nextButton.innerText = "click stp";
    nextButton.style.display = "block";

    // Ajoute l'événement pour la redirection vers une nouvelle page
    nextButton.onclick = function() {
        // Rediriger vers une autre page (par exemple "page_suivante.html")
        window.location.href = "page_suivante.html";  // Remplace par l'URL de la page vers laquelle tu veux rediriger
    };
}

