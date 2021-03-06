const Word = require("./word.js");
const inquirer = require("inquirer");
const validator = require("validator");
const clear = require("clear");
const wordList = ["penny","quarter","nickle","dollar","dime"];
var position;
var selectedWord;
var vocab;
var gameState = "";
var guessedLetters = [];
var remainingGuesses = 10;

function randomWordPicker(){
	position = Math.floor(Math.random() * (wordList.length));
	selectedWord = wordList[position]
	vocab = new Word(selectedWord);
	return vocab;
}

function startGame(){
	console.log(`There are ${remainingGuesses} guesses left\nYou've Guessed: ${guessedLetters}\n\n`);
	if((gameState !== selectedWord) && remainingGuesses > 0){
		inquirer.prompt([{
			name: "guess",
			message: "Guess A Letter",
			validate: function(str){
				if (guessedLetters.includes(str)){
					console.log(`\nYou've guessed "${str}" already\n`);
					console.log(vocab.letterCheck());
					return false;
				} else if (str.length != 1){
					console.log("\nPlease enter only one character\n");
					console.log(vocab.letterCheck());
					return false;
				} else if (!(validator.isAlpha(str))) {
					console.log(`\n ${str} is not a letter`);
					console.log(vocab.letterCheck());
					return false;
				} else {
					return true;
			}
		}}]).then(function (input){
			var char = input.guess.toLowerCase();
			guessedLetters.push(char);
			console.log(`\n\nGuess: ${char}`);
			gameState = vocab.letterCheck(char);
			console.log(gameState);
			remainingGuesses--;
			startGame();
		});	
	} else if (remainingGuesses < 1) {
		console.log("\n\n\n\nYou ran out of guesses, lets start over.\n\n\n\n");
		setTimeout(resetGame, 2000);
	}else {
		clear();
		console.log(`
		Good Job! The word was ${selectedWord}!\n
		Lets play again!\n\n`)
		resetGame();
	}

}

function resetGame(){
	remainingGuesses = 10;
	guessedLetters = [];
	randomWordPicker();
	vocab.printLetters();
	console.log(vocab.letterCheck());
	startGame();
}

function printHint(){
	vocab.printLetters();
	console.log(`\n\n${vocab.letterCheck()}`);
}

randomWordPicker();

printHint();

startGame();