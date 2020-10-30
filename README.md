# Sudoku Solver
![alt text](./screenshot.png)
## Description
This is a sudoku solver using the backtracking algorithm. It reads from a txt file and tries to solve the board recursively.

## Run
### To run the solver
```
node SudokuSolver.js ./testBoards/Easy.txt # solve an easy board
node SudokuSolver.js ./testBoards/Hard.txt # solve a hard board
node SudokuSolver.js ./testBoards/Unsolable.txt # try an unsolvable board
node SudokuSolver.js ./testBoards/... # try other boards
```
## Tests
### To run the Unit tests
```
mocha ./tests/SudokuSolver.test.js 
```
### To run the Integrated tests
```
./RunIntTests.sh
```
NOTE: the test results are redirected in result.txt