export class Ori {
	constructor(loc, ori) {
		// console.log("Creating Ori with loc:", loc, "ori:", ori)
		this.loc = loc
		this.ori = ori
	}

	getLoc() {
		return this.loc
	}

	getOri() {
		return this.ori
	}

	setLoc(loc) {
		this.loc = loc
	}

	setOri(ori) {
		this.ori = ori
	}

	move(loc, keepOri) {
		this.loc = loc
		if (!keepOri) {
			this.ori = !this.ori
		}
	}
}
