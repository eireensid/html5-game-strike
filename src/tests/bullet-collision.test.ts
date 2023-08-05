import GameRules from '@/model/GameRules'
import { expect, test } from 'vitest'

test('bullet collision', () => {
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