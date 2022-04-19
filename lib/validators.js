export const required = (value) => {
  if (value) {
    return undefined
  }
  return 'Required field'
}

export const mustBeNumber = (value) => {
  if (isFinite(value) && !isNaN(value)) {
    return undefined
  }
  return 'Price must be a number'
}

export const compose =
  (...validators) =>
  (value) =>
    validators.reduce((error, validator) => error || validator(value), undefined)
