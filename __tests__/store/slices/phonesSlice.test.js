import * as slice from '../../../store/slices/phonesSlice.js'

describe('phonesSlice', () => {
  it('Selects phones', () => {
    const rootState = {
      phones: {
        list: [
          { phone: 1 }
        ]
      }
    }

    const expected = [{ phone: 1 }]

    expect(slice.selectPhones(rootState)).toEqual(expected)
  })
})
