let fullop = '';
let history = [];

function handleClick(value) {
  const operators = ['+', '-', 'x', '/', '^'];
  const lastChar = fullop.slice(-1);
  
  if (operators.includes(value) && operators.includes(lastChar)) {
      fullop = fullop.slice(0, -1) + value;
  } else {
      fullop += value;
  }
  
  showNumber(fullop);
}

function calculate() {
  const regex = /(-?\d+\.?\d*)([\+\-x\/\^])(-?\d+\.?\d*)/;
  const match = fullop.match(regex);

  if (!match) {
      console.log("Expresión inválida");
      return;
  }

  const a = parseFloat(match[1]);
  const op = match[2];
  const b = parseFloat(match[3]);
  
  let res;

  switch (op) {
    case '+':
      res = a + b;
      break;
    case '-':
      res = a - b;
      break;
    case 'x':
      res = a * b;
      break;
    case '/':
      res = b === 0 ? 'Error' : a / b;
      break;
    case '^':
      res = Math.pow(a, b);
      break;
    default:
      break;
  }

  addToHistory(fullop, res);

  fullop = String(res);
  showNumber(res);
}

function addToHistory(operation, result) {
    const historyContainer = document.getElementById('history');
    if (historyContainer) {
        const p = document.createElement('p');
        p.textContent = `${operation} = ${result}`;
        historyContainer.prepend(p);
    }
}

function handleClear() {
  fullop = '';
  showNumber('0');
}

function showNumber(n) {
  document.getElementById('screen').innerHTML = n;
}