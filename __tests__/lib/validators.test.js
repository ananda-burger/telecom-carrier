import * as validators from '@/lib/validators'

describe('validators', () => {
  describe('.required', () => {
    it('returns undefined when value is truthy', () => {
      expect(validators.required(1)).toEqual(undefined)
      expect(validators.required(true)).toEqual(undefined)
    })

    it('returns error message when value is falsey', () => {
      const msg = 'Required field'
      expect(validators.required(0)).toEqual(msg)
      expect(validators.required(null)).toEqual(msg)
      expect(validators.required(false)).toEqual(msg)
    })
  })

  describe('.mustBeNumber', () => {
    it('returns undefined when value is a number', () => {
      expect(validators.mustBeNumber(0)).toEqual(undefined)
      expect(validators.mustBeNumber(-1)).toEqual(undefined)
      expect(validators.mustBeNumber(1)).toEqual(undefined)
    })

    it('returns error message when value is not a number', () => {
      const msg = 'Price must be a number'
      expect(validators.mustBeNumber(1 / 0)).toEqual(msg)
      expect(validators.mustBeNumber(NaN)).toEqual(msg)
    })
  })
})
