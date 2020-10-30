const solver = require('../SudokuSolver')
require('should')

describe('SudokuSolver ', function () {
  it('should read file ', function () {
    const result = solver.readFile('./testBoards/Easy.txt')
    result.length.should.equal(9)
  })
  it('should validate when board is invalid', function () {
    const B = solver.readFile('./testBoards/InvalidFormat.txt')
    const isValid = solver.isBoardValid(B)
    isValid.should.equal(false)
  })
  it('should validate when board is valid', function () {
    const B = solver.readFile('./testBoards/Easy.txt')
    const isValid = solver.isBoardValid(B)
    isValid.should.equal(true)
  })
  it('should validate when board has invalid number', function () {
    const B = solver.readFile('./testBoards/InvalidNumber.txt')
    const isValid = solver.isBoardValid(B)
    isValid.should.equal(false)
  })

  it('should return true if it can place', function () {
    const board = solver.readFile('./testBoards/Easy.txt')
    const solved = solver.canPlace(0, 0, 9, board)
    solved.should.equal(true)
  })
  it('should return false if it cannot place', function () {
    const board = solver.readFile('./testBoards/Easy.txt')
    const solved = solver.canPlace(0, 0, 1, board)
    solved.should.equal(false)
  })

  it('should return true if 2 boards are the same', function () {
    const board1 = solver.readFile('./testBoards/Easy.txt')
    const board2 = solver.readFile('./testBoards/Easy.txt')
    const hasOneSolution = solver.hasOneSolution(board1, board2)
    hasOneSolution.should.equal(true)
  })

  it('should return false if 2 boards are different', function () {
    const board1 = solver.readFile('./testBoards/Easy.txt')
    const board2 = solver.readFile('./testBoards/Hard.txt')
    const hasOneSolution = solver.hasOneSolution(board1, board2)
    hasOneSolution.should.equal(false)
  })

  it('should return true if it can be solved', function () {
    const board = solver.readFile('./testBoards/Solved.txt')
    const solved = solver.canSolve(0, 0, false, board)
    solved.should.equal(true)
  })

  it('should return false if it cannot be solved', function () {
    const board = solver.readFile('./testBoards/Unsolvable.txt')
    const solved = solver.canSolve(0, 0, false, board)
    solved.should.equal(false)
  })

  it('should return true if it can be solved and is reversed', function () {
    const board = solver.readFile('./testBoards/Easy.txt')
    const solved = solver.canSolve(0, 0, true, board)
    solved.should.equal(true)
  })

  it('should return false if it cannot be solved and is reversed', function () {
    const board = solver.readFile('./testBoards/Unsolvable.txt')
    const solved = solver.canSolve(0, 0, true, board)
    solved.should.equal(false)
  })
})
