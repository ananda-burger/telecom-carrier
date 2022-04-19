const DELAY_MS = 2000

const failureToggles = {
  edit: false,
  add: false
}

const write = (phones) => {
  localStorage.setItem('phones', JSON.stringify(phones))
}

const read = () => {
  const phones = localStorage.getItem('phones')
  if (phones) {
    return JSON.parse(phones).sort((a, b) => a.id - b.id) || []
  }
  return []
}

const nextId = () => {
  const phones = read()
  if (phones.length) {
    const latestId = phones[phones.length - 1].id
    return latestId + 1
  }
  return 1
}

const fetchNumbers = ({ page, perPage }) => {
  const index = perPage * (page - 1)
  const allPhones = read()
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve({
        phones: allPhones.slice(index, index + perPage),
        totalCount: allPhones.length
      })
    }, DELAY_MS)
  })
}

const addNumber = (phone) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (failureToggles.add) {
        reject({ message: 'Unexpected server error' })
      } else {
        const newPhone = { ...phone, id: nextId() }
        write(read().concat(newPhone))
        resolve(newPhone)
      }
    }, DELAY_MS)
  })
}

const removeNumbers = (id) => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      const phones = read()
      const index = phones.findIndex((p) => p.id === id)

      write([...phones.slice(0, index), ...phones.slice(index + 1)])
      resolve(id)
    }, DELAY_MS)
  })
}

const editNumber = (phone) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (failureToggles.edit) {
        reject({ message: 'Unexpected server error' })
      } else {
        const phones = read()
        const index = phones.findIndex((p) => p.id === phone.id)
        phones[index] = phone

        write(phones)
        resolve(phone)
      }
    }, DELAY_MS)
  })
}

const findNumber = (rawId) => {
  const id = parseInt(rawId, 10)
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      const phones = read()
      const index = phones.findIndex((p) => p.id === id)

      resolve(phones[index])
    }, DELAY_MS)
  })
}
export { fetchNumbers, addNumber, removeNumbers, editNumber, findNumber }
