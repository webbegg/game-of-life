const GameFramework = require('../src/game-framework')

describe('Game framework', () => {
  const game = new GameFramework()

  describe('isAlive method', () => {
    test('expect dead cell with no neighbours should return 0', () => {
      expect(game.isAlive(0, 0)).toEqual(0)
    })
    test('expect dead cell with 3 neighbours should return 1', () => {
      expect(game.isAlive(0, 3)).toEqual(1)
    })
    test('expect live cell with no neighbours should return 0', () => {
      expect(game.isAlive(1, 0)).toEqual(0)
    })
    test('expect live cell with 2 neighbours should return 1', () => {
      expect(game.isAlive(1, 2)).toEqual(1)
    })
  })

  describe('buildGrid method', () => {
    test('should draw a grid of 3 rows and 3 cols', () => {
      expect(game.buildGrid(3, 3)).toEqual([
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ])
    })
    test('should draw a grid of 2 rows and 3 cols', () => {
      expect(game.buildGrid(2, 3)).toEqual([
        [0, 0, 0],
        [0, 0, 0],
      ])
    })
  })

  describe('getCell method', () => {
    const game = new GameFramework(3, 3)
    game.grid = [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ]

    test('should cell 1,1 return 1', () => {
      expect(game.getCell(1, 1)).toEqual(1)
    })

    test('should cell 0,1 return 0', () => {
      expect(game.getCell(0, 1)).toEqual(0)
    })

    test('should cell out of limits return 0', () => {
      expect(game.getCell(46, 12)).toEqual(0)
    })
  })

  describe('countNeighbours method', () => {
    const game = new GameFramework(3, 3)
    game.grid = [
      [0, 0, 0],
      [0, 1, 1],
      [0, 1, 1],
    ]

    test('expect the cell row=1 and col=1 should return 3', () => {
      expect(game.cellNeighbours(1, 1)).toEqual(3)
    })

    test('expect the cell row=1 and col=2 should return 3', () => {
      expect(game.cellNeighbours(1, 2)).toEqual(3)
    })

    test('expect the cell row=1 and col=0 should return 4', () => {
      expect(game.cellNeighbours(1, 0)).toEqual(4)
    })

    test('expect the cell row=0 and col=1 should return 4', () => {
      expect(game.cellNeighbours(0, 1)).toEqual(4)
    })
  })

  describe('update method', () => {
    test('should update the grid with no alive cells', () => {
      const game = new GameFramework(3, 3)
      game.grid = [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0],
      ]
      game.update()
      expect(game.grid).toEqual([
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ])
    })

    test('should update the grid with new alive cells', () => {
      const game = new GameFramework(4, 4)
      game.grid = [
        [1, 0, 0, 1],
        [0, 0, 0, 1],
        [0, 0, 1, 1],
        [0, 0, 1, 1],
      ]
      game.update()
      expect(game.grid).toEqual([
        [1, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 0, 0, 0],
        [0, 1, 0, 0],
      ])
    })
  })

  describe('initialize method', () => {
    const rows = 3
    const cols = 6
    const game = new GameFramework(rows, cols)
    game.initialize()

    test('should initilized game assign the rows and cols properties', () => {
      expect(game.rows).toEqual(rows)
      expect(game.cols).toEqual(cols)
    })

    test(`should initilized game build a grid with ${rows}x${cols} cells`, () => {
      expect(game.grid.length).toEqual(rows)
      expect(game.grid[0].length).toEqual(cols)
    })
  })
})
