import { useState } from "react";
import confetti from "canvas-confetti";
import { Square } from "./components/Square"
import { TURNS } from "./components/constants";
import { checkWinnerFrom } from "./logic/board";



function App() {

  const socket = new WebSocket('ws://localhost:8081');
  socket.onopen = () => {
    console.log('Conectado al servidor WebSocket');
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
  
    if (data.type === 'state') {
      // Inicializar el estado del tablero
      setBoard(data.gameState);
    } else if (data.type === 'move') {
      // Actualizar el estado del juego
      setBoard(data.gameState);
    }
  };

  const [board, setBoard] = useState(() => {
    const boardFromLocalStorage = window.localStorage.getItem('board')
    return boardFromLocalStorage ? JSON.parse(boardFromLocalStorage) : Array(9).fill(null)
  })
  const [turn, setTurn] = useState(
    () => {
      const turnFromStorage = window.localStorage.getItem('turn')
      return turnFromStorage ?? TURNS.X
    }
  )
  const [winner, setWinner] = useState(null) //null no hay ganadory false empate

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  const checkEndgame = (newBoard) => {
    return newBoard.every(square => square !== null)
  }

  const guardarPartida = (newBoard, newTurn) => {
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)
  }

  const updateBoard = (index) => {
    if (board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    //Luego de setear el nuevo board lo envío al socket para que el otro  jugador lo reciba
    socket.send(JSON.stringify({ type: 'move', index, player: turn }));
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    guardarPartida(newBoard, newTurn)

    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndgame(newBoard)) {
      setWinner(false)
    }
  }

  return (
    <main className="board">
      <h1>TRIKI</h1>
      <button onClick={ resetGame }>Volver a empezar</button>
      <section className="game">
        {
          board.map((_, index) => {
            return (
              <Square
                key={ index }
                index={ index }
                updateBoard={ updateBoard }
              >
                { board[index] }
              </Square>
            )
          })
        }
      </section>
      <section className="turn">
        <Square isSelected={ turn === TURNS.X }>
          { TURNS.X }
        </Square>
        <Square isSelected={ turn === TURNS.O }>
          { TURNS.O }
        </Square>
      </section>
      {
        winner !== null &&
        <section className="winner">
          <div className="text">
            <h2>
              {
                winner === false
                  ? 'Empate'
                  : 'Ganó: '
              }
            </h2>

            <header className="win">
              { winner && <Square>{ winner }</Square> }
            </header>

            <footer>
              <button onClick={ resetGame }>Empezar de nuevo</button>
            </footer>

          </div>
        </section>

      }
    </main>
  );
}

export default App
