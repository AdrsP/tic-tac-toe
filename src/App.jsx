import { useState } from "react"       // Nota este Hook es asincrono su ejecucion no va en bloque asi que no es correcto pensar que funciona en bloque con otras funciones que si son sincronas
import confetti from "canvas-confetti" // Efecto de confeti para el ganador (se debe instalar la biblioteca canvas npm install canvas-confetti -E en el terminal gitBash)
import { Square } from "./components/Square.jsx"
import { checkWinnerFrom, checkEndGame } from "./logic/board.js"
import { TURNS } from "./components/constants.js"
import { WinnerModal } from "./components/WinnerModal.jsx"

function App() {

  const [board, setBoard] = useState(()=>{
    const boardFromLocalStorage = window.localStorage.getItem('board')
    return boardFromLocalStorage ? JSON.parse(boardFromLocalStorage) :
    Array(9).fill(null)                      //se crea un array de 9 posiciones con el valor null en cada posicion
  })                    
  const [turn, setTurn] = useState(() => {
    const turnFromLocalStorage = window.localStorage.getItem('turn')
    return turnFromLocalStorage ? JSON.parse(turnFromLocalStorage) :
    TURNS.X //inicializa con el estado del objeto TURNS en su propiedad X osea un string con 'x' 
  }
  )  
  const [winner, setWinner] = useState(null) // null no hay ganador, false empate

  const resetGame = () => {                  // esta funcion debe reiniciar todos los hooks a su estado inicial
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')

  }

  const updateBoard = (index) => {
    if (board[index] || winner) return
    // actualizar el tablero
    const newBoard = [...board] // se utiliza la spread sintaxis para clonar el board, esto es necesario porque no puedo manipular la variable 'board' directamente sin usar setBoard
    newBoard[index] = turn      // se le asigna a la casilla que se clico el turno que se jugo
    setBoard(newBoard)          // se actualiza el hook para que react actualice la pantalla
    // actualizar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // guardar partida 
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', JSON.stringify(newTurn))
    // revisar si hay un ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      setWinner(newWinner)
      confetti()
    } else if (checkEndGame(newBoard)) {
      setWinner(false) //empate
    }
  }

  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
      <section><button onClick={resetGame}>Reinicio</button></section>
      <section className="game" >
        {
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>

  )
}

export default App
