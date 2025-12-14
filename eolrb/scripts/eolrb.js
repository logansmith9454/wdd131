import { Main } from "./solver.js"

export function displayError(error) {
	const errorEl = document.querySelector(".error-message")
	errorEl.innerText = error
}

let caseInput = document.querySelector(".solve-button")
caseInput.addEventListener("click", Main)

let solutionsDisplayed = false

export function displaySolution(solutionMoves) {
	solutionsDisplayed = false
	const solutionsEl = document.querySelector(".solution-list")
	if (solutionMoves.length === 0) {
		console.log("No solution found (invalid case or bug in the code)")
	}
	if (solutionMoves[0] === "None") {
		solutionsEl.innerText = "It's already solved!"
		return
	}
	let html = ""
	solutionsDisplayed = true
	console.log(`solutionMoves: ${solutionMoves}, type: ${typeof solutionMoves}`)
	console.log(typeof [])
	if (solutionMoves[0].trim().split(" ").length == 1) {
		console.log("\nMove count: 1")
		html += `<li>${solutionMoves[0].trim()}</li>`
	} else {
		let movecount = 0
		solutionMoves[0]
			.trim()
			.split(" ")
			.forEach((move) => {
				if (!move.includes("(")) {
					movecount += 1
				}
			})
		console.log(`${solutionMoves.length} solutions`)
		console.log(`Move count: ${movecount}`)
		solutionMoves.forEach((solution) => {
			html += `<li>${solution}</li>`
		})
		solutionsEl.innerHTML = html
		// forEach (let solution in solutionMoves)
		// {
		//     console.log($"Solution: {solution}, {solution == " "}");
		// }
	}
	// const solutionFormEl = document.querySelector(".solution-form")
	// solutionFormEl.classList.remove("hidden")
}
