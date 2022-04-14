const PER_PAGE = 5

const write = (phones) => {
  localStorage.setItem('phones', JSON.stringify(phones))
}

const read = () => {
  return JSON.parse(localStorage.getItem('phones')) || []
}

const fetchNumbers = ({page}) => {
  const index = PER_PAGE * (page - 1)
  const allPhones = read()
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve({
        phones: allPhones.slice(index, index + PER_PAGE),
        totalCount: allPhones.length
      })
    }, 100)
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

const editNumber = (phone) => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      const phones = read()
      const index = phones.findIndex(p => p.id === phone.id)
      phones[index] = phone

      write(phones)
      resolve(phones)
    }, 500)
  })
}

export { fetchNumbers, addNumber, removeNumbers, editNumber }
