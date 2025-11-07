// courses.js
const aCourse = {
	code: "CSE121b",
	name: "Javascript Language",
	sections: [
		{
			sectionNum: 1,
			roomNum: "STC 353",
			enrolled: 26,
			days: "TTh",
			instructor: "Bro T",
		},
		{
			sectionNum: 2,
			roomNum: "STC 347",
			enrolled: 28,
			days: "TTh",
			instructor: "Sis A",
		},
	],
	changeEnrollment: function (sectionNum, enrollment) {
		console.log(`sectionNum to enroll in: ${sectionNum}`)
		const theSection = this.sections.find(
			(section) => sectionNum == section.sectionNum
		)
		if (theSection) {
			new_total = theSection.enrolled += enrollment
			if (new_total >= 0) {
				theSection.enrolled = new_total
			} else {
				theSection.enrolled = 0
			}
			renderSections(this.sections)
		}
	},
}

function findSection(section) {
	return sectionNum == section.sectionNum
}

function setCodeName(course) {
	const courseName = document.querySelector("#courseName")
	const courseCode = document.querySelector("#courseCode")
	courseName.textContent = course.name
	courseCode.textContent = course.code
}

function sectionTemplate(section) {
	return `
    <tr>
    <td>${section.sectionNum}</td>
    <td>${section.roomNum}</td>
    <td>${section.enrolled}</td>
    <td>${section.days}</td>
    <td>${section.instructor}</td>
    </tr>
    `
}

function renderSections(sections) {
	const sectionsEl = document.querySelector("#sections")
	const html = sections.map(sectionTemplate)
	sectionsEl.innerHTML = html.join("")
}

setCodeName(aCourse)
renderSections(aCourse.sections)

document.querySelector("#enrollStudent").addEventListener("click", () => {
	const sectionInput = document.querySelector("#sectionNumber")
	aCourse.changeEnrollment(sectionInput.value, 1)
})

document.querySelector("#dropStudent").addEventListener("click", () => {
	const sectionInput = document.querySelector("#sectionNumber")
	aCourse.changeEnrollment(sectionInput.value, -1)
})
