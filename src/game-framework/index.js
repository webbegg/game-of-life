class GameFramework {
  constructor(rows, cols) {
    this.rows = rows || 10
    this.cols = cols || 10
  }

  initialize() {
    this.grid = this.buildGrid(this.rows, this.cols)

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        this.grid[row][col] = Math.floor(Math.random() * 2)
      }
    }
  }

  update() {
    const nextGrid = this.buildGrid(this.rows, this.cols)

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const cell = this.grid[row][col]
        const numNeighbours = this.cellNeighbours(row, col)
        nextGrid[row][col] = this.isAlive(cell, numNeighbours)
      }
    }

    this.grid = nextGrid
  }

  buildGrid(rows, cols) {
    const grid = new Array(rows).fill(0)
    for (let row = 0; row < rows; row++) {
      grid[row] = new Array(cols).fill(0)
    }

    return grid
  }

  getCell(row, col) {
    row = (row + this.rows) % this.rows
    col = (col + this.cols) % this.cols

    return this.grid[row][col] || 0
  }

  cellNeighbours(row, col) {
    let neighbours = 0

    neighbours += this.getCell(row - 1, col) // TOP
    neighbours += this.getCell(row - 1, col + 1) // TOPRIGHT
    neighbours += this.getCell(row, col + 1) // RIGHT
    neighbours += this.getCell(row + 1, col + 1) // BOTTOMRIGHT
    neighbours += this.getCell(row + 1, col) // BOTTOM
    neighbours += this.getCell(row + 1, col - 1) // BOTTOMLEFT
    neighbours += this.getCell(row, col - 1) // LEFT
    neighbours += this.getCell(row - 1, col - 1) // TOPLEFT

    return neighbours
  }

  isAlive(cell, neighbours) {
    if (!Boolean(cell) && neighbours === 3) return 1
    else if (Boolean(cell) && (neighbours < 2 || neighbours > 3)) return 0
    else return cell
  }
}

module.exports = GameFramework
