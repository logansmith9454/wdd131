let alive = true

function changeStats(stat, change) {
	const statEl = document.querySelector(stat)
	let value = parseInt(statEl.innerHTML)
	// console.log(`value: ${value}`)
	const new_stat = value + parseInt(change)
	// console.log(`health: ${health}`)
	let health = parseInt(document.querySelector("#health").innerHTML)

	// Don't let any stat go into the negatives
	if (new_stat >= 0 && alive == true) {
		statEl.innerHTML = new_stat
	} else {
		if (health == 0) {
			alive = false
			// console.log(`stat: ${stat}`)
			const name = document.querySelector(".name")
			name.innerHTML = "Dead Snortleblat"
			const charImg = document.querySelector("#character-img")
			charImg.src = "dead-snortleblat.png"
			charImg.alt = "Stortleblat, but he's dead"
			const popup = document.querySelector("#dead-modal")
			popup.showModal()
		}
	}
}

document.querySelector("#attBtn").addEventListener("click", () => {
	changeStats("#health", -20)
})

document.querySelector("#levelUpBtn").addEventListener("click", () => {
	changeStats("#level", 1)
})

document.querySelector(".close-modal").addEventListener("click", () => {
	const modal = document.querySelector("#dead-modal")
	modal.close()
})
