
/*
This project uses OpenAI's GPT-3 model for generating text and programming code
and is open-source, available for use and modification.

https://openai.com/

This code defines a web page that allows you to calculate the damage based on energy and damage inputs. The language of the page can be changed between English and Japanese using the changeLanguage function, which updates the text displayed on the page. The calculateDamage function calculates the damage by performing the calculation (energy * 50) / 5 * damage. The damage calculation result can be added to a list and displayed on the page using the addToList function. The list of damage calculations can be cleared using the clearList function. The input fields for energy and damage have some validation rules to make sure that only valid inputs are accepted.
*/

// Global variables for storing language and damage calculation
let language = "english";
let totalDamage = 0;
let damageList = [];
let sum = 0;
// Function for changing language
function changeLanguage(lang) {
	language = lang;
	updateText();
}
// Function for updating text on the page based on the selected language
function updateText() {
	if (language === "english") {
		document.getElementById("energyLabel").innerText = "Energy (in bottles):";
		document.getElementById("damageLabel").innerText = "Damage:";
		document.getElementById("calculateButton").innerText = "Calculate";
		document.getElementById("resultLabel").innerText = "Total Damage:";
		document.getElementById("languageButton1").innerText = "English";
		document.getElementById("languageButton2").innerText = "日本語";
		document.getElementById("header").innerText = "Energy Damage Calculator";
		document.getElementById("addToListButton").innerText = "Add to list";
		document.getElementById("clearListButton").innerText = "Clear list";
		document.getElementById("listLabel").innerText = "Damage list:";
		document.getElementById("sumLabel").innerText = "Total sum:";
	} else if (language === "japanese") {
		document.getElementById("energyLabel").innerText = "エネルギー（ボトルで）：";
		document.getElementById("damageLabel").innerText = "ダメージ：";
		document.getElementById("calculateButton").innerText = "計算";
		document.getElementById("resultLabel").innerText = "合計のダメージ：";
		document.getElementById("languageButton1").innerText = "English";
		document.getElementById("languageButton2").innerText = "日本語";
		document.getElementById("header").innerText = "エネルギーダメージ計算機";
		document.getElementById("addToListButton").innerText = "リストに追加";
		document.getElementById("clearListButton").innerText = "リストをクリア";
		document.getElementById("listLabel").innerText = "ダメージリスト：";
		document.getElementById("sumLabel").innerText = "合計：";
	}
}
// Input validation function
function validateInput(input) {
	input.addEventListener("input", function() {

		// Allow only numbers and decimal point
		var newValue = this.value.replace(/[^0-9.]/g, "");
		// Allow only one decimal point
		var dotCount = (newValue.match(/\./g) || []).length;
		if (dotCount > 1) {
			newValue = newValue.substring(0, newValue.lastIndexOf("."));
		}
		// Disallow leading zeros, except for after the decimal point
		if (newValue.startsWith(".")) {
			newValue = "0" + newValue;
		}
		// Disallow multiple leading zeros before decimal point
		while (newValue.startsWith("0") && newValue.length > 1 && newValue[1] !== ".") {
			newValue = newValue.substring(1);
		}
		this.value = newValue;
	});
}
// Function for calculating total damage
function calculateDamage() {
	// Get values from the input fields
	let energy = document.getElementById("energyInput").value;
	let damage = document.getElementById("damageInput").value;
	// Perform the calculation
	totalDamage = (energy * 50) / 5 * damage;
	// Update the result label
	document.getElementById("result").innerText = totalDamage;
}

function addToList() {
	if (totalDamage !== 0) {
		damageList.push(totalDamage);
		updateDamageList();
		updateSum();
	}
}

function clearList() {
	damageList = [];
	updateDamageList();
	sum = 0;
	updateSum();
}

function updateDamageList() {
	var listElement = document.getElementById("damageList");
	listElement.innerHTML = "";
	for (var i = 0; i < damageList.length; i++) {
		var item = document.createElement("li");
		item.innerHTML = damageList[i];
		listElement.appendChild(item);
	}
}

function updateSum() {
	sum = 0;
	for (var i = 0; i < damageList.length; i++) {
		sum += damageList[i];
	}
	document.getElementById("sumResult").innerHTML = sum;
}

document.addEventListener("DOMContentLoaded", function() {
	// Function for clearing input field
	updateText();

	function clearInputField(event) {
		event.target.value = "";
	}
	// Add event listener to input fields
	document.getElementById("energyInput").addEventListener("focus", clearInputField);
	document.getElementById("damageInput").addEventListener("focus", clearInputField);
	// Assign a validation function to input fields
	validateInput(document.getElementById("energyInput"));
	validateInput(document.getElementById("damageInput"));
});