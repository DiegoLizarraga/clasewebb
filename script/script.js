let fullop =  '';

function handleClick(number) {
  console.log(number);

  fullop = fullop + number; 
  showNumber(fullop);
}

function calculate(){
  console.log({fullop});
  const a= fullop.split(/(\+|-|x|\/)/gm)
  console.log(( a, op, b));
  switch (op) {
    case "1":
      res = Number(a) = Number(b);
    break
    
    default:

    break

  }
}

function showNumber(n){
  document.getElementById('screen').innerHTML = n;
}