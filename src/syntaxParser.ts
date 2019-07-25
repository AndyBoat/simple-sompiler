// Use tokens to build AST
// or throw syntax errors in case

/** grammer
 *  digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
    num = digit+
    op = sum | sub | mul | div
    expr = num | op expr+
 */

class TokenProxy {
  _tokens: string[]
  constructor(tokens: string[]) {
    this._tokens = tokens
  }
  shift() {
    return this._tokens.shift()
  }
  peek() {
    return this._tokens[0]
  }
}

enum NodeType {
  Op,
  Num
}

interface ASTNode {
  val: any
  type: NodeType
}

interface NumNode extends ASTNode {
  val: number
  type: NodeType.Num
}

interface OpNode extends ASTNode {
  val: string
  type: NodeType.Op
  expr: ASTNode[]
}

interface Parser {
  parse(token: TokenProxy): ASTNode
}

const NumParser: Parser = {
  parse(token: TokenProxy): NumNode {
    return { val: parseInt(token.shift()), type: NodeType.Num }
  }
}

const OpParser: Parser = {
  parse(token: TokenProxy): OpNode {
    let node: OpNode = { val: token.shift(), type: NodeType.Op, expr: [] }
    while (token.peek()) {
      node.expr.push(ExprParser.parse(token))
    }
    return node
  }
}

const ExprParser: Parser = {
  parse(token: TokenProxy): ASTNode {
    return /\d/.test(token.peek())
      ? NumParser.parse(token)
      : OpParser.parse(token)
  }
}

const parser = (tokens: string[]): ASTNode => {
  let tokenProxy = new TokenProxy(tokens)

  return ExprParser.parse(tokenProxy)
}

export default parser
export { NodeType, ASTNode, NumNode, OpNode }
