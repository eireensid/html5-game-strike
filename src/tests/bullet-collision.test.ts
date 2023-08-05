import GameRules from '@/model/GameRules'
import { describe, expect, test } from 'vitest'

describe("bullet collision", () => {
  test('no collision', () => {
    expect(GameRules.checkCollision({
      x: 0,
      y: 0,
      height: 20,
      width: 20
    }, {
      x: 0,
      y: 100,
      height: 50,
      width: 50
    })).toBe(false)
  })

  test('collision', () => {
    expect(GameRules.checkCollision({
      x: 0,
      y: 0,
      height: 20,
      width: 20
    }, {
      x: 0,
      y: 20,
      height: 50,
      width: 50
    })).toBe(true)
  })
})
