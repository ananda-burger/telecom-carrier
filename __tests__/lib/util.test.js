import * as util from '../../lib/util'

describe('util', () => {
  describe('range', () => {
    it('returns an array of integers from start to end (non-inclusive)', () => {
      expect(util.range(0, 0)).toEqual([])
      expect(util.range(0, 1)).toEqual([0])
      expect(util.range(0, 2)).toEqual([0, 1])
      expect(util.range(1, 2)).toEqual([1])
      expect(util.range(3, 6)).toEqual([3, 4, 5])
      expect(util.range(-2, 1)).toEqual([-2, -1, 0])
    })
  })
})
