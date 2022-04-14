const INITIAL_NUMBERS_FOR_SALE = [
  {
    "id": 1,
    "value": "+55 84 91234-4321",
    "monthyPrice": "0.03",
    "setupPrice": "1.40",
    "currency": "U$"
  },
  {
    "id": 2,
    "value": "+55 84 91234-4322",
    "monthyPrice": "0.02",
    "setupPrice": "2.40",
    "currency": "U$"
  },
  {
    "id": 3,
    "value": "+55 84 91234-4323",
    "monthyPrice": "0.03",
    "setupPrice": "3.40",
    "currency": "U$"
  },
  {
    "id": 4,
    "value": "+55 84 91234-4324",
    "monthyPrice": "0.04",
    "setupPrice": "4.40",
    "currency": "U$"
  },
  {
    "id": 5,
    "value": "+55 84 91234-4325",
    "monthyPrice": "0.05",
    "setupPrice": "5.40",
    "currency": "U$"
  },
  {
    "id": 6,
    "value": "+55 84 91234-4326",
    "monthyPrice": "0.06",
    "setupPrice": "6.40",
    "currency": "U$"
  },
  {
    "id": 7,
    "value": "+55 84 91234-4327",
    "monthyPrice": "0.07",
    "setupPrice": "7.40",
    "currency": "U$"
  },
  {
    "id": 8,
    "value": "+55 84 91234-4328",
    "monthyPrice": "0.08",
    "setupPrice": "8.40",
    "currency": "U$"
  },
  {
    "id": 9,
    "value": "+55 84 91234-4329",
    "monthyPrice": "0.09",
    "setupPrice": "9.40",
    "currency": "U$"
  },
  {
    "id": 10,
    "value": "+55 84 91234-4320",
    "monthyPrice": "0.10",
    "setupPrice": "0.40",
    "currency": "U$"
  },
]

const write = (phones) => {
  localStorage.setItem('phones', JSON.stringify(phones))
}

const read = () => {
  return JSON.parse(localStorage.getItem('phones')) || []
}

const fetchNumbers = () => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve(INITIAL_NUMBERS_FOR_SALE)
    }, 2000)
  })
}

const addNumber = (phone) => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      const newPhone = { ...phone, id: Math.floor(Math.random() * 1000) }
      write(read().concat(newPhone))
      resolve(newPhone)
    }, 500)
  })
}

const removeNumbers = (id) => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      const phones = read()
      const index = phones.findIndex(p => p.id === id)

      write([...phones.slice(0, index), ...phones.slice(index + 1)])
      resolve(id)
    }, 500)
  })
}

export { fetchNumbers, addNumber, removeNumbers }
