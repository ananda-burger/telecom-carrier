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

  it('Adds a phone to empty state', () => {
    const initialState = {
      list: []
    }

    const action = slice.add({ phone: '12345' })

    expect(slice.reducer(initialState, action))
      .toEqual({ list: [{ phone: '12345' }] })
  })
})
