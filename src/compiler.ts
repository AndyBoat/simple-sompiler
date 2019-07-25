import lexicalAnalyzer from './lexicalAnalyzer'
import syntaxParser from './syntaxParser'
import transpiler from './transpiler'

export default (str: string) => {
  return transpiler(syntaxParser(lexicalAnalyzer(str)))
}
