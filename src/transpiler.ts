//traverse the AST and product JavasScript

import { NodeType, ASTNode, NumNode, OpNode } from './syntaxParser'

const transpile = (ast: ASTNode) => {
  const opMap = { sum: '+', mul: '*', sub: '-', div: '/' }
  const transpileNode = (ast: ASTNode) =>
    ast.type == NodeType.Num
      ? transpileNum(<NumNode>ast)
      : transpileOp(<OpNode>ast)
  const transpileNum = (ast: NumNode) => ast.val
  const transpileOp = (ast: OpNode) =>
    `(${ast.expr.map(transpileNode).join(' ' + opMap[ast.val] + ' ')})`
  return transpileNode(ast)
}

export default transpile
