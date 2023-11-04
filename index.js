'use strict';

buildForm()

function buildForm() {
  setRecipeName()

  const main = document.getElementById("main")
  main.appendChild(buildSteps(recipe.steps))
}

function setRecipeName() {
  document.getElementById("recipe-name").textContent = recipe.name
}

function buildSteps(steps) {
  const outer = document.createElement("div")
  outer.classList.add("steps")

  for (let i = 0; i < steps.length; i++) {
    outer.appendChild(buildStep(steps[i]))
  }
  return outer
}

function buildStep({ id, subSteps }) {
  const totalSubSteps = subSteps.length
  const completedSubSteps = countCompletedSubSteps(subSteps)

  const outer = document.createElement("div")
  outer.classList.add("step")
  outer.setAttribute("id", "step-" + id)
  const title = document.createElement("h3")
  title.textContent = "Step " + id + ":"
  const subStepsDiv = document.createElement("div")
  subStepsDiv.classList.add("sub-steps")
  const subStepsCompletedP = document.createElement("p")
  subStepsCompletedP.classList.add("sub-steps-completed")
  subStepsCompletedP.textContent = completedSubSteps + "/" + totalSubSteps
  const subStepsDetailed = document.createElement("div")
  subStepsDetailed.classList.add("sub-steps-detailed")
  const subStepsDetailedP = document.createElement("p")

  subStepsDetailed.appendChild(subStepsDetailedP)
  for (let i = 0; i < subSteps.length; i++) {
    subStepsDetailedP.appendChild(buildSubStep(id, subSteps[i]))
    if (i != subSteps.length - 1) {
      subStepsDetailedP.appendChild(buildSubStepSeparator())
    }
  }

  outer.appendChild(title)
  subStepsDiv.appendChild(subStepsCompletedP)
  subStepsDiv.appendChild(subStepsDetailed)
  outer.appendChild(subStepsDiv)
  return outer
}

function buildSubStep(outerId, { id, description, completed }) {
  const span = document.createElement("span")
  span.setAttribute("id", "sub-step-" + outerId + "-" + id)
  let inner = span
  if (completed) {
    const mark = document.createElement("mark")
    span.appendChild(mark)
    inner = mark
  }
  inner.textContent = description
  return span
}

function buildSubStepSeparator() {
  const span = document.createElement("span")
  span.textContent = " - "
  return span
}

function countCompletedSubSteps(subSteps) {
  let completed = 0
  for (let i = 0; i < subSteps.length; i++) {
    if (subSteps[i].completed) completed++
  }
  return completed
}
