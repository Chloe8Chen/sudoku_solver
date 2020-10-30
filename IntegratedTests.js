const exec = require('child_process').execSync
const { Console } = require('console')
const should = require('should')

const MORE_SOLUTIONS = 'There is more than one solution for this Sudoku board!'
const INVALID_BOARD = 'This is an invalid board!'
const UNSOLVABLE_BOARD = 'There is no solution!'

const EASY_OUTPUT = [
  'LEVEL: EASY',
  '----------------------',
  '|5 1 6 |7 2 9 |4 8 3 |',
  '|8 7 3 |4 1 6 |9 2 5 |',
  '|9 4 2 |8 3 5 |7 6 1 |',
  '----------------------',
  '|3 9 8 |5 7 4 |6 1 2 |',
  '|2 5 7 |9 6 1 |3 4 8 |',
  '|1 6 4 |2 8 3 |5 7 9 |',
  '----------------------',
  '|4 3 1 |6 9 8 |2 5 7 |',
  '|6 2 9 |1 5 7 |8 3 4 |',
  '|7 8 5 |3 4 2 |1 9 6 |',
  '----------------------',
  ''
]

const HARD_OUTPUT = [
    'LEVEL: HARD',
    '----------------------',
    '|7 5 6 |2 9 1 |8 4 3 |',
    '|2 9 3 |4 6 8 |5 7 1 |',
    '|4 1 8 |5 7 3 |6 2 9 |',
    '----------------------',
    '|3 4 5 |6 2 7 |1 9 8 |',
    '|9 7 1 |3 8 4 |2 6 5 |',
    '|6 8 2 |9 1 5 |4 3 7 |',
    '----------------------',
    '|1 2 9 |8 3 6 |7 5 4 |',
    '|5 3 7 |1 4 2 |9 8 6 |',
    '|8 6 4 |7 5 9 |3 1 2 |',
    '----------------------',
    ''
  ]

  const SOLVED_OUTPUT = [
    'LEVEL: EASY',
    '----------------------',
    '|2 5 6 |4 8 9 |1 7 3 |',
    '|3 7 4 |6 1 5 |9 8 2 |',
    '|9 8 1 |7 2 3 |4 5 6 |',
    '----------------------',
    '|5 9 3 |2 7 4 |8 6 1 |',
    '|7 1 2 |8 3 6 |5 4 9 |',
    '|4 6 8 |5 9 1 |3 2 7 |',
    '----------------------',
    '|6 3 5 |1 4 7 |2 9 8 |',
    '|1 2 7 |9 5 8 |6 3 4 |',
    '|8 4 9 |3 6 2 |7 1 5 |',
    '----------------------',
    ''  
  ]
  
function TestInvalidFormat (testFile) {
  console.log('--------------------')
  console.log('Running test: ' + TestInvalidFormat.name)
  const result = runScript(testFile)
  const isPass = validateEquals(INVALID_BOARD, result[0], 'validated that the board is in invalid format')
  checkResults(isPass, TestInvalidFormat.name)
  console.log('--------------------')
}

function TestWrongPath (testFile) {
    console.log('--------------------')
    console.log('Running test: ' + TestWrongPath.name)
    const result = runScript(testFile)
    let msg = 'File ' + testFile + ' does not exist!'
    const isPass = validateEquals(msg, result[0], 'validated that path is wrong')
    checkResults(isPass, TestWrongPath.name)
    console.log('--------------------')
  }
  
function TestInvalidNumber (testFile) {
  console.log('--------------------')
  console.log('Running test: ' + TestInvalidNumber.name)
  const result = runScript(testFile)
  const isPass = validateEquals(INVALID_BOARD, result[0], 'validated that the board has invalid number')
  checkResults(isPass, TestInvalidNumber.name)
  console.log('--------------------')
}

function TestInsufficientInput (testFile) {
    console.log('--------------------')
    console.log('Running test: ' + TestInsufficientInput.name)
    const result = runScript(testFile)
    const isPass = validateEquals(MORE_SOLUTIONS, result[0], 'validated that the there is more than one solution for insufficent input')
    checkResults(isPass, TestInsufficientInput.name)
    console.log('--------------------')
  }
  
  function TestAmbiguousBoard (testFile) {
    console.log('--------------------')
    console.log('Running test: ' + TestAmbiguousBoard.name)
    const result = runScript(testFile)
    const isPass = validateEquals(MORE_SOLUTIONS, result[0], 'validated that the there is more than one solution for ambiguous board')
    checkResults(isPass, TestAmbiguousBoard.name)
    console.log('--------------------')
  }

  function TestEasy (testFile) {
  console.log('--------------------')
  console.log('Running test: ' + TestEasy.name)
  const result = runScript(testFile)
  const isPass = validateEquals(EASY_OUTPUT, result, 'validated the solution of easy board')
  checkResults(isPass, TestEasy.name)
  console.log('--------------------')
}

function TestHard (testFile) {
    console.log('--------------------')
    console.log('Running test: ' + TestHard.name)
    const result = runScript(testFile)
    const isPass = validateEquals(HARD_OUTPUT, result, 'validated the solution of hard board')
    checkResults(isPass, TestHard.name)
    console.log('--------------------')
  }

  function TestUnsolvable (testFile) {
    console.log('--------------------')
    console.log('Running test: ' + TestUnsolvable.name)
    const result = runScript(testFile)
    const isPass = validateEquals(UNSOLVABLE_BOARD, result[0], 'validated for unsolvable board')
    checkResults(isPass, TestUnsolvable.name)
    console.log('--------------------')
  }

  function TestSolved (testFile) {
    console.log('--------------------')
    console.log('Running test: ' + TestSolved.name)
    const result = runScript(testFile)
    const isPass = validateEquals(SOLVED_OUTPUT, result, 'validated the solution of solved board')
    checkResults(isPass, TestSolved.name)
    console.log('--------------------')
  }

  function runScript (file) {
  const result = exec('node SudoKuSolver.js ' + file)
  return result.toString('utf-8').split('\n')
}

function validateEquals (expected, actual, message) {
  console.log(message)
  try {
    should.deepEqual(actual, expected)
  } catch (err) {
    return false
  }
  return true
}

function checkResults (pass, test) {
  if (pass) {
    console.log('Test ' + test + ' PASSED!')
  } else {
    console.log('Test ' + test + ' FAILED!')
  }
}

console.log('#################################')
console.log('#       INTEGRATED TESTS        #')
console.log('#################################')
TestInvalidFormat('./testBoards/InvalidFormat.txt')
TestInvalidNumber('./testBoards/InvalidNumber.txt')
TestEasy('./testBoards/Easy.txt')
TestHard('./testBoards/Hard.txt')
TestUnsolvable('./testBoards/Unsolvable.txt')
TestSolved('./testBoards/Solved.txt')
TestInsufficientInput('./testBoards/InsufficientInput.txt')
TestAmbiguousBoard('./testBoards/AmbiguousBoard.txt')
TestWrongPath('./wrongpath')