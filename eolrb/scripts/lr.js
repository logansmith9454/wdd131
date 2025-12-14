export class Lr {
	constructor(loc, ori, solveLoc) {
		this.loc = loc
		this.ori = ori
		this.solveLoc = solveLoc
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

	getSolveLoc() {
		return this.solveLoc
	}

	move(loc, keepOri) {
		this.loc = loc
		if (!keepOri) {
			this.ori = !this.ori
		}
	}
}
