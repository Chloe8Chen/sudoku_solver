const { Console } = require('console')
const fs = require('fs')
const EMPTY_SPOT = '.'
let board = []
let complexity = 0

/**
 * This reads the file and tries to solve the Sudoku board
 */
function run () {
  var myArgs = process.argv.slice(2)
  if (myArgs.length < 1) {
    console.log('Please pass in a file path to the unsolved board!')
    return
  }

  if (!fs.existsSync(myArgs[0])) {
    console.log('File ' + myArgs[0] + ' does not exist!')
    return
  }

  board = readFile(myArgs[0])
  if (!isBoardValid(board)) {
    return console.log('This is an invalid board!')
  }

  // tries to solve board by trying from 1 to 9
  // if board is solved, tries to solve again by trying from 9 to 1
  // if solutions found both times are the same, then board is solved
  // and there is only one solution
  // overwise board is unsolvable or have more than one solutions
  if (canSolve(0, 0, false, board)) {
    const boardNew = board
    board = readFile(myArgs[0])
    canSolve(0, 0, true, board)
    if (hasOneSolution(board, boardNew)) {
      if (complexity > 30000) {
        console.log('LEVEL: HARD')
      } else {
        console.log('LEVEL: EASY')
      }
      printBoard(board)
    } else {
      console.log('There is more than one solution for this Sudoku board!')
    }
  } else {
    console.log('There is no solution!')
  }
}

/**
 * Reads the file content and builds the board
 * @param {string} file - The path to file
 */
function readFile (file) {
  const board = []
  const data = fs.readFileSync(file, { encoding: 'utf-8' })
  data.split('\n').forEach(line => {
    const row = []
    for (let i = 0; i < line.length; i++) {
      row.push(line.charAt(i))
    }
    board.push(row)
  })
  return board
}

/**
 * This checks to see if there is only one solution
 */
function hasOneSolution (board1, board2) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board1[i][j] != board2[i][j]) {
        return false
      }
    }
  }
  return true
}

/**
 * This is the recursive method that uses backtracking algorithm to solve the sudoku board
 * @param {*} row the current row on the board
 * @param {*} col the current column on the board
 * @param {*} reverse true if we want to try solving the board by trying from 9 to 1
 */
function canSolve (row, col, reverse, board) {
  if (col == board[row].length) {
    col = 0
    row++
    if (row == 9) {
      return true
    }
  }

  if (board[row][col] != EMPTY_SPOT) {
    return canSolve(row, col + 1, reverse, board)
  }

  if (reverse) {
    for (let i = 9; i >= 1; i--) {
      if (canPlace(row, col, i, board)) {
        board[row][col] = i
        if (canSolve(row, col + 1, reverse, board)) {
          return true
        }
        board[row][col] = EMPTY_SPOT
      }
    }
  } else {
    for (let i = 1; i <= 9; i++) {
      complexity++
      if (canPlace(row, col, i, board)) {
        board[row][col] = i
        if (canSolve(row, col + 1, reverse, board)) {
          return true
        }
        board[row][col] = EMPTY_SPOT
      }
    }
  }
  return false
}

/**
 * This checks if the board is valid
 */
function isBoardValid (board) {
  let wrongLength = false
  for (let i = 0; i < 9; i++) {
    if (board[i].length != 9) {
      wrongLength = true
      break
    }
  }
  if (9 !== 9 || wrongLength) {
    return false
  }
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] != EMPTY_SPOT) {
        if (!canPlace(row, col, board[row][col], board)) {
          return false
        }
      }
    }
  }
  return true
}

/**
 * This check if the placement on the current cell is valid
 * the placement is valid when the placement is unique
 *    * in its row
 *    * in its column
 *    * in its subgrid
 * @param {*} r current row on the board
 * @param {*} c current column on the board
 * @param {*} p the placement to try in the cell
 */
function canPlace (r, c, p, board) {
  for (let i = 0; i < 9; i++) {
    if (i != c && p == board[r][i]) {
      return false
    }
  }

  for (let i = 0; i < 9; i++) {
    if (i != r && p == board[i][c]) {
      return false
    }
  }
  // calculate the vertical and horizontal index of the placement in the subgrid
  const subSize = 3
  const vIndex = Math.floor(r / subSize)
  const hIndex = Math.floor(c / subSize)

  for (let i = 0; i < subSize; i++) {
    for (let j = 0; j < subSize; j++) {
      if (((subSize * vIndex + i) != r && (subSize * hIndex + j) != c) && p == board[subSize * vIndex + i][subSize * hIndex + j]) {
        return false
      }
    }
  }

  return true
}

/**
 * this print the board in a prettier format
 */
function printBoard (board) {
  const seporator = '----------------------'
  const subSize = Math.sqrt(9)
  board.forEach(b => {
    let line = []
    line += '|'
    for (let i = 0; i < b.length; i++) {
      line += b[i] + ' '
      if ((i + 1) % subSize == 0) {
        line += '|'
      }
    }
    if ((board.indexOf(b)) % subSize == 0) {
      console.log(seporator)
    }
    console.log(line)
  })
  console.log(seporator)
}

run()

module.exports = { board, readFile, hasOneSolution, canSolve, isBoardValid, canPlace }
