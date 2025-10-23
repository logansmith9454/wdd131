//  arrays.js
const steps = ["one", "two", "three"]
function listTemplate(step) {
	return `<li>${step}</li>`
}

const stepsHtml = steps.map(listTemplate)
document.querySelector("#myList").innerHTML = stepsHtml.join("")

const grades = ["A", "B", "A"]
let points = 0
function convertGradesToPoints(grade) {
	switch (grade) {
		case "A":
			points = 4
			break
		case "B":
			points = 3
		case "C":
			points = 2
		case "D":
			points = 1
		default:
			points = 0
	}
	return points
}

const gpaPoints = grades.map(convertGradesToPoints)
const pointsTotal = gpaPoints.reduce(function (total, item) {
	return total + item
})

const GPA = (pointsTotal = gpaPoints.length)

const words = ["watermelon", "peach", "apple", "tomato", "grape"]

const shortWords = words.filter(function (word) {
	return word.length < 6
})

const myArray = [12, 34, 21, 54]
const luckyNumber = 21
const luckyIndex = myArray.indexOf(luckyNumber)
