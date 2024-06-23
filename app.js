
// Nom de l'API : countryapi.io

// S'enregistrer sur countryapi.io et récupérer votre clé API

// Faire QCM pour deviner des capitales 

// 1) On veut aficher aléatoirement le nom du pays + le drapeau 
// 2) En dessous on voudra un input pour insérer le nom de la capitale 
// 3) Un bouton de validation 
// 4) Une fois validé on obtient le résultat (C'est vrai ou pas)
// 5) Une fois validé on veut aussi un bouton qui nous emmène a la question suivante 

// Comptabiliser les points et stopper les questions au bout de 10 

// Bien vous renseigner sur la structure des données recues afin de coder ce QCM

// Indice : Pourquoi ne pas choisir aléatoirement le pays en passant par son code pays 
// (et en les regroupant dans un tableau ...)

const countryName = document.querySelector('.country-name')
const input = document.querySelector('.capital-input')
const flag = document.querySelector('.flag')
const scoreZone = document.querySelector('.score')
const submit = document.querySelector('.submit')
const body = document.querySelector('body')
const next = document.querySelector('.next')
const verdict = document.querySelector('.verdict')

const key = "07x0kDJzDZRRo0rPAW1FdWJ6yGSIPLVLDxl0HE7N"

const url = `https://countryapi.io/api/all?apikey=07x0kDJzDZRRo0rPAW1FdWJ6yGSIPLVLDxl0HE7N`

// Chargement initial du Quiz
window.addEventListener('DOMContentLoaded', displayQuiz)

// On ajoute l'écouteur d'événement sur le bouton suivant 
next.addEventListener('click', displayQuiz)

// Ma fonction pour afficher le contenu d'une question (pays, drapeau)
function displayQuiz() {
    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        const array = Object.keys(data)
        const randomIndex = Math.floor(Math.random() * array.length)
        const randomCode = array[randomIndex]
    
        const randomCountry = data[randomCode]
        countryName.textContent = randomCountry.name
    
        flag.src = randomCountry.flag.large
    
        let score = 0;
    
        submit.addEventListener('click', () => {
            // On recup ce que le user a tapé dans l'input
            const userGuess = input.value
    
            if (userGuess === randomCountry.capital) {
                verdict.textContent = "Bonne réponse !"
                score ++
            } else {
                verdict.textContent = `Faux, la réponse était : ${randomCountry.capital}`
            }
            scoreZone.textContent = `${score} / 10`
        })
    })
    .catch(err => console.log(err))
}