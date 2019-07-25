import compiler from './compiler'

test('compiler', () => {
  const sourceCode = 'mul 3 sub 2 sum 1 3 4'
  let jsCompile = compiler(sourceCode)
  console.info(jsCompile)
  expect(jsCompile).toBe('(3 * (2 - (1 + 3 + 4)))')
})
