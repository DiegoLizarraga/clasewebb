let fullop = '';

function handleClick(number) {
  console.log(number);

  fullop = fullop + number;
  showNumber(fullop);
}

function calculate() {
  console.log({ fullop });
  const [a, op, b] = fullop.split(/(\+|-|x|\/)/gm);
  console.log({ a, op, b });

  let res;

  switch (op) {
    case '+':
      res = Number(a) + Number(b);
      break;
    case '-':
      res = Number(a) - Number(b);
      break;
    case 'x':
      res = Number(a) * Number(b);
      break;
    case '/':
      res = Number(a) / Number(b);
      break;
    default:
      break;
  }

  fullop = String(res);
  showNumber(res);
}

function handleClear() {
  fullop = '';
  showNumber('0');
}

function showNumber(n) {
  document.getElementById('screen').innerHTML = n;
}