// ─── Estado global ────────────────────────────────────────────────────────────
let fullop = '';           // la expresión completa que se va armando
let justCalculated = false; // para saber si el último botón presionado fue "="
let history = [];           // arreglo de {expr, result} con el historial

// ─── Manejo de clicks en los botones ─────────────────────────────────────────
function handleClick(value) {
  const operadores = ['+', '-', 'x', '/', '^'];
  const ultimoChar = fullop.slice(-1);

  // si acabamos de calcular y el usuario escribe un número, empezamos de cero
  if (justCalculated) {
    if (!operadores.includes(value)) {
      fullop = '';
    }
    justCalculated = false;
  }

  // si hay dos operadores seguidos, reemplazamos el último (no queremos "3++2")
  if (operadores.includes(value) && operadores.includes(ultimoChar)) {
    fullop = fullop.slice(0, -1) + value;
  }
  // permitimos un signo negativo al inicio para números negativos
  else if (value === '-' && fullop === '') {
    fullop = '-';
  }
  // para el punto decimal: checar que el número actual no tenga ya uno
  else if (value === '.') {
    // separamos por operadores para ver solo el último número
    const partes = fullop.split(/[\+\-x\/\^]/);
    const numActual = partes[partes.length - 1];
    if (numActual.includes('.')) return; // ya tiene punto, no hacemos nada
    if (numActual === '' || numActual === '-') fullop += '0'; // "0." suena mejor que solo "."
    fullop += '.';
  }
  else {
    fullop += value;
  }

  mostrarEnPantalla(fullop);
}

// ─── Calcular el resultado ─────────────────────────────────────────────────────
function calculate() {
  if (!fullop || fullop === '-') return; // no hay nada que calcular

  // cambiamos la 'x' por '*' para que el evaluador la entienda
  let expr = fullop.replace(/x/g, '*');

  let resultado = evaluarExpresion(expr);

  if (resultado === null) return;

  // corregimos el ruido de punto flotante (ej: 0.1+0.2 no da 0.30000000004)
  if (typeof resultado === 'number') {
    resultado = parseFloat(resultado.toPrecision(12));
  }

  agregarAlHistorial(fullop, resultado);

  fullop = String(resultado);
  justCalculated = true;
  mostrarEnPantalla(resultado);
}

// Evalúa una expresión matemática en forma de string
// Soporta: +, -, *, /, ^ con números negativos y decimales
// La estrategia es reducir la expresión por precedencia usando regex
function evaluarExpresion(expr) {
  // orden de precedencia: primero potencias, luego * y /, luego + y -
  const precedencia = [
    /(-?\d+\.?\d*)(\^)(-?\d+\.?\d*)/,
    /(-?\d+\.?\d*)([\*\/])(-?\d+\.?\d*)/,
    /(-?\d+\.?\d*)([\+\-])(-?\d+\.?\d*)/
  ];

  let str = expr;

  for (const patron of precedencia) {
    // mientras haya una coincidencia con este patrón, seguimos reduciendo
    while (patron.test(str)) {
      str = str.replace(patron, (_, a, op, b) => {
        const n1 = parseFloat(a);
        const n2 = parseFloat(b);
        let res;

        switch (op) {
          case '+': res = n1 + n2; break;
          case '-': res = n1 - n2; break;
          case '*': res = n1 * n2; break;
          case '/':
            // división entre cero: error
            res = n2 === 0 ? null : n1 / n2;
            break;
          case '^': res = Math.pow(n1, n2); break;
          default:  res = null;
        }

        if (res === null) return 'Error';
        // los negativos necesitan paréntesis para no romper la siguiente iteración
        return res >= 0 ? String(res) : `(${res})`;
      });

      if (str === 'Error') {
        mostrarEnPantalla('Error');
        fullop = '';
        return null;
      }
    }
  }

  // quitamos paréntesis sobrantes del resultado final negativo
  str = str.replace(/^\((-?\d+\.?\d*)\)$/, '$1');

  const final = parseFloat(str);
  return isNaN(final) ? null : final;
}

// ─── Limpiar todo ─────────────────────────────────────────────────────────────
function handleClear() {
  fullop = '';
  justCalculated = false;
  mostrarEnPantalla('0');
}

// ─── Borrar el último carácter (backspace) ────────────────────────────────────
function handleBackspace() {
  if (justCalculated) {
    // si acabamos de calcular, limpiar todo
    fullop = '';
    justCalculated = false;
    mostrarEnPantalla('0');
    return;
  }
  fullop = fullop.slice(0, -1);
  mostrarEnPantalla(fullop || '0');
}

// ─── Cambiar el signo del último número ──────────────────────────────────────
function handleToggleSign() {
  if (!fullop || fullop === '0') return;

  // buscamos el último número en la expresión con regex
  const regexUltimoNum = /(-?\d+\.?\d*)$/;
  const match = fullop.match(regexUltimoNum);
  if (!match) return;

  const ultimoNum = match[1];
  // si ya es negativo, le quitamos el signo; si es positivo, se lo ponemos
  const negado = ultimoNum.startsWith('-') ? ultimoNum.slice(1) : '-' + ultimoNum;
  fullop = fullop.slice(0, -ultimoNum.length) + negado;
  mostrarEnPantalla(fullop);
}

// ─── Convertir a porcentaje ────────────────────────────────────────────────────
function handlePercent() {
  const regexUltimoNum = /(-?\d+\.?\d*)$/;
  const match = fullop.match(regexUltimoNum);
  if (!match) return;

  const ultimoNum = parseFloat(match[1]);
  // dividimos entre 100 y corregimos posible ruido de flotantes
  const porcentaje = parseFloat((ultimoNum / 100).toPrecision(12));
  fullop = fullop.slice(0, -match[1].length) + String(porcentaje);
  mostrarEnPantalla(fullop);
}

// ─── Historial ────────────────────────────────────────────────────────────────
function agregarAlHistorial(expr, resultado) {
  // reemplazamos los operadores internos por símbolos más bonitos para mostrar
  const exprBonita = expr
    .replace(/x/g, '×')
    .replace(/\//g, '÷')
    .replace(/\(/g, '')
    .replace(/\)/g, '');

  history.unshift({ expr: exprBonita, result: resultado });

  // máximo 20 entradas en el historial
  if (history.length > 20) history.pop();

  renderizarHistorial();
}

function renderizarHistorial() {
  const lista = document.getElementById('history-list');
  const badge = document.getElementById('history-badge');
  if (!lista) return;

  // actualizamos el contador del badge
  if (badge) badge.textContent = history.length;

  // mostramos hasta 8 entradas recientes
  lista.innerHTML = history.slice(0, 8).map((item, i) => `
    <div class="history-item" onclick="usarDelHistorial(${i})">
      <div class="history-expr">${item.expr}</div>
      <div class="history-res">= ${item.result}</div>
    </div>
  `).join('');
}

// al hacer click en un item del historial, cargamos ese resultado en la pantalla
function usarDelHistorial(index) {
  fullop = String(history[index].result);
  justCalculated = true;
  mostrarEnPantalla(fullop);
}

function clearHistory() {
  history = [];
  renderizarHistorial();
  // también reseteamos el badge a 0
  const badge = document.getElementById('history-badge');
  if (badge) badge.textContent = '0';
  const lista = document.getElementById('history-list');
  if (lista) lista.innerHTML = '<div class="history-empty">Sin operaciones aún</div>';
}

// ─── Actualizar la pantalla ────────────────────────────────────────────────────
function mostrarEnPantalla(n) {
  const pantalla = document.getElementById('screen');
  if (!pantalla) return;

  let texto = String(n);

  // cambiamos operadores internos por sus símbolos visuales
  texto = texto
    .replace(/x/g, '×')
    .replace(/\//g, '÷')
    .replace(/\^/g, '^');

  pantalla.textContent = texto || '0';

  // si la expresión es larga, reducimos el tamaño de fuente para que quepa
  const largo = texto.length;
  if (largo > 16)      pantalla.style.fontSize = '16px';
  else if (largo > 12) pantalla.style.fontSize = '20px';
  else if (largo > 8)  pantalla.style.fontSize = '26px';
  else                 pantalla.style.fontSize = '32px';
}

// ─── Soporte de teclado ────────────────────────────────────────────────────────
document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9')  handleClick(e.key);
  else if (e.key === '+')            handleClick('+');
  else if (e.key === '-')            handleClick('-');
  else if (e.key === '*')            handleClick('x');
  else if (e.key === '/') { e.preventDefault(); handleClick('/'); }
  else if (e.key === '^')            handleClick('^');
  else if (e.key === '.')            handleClick('.');
  else if (e.key === 'Enter' || e.key === '=') calculate();
  else if (e.key === 'Backspace')    handleBackspace();
  else if (e.key === 'Escape')       handleClear();
  else if (e.key === '%')            handlePercent();
});