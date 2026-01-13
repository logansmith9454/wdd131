import { Cube } from "./cube.js"
import { displayError } from "./eolrb.js"
import { Corners } from "./corners.js"
import { Centers } from "./centers.js"
import { Ori } from "./ori.js"
import { Lr } from "./lr.js"
import { displaySolution } from "./eolrb.js"

export function Main(e) {
	e.preventDefault()
	displayError("")
	const solutionFormEl = document.querySelector(".solution-form")
	solutionFormEl.classList.add("hidden")
	const solutionsEl = document.querySelector(".solution-list")
	solutionsEl.innerHTML = ""

	const cubeCase = document.querySelector("#enterCase").value
	// console.log(cubeCase)
	if (validateCase(cubeCase)) {
		displayError("")
		let scrambledCube = getScrambledCube(cubeCase)
		let solutionMoves = solve(scrambledCube)
		displaySolution(solutionMoves)
	}
}

function validateCase(cubeCase) {
	const validation = /^[01][1-6][1-6][01]{6}$/
	if (validation.test(cubeCase)) {
		let flipParity = false
		for (let i = 3; i < 9; i++) {
			if (parseInt(cubeCase[i]) == 1) {
				flipParity = !flipParity
			}
		}
		if (flipParity) {
			displayError("Invalid input. Your case has edge parity.")
			return false
		}
		if (cubeCase[1] == cubeCase[2]) {
			displayError(
				"Invalid input. The second and third digits should be different values."
			)
			return false
		}
		return true
	}
	if (cubeCase.length != 9) {
		displayError("Invalid input length. Input should be 9 characters.")
	} else if (!/^[01]$/.test(cubeCase[0])) {
		displayError("Invalid input. Please enter either 0 or 1 for the first value.")
	} else if (!/^[1-6]$/.test(cubeCase[1])) {
		displayError("Invalid input. Please enter either 1-6 for the second value.")
	} else if (!/^[1-6]$/.test(cubeCase[2])) {
		displayError("Invalid input. Please enter either 1-6 for the third value.")
	} else if (!/^[01]$/.test(cubeCase[3])) {
		displayError(
			"Invalid input. Please enter either 0 or 1 for the fourth value."
		)
	} else if (!/^[01]$/.test(cubeCase[4])) {
		displayError("Invalid input. Please enter either 0 or 1 for the fifth value.")
	} else if (!/^[01]$/.test(cubeCase[5])) {
		displayError("Invalid input. Please enter either 0 or 1 for the sixth value.")
	} else if (!/^[01]$/.test(cubeCase[6])) {
		displayError(
			"Invalid input. Please enter either 0 or 1 for the seventh value."
		)
	} else if (!/^[01]$/.test(cubeCase[7])) {
		displayError(
			"Invalid input. Please enter either 0 or 1 for the eighth value."
		)
	} else if (!/^[01]$/.test(cubeCase[8])) {
		displayError("Invalid input. Please enter either 0 or 1 for the ninth value.")
	} else {
		displayError("Invalid Syntax.")
	}
	return false
}

function getScrambledCube(cubeCase) {
	let cornerInt = 0
	let centerInt = parseInt(cubeCase[0])
	let lrbInt = parseInt(cubeCase[1]) - 1
	let lrdInt = parseInt(cubeCase[2]) - 1
	let edge1Int = parseInt(cubeCase[3])
	let edge2Int = parseInt(cubeCase[4])
	let edge3Int = parseInt(cubeCase[5])
	let edge4Int = parseInt(cubeCase[6])
	let edge5Int = parseInt(cubeCase[7])
	let edge6Int = parseInt(cubeCase[8])

	const allLocs = ["a", "b", "c", "d", "u", "w"]
	const allOris = [edge1Int, edge2Int, edge3Int, edge4Int, edge5Int, edge6Int]

	const lrbLoc = allLocs[lrbInt]
	const lrbOri = allOris[lrbInt]
	const lrdLoc = allLocs[lrdInt]
	const lrdOri = allOris[lrdInt]
	const remainingLocs = allLocs.filter((_, i) => i !== lrbInt && i !== lrdInt)
	const remainingOris = allOris.filter((_, i) => i !== lrbInt && i !== lrdInt)

	let scrambledCube = new Cube(
		cornerInt,
		centerInt,
		lrbLoc,
		lrbOri,
		lrdLoc,
		lrdOri,
		remainingLocs[0],
		remainingOris[0],
		remainingLocs[1],
		remainingOris[1],
		remainingLocs[2],
		remainingOris[2],
		remainingLocs[3],
		remainingOris[3]
	)
	// scrambledCube.displayCube()
	return scrambledCube
}

function solve(scrambledCube) {
	let solutionMoves = []

	const solvedCube = new Cube(
		0, // corners solved
		1, // centers oriented
		"b",
		1, // lrb
		"d",
		1, // lrd
		"a",
		1,
		"c",
		1,
		"u",
		1,
		"w",
		1
	)

	console.log(
		"Solved cube initial state:",
		JSON.stringify(solvedCube.cubeToTuple())
	)

	// Now test M move
	let testM = solvedCube.clone()
	console.log("Before M:", JSON.stringify(testM.cubeToTuple()))
	testM.m()
	console.log("After M:", JSON.stringify(testM.cubeToTuple()))

	// Test M' move
	let testMp = solvedCube.clone()
	console.log("Before M':", JSON.stringify(testMp.cubeToTuple()))
	testMp.mp()
	console.log("After M':", JSON.stringify(testMp.cubeToTuple()))

	let scrambledTuple = scrambledCube.cubeToTuple()
	const solvedTuple = solvedCube.cubeToTuple()

	let scrambledSide = []
	scrambledSide[0] = { [JSON.stringify(scrambledTuple)]: "" }

	let solvedSide = []
	solvedSide[0] = { [JSON.stringify(solvedTuple)]: "" }

	let uCube = solvedCube.clone()
	uCube.u()
	solvedSide[0][JSON.stringify(uCube.cubeToTuple())] = ""

	let upCube = solvedCube.clone()
	upCube.up()
	solvedSide[0][JSON.stringify(upCube.cubeToTuple())] = ""

	let muCube = solvedCube.clone()
	muCube.m()
	muCube.u()
	solvedSide[0][JSON.stringify(muCube.cubeToTuple())] = ""

	let mupCube = solvedCube.clone()
	mupCube.m()
	mupCube.up()
	solvedSide[0][JSON.stringify(mupCube.cubeToTuple())] = ""

	let uCubeScram = scrambledCube.clone()
	uCubeScram.u()
	scrambledSide[0][JSON.stringify(uCubeScram.cubeToTuple())] = "(U)"

	let upCubeScram = scrambledCube.clone()
	upCubeScram.up()
	scrambledSide[0][JSON.stringify(upCubeScram.cubeToTuple())] = "(U')"

	let u2CubeScram = scrambledCube.clone()
	u2CubeScram.u2()
	scrambledSide[0][JSON.stringify(u2CubeScram.cubeToTuple())] = "(U2)"
	console.log(
		`Scrambled side layer 0 has ${Object.keys(scrambledSide[0]).length} states`
	)
	console.log(
		`Solved side layer 0 has ${Object.keys(solvedSide[0]).length} states`
	)

	if (JSON.stringify(scrambledTuple) === JSON.stringify(solvedTuple)) {
		return ["None"]
	}

	for (let layer = 0; layer < 15; layer++) {
		console.log(`searching layer ${layer}`)
		scrambledSide[layer + 1] = {}

		Object.keys(scrambledSide[layer]).forEach((tupleKey) => {
			const moves = scrambledSide[layer][tupleKey]
			const cubeState = { Key: tupleKey, Value: moves }
			turnCube(cubeState, scrambledSide[layer + 1])
		})

		solutionMoves = checkSolved(solvedSide[layer], scrambledSide[layer + 1])

		if (solutionMoves.length > 0) {
			return solutionMoves
		}

		solvedSide[layer + 1] = {}
		Object.keys(solvedSide[layer]).forEach((tupleKey) => {
			const moves = solvedSide[layer][tupleKey]
			const cubeState = { Key: tupleKey, Value: moves }
			turnCube(cubeState, solvedSide[layer + 1])
		})

		solutionMoves = checkSolved(solvedSide[layer + 1], scrambledSide[layer + 1])

		if (layer === 0) {
			console.log("=== LAYER 1 GENERATION DEBUG ===")
			console.log("Solved side layer 1 states:")
			Object.keys(solvedSide[1]).forEach((key) => {
				console.log(
					"  State:",
					key.substring(0, 50) + "...",
					"Moves:",
					solvedSide[1][key]
				)
			})
		}
		if (solutionMoves.length > 0) {
			return solutionMoves
		}
	}

	return solutionMoves
}

function turnCube(cubeState, location) {
	const moves = cubeState.Value.trim()
	const tupledCube = JSON.parse(cubeState.Key)
	const newCube = tupleToCube(tupledCube)
	if (!newCube) return

	if (moves.length > 0) {
		const moveArr = moves.split(" ")
		let lastMove = moveArr[moveArr.length - 1].trim()[0]
		if (lastMove == "(") {
			lastMove = "U"
		}

		// console.log(`lastmove: ${lastMove[0]}`)
		if (lastMove[0] == "U") {
			newCube.mMoves(moves, location)
		} else if (lastMove[0] == "M") {
			newCube.uMoves(moves, location)
		} else {
			newCube.allMoves(moves, location)
		}
	} else {
		newCube.allMoves(moves, location)
	}
}

function checkSolved(solvedSide, scrambledSide) {
	const scrambledKeys = Object.keys(scrambledSide)
	const solvedKeys = Object.keys(solvedSide)

	const solvedSet = new Set(solvedKeys)
	const commonKeys = scrambledKeys.filter((key) => solvedSet.has(key))

	if (commonKeys.length > 0) {
		console.log(`\nSolution found at layer ${commonKeys.length}`)
		const solutionMoves = []
		commonKeys.forEach((key) => {
			const scramMoves = (scrambledSide[key] || "").trim()
			const solveMoves = (solvedSide[key] || "").trim()
			let full = scramMoves
			if (solveMoves !== "") {
				if (full !== "") {
					full += " "
				}
				full += invertMoves(solveMoves).trim()
			}
			solutionMoves.push(full.trim())
		})
		return solutionMoves
	}
	return []
}

function tupleToCube(tupledCube) {
	if (!Array.isArray(tupledCube) || tupledCube.length !== 4) {
		console.error("Bad tuple:", tupledCube)
		return null
	}
	if (!Array.isArray(tupledCube[2]) || tupledCube[2].length !== 2) {
		console.error("Bad lrList in tuple:", tupledCube)
		return null
	}
	const cornerInt = tupledCube[0]
	const centerBool = tupledCube[1]
	const lrList = tupledCube[2]
	const oriOrientations = tupledCube[3]

	const lrbLoc = lrList[0][0]
	const lrbOri = lrList[0][1]
	const lrdLoc = lrList[1][0]
	const lrdOri = lrList[1][1]

	const allLocs = ["a", "b", "c", "d", "u", "w"]
	const usedLocs = [lrbLoc, lrdLoc]
	const remainingLocs = allLocs.filter((loc) => !usedLocs.includes(loc))

	const newCube = new Cube(
		cornerInt,
		centerBool ? 1 : 0,
		lrbLoc,
		lrbOri,
		lrdLoc,
		lrdOri,
		remainingLocs[0],
		oriOrientations[0],
		remainingLocs[1],
		oriOrientations[1],
		remainingLocs[2],
		oriOrientations[2],
		remainingLocs[3],
		oriOrientations[3]
	)
	return newCube
}

function invertMoves(moves) {
	// console.log(moves)
	// console.log(`moves type: ${typeof moves}`)
	const turnMap = {
		U: "U'",
		"U'": "U",
		U2: "U2",
		M: "M'",
		"M'": "M",
		M2: "M2",
		"M*": "M*",
	}
	let invertedMoves = []
	let trimmedMoves = moves.trim()
	// console.log($"Moves to invert: {trimmedMoves.Length}");
	let movesList = trimmedMoves.split(" ")
	// console.log($"Moves in list: {trimmedMoves.Length}");
	movesList.forEach((move) => {
		if (move != "") {
			invertedMoves.push(turnMap[move])
		}
	})

	invertedMoves.reverse()
	let invertedString = invertedMoves.join(" ")
	return invertedString
}
