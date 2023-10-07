let expression = [""];
let display = document.getElementById("display");

function getNumber(num) {
  expression.push(num);
  display.value = expression.join("");
}

function getOperator(operator) {
  expression.push(operator);
  display.value = expression;
}
function calculateDisplay() {
  let string = document.querySelector("#display").value;
  let result = processEquation(string);
  document.querySelector("#display").value = result;
}
function processEquation(expression) {  /// the expression inside the parameter is different from the expression above
  var match = expression.match(/\*|\/|\+|\-|\^/gims) || [];
  while (match.length > 0) {
    expression = expression
      .replace(/\((.*?)\)/gims, (_, s) => {
        return processEquation(s);
      })
      .replace(/([0-9\.\-]+)\^([0-9\.\-]+)/gims, (_, n1, n2) => {
        return Math.pow(n1, n2);
      })
      .replace(/([0-9\.\-]+)(\*|\/)([0-9\.\-]+)/gims, (_, n1, o, n2) => {
        return o == "*" ? Number(n1) * Number(n2) : Number(n1) / Number(n2);
      })
      .replace(/([0-9\.\-]+)(\-|\+)([0-9\.\-]+)/gims, (_, n1, o, n2) => {
        return o == "+" ? Number(n1) + Number(n2) : Number(n1) - Number(n2);
      });
    match = expression.match(/\*|\/|\+|\-/gims) || [];
  }
  return expression;
}

function clearDisplay() {
  document.getElementById("display").value = "";
  expression = [""];
}
