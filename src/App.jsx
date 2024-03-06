import { useState } from "react" // Nota este Hook es asincrono su ejecucion no va en bloque asi que no es correcto pensar que funciona en bloque con otras funciones que si son sincronas

const TURNS = {
  X: 'x',
  O: 'o'
}

const Square = ({ children, isSelected, updateBoard, index }) => {

  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className} >
      {children}
    </div>
  )
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 6, 6]
]

function App() {

  const [board, setBoard] = useState(
    Array(9).fill(null))      //se crea un array de 9 posiciones con el valor null en cada posicion

  const [turn, setTurn] = useState(TURNS.X) //inicializa con el estado del objeto TURNS en su propiedad X osea un string con 'x' 
  const [winner, setWinner] = useState(null) // null no hay ganador, false empate

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (
        boardToCheck[a] && 
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return (
          boardToCheck[a]
        )
      }
    }
    return null
  }

  const updateBoard = (index) => {
    if (board[index] || winner) return
    // actualizar el tablero
    const newBoard = [...board] // se utiliza la spread sintaxis para clonar el board, esto es necesario porque no puedo manipular la variable 'board' directamente sin usar setBoard
    newBoard[index] = turn  // se le asigna a la casilla que se clico el turno que se jugo
    setBoard(newBoard)    // se actualiza el hook para que react actualice la pantalla
    // actualizar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // revisar si hay un ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
      alert(`gano ${newWinner}`)
      
    }
  }

  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
      <section className="game" >
        {
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
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
    </main>

  )
}

export default App
