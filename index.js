'use strict';

main()

function main() {
  const recipe = loadRecipe()
  buildForm(recipe)
  registerKeyboardEvents()
}


function registerKeyboardEvents() {
  document.addEventListener(
    "keypress",
    (event) => {
      if (event.key == " ") {
        event.preventDefault()
        setNextCompleted()
      }
      if (event.key == "b") {
        undoCompleted()
      }
    },
    false
  )
}

function showHelpMessage() {
  alert("Press 'SPACE' to mark as completed\nPress 'b' to undo the last completed")
}

function updateForm() {
  const recipe = getRecipe()
  buildForm(recipe)
}

function setNextCompleted() {
  const recipe = loadRecipe()
  stepsLoop:
  for (let i = 0; i < recipe.steps.length; i++) {
    const step = recipe.steps[i]
    if (!step.completed) {
      for (let j = 0; j < step.subSteps.length; j++) {
        const subStep = step.subSteps[j]
        if (!subStep.completed) {
          recipe.steps[i].subSteps[j].completed = true
          if (j == step.subSteps.length - 1) {
            recipe.steps[i].completed = true
          }
          setRecipe(recipe)
          break stepsLoop;
        }
      }
    }
  }
  updateForm()
}

function undoCompleted() {
  const recipe = loadRecipe()
  stepsLoop:
  for (let i = 0; i < recipe.steps.length; i++) {
    const step = recipe.steps[i]
    let lastSubStepUncomplete = false
    let lastStepCompleted = -1
    if (!step.completed) {
      for (let j = step.subSteps.length - 1; j >= 0; j--) {
        const subStep = step.subSteps[j]
        if (subStep.completed) {
          recipe.steps[i].subSteps[j].completed = false
          if (j == 0) {
            recipe.steps[i].completed = false
          }
          setRecipe(recipe)
          console.log("outer break")
          break stepsLoop;
        } else if (j == 0 && !subStep.completed) {
          lastSubStepUncomplete = true
          lastStepCompleted = i - 1
          console.log("sub break")
          break
        }
      }
    }
    if (lastSubStepUncomplete) {
      let len = recipe.steps[lastStepCompleted].subSteps.length
      recipe.steps[lastStepCompleted].subSteps[len - 1].completed = false
      recipe.steps[lastStepCompleted].completed = false
      setRecipe(recipe)
      break
    }
  }
  updateForm()
}

function setRecipe(recipe) {
  localStorage.setItem("recipe", JSON.stringify(recipe))
}

function getRecipe() {
  return JSON.parse(localStorage.getItem("recipe"))
}

function loadRecipe() {
  let stored = localStorage.getItem("recipe")
  if (!stored) {
    stored = JSON.stringify(recipe)
    localStorage.setItem("recipe", stored)
  }
  stored = JSON.parse(stored)

  console.log(stored)
  return stored
}

function buildForm(recipe) {
  setRecipeName()

  const main = document.getElementById("outer-steps")
  main.replaceChildren(buildSteps(recipe.steps))
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
