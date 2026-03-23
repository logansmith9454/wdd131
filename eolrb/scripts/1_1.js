import { getScrambledCube, solve } from "./solver.js"

const caseTable = document.querySelector(".solution-table")

var lr_positions = ["1", "2", "3", "4", "5", "6"]
var top_flips = ["0111", "1011", "1101", "1110"]
var bottom_flips = ["10", "01"]

// var lr_positions = ["1", "2", "3"]
// var top_flips = ["1000"]
// var bottom_flips = ["01"]

var table_html = ""

lr_positions.forEach((lr1_position) => {
	lr_positions.forEach((lr2_position) => {
		top_flips.forEach((top_flip) => {
			bottom_flips.forEach((bottom_flip) => {
				if (lr1_position != lr2_position) {
					var eolrb_case = "1" + lr1_position + lr2_position + top_flip + bottom_flip
					table_html += `<tr><th>${eolrb_case}</th>`
					let scrambledCube = getScrambledCube(eolrb_case)
					let solutionMoves = solve(scrambledCube)
					console.log(solutionMoves)
					solutionMoves.forEach((solution) => {
						table_html += `<th>${solution}</th>`
					})
					table_html += "</tr>"
				}
			})
		})
	})
})

caseTable.innerHTML = table_html
