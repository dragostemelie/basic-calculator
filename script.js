//calculator display rows
const previousValueElement = document.querySelector("#previousValue")
const currentValueElement = document.querySelector("#currentValue")

let operation

//numpad keyboard
document.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "+":
      newOperation(e.key)
      break
    case "-":
      newOperation(e.key)
      break
    case "*":
      newOperation(e.key)
      break
    case "/":
      newOperation(e.key)
      break
    case "Enter":
      subtotal()
      break
    case "Escape":
      clearData()
      break
    case "Backspace":
      deleteKey()
      break
    default:
      if (e.code.includes("Numpad")) numberKey(e.key)
  }
})

function numberKey(key) {
  flashButton(key)
  if (currentValueElement.innerText === "0") currentValueElement.innerText = key
  else currentValueElement.innerText += key
}

function deleteKey() {
  if (currentValueElement.innerText.length > 1)
    currentValueElement.innerText = currentValueElement.innerText.slice(0, -1)
  else currentValueElement.innerText = "0"
}

function newOperation(newOp) {
  if (operation) {
    calculate()
    operation = newOp
    previousValueElement.innerText += " " + operation
  } else {
    if (currentValueElement.innerText.length) {
      operation = newOp
      previousValueElement.innerText = currentValueElement.innerText + " " + operation
    }
  }
  currentValueElement.innerText = ""
}

function calculate() {
  let num1 = 0
  let num2 = parseFloat(currentValueElement.innerText)

  if (previousValueElement.innerText.length)
    num1 = parseFloat(previousValueElement.innerText.slice(0, -2))

  switch (operation) {
    case "+":
      console.log(num1, num2)
      previousValueElement.innerText = num1 + num2
      break
    case "-":
      previousValueElement.innerText = num1 - num2
      break
    case "*":
      previousValueElement.innerText = num1 * num2
      break
    case "÷":
      previousValueElement.innerText = num1 / num2
      break
    case "/":
      previousValueElement.innerText = num1 / num2
      break
  }
}

function subtotal() {
  if (operation && currentValueElement.innerText.length) {
    calculate()
    operation = undefined
    previousValueElement.innerText = "= " + previousValueElement.innerText
    currentValueElement.innerText = ""
  }
}

function clearData() {
  operation = undefined
  previousValueElement.innerText = ""
  currentValueElement.innerText = "0"
}

function flashButton(keyValue) {
  const keyboard = document.querySelectorAll("button")
  keyboard.forEach((key) => {
    if (key.innerText === keyValue) {
      key.style.backgroundColor = "rgba(255, 255, 255, 0.9)"
      setTimeout(() => (key.style.backgroundColor = "rgba(255, 255, 255, 0.75)"), 100)
    }
  })
}
