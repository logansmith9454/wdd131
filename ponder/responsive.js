const menuButton = document.querySelector(".menu-btn")
const navigation = document.querySelector("nav")
const mediaQuery = window.matchMedia("(min-width: 700px)")
const hrElements = document.querySelectorAll(".custom-hr")

menuButton.addEventListener("click", toggleMenu)
mediaQuery.addEventListener("change", resize)
window.addEventListener("load", loadWindow)

function toggleMenu() {
	navigation.classList.toggle("hidden")
	menuButton.classList.toggle("change")
}

function loadWindow() {
	if (window.innerWidth >= 700) {
		navigation.classList.remove("hidden")
		hrElements.forEach((element) => {
			element.classList.add("hidden")
		})
	}
}

function resize(event) {
	if (event.matches) {
		navigation.classList.remove("hidden")
		menuButton.classList.remove("change")
		hrElements.forEach((element) => {
			element.classList.add("hidden")
		})
	} else {
		navigation.classList.add("hidden")
		hrElements.forEach((element) => {
			element.classList.remove("hidden")
		})
	}
}
