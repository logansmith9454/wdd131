export class Centers {
	constructor(isOriented) {
		this.isOriented = isOriented
	}

	getIsOri() {
		return this.isOriented
	}

	move(rotations) {
		if (rotations % 2 != 0) {
			this.isOriented = !this.isOriented
		}
	}
}
