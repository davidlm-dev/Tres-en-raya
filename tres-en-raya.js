const Tablero = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
];

let jugadorActual = 'X';

function mostrarTablero() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.textContent = Tablero[i][j];
            cell.addEventListener('click', () => hacerMovimiento(i, j), { once: true });
            boardElement.appendChild(cell);
        }
    }
}

function actualizarMensaje(mensaje) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = mensaje;
}

function hacerMovimiento(row, col) {
    if (Tablero[row][col] === ' ') {
        Tablero[row][col] = jugadorActual;
        mostrarTablero();

        if (verificarGanador()) {
            actualizarMensaje(`¡Jugador ${jugadorActual} ha ganado!`);
            mostrarBotonReiniciar();
            return;
        }

        if (estaLleno()) {
            actualizarMensaje('¡El juego ha terminado en empate!');
            mostrarBotonReiniciar();
            return;
        }

        jugadorActual = jugadorActual === 'X' ? 'O' : 'X';
    }
}

function verificarGanador() {
    for (let i = 0; i < 3; i++) {
        if (Tablero[i][0] === Tablero[i][1] && Tablero[i][1] === Tablero[i][2] && Tablero[i][0] !== ' ') {
            return true;
        }
        if (Tablero[0][i] === Tablero[1][i] && Tablero[1][i] === Tablero[2][i] && Tablero[0][i] !== ' ') {
            return true;
        }
    }
    if (Tablero[0][0] === Tablero[1][1] && Tablero[1][1] === Tablero[2][2] && Tablero[0][0] !== ' ') {
        return true;
    }
    if (Tablero[0][2] === Tablero[1][1] && Tablero[1][1] === Tablero[2][0] && Tablero[0][2] !== ' ') {
        return true;
    }
    return false;
}

function estaLleno() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (Tablero[i][j] === ' ') {
                return false;
            }
        }
    }
    return true;
}

function mostrarBotonReiniciar() {
    const resetBtn = document.getElementById('resetBtn');
    resetBtn.style.display = 'block';
}

function reiniciarJuego() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            Tablero[i][j] = ' ';
        }
    }
    jugadorActual = 'X';
    mostrarTablero();
    actualizarMensaje('Es el turno del Jugador X');
    document.getElementById('resetBtn').style.display = 'none';
}

mostrarTablero();
actualizarMensaje('Es el turno del Jugador X');
