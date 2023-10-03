var Value = [];
var firstNum;
var secondNum;
var operation = "";
var secondNumberTrigger = 0;
var result = 0;

function update(value) {
  display.value += value;
  if (secondNumberTrigger === 0) {
    Value.push(value);
    firstNum = Number(Value.join(""));

    return firstNum;
  } else {
    Value.push(value);
    secondNum = Number(Value.join(""));
    return secondNum;
  }
}

function operator(optr) {
  display.value += optr;
  Value = [""];
  operation = optr;
  secondNumberTrigger = 1;
  return operation;
}

function calculate() {
  if (operation === "+") {
    result = firstNum + secondNum;
    display.value = result;
    //   } else if (operation === "/") {
    //     result = firstNum / secondNum;
    //     display.value = result;
    //   } else if (operation === "-") {
    //     result = firstNum - secondNum;
    //     display.value = result;
    //   }
  }
}
