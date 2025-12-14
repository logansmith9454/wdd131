export class Corners {
	constructor(rotation) {
		this.rotation = rotation
	}

	getRot() {
		return this.rotation
	}

	move(rotations) {
		this.rotation = (this.rotation + rotations) % 4
	}
}
