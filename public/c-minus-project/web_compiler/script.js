/* C-Minus Compiler in JavaScript */

// --- Token Definitions ---
const TokenType = {
    ELSE: 'ELSE', IF: 'IF', INT: 'INT', RETURN: 'RETURN', VOID: 'VOID', WHILE: 'WHILE',
    PLUS: 'PLUS', MINUS: 'MINUS', MULTIPLY: 'MULTIPLY', DIVIDE: 'DIVIDE',
    LESS: 'LESS', LESS_EQUAL: 'LESS_EQUAL', GREATER: 'GREATER', GREATER_EQUAL: 'GREATER_EQUAL',
    EQUAL: 'EQUAL', NOT_EQUAL: 'NOT_EQUAL',
    ASSIGN: 'ASSIGN', SEMICOLON: 'SEMICOLON', COMMA: 'COMMA',
    LPAREN: 'LPAREN', RPAREN: 'RPAREN', LBRACKET: 'LBRACKET', RBRACKET: 'RBRACKET',
    LBRACE: 'LBRACE', RBRACE: 'RBRACE',
    ID: 'ID', NUM: 'NUM', ENDFILE: 'ENDFILE', ERROR: 'ERROR'
};

class Token {
    constructor(type, lexeme, line) {
        this.type = type;
        this.lexeme = lexeme;
        this.line = line;
    }
}

// --- Lexer ---
class Lexer {
    constructor(input) {
        this.input = input;
        this.pos = 0;
        this.line = 1;
        this.currentChar = this.input.length > 0 ? this.input[0] : null;
    }

    advance() {
        this.pos++;
        if (this.pos >= this.input.length) {
            this.currentChar = null;
        } else {
            this.currentChar = this.input[this.pos];
        }
    }

    peek() {
        if (this.pos + 1 >= this.input.length) return null;
        return this.input[this.pos + 1];
    }

    skipWhitespace() {
        while (this.currentChar !== null && /\s/.test(this.currentChar)) {
            if (this.currentChar === '\n') this.line++;
            this.advance();
        }
    }

    getToken() {
        this.skipWhitespace();

        if (this.currentChar === null) {
            return new Token(TokenType.ENDFILE, "", this.line);
        }

        if (/[a-zA-Z]/.test(this.currentChar)) {
            let buffer = "";
            while (this.currentChar !== null && /[a-zA-Z0-9]/.test(this.currentChar)) {
                buffer += this.currentChar;
                this.advance();
            }
            
            let type = TokenType.ID;
            switch (buffer) {
                case "else": type = TokenType.ELSE; break;
                case "if": type = TokenType.IF; break;
                case "int": type = TokenType.INT; break;
                case "return": type = TokenType.RETURN; break;
                case "void": type = TokenType.VOID; break;
                case "while": type = TokenType.WHILE; break;
            }
            return new Token(type, buffer, this.line);
        }

        if (/[0-9]/.test(this.currentChar)) {
            let buffer = "";
            while (this.currentChar !== null && /[0-9]/.test(this.currentChar)) {
                buffer += this.currentChar;
                this.advance();
            }
            return new Token(TokenType.NUM, buffer, this.line);
        }

        let char = this.currentChar;
        switch (char) {
            case '+': this.advance(); return new Token(TokenType.PLUS, "+", this.line);
            case '-': this.advance(); return new Token(TokenType.MINUS, "-", this.line);
            case '*': this.advance(); return new Token(TokenType.MULTIPLY, "*", this.line);
            case '/': 
                this.advance();
                if (this.currentChar === '*') { // Comment
                    this.advance(); // skip *
                    while (true) {
                        if (this.currentChar === null) return new Token(TokenType.ERROR, "Unterminated comment", this.line);
                        if (this.currentChar === '*' && this.peek() === '/') {
                            this.advance(); this.advance();
                            break;
                        }
                        if (this.currentChar === '\n') this.line++;
                        this.advance();
                    }
                    return this.getToken();
                }
                return new Token(TokenType.DIVIDE, "/", this.line);
            case '<':
                this.advance();
                if (this.currentChar === '=') { this.advance(); return new Token(TokenType.LESS_EQUAL, "<=", this.line); }
                return new Token(TokenType.LESS, "<", this.line);
            case '>':
                this.advance();
                if (this.currentChar === '=') { this.advance(); return new Token(TokenType.GREATER_EQUAL, ">=", this.line); }
                return new Token(TokenType.GREATER, ">", this.line);
            case '=':
                this.advance();
                if (this.currentChar === '=') { this.advance(); return new Token(TokenType.EQUAL, "==", this.line); }
                return new Token(TokenType.ASSIGN, "=", this.line);
            case '!':
                this.advance();
                if (this.currentChar === '=') { this.advance(); return new Token(TokenType.NOT_EQUAL, "!=", this.line); }
                return new Token(TokenType.ERROR, "Expected =", this.line);
            case ';': this.advance(); return new Token(TokenType.SEMICOLON, ";", this.line);
            case ',': this.advance(); return new Token(TokenType.COMMA, ",", this.line);
            case '(': this.advance(); return new Token(TokenType.LPAREN, "(", this.line);
            case ')': this.advance(); return new Token(TokenType.RPAREN, ")", this.line);
            case '[': this.advance(); return new Token(TokenType.LBRACKET, "[", this.line);
            case ']': this.advance(); return new Token(TokenType.RBRACKET, "]", this.line);
            case '{': this.advance(); return new Token(TokenType.LBRACE, "{", this.line);
            case '}': this.advance(); return new Token(TokenType.RBRACE, "}", this.line);
            default:
                this.advance();
                return new Token(TokenType.ERROR, "Unknown char: " + char, this.line);
        }
    }
}

// --- AST Nodes ---
const NodeKind = {
    VarDecl: 'VarDecl', FunDecl: 'FunDecl', Param: 'Param',
    Compound: 'Compound', Selection: 'Selection', Iteration: 'Iteration', Return: 'Return',
    Assign: 'Assign', Op: 'Op', Const: 'Const', Id: 'Id', Call: 'Call', ArrayAccess: 'ArrayAccess'
};

// --- Parser ---
class Parser {
    constructor(lexer) {
        this.lexer = lexer;
        this.currentToken = this.lexer.getToken();
    }

    eat(type) {
        if (this.currentToken.type === type) {
            this.currentToken = this.lexer.getToken();
        } else {
            throw new Error(`Syntax Error at line ${this.currentToken.line}: Expected ${type}, got ${this.currentToken.type}`);
        }
    }

    parse() {
        const declarations = [];
        while (this.currentToken.type !== TokenType.ENDFILE) {
            declarations.push(this.parseDeclaration());
        }
        return declarations;
    }

    parseDeclaration() {
        const type = this.currentToken.type;
        if (type !== TokenType.INT && type !== TokenType.VOID) {
            throw new Error(`Syntax Error at line ${this.currentToken.line}: Expected type specifier`);
        }
        this.eat(type);

        const name = this.currentToken.lexeme;
        this.eat(TokenType.ID);

        if (this.currentToken.type === TokenType.LPAREN) {
            // Function
            this.eat(TokenType.LPAREN);
            const params = this.parseParams();
            this.eat(TokenType.RPAREN);
            const body = this.parseCompoundStmt();
            return { kind: NodeKind.FunDecl, name, type, params, body };
        } else {
            // Variable
            let isArray = false;
            let arraySize = 0;
            if (this.currentToken.type === TokenType.LBRACKET) {
                this.eat(TokenType.LBRACKET);
                isArray = true;
                arraySize = parseInt(this.currentToken.lexeme);
                this.eat(TokenType.NUM);
                this.eat(TokenType.RBRACKET);
            }
            this.eat(TokenType.SEMICOLON);
            return { kind: NodeKind.VarDecl, name, type, isArray, arraySize };
        }
    }

    parseParams() {
        const params = [];
        if (this.currentToken.type === TokenType.VOID) {
            // Check if it's (void)
            // We need to peek, but our lexer doesn't support arbitrary peek easily.
            // However, standard C-Minus is (void) or (int x, ...)
            // If next is RPAREN, it's void.
            // But we already consumed LPAREN.
            // If current is VOID, we eat it. If next is RPAREN, return empty.
            // If next is ID, it's `void x` (param).
            
            // Hack: let's just parse it.
            const type = this.currentToken.type;
            this.eat(TokenType.VOID);
            if (this.currentToken.type === TokenType.RPAREN) {
                return params;
            }
            // It was a param type `void`
            const name = this.currentToken.lexeme;
            this.eat(TokenType.ID);
            let isArray = false;
            if (this.currentToken.type === TokenType.LBRACKET) {
                this.eat(TokenType.LBRACKET);
                this.eat(TokenType.RBRACKET);
                isArray = true;
            }
            params.push({ kind: NodeKind.Param, type, name, isArray });
            while (this.currentToken.type === TokenType.COMMA) {
                this.eat(TokenType.COMMA);
                params.push(this.parseParam());
            }
            return params;
        } else if (this.currentToken.type === TokenType.RPAREN) {
            return params;
        }

        params.push(this.parseParam());
        while (this.currentToken.type === TokenType.COMMA) {
            this.eat(TokenType.COMMA);
            params.push(this.parseParam());
        }
        return params;
    }

    parseParam() {
        const type = this.currentToken.type;
        if (type !== TokenType.INT && type !== TokenType.VOID) throw new Error("Expected type in param");
        this.eat(type);
        const name = this.currentToken.lexeme;
        this.eat(TokenType.ID);
        let isArray = false;
        if (this.currentToken.type === TokenType.LBRACKET) {
            this.eat(TokenType.LBRACKET);
            this.eat(TokenType.RBRACKET);
            isArray = true;
        }
        return { kind: NodeKind.Param, type, name, isArray };
    }

    parseCompoundStmt() {
        this.eat(TokenType.LBRACE);
        const localDecls = [];
        const statements = [];
        
        while (this.currentToken.type === TokenType.INT || this.currentToken.type === TokenType.VOID) {
            localDecls.push(this.parseDeclaration());
        }
        
        while (this.currentToken.type !== TokenType.RBRACE && this.currentToken.type !== TokenType.ENDFILE) {
            statements.push(this.parseStatement());
        }
        
        this.eat(TokenType.RBRACE);
        return { kind: NodeKind.Compound, localDecls, statements };
    }

    parseStatement() {
        switch (this.currentToken.type) {
            case TokenType.IF: return this.parseSelectionStmt();
            case TokenType.WHILE: return this.parseIterationStmt();
            case TokenType.RETURN: return this.parseReturnStmt();
            case TokenType.LBRACE: return this.parseCompoundStmt();
            default: return this.parseExpressionStmt();
        }
    }

    parseSelectionStmt() {
        this.eat(TokenType.IF);
        this.eat(TokenType.LPAREN);
        const condition = this.parseExpression();
        this.eat(TokenType.RPAREN);
        const ifBody = this.parseStatement();
        let elseBody = null;
        if (this.currentToken.type === TokenType.ELSE) {
            this.eat(TokenType.ELSE);
            elseBody = this.parseStatement();
        }
        return { kind: NodeKind.Selection, condition, ifBody, elseBody };
    }

    parseIterationStmt() {
        this.eat(TokenType.WHILE);
        this.eat(TokenType.LPAREN);
        const condition = this.parseExpression();
        this.eat(TokenType.RPAREN);
        const body = this.parseStatement();
        return { kind: NodeKind.Iteration, condition, body };
    }

    parseReturnStmt() {
        this.eat(TokenType.RETURN);
        let expression = null;
        if (this.currentToken.type !== TokenType.SEMICOLON) {
            expression = this.parseExpression();
        }
        this.eat(TokenType.SEMICOLON);
        return { kind: NodeKind.Return, expression };
    }

    parseExpressionStmt() {
        if (this.currentToken.type === TokenType.SEMICOLON) {
            this.eat(TokenType.SEMICOLON);
            return null;
        }
        const expr = this.parseExpression();
        this.eat(TokenType.SEMICOLON);
        return expr; // Treat as statement
    }

    parseExpression() {
        // Handle assignment vs simple expression
        if (this.currentToken.type === TokenType.ID) {
            // Need lookahead. Since we can't easily peek 2 tokens, we'll parse the ID and see what follows.
            const name = this.currentToken.lexeme;
            this.eat(TokenType.ID);
            
            if (this.currentToken.type === TokenType.ASSIGN) {
                this.eat(TokenType.ASSIGN);
                const expr = this.parseExpression();
                return { kind: NodeKind.Assign, varName: name, index: null, expression: expr };
            } else if (this.currentToken.type === TokenType.LBRACKET) {
                this.eat(TokenType.LBRACKET);
                const index = this.parseExpression();
                this.eat(TokenType.RBRACKET);
                if (this.currentToken.type === TokenType.ASSIGN) {
                    this.eat(TokenType.ASSIGN);
                    const expr = this.parseExpression();
                    return { kind: NodeKind.Assign, varName: name, index, expression: expr };
                } else {
                    // Array access in expression
                    const arrAccess = { kind: NodeKind.ArrayAccess, name, index };
                    return this.parseSimpleExpression(arrAccess);
                }
            } else if (this.currentToken.type === TokenType.LPAREN) {
                // Call
                this.eat(TokenType.LPAREN);
                const args = [];
                if (this.currentToken.type !== TokenType.RPAREN) {
                    do {
                        if (this.currentToken.type === TokenType.COMMA) this.eat(TokenType.COMMA);
                        args.push(this.parseExpression());
                    } while (this.currentToken.type === TokenType.COMMA);
                }
                this.eat(TokenType.RPAREN);
                const call = { kind: NodeKind.Call, funcName: name, args };
                return this.parseSimpleExpression(call);
            } else {
                // Just ID
                const id = { kind: NodeKind.Id, name };
                return this.parseSimpleExpression(id);
            }
        }
        return this.parseSimpleExpression(null);
    }

    parseSimpleExpression(lhs) {
        let left = this.parseAdditiveExpression(lhs);
        const t = this.currentToken.type;
        if ([TokenType.LESS, TokenType.LESS_EQUAL, TokenType.GREATER, TokenType.GREATER_EQUAL, TokenType.EQUAL, TokenType.NOT_EQUAL].includes(t)) {
            this.eat(t);
            const right = this.parseAdditiveExpression(null);
            return { kind: NodeKind.Op, op: t, left, right };
        }
        return left;
    }

    parseAdditiveExpression(lhs) {
        let left = this.parseTerm(lhs);
        while (this.currentToken.type === TokenType.PLUS || this.currentToken.type === TokenType.MINUS) {
            const op = this.currentToken.type;
            this.eat(op);
            const right = this.parseTerm(null);
            left = { kind: NodeKind.Op, op, left, right };
        }
        return left;
    }

    parseTerm(lhs) {
        let left = lhs ? lhs : this.parseFactor();
        while (this.currentToken.type === TokenType.MULTIPLY || this.currentToken.type === TokenType.DIVIDE) {
            const op = this.currentToken.type;
            this.eat(op);
            const right = this.parseFactor();
            left = { kind: NodeKind.Op, op, left, right };
        }
        return left;
    }

    parseFactor() {
        if (this.currentToken.type === TokenType.LPAREN) {
            this.eat(TokenType.LPAREN);
            const expr = this.parseExpression();
            this.eat(TokenType.RPAREN);
            return expr;
        } else if (this.currentToken.type === TokenType.NUM) {
            const val = parseInt(this.currentToken.lexeme);
            this.eat(TokenType.NUM);
            return { kind: NodeKind.Const, value: val };
        } else if (this.currentToken.type === TokenType.ID) {
            const name = this.currentToken.lexeme;
            this.eat(TokenType.ID);
            if (this.currentToken.type === TokenType.LPAREN) {
                this.eat(TokenType.LPAREN);
                const args = [];
                if (this.currentToken.type !== TokenType.RPAREN) {
                    do {
                        if (this.currentToken.type === TokenType.COMMA) this.eat(TokenType.COMMA);
                        args.push(this.parseExpression());
                    } while (this.currentToken.type === TokenType.COMMA);
                }
                this.eat(TokenType.RPAREN);
                return { kind: NodeKind.Call, funcName: name, args };
            } else if (this.currentToken.type === TokenType.LBRACKET) {
                this.eat(TokenType.LBRACKET);
                const index = this.parseExpression();
                this.eat(TokenType.RBRACKET);
                return { kind: NodeKind.ArrayAccess, name, index };
            } else {
                return { kind: NodeKind.Id, name };
            }
        } else {
            throw new Error("Unexpected token in factor: " + this.currentToken.type);
        }
    }
}

// --- Interpreter ---
class Environment {
    constructor(parent = null) {
        this.parent = parent;
        this.values = {};
        this.arrays = {};
    }

    define(name, value) {
        this.values[name] = value;
    }

    defineArray(name, size) {
        this.arrays[name] = new Array(size).fill(0);
    }

    get(name) {
        if (name in this.values) return this.values[name];
        if (this.parent) return this.parent.get(name);
        throw new Error(`Runtime Error: Undefined variable '${name}'`);
    }

    getArray(name, index) {
        if (name in this.arrays) {
            if (index < 0 || index >= this.arrays[name].length) throw new Error("Runtime Error: Array index out of bounds");
            return this.arrays[name][index];
        }
        if (this.parent) return this.parent.getArray(name, index);
        throw new Error(`Runtime Error: Undefined array '${name}'`);
    }

    assign(name, value) {
        if (name in this.values) {
            this.values[name] = value;
            return;
        }
        if (this.parent) {
            this.parent.assign(name, value);
            return;
        }
        throw new Error(`Runtime Error: Undefined variable '${name}'`);
    }

    assignArray(name, index, value) {
        if (name in this.arrays) {
            if (index < 0 || index >= this.arrays[name].length) throw new Error("Runtime Error: Array index out of bounds");
            this.arrays[name][index] = value;
            return;
        }
        if (this.parent) {
            this.parent.assignArray(name, index, value);
            return;
        }
        throw new Error(`Runtime Error: Undefined array '${name}'`);
    }
}

class Interpreter {
    constructor(outputCallback, inputCallback) {
        this.outputCallback = outputCallback;
        this.inputCallback = inputCallback;
        this.globalEnv = new Environment();
        this.currentEnv = this.globalEnv;
        this.functions = {};
        this.isReturning = false;
        this.returnValue = 0;
    }

    async interpret(program) {
        // 1. Scan for globals and functions
        let mainFunc = null;
        for (const decl of program) {
            if (decl.kind === NodeKind.VarDecl) {
                if (decl.isArray) this.globalEnv.defineArray(decl.name, decl.arraySize);
                else this.globalEnv.define(decl.name, 0);
            } else if (decl.kind === NodeKind.FunDecl) {
                this.functions[decl.name] = decl;
                if (decl.name === "main") mainFunc = decl;
            }
        }

        if (!mainFunc) throw new Error("Runtime Error: 'main' function not found");

        // 2. Execute main
        // Create new env for main (child of global)
        const savedEnv = this.currentEnv;
        this.currentEnv = new Environment(this.globalEnv);
        await this.execute(mainFunc.body);
        this.currentEnv = savedEnv;
    }

    async execute(node) {
        if (!node) return;
        if (this.isReturning) return;

        switch (node.kind) {
            case NodeKind.Compound: await this.executeCompound(node); break;
            case NodeKind.Selection: await this.executeSelection(node); break;
            case NodeKind.Iteration: await this.executeIteration(node); break;
            case NodeKind.Return: await this.executeReturn(node); break;
            case NodeKind.Assign: await this.executeAssign(node); break;
            case NodeKind.Call: await this.executeCall(node); break;
            case NodeKind.Op: await this.evaluate(node); break;
        }
    }

    async evaluate(node) {
        if (!node) return 0;
        switch (node.kind) {
            case NodeKind.Const: return node.value;
            case NodeKind.Id: return this.currentEnv.get(node.name);
            case NodeKind.ArrayAccess: {
                const idx = await this.evaluate(node.index);
                return this.currentEnv.getArray(node.name, idx);
            }
            case NodeKind.Op: {
                const l = await this.evaluate(node.left);
                const r = await this.evaluate(node.right);
                switch (node.op) {
                    case TokenType.PLUS: return l + r;
                    case TokenType.MINUS: return l - r;
                    case TokenType.MULTIPLY: return l * r;
                    case TokenType.DIVIDE: return r !== 0 ? Math.floor(l / r) : 0;
                    case TokenType.LESS: return l < r ? 1 : 0;
                    case TokenType.LESS_EQUAL: return l <= r ? 1 : 0;
                    case TokenType.GREATER: return l > r ? 1 : 0;
                    case TokenType.GREATER_EQUAL: return l >= r ? 1 : 0;
                    case TokenType.EQUAL: return l === r ? 1 : 0;
                    case TokenType.NOT_EQUAL: return l !== r ? 1 : 0;
                    default: return 0;
                }
            }
            case NodeKind.Call: return await this.executeCall(node);
            case NodeKind.Assign: {
                await this.executeAssign(node);
                if (node.index) return this.currentEnv.getArray(node.varName, await this.evaluate(node.index));
                return this.currentEnv.get(node.varName);
            }
            default: return 0;
        }
    }

    async executeCompound(stmt) {
        const prevEnv = this.currentEnv;
        this.currentEnv = new Environment(prevEnv);
        
        for (const decl of stmt.localDecls) {
            if (decl.isArray) this.currentEnv.defineArray(decl.name, decl.arraySize);
            else this.currentEnv.define(decl.name, 0);
        }

        for (const s of stmt.statements) {
            await this.execute(s);
            if (this.isReturning) break;
        }
        
        this.currentEnv = prevEnv;
    }

    async executeSelection(stmt) {
        if (await this.evaluate(stmt.condition)) {
            await this.execute(stmt.ifBody);
        } else if (stmt.elseBody) {
            await this.execute(stmt.elseBody);
        }
    }

    async executeIteration(stmt) {
        // Prevent infinite loops freezing the browser
        let steps = 0;
        while (await this.evaluate(stmt.condition)) {
            await this.execute(stmt.body);
            if (this.isReturning) break;
            
            steps++;
            if (steps % 1000 === 0) await new Promise(r => setTimeout(r, 0));
        }
    }

    async executeReturn(stmt) {
        if (stmt.expression) {
            this.returnValue = await this.evaluate(stmt.expression);
        }
        this.isReturning = true;
    }

    async executeAssign(stmt) {
        const val = await this.evaluate(stmt.expression);
        if (stmt.index) {
            const idx = await this.evaluate(stmt.index);
            this.currentEnv.assignArray(stmt.varName, idx, val);
        } else {
            this.currentEnv.assign(stmt.varName, val);
        }
    }

    async executeCall(expr) {
        if (expr.funcName === "input") {
            const val = await this.inputCallback();
            return parseInt(val) || 0;
        }
        if (expr.funcName === "output") {
            const val = await this.evaluate(expr.args[0]);
            this.outputCallback(val);
            return 0;
        }

        const func = this.functions[expr.funcName];
        if (!func) throw new Error(`Runtime Error: Undefined function '${expr.funcName}'`);
        
        if (func.params.length !== expr.args.length) throw new Error(`Runtime Error: Argument count mismatch for '${expr.funcName}'`);

        const argValues = [];
        for (const arg of expr.args) {
            argValues.push(await this.evaluate(arg));
        }

        const savedEnv = this.currentEnv;
        // Static scoping: Parent is globalEnv
        this.currentEnv = new Environment(this.globalEnv);

        for (let i = 0; i < func.params.length; i++) {
            this.currentEnv.define(func.params[i].name, argValues[i]);
        }

        const savedIsReturning = this.isReturning;
        this.isReturning = false;
        const savedReturnValue = this.returnValue;
        this.returnValue = 0;

        await this.execute(func.body);

        const result = this.returnValue;

        this.currentEnv = savedEnv;
        this.isReturning = savedIsReturning;
        this.returnValue = savedReturnValue;

        return result;
    }
}

// --- UI Glue ---

const defaultCode = `/* C-Minus Test File */
int x;
int arr[5];

int gcd(int u, int v) {
    if (v == 0) return u;
    else return gcd(v, u - u/v*v);
}

void main(void) {
    int i; 
    x = 10;
    i = 0;
    
    /* Test Array and Loop */
    while (i < 5) {
        arr[i] = x + i;
        i = i + 1;
    }
    
    /* Test Function Call and Output */
    output(gcd(18, 12)); /* Should print 6 */
    
    /* Test Array Access */
    i = 0;
    while (i < 5) {
        output(arr[i]); /* Should print 10, 11, 12, 13, 14 */
        i = i + 1;
    }
}
`;

document.addEventListener('DOMContentLoaded', () => {
    const editor = document.getElementById('code-editor');
    const consoleOutput = document.getElementById('console-output');
    const runBtn = document.getElementById('run-btn');
    const clearBtn = document.getElementById('clear-btn');

    editor.value = defaultCode;

    function log(msg, type = '') {
        const div = document.createElement('div');
        div.className = `log-entry ${type}`;
        div.textContent = msg;
        consoleOutput.appendChild(div);
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
    }

    clearBtn.addEventListener('click', () => {
        consoleOutput.innerHTML = '';
        log('Console cleared.', 'system');
    });

    runBtn.addEventListener('click', async () => {
        consoleOutput.innerHTML = '';
        log('Compiling and running...', 'system');
        
        const source = editor.value;
        
        try {
            // Lexer
            const lexer = new Lexer(source);
            
            // Parser
            const parser = new Parser(lexer);
            const program = parser.parse();
            
            log('Compilation successful. Running...', 'system');
            
            // Interpreter
            const interpreter = new Interpreter(
                (val) => log(val), // Output
                async () => { // Input
                    const val = prompt("Enter an integer input:");
                    log(`> ${val}`, 'input');
                    return val;
                }
            );
            
            await interpreter.interpret(program);
            
            log('Execution finished.', 'system');
            
        } catch (e) {
            log(e.message, 'error');
            console.error(e);
        }
    });
});
