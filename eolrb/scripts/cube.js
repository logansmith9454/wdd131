import { Lr } from "./lr.js"
import { Ori } from "./ori.js"
import { Centers } from "./centers.js"
import { Corners } from "./corners.js"

export class Cube {
	uDict = { a: "b", b: "c", c: "d", d: "a" }
	upDict = { a: "d", d: "c", c: "b", b: "a" }
	u2Dict = { a: "c", c: "a", b: "d", d: "b" }
	mDict = { a: "c", c: "u", u: "w", w: "a" }
	mpDict = { a: "w", w: "u", u: "c", c: "a" }
	m2Dict = { a: "u", u: "a", c: "w", w: "c" }

	constructor(
		cornersRotation,
		centersRotation,
		lrbLoc,
		lrbOri,
		lrdLoc,
		lrdOri,
		ori1Loc,
		ori1Ori,
		ori2Loc,
		ori2Ori,
		ori3Loc,
		ori3Ori,
		ori4Loc,
		ori4Ori
	) {
		this.corners = new Corners(cornersRotation)
		this.centers = new Centers(centersRotation)
		this.lrb = new Lr(lrbLoc, lrbOri, "b")
		this.lrd = new Lr(lrdLoc, lrdOri, "d")
		this.ori1 = new Ori(ori1Loc, ori1Ori)
		this.ori2 = new Ori(ori2Loc, ori2Ori)
		this.ori3 = new Ori(ori3Loc, ori3Ori)
		this.ori4 = new Ori(ori4Loc, ori4Ori)
		this.allEdges = []
		this.lrEdges = []
		this.oriEdges = []
		this.allEdges.push(this.lrb)
		this.allEdges.push(this.lrd)
		this.allEdges.push(this.ori1)
		this.allEdges.push(this.ori2)
		this.allEdges.push(this.ori3)
		this.allEdges.push(this.ori4)
		this.lrEdges.push(this.lrb)
		this.lrEdges.push(this.lrd)
		this.oriEdges.push(this.ori1)
		this.oriEdges.push(this.ori2)
		this.oriEdges.push(this.ori3)
		this.oriEdges.push(this.ori4)
	}

	getLrList() {
		return this.lrEdges
	}

	getOriList() {
		return this.oriEdges
	}

	getCentersRotation() {
		return this.centers.getRot()
	}

	moveCorners(rotation) {
		this.corners.move(rotation)
	}

	moveCenters(rotation) {
		this.centers.move(rotation)
	}

	u() {
		this.allEdges.forEach((edge) => {
			const loc = edge.getLoc()
			if ("abcd".includes(loc)) {
				edge.move(this.uDict[loc], true)
			}
		})
		this.corners.move(1)
	}

	up() {
		this.allEdges.forEach((edge) => {
			const loc = edge.getLoc()
			if ("abcd".includes(loc)) {
				edge.move(this.upDict[loc], true)
			}
		})
		this.corners.move(3)
	}

	u2() {
		this.allEdges.forEach((edge) => {
			const loc = edge.getLoc()
			if ("abcd".includes(loc)) {
				edge.move(this.u2Dict[loc], true)
			}
		})
		this.corners.move(2)
	}

	m() {
		this.allEdges.forEach((edge) => {
			const loc = edge.getLoc()
			if ("acuw".includes(loc)) {
				edge.move(this.mDict[loc], false)
			}
		})
		this.centers.move(1)
	}

	mp() {
		this.allEdges.forEach((edge) => {
			const loc = edge.getLoc()
			if ("acuw".includes(loc)) {
				edge.move(this.mpDict[loc], false)
			}
		})
		this.centers.move(3)
	}

	m2() {
		this.allEdges.forEach((edge) => {
			const loc = edge.getLoc()
			if ("acuw".includes(loc)) {
				edge.move(this.m2Dict[loc], true)
			}
		})
		this.centers.move(2)
	}

	uMoves(moves, location) {
		let uCube = this.clone()
		uCube.u()
		let tupleKey = JSON.stringify(uCube.cubeToTuple())
		location[tupleKey] = moves + " U"

		let upCube = this.clone()
		upCube.up()
		tupleKey = JSON.stringify(upCube.cubeToTuple())
		location[tupleKey] = moves + " U'"

		let u2Cube = this.clone()
		u2Cube.u2()
		tupleKey = JSON.stringify(u2Cube.cubeToTuple())
		location[tupleKey] = moves + " U2"
	}

	mMoves(moves, location) {
		let mCube = this.clone()
		mCube.m()
		let mTuple = JSON.stringify(mCube.cubeToTuple())

		let mpCube = this.clone()
		mpCube.mp()
		let mpTuple = JSON.stringify(mpCube.cubeToTuple())

		if (mTuple == mpTuple) {
			location[mTuple] = moves + " M*"
		} else {
			location[mTuple] = moves + " M"
			location[mpTuple] = moves + " M'"
		}

		let m2Cube = this.clone()
		m2Cube.m2()
		location[JSON.stringify(m2Cube.cubeToTuple())] = moves + " M2"
	}

	allMoves(moves, location) {
		let uCube = this.clone()
		uCube.u()
		location[JSON.stringify(uCube.cubeToTuple())] = moves + " U"

		let upCube = this.clone()
		upCube.up()
		location[JSON.stringify(upCube.cubeToTuple())] = moves + " U'"

		let u2Cube = this.clone()
		u2Cube.u2()
		location[JSON.stringify(u2Cube.cubeToTuple())] = moves + " U2"

		let mCube = this.clone()
		mCube.m()
		let mTuple = mCube.cubeToTuple()

		let mpCube = this.clone()
		mpCube.mp()
		let mpTuple = mpCube.cubeToTuple()

		if (mTuple == mpTuple) {
			location[JSON.stringify(mTuple)] = moves + " M*"
		} else {
			location[JSON.stringify(mTuple)] = moves + " M"
			location[JSON.stringify(mpTuple)] = moves + " M'"
		}

		let m2Cube = this.clone()
		m2Cube.m2()
		location[JSON.stringify(m2Cube.cubeToTuple())] = moves + " M2"
	}

	displayCube() {
		// console.log(`Corners location: ${this.corners.getRot()}`)
		// console.log(`Centers oriented: ${this.centers.getIsOri()}`)
		this.lrEdges.forEach((lrEdge) =>
			console.log(
				`Lr edge: ${lrEdge.getSolveLoc()} - Location: ${lrEdge.getLoc()} - Orientation: ${lrEdge.getOri()}`
			)
		)
		this.oriEdges.sort((x, y) => x.getLoc().localeCompare(y.getLoc()))

		this.oriEdges.forEach((oriEdge) => {
			console.log(
				`Ori edge location: ${oriEdge.getLoc()} - Orientation: ${oriEdge.getOri()}`
			)
		})
	}

	// ValidateState() {
	// 	flipParity = false
	// 	this.allEdges.forEach((edge) => {
	// 		if (edge.getOri() == false) {
	// 			flipParity = !flipParity
	// 		}
	// 	})

	// 	if (flipParity) {
	// 		this.DisplayCube()
	// 		throw new ArgumentException(
	// 			"Invalid cube state (edge parity). Please restart the program and enter valid inputs."
	// 		)
	// 	}
	// }

	cubeToTuple() {
		const cornerInt = this.corners.getRot()
		const centerBool = this.centers.getIsOri() ? 1 : 0

		const lrList = [
			[this.lrb.getLoc(), this.lrb.getOri() ? 1 : 0],
			[this.lrd.getLoc(), this.lrd.getOri() ? 1 : 0],
		]

		// Use direct access to avoid oriEdges array entirely
		const oriItems = [
			{ loc: this.ori1.getLoc(), ori: this.ori1.getOri() ? 1 : 0 },
			{ loc: this.ori2.getLoc(), ori: this.ori2.getOri() ? 1 : 0 },
			{ loc: this.ori3.getLoc(), ori: this.ori3.getOri() ? 1 : 0 },
			{ loc: this.ori4.getLoc(), ori: this.ori4.getOri() ? 1 : 0 },
		]

		const oriOrientations = oriItems
			.sort((a, b) => a.loc.localeCompare(b.loc))
			.map((item) => item.ori)

		return [cornerInt, centerBool, lrList, oriOrientations]
	}

	clone() {
		return new Cube(
			this.corners.getRot(),
			this.centers.getIsOri() ? 1 : 0,
			this.lrb.getLoc(),
			this.lrb.getOri(),
			this.lrd.getLoc(),
			this.lrd.getOri(),
			this.ori1.getLoc(),
			this.ori1.getOri(),
			this.ori2.getLoc(),
			this.ori2.getOri(),
			this.ori3.getLoc(),
			this.ori3.getOri(),
			this.ori4.getLoc(),
			this.ori4.getOri()
		)
	}
}
