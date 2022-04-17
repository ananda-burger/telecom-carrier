const RESPONSE_TIME = 2000

const write = (phones) => {
  localStorage.setItem('phones', JSON.stringify(phones))
}

const read = () => {
  return JSON.parse(localStorage.getItem('phones')) || []
}

const fetchNumbers = ({page, perPage}) => {
  const index = perPage * (page - 1)
  const allPhones = read()
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve({
        phones: allPhones.slice(index, index + perPage),
        totalCount: allPhones.length
      })
    }, RESPONSE_TIME)
  })
}

const addNumber = (phone) => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      const newPhone = { ...phone, id: Math.floor(Math.random() * 1000) }
      write(read().concat(newPhone))
      resolve(newPhone)
    }, RESPONSE_TIME)
  })
}

const removeNumbers = (id) => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      const phones = read()
      const index = phones.findIndex(p => p.id === id)

      write([...phones.slice(0, index), ...phones.slice(index + 1)])
      resolve(id)
    }, RESPONSE_TIME)
  })
}

const editNumber = (phone) => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      const phones = read()
      const index = phones.findIndex(p => p.id === phone.id)
      phones[index] = phone

      write(phones)
      resolve(phones)
    }, RESPONSE_TIME)
  })
}

export { fetchNumbers, addNumber, removeNumbers, editNumber }
