import { useState } from "react";
import confetti from "canvas-confetti";
import { Square } from "./components/Square"
import { TURNS } from "./components/constants";
import { checkWinnerFrom } from "./logic/board";



function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null) //null no hay ganadory false empate

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const checkEndgame = (newBoard) => {
    return newBoard.every(square => square !== null)
  }

  const updateBoard = (index) => {
    if (board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
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
