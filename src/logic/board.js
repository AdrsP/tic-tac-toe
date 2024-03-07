import { WINNER_COMBOS } from "../components/constants"

export const checkWinnerFrom = (boardToCheck) => {  //checkWinner va a revisar cada una de las combinaciones
    for (const combo of WINNER_COMBOS) {            // de combos en el Array de Arrays WINNER_COMBOS
      const [a, b, c] = combo                       // para verificar si hay una condicion ganadora
      if (
        boardToCheck[a] && 
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return (                            // de cumplirse esto retorna el valor del tablero
          boardToCheck[a]                   // que contiene una casilla de la combinacion
        )
      }
    }
    return null                             // si no encuentra ninguna combinacion ganadora al terminar el ciclo for retorna null
  }

  export const checkEndGame = (boardToCheck) => {          // revisa si acabo el juego, todas las casillas ocupadas
    return boardToCheck.every((square) => square !== null) // la funcion every revisa todos los elementos del board => casillas segun la condicion dada que ninguna casilla contenga un null
  }                                                        // la evaluacion al final retorna un booleano true or false dependiendo si todas las casillas cumplen la condicion