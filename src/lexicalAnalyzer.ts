// Turn source code into tokens
const analyzer = (str: string) =>
  str
    .split(' ')
    .map(s => s.trim())
    .filter(s => s.length)

export default analyzer
