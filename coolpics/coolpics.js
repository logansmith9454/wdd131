const menuBtn = document.querySelector(".menu-button")
const menuItems = document.querySelectorAll(".menu-item")
const gallery = document.querySelector(".gallery")
const modal = document.querySelector("dialog")
const modalImage = document.querySelector(".modal-image")
const closeBtn = document.querySelector(".close-viewer")

function toggleMenu() {
	menuItems.forEach((element) => {
		element.classList.toggle("hidden")
	})
}

menuBtn.addEventListener("click", toggleMenu)

window.addEventListener("resize", handleResize)

gallery.addEventListener("click", displayModal)

function displayModal(event) {
	image = event.target.closest("img")
	modalImage.src = image.src.split("-")[0] + "-full.jpeg"
	console.log(modalImage.src)
	const newAlt = image.alt.split(" ")[0] + " large " + image.alt.split(" ")[2]
	modalImage.alt = newAlt
	modal.showModal()
}

closeBtn.addEventListener("click", () => {
	modal.close()
})

modal.addEventListener("click", (event) => {
	if (event.target === modal) {
		modal.close()
	}
})

function handleResize() {
	if (window.innerWidth >= 1000) {
		menuItems.forEach((element) => {
			element.classList.remove("hidden")
		})
	} else {
		menuItems.forEach((element) => {
			element.classList.remove("hidden")
		})
	}
}
