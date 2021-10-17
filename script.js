let APIKey = "inWJkcQI1HS5Vtu8O7Lr94QRFRQUYmVqveq3UH7w"
let url = "https://api.nasa.gov/planetary/apod"

//Set date picker start and default date
var today = new Date();
var day = today.getDate();
var month = today.getMonth() + 1;
var year = today.getFullYear();

if (day < 10) {
	day = '0' + day;
}

if (month < 10) {
	month = '0' + month;
} 
    
today = year + '-' + month + '-' + day;
document.getElementById("picDay").setAttribute("max", today);
document.getElementById("picDay").setAttribute("value", today);

//Rest of javascript
function getAPOD(e) {
	e.preventDefault();
	getPOD();
}

function getPOD() {
	var picDay = document.getElementById("picDay");
	var date = picDay.value;
	console.log(date);

	fullURL = url + "?api_key=" + APIKey + "&date=" + date;
	fetch(fullURL).then(function(response) {
		return response.json();
	}).then(function(json) {
		console.log(json);
		if (json.media_type === "video") {
			document.getElementById("apotd").src = "";
			document.getElementById("info").innerHTML = "<b>Explanation: </b>" + "There was not a picture of the day this day, instead there was this video: <a href=\"" + json.url + "\">" + json.url + "</a>";
			document.getElementById("cw").innerHTML = ""
		} else {
			if (json.hasOwnProperty('hdurl')) {
				document.getElementById("apotd").src = json.hdurl;
			} else {
				document.getElementById("apotd").src = json.url;
			}
			document.getElementById("info").innerHTML = "<b>Explanation: </b>" + json.explanation;
			if (json.hasOwnProperty('copyright')) {
				document.getElementById("cw").innerHTML = "Warning: This image is subject to copyright."
			} else {
				document.getElementById("cw").innerHTML = "This image is not subject to copyright."
			}
		}
	});
}

//Load today's image
getPOD();

//assign function to button press
document.getElementById("dateForm").addEventListener("submit", getAPOD);
