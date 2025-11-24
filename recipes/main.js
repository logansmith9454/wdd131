import recipes from "./recipes.mjs"

function getRandomListEntry(array) {
	return array[Math.floor(Math.random() * array.length)]
}

function recipeTemplate(recipe) {
	return `<div class="recipe-card">
            <img class="recipe-image" src="${recipe.image}" alt="Image of ${
		recipe.name
	}">
            <div class="recipe-info">
            ${tagsTemplate(recipe.tags)}
            <h2>${recipe.name}</h2></h2>
            ${ratingTemplate(recipe.rating)}
            <p class="description hidden">${recipe.description}</p>
            </div>
        </div>`
}

function tagsTemplate(tags) {
	// loop through the tags list and transform the strings to HTML
	let html = `<div class="tags-cont">`
	tags.forEach((element) => {
		html += `<div class="tag">${element}</div>`
	})
	html += `</div>`
	return html
}

function ratingTemplate(rating) {
	// begin building an html string using the ratings HTML written earlier as a model.
	let html = `<span
	class="rating"
	role="img"
	aria-label="Rating: ${rating} out of 5 stars"
>`
	// our ratings are always out of 5, so create a for loop from 1 to 5
	for (let i = 0; i < 5; i++) {
		// check to see if the current index of the loop is less than our rating
		if (i < rating) {
			// if so then output a filled star
			html += `<span aria-hidden="true" class="icon-star">⭐</span>`
		}
		// else output an empty star
		else {
			html += `<span aria-hidden="true" class="icon-star-empty">☆</span>`
		}
	}

	// after the loop, add the closing tag to our string
	html += `</span>`
	// return the html string
	return html
}

function renderRecipes(recipeList) {
	// get the element we will output the recipes into
	const cardContainer = document.querySelector(".card-container")
	// use the recipeTemplate function to transform our recipe objects into recipe HTML strings
	let html = ""
	recipeList.forEach((recipe) => {
		html += recipeTemplate(recipe)
	})
	// Set the HTML strings as the innerHTML of our output element.
	cardContainer.innerHTML = html
}

function filterRecipes(query) {
	function searchCallback(recipe) {
		return (
			recipe.name.toLowerCase().includes(query.toLowerCase()) ||
			recipe.description.toLowerCase().includes(query.toLowerCase()) ||
			recipe.tags.find((tag) => tag.toLowerCase().includes(query.toLowerCase())) ||
			recipe.recipeIngredient.find((ingredient) =>
				ingredient.toLowerCase().includes(query.toLowerCase())
			)
		)
	}
	let filteredRecipes = recipes.filter(searchCallback)
	filteredRecipes.sort((a, b) =>
		a.name.toLowerCase().localeCompare(b.name.toLowerCase())
	)
	return filteredRecipes
}

const searchButton = document.querySelector(".search-button")
searchButton.addEventListener("click", searchHandler)
function searchHandler(e) {
	e.preventDefault()
	const input = document.querySelector("#recipeSearch").value
	console.log(`Searched for "${input}"`)
	const filteredRecipes = filterRecipes(input)
	renderRecipes(filteredRecipes)
}

function init() {
	// get a random recipe
	const recipe = getRandomListEntry(recipes)
	// render the recipe with renderRecipes.
	renderRecipes([recipe])
}
init()
