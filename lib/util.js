// Create a range from 0 to n and map with callback fn.
export const times = (n, fn) => {
  return [...Array(n).keys()].map(fn)
}
