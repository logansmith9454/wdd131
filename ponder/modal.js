const gallery = document.querySelector(".gallery")
const modal = document.querySelector("dialog")
const modalImage = modal.querySelector("img")
const closeButton = modal.querySelector(".close-viewer")

// Event listener for opening the modal
gallery.addEventListener("click", openModal)

function openModal(e) {
	modalImage.src = e.target.src
	modalImage.alt = e.target.alt
	modal.showModal()
}

closeButton.addEventListener("click", () => {
	modal.close()
})

// Close modal if clicking outside the image
modal.addEventListener("click", (event) => {
	if (event.target === modal) {
		modal.close()
	}
})
