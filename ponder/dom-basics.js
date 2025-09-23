const newParagraph = document.createElement("p")
newParagraph.innerText = "Added with Javascript!"
document.body.appendChild(newParagraph)

const newImg = document.createElement("img")
newImg.src = "https://picsum.photos/200"
newImg.alt = "Some img or something, I guess."
document.body.appendChild(newImg)

const newDiv = document.createElement("div")
newDiv.innerHTML = "<ul><li>One</li><li>Two</li><li>Three</li></ul>"
document.body.appendChild(newDiv)

const newSection = document.createElement("section")
const sectionH2 = document.createElement("h2")
sectionH2.innerText = "DOM Basics"
newSection.appendChild(sectionH2)
const sectionP = document.createElement("p")
sectionP.innerText = "This was added through JavaScript."
newSection.appendChild(sectionP)
document.body.appendChild(newSection)
