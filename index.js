let expression = "";
let display = document.getElementById("display");

function getNumber(num) {
  expression += num;
  display.value = expression;
}

function getOperator(operator) {
  expression += operator;
  display.value = expression;
}
function calculateDisplay() {
  let string = document.querySelector("#display").value;
  let result = processEquation(string);
  document.querySelector("#display").value = result;
}
function processEquation(expression) {
  const operators = [];
  const operands = [];

  const precedence = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
  };

  const tokens = expression.match(/\d+|[\+\-\*\/\(\)]/g);

  for (let token of tokens) {
    if (token.match(/\d+/)) {
      operands.push(parseFloat(token));
    } else if (token.match(/[\+\-\*\/]/)) {
      while (
        operators.length > 0 &&
        precedence[operators[operators.length - 1]] >= precedence[token]
      ) {
        const operator = operators.pop();
        const rightOperand = operands.pop();
        const leftOperand = operands.pop();
        operands.push(applyOperator(leftOperand, operator, rightOperand));
      }
      operators.push(token);
    } else if (token === "(") {
      operators.push(token);
    } else if (token === ")") {
      while (operators.length > 0 && operators[operators.length - 1] !== "(") {
        const operator = operators.pop();
        const rightOperand = operands.pop();
        const leftOperand = operands.pop();
        operands.push(applyOperator(leftOperand, operator, rightOperand));
      }
      operators.pop(); // Remove the opening parenthesis
    }
  }

  while (operators.length > 0) {
    const operator = operators.pop();
    const rightOperand = operands.pop();
    const leftOperand = operands.pop();
    operands.push(applyOperator(leftOperand, operator, rightOperand));
  }

  if (operands.length !== 1 || operators.length !== 0) {
    throw new Error("Invalid Expression");
  }

  return operands[0];
}

function applyOperator(leftOperand, operator, rightOperand) {
  switch (operator) {
    case "+":
      return leftOperand + rightOperand;
    case "-":
      return leftOperand - rightOperand;
    case "*":
      return leftOperand * rightOperand;
    case "/":
      if (rightOperand === 0) {
        throw new Error("Division by zero");
      }
      return leftOperand / rightOperand;
    default:
      throw new Error("Invalid Operator");
  }
}

function clearDisplay() {
  document.getElementById("display").value = "";
  expression = "";
}
