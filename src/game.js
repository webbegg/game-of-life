import GameFramework from './game-framework'

import './game.css'

const fps = 30
const rows = 80
const cols = 80
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const game = new GameFramework(rows, cols)

function startGame() {
  game.initialize()
  setInterval(() => {
    clear()
    update()
    game.update()
  }, 1000 / fps)
}

function clear() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

function update() {
  const cellHeight = canvas.height / rows
  const cellWidth = canvas.width / cols

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cell = game.getCell(row, col)
      let color = cell ? '#000000' : '#ffffff'
      ctx.fillStyle = color
      ctx.fillRect(
        row * cellWidth,
        col * cellHeight,
        cellWidth - 1,
        cellHeight - 1
      )
    }
  }
}

startGame()
