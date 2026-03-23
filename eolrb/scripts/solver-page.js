import { Main } from "./solver.js"

const acc = document.querySelector(".accordion")
const accStatus = document.querySelector(".tutorial-status")

acc.addEventListener("click", function () {
	this.classList.toggle("active")
	var panel = this.nextElementSibling
	if (panel.style.maxHeight) {
		panel.style.maxHeight = null
		accStatus.innerText = "+"
	} else {
		panel.style.maxHeight = panel.scrollHeight + "px"
		accStatus.innerText = "-"
	}
})

let caseInput = document.querySelector(".solve-button")
caseInput.addEventListener("click", Main)
