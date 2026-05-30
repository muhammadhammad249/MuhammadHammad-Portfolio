#include "compiler.h"
#include <cctype>
#include <sstream>
#include <algorithm>

// --- Helper Functions ---

std::string tokenTypeToString(TokenType type) {
    switch (type) {
        case TokenType::ELSE: return "ELSE";
        case TokenType::IF: return "IF";
        case TokenType::INT: return "INT";
        case TokenType::RETURN: return "RETURN";
        case TokenType::VOID: return "VOID";
        case TokenType::WHILE: return "WHILE";
        case TokenType::PLUS: return "+";
        case TokenType::MINUS: return "-";
        case TokenType::MULTIPLY: return "*";
        case TokenType::DIVIDE: return "/";
        case TokenType::LESS: return "<";
        case TokenType::LESS_EQUAL: return "<=";
        case TokenType::GREATER: return ">";
        case TokenType::GREATER_EQUAL: return ">=";
        case TokenType::EQUAL: return "==";
        case TokenType::NOT_EQUAL: return "!=";
        case TokenType::ASSIGN: return "=";
        case TokenType::SEMICOLON: return ";";
        case TokenType::COMMA: return ",";
        case TokenType::LPAREN: return "(";
        case TokenType::RPAREN: return ")";
        case TokenType::LBRACKET: return "[";
        case TokenType::RBRACKET: return "]";
        case TokenType::LBRACE: return "{";
        case TokenType::RBRACE: return "}";
        case TokenType::ID: return "ID";
        case TokenType::NUM: return "NUM";
        case TokenType::ENDFILE: return "EOF";
        case TokenType::ERROR: return "ERROR";
        default: return "UNKNOWN";
    }
}

// --- Lexer Implementation ---

Lexer::Lexer(std::istream& source) : source(source), lineNo(1), hasNextToken(false) {
    currentChar = getChar();
}

char Lexer::getChar() {
    char c;
    if (source.get(c)) {
        return c;
    }
    return EOF;
}

void Lexer::ungetChar(char c) {
    if (c != EOF) {
        source.putback(c);
    }
}

Token Lexer::peekToken() {
    if (!hasNextToken) {
        nextToken = scanToken();
        hasNextToken = true;
    }
    return nextToken;
}

Token Lexer::getToken() {
    if (hasNextToken) {
        hasNextToken = false;
        return nextToken;
    }
    return scanToken();
}

Token Lexer::scanToken() {
    while (isspace(currentChar)) {
        if (currentChar == '\n') lineNo++;
        currentChar = getChar();
    }

    if (currentChar == EOF) {
        return {TokenType::ENDFILE, "", lineNo};
    }

    if (isalpha(currentChar)) {
        std::string buffer;
        while (isalnum(currentChar)) {
            buffer += currentChar;
            currentChar = getChar();
        }
        
        TokenType type = TokenType::ID;
        if (buffer == "else") type = TokenType::ELSE;
        else if (buffer == "if") type = TokenType::IF;
        else if (buffer == "int") type = TokenType::INT;
        else if (buffer == "return") type = TokenType::RETURN;
        else if (buffer == "void") type = TokenType::VOID;
        else if (buffer == "while") type = TokenType::WHILE;

        return {type, buffer, lineNo};
    }

    if (isdigit(currentChar)) {
        std::string buffer;
        while (isdigit(currentChar)) {
            buffer += currentChar;
            currentChar = getChar();
        }
        return {TokenType::NUM, buffer, lineNo};
    }

    switch (currentChar) {
        case '+': currentChar = getChar(); return {TokenType::PLUS, "+", lineNo};
        case '-': currentChar = getChar(); return {TokenType::MINUS, "-", lineNo};
        case '*': currentChar = getChar(); return {TokenType::MULTIPLY, "*", lineNo};
        case '/': 
            currentChar = getChar();
            if (currentChar == '*') { // Comment start
                char prev = 0;
                currentChar = getChar(); // consume *
                while (true) {
                    if (prev == '*' && currentChar == '/') {
                        currentChar = getChar(); // consume /
                        break;
                    }
                    if (currentChar == EOF) return {TokenType::ERROR, "Unterminated comment", lineNo};
                    if (currentChar == '\n') lineNo++;
                    prev = currentChar;
                    currentChar = getChar();
                }
                return scanToken(); // Recursively call to get next token
            } else {
                return {TokenType::DIVIDE, "/", lineNo};
            }
        case '<':
            currentChar = getChar();
            if (currentChar == '=') { currentChar = getChar(); return {TokenType::LESS_EQUAL, "<=", lineNo}; }
            return {TokenType::LESS, "<", lineNo};
        case '>':
            currentChar = getChar();
            if (currentChar == '=') { currentChar = getChar(); return {TokenType::GREATER_EQUAL, ">=", lineNo}; }
            return {TokenType::GREATER, ">", lineNo};
        case '=':
            currentChar = getChar();
            if (currentChar == '=') { currentChar = getChar(); return {TokenType::EQUAL, "==", lineNo}; }
            return {TokenType::ASSIGN, "=", lineNo};
        case '!':
            currentChar = getChar();
            if (currentChar == '=') { currentChar = getChar(); return {TokenType::NOT_EQUAL, "!=", lineNo}; }
            return {TokenType::ERROR, "Expected =", lineNo};
        case ';': currentChar = getChar(); return {TokenType::SEMICOLON, ";", lineNo};
        case ',': currentChar = getChar(); return {TokenType::COMMA, ",", lineNo};
        case '(': currentChar = getChar(); return {TokenType::LPAREN, "(", lineNo};
        case ')': currentChar = getChar(); return {TokenType::RPAREN, ")", lineNo};
        case '[': currentChar = getChar(); return {TokenType::LBRACKET, "[", lineNo};
        case ']': currentChar = getChar(); return {TokenType::RBRACKET, "]", lineNo};
        case '{': currentChar = getChar(); return {TokenType::LBRACE, "{", lineNo};
        case '}': currentChar = getChar(); return {TokenType::RBRACE, "}", lineNo};
        default:
            std::string err(1, currentChar);
            currentChar = getChar();
            return {TokenType::ERROR, "Unknown character: " + err, lineNo};
    }
}

// --- Parser Implementation ---

Parser::Parser(Lexer& lexer) : lexer(lexer) {
    advance();
}

void Parser::advance() {
    currentToken = lexer.getToken();
}

void Parser::match(TokenType type) {
    if (currentToken.type == type) {
        advance();
    } else {
        throw std::runtime_error("Syntax Error at line " + std::to_string(currentToken.line) + 
                                 ": Expected " + tokenTypeToString(type) + 
                                 ", got " + tokenTypeToString(currentToken.type));
    }
}

std::vector<std::shared_ptr<Declaration>> Parser::parse() {
    std::vector<std::shared_ptr<Declaration>> declarations;
    while (currentToken.type != TokenType::ENDFILE) {
        declarations.push_back(parseDeclaration());
    }
    return declarations;
}

std::shared_ptr<Declaration> Parser::parseDeclaration() {
    // Both var and fun decl start with type-specifier ID
    TokenType type = currentToken.type;
    if (type != TokenType::INT && type != TokenType::VOID) {
        throw std::runtime_error("Syntax Error at line " + std::to_string(currentToken.line) + ": Expected type specifier");
    }
    advance();

    std::string name = currentToken.lexeme;
    match(TokenType::ID);

    if (currentToken.type == TokenType::LPAREN) {
        // Function Declaration
        auto funDecl = std::make_shared<FunDeclaration>();
        funDecl->name = name;
        funDecl->type = type;
        
        match(TokenType::LPAREN);
        funDecl->params = parseParams();
        match(TokenType::RPAREN);
        funDecl->body = parseCompoundStmt();
        return funDecl;
    } else {
        // Variable Declaration
        auto varDecl = std::make_shared<VarDeclaration>();
        varDecl->name = name;
        varDecl->type = type;

        if (currentToken.type == TokenType::LBRACKET) {
            match(TokenType::LBRACKET);
            varDecl->isArray = true;
            if (currentToken.type == TokenType::NUM) {
                varDecl->arraySize = std::stoi(currentToken.lexeme);
                match(TokenType::NUM);
            } else {
                throw std::runtime_error("Syntax Error: Expected array size");
            }
            match(TokenType::RBRACKET);
        }
        match(TokenType::SEMICOLON);
        return varDecl;
    }
}

std::vector<std::shared_ptr<Param>> Parser::parseParams() {
    std::vector<std::shared_ptr<Param>> params;
    if (currentToken.type == TokenType::VOID) {
        // Check if it's (void) or (void x) - C-Minus usually just (void) for empty
        // But we need to peek to be sure it's not a type for a param?
        // Standard C-Minus: params -> param-list | void
        Token next = lexer.peekToken();
        if (next.type == TokenType::RPAREN) {
            advance(); // consume void
            return params;
        }
    }
    
    // If we are here, it's a list of params
    // But wait, if it was just VOID and not followed by RPAREN, it's a type specifier for a param?
    // Actually C-Minus grammar: params -> param-list | void. param-list -> param { , param }
    
    // If current is VOID, and we didn't return above, it might be `void x` which is invalid in standard C, but let's assume standard C-Minus logic.
    // Let's implement param-list loop.
    
    // If current is RPAREN, empty list (if allowed)
    if (currentToken.type == TokenType::RPAREN) return params;

    do {
        if (currentToken.type == TokenType::COMMA) match(TokenType::COMMA); // consume comma if loop
        params.push_back(parseParam());
    } while (currentToken.type == TokenType::COMMA);
    
    return params;
}

std::shared_ptr<Param> Parser::parseParam() {
    auto param = std::make_shared<Param>();
    if (currentToken.type == TokenType::INT || currentToken.type == TokenType::VOID) {
        param->type = currentToken.type;
        advance();
    } else {
         throw std::runtime_error("Syntax Error: Expected type specifier in param");
    }

    if (currentToken.type == TokenType::ID) {
        param->name = currentToken.lexeme;
        advance();
    } // else could be void only? C-Minus usually requires ID unless it's just (void)

    if (currentToken.type == TokenType::LBRACKET) {
        match(TokenType::LBRACKET);
        match(TokenType::RBRACKET);
        param->isArray = true;
    }
    return param;
}

std::shared_ptr<CompoundStmt> Parser::parseCompoundStmt() {
    match(TokenType::LBRACE);
    auto stmt = std::make_shared<CompoundStmt>();
    
    // Local Declarations
    while (currentToken.type == TokenType::INT || currentToken.type == TokenType::VOID) {
        // We need to distinguish between var decl and statement?
        // In C-Minus, local declarations must be at the top.
        // VarDecl starts with type. Statement doesn't start with type.
        stmt->localDecls.push_back(std::dynamic_pointer_cast<VarDeclaration>(parseDeclaration()));
    }

    // Statements
    while (currentToken.type != TokenType::RBRACE && currentToken.type != TokenType::ENDFILE) {
        stmt->statements.push_back(parseStatement());
    }
    
    match(TokenType::RBRACE);
    return stmt;
}

std::shared_ptr<Statement> Parser::parseStatement() {
    switch (currentToken.type) {
        case TokenType::IF: return parseSelectionStmt();
        case TokenType::WHILE: return parseIterationStmt();
        case TokenType::RETURN: return parseReturnStmt();
        case TokenType::LBRACE: return parseCompoundStmt();
        default: return parseExpressionStmt();
    }
}

std::shared_ptr<SelectionStmt> Parser::parseSelectionStmt() {
    match(TokenType::IF);
    match(TokenType::LPAREN);
    auto stmt = std::make_shared<SelectionStmt>();
    stmt->condition = parseExpression();
    match(TokenType::RPAREN);
    stmt->ifBody = parseStatement();
    if (currentToken.type == TokenType::ELSE) {
        match(TokenType::ELSE);
        stmt->elseBody = parseStatement();
    }
    return stmt;
}

std::shared_ptr<IterationStmt> Parser::parseIterationStmt() {
    match(TokenType::WHILE);
    match(TokenType::LPAREN);
    auto stmt = std::make_shared<IterationStmt>();
    stmt->condition = parseExpression();
    match(TokenType::RPAREN);
    stmt->body = parseStatement();
    return stmt;
}

std::shared_ptr<ReturnStmt> Parser::parseReturnStmt() {
    match(TokenType::RETURN);
    auto stmt = std::make_shared<ReturnStmt>();
    if (currentToken.type != TokenType::SEMICOLON) {
        stmt->expression = parseExpression();
    }
    match(TokenType::SEMICOLON);
    return stmt;
}

std::shared_ptr<Statement> Parser::parseExpressionStmt() {
    if (currentToken.type == TokenType::SEMICOLON) {
        match(TokenType::SEMICOLON);
        return nullptr; // Empty statement
    }
    auto expr = parseExpression();
    match(TokenType::SEMICOLON);
    // Wrap expression in statement? Expression inherits from Statement in our AST
    return std::dynamic_pointer_cast<Statement>(expr);
}

std::shared_ptr<ASTNode> Parser::parseExpression() {
    // Assign or SimpleExpression
    // ID = Expr
    // SimpleExpr
    // We need lookahead. ID could be start of assignment or start of simple expr.
    // If ID, check next. If =, it's assignment. If [..] =, assignment.
    
    // Let's parse a SimpleExpression first. If it turns out to be an l-value followed by =, we handle it?
    // Recursive descent usually handles this by parsing the LHS, then checking for =.
    // But `parseSimpleExpression` returns an ASTNode. 
    
    // Strategy: Check if it's an assignment first.
    // Assignment: var = expression
    // var: ID | ID [ expression ]
    
    if (currentToken.type == TokenType::ID) {
        Token next = lexer.peekToken();
        if (next.type == TokenType::ASSIGN) {
            // ID = Expr
            auto assign = std::make_shared<AssignExpr>();
            assign->varName = currentToken.lexeme;
            advance(); // ID
            advance(); // =
            assign->expression = parseExpression();
            return assign;
        } else if (next.type == TokenType::LBRACKET) {
            // ID [ ...
            // Could be ID[idx] = expr OR ID[idx]... (part of expression)
            // We need to look further ahead or parse the index and see.
            // Since we don't have infinite lookahead easily, let's parse the ID[idx] part.
            
            // Actually, let's just parse a SimpleExpression. If the result is an IdExpr or ArrayAccessExpr AND the next token is =, then we convert it to assignment.
            // But standard C-Minus grammar says: expression -> var = expression | simple-expression
            
            // Let's rely on the fact that an assignment starts with ID.
            std::string name = currentToken.lexeme;
            advance(); // consume ID
            
            if (currentToken.type == TokenType::LBRACKET) {
                match(TokenType::LBRACKET);
                auto index = parseExpression();
                match(TokenType::RBRACKET);
                
                if (currentToken.type == TokenType::ASSIGN) {
                    match(TokenType::ASSIGN);
                    auto assign = std::make_shared<AssignExpr>();
                    assign->varName = name;
                    assign->index = index;
                    assign->expression = parseExpression();
                    return assign;
                } else {
                    // It was an array access in a larger expression
                    auto arrAccess = std::make_shared<ArrayAccessExpr>();
                    arrAccess->name = name;
                    arrAccess->index = index;
                    // Now continue parsing simple expression starting with this term
                    return parseSimpleExpression(arrAccess);
                }
            } else if (currentToken.type == TokenType::ASSIGN) {
                match(TokenType::ASSIGN);
                auto assign = std::make_shared<AssignExpr>();
                assign->varName = name;
                assign->expression = parseExpression();
                return assign;
            } else {
                // Just an ID in an expression
                auto idExpr = std::make_shared<IdExpr>();
                idExpr->name = name;
                // Continue parsing simple expression
                // But wait, if it was a function call? ID ( ...
                if (currentToken.type == TokenType::LPAREN) {
                     match(TokenType::LPAREN);
                     auto call = std::make_shared<CallExpr>();
                     call->funcName = name;
                     if (currentToken.type != TokenType::RPAREN) {
                         do {
                             if (currentToken.type == TokenType::COMMA) match(TokenType::COMMA);
                             call->args.push_back(parseExpression());
                         } while (currentToken.type == TokenType::COMMA);
                     }
                     match(TokenType::RPAREN);
                     return parseSimpleExpression(call);
                }
                
                return parseSimpleExpression(idExpr);
            }
        }
    }
    
    return parseSimpleExpression();
}

std::shared_ptr<ASTNode> Parser::parseSimpleExpression(std::shared_ptr<ASTNode> lhs) {
    // simple-expression -> additive-expression [ relop additive-expression ]
    auto left = parseAdditiveExpression(lhs);
    
    TokenType t = currentToken.type;
    if (t == TokenType::LESS || t == TokenType::LESS_EQUAL || t == TokenType::GREATER || 
        t == TokenType::GREATER_EQUAL || t == TokenType::EQUAL || t == TokenType::NOT_EQUAL) {
        auto binExpr = std::make_shared<BinaryExpr>();
        binExpr->op = t;
        binExpr->left = left;
        advance();
        binExpr->right = parseAdditiveExpression();
        return binExpr;
    }
    return left;
}

std::shared_ptr<ASTNode> Parser::parseAdditiveExpression(std::shared_ptr<ASTNode> lhs) {
    // additive-expression -> term { addop term }
    auto left = parseTerm(lhs);
    while (currentToken.type == TokenType::PLUS || currentToken.type == TokenType::MINUS) {
        auto binExpr = std::make_shared<BinaryExpr>();
        binExpr->op = currentToken.type;
        binExpr->left = left;
        advance();
        binExpr->right = parseTerm();
        left = binExpr;
    }
    return left;
}

std::shared_ptr<ASTNode> Parser::parseTerm(std::shared_ptr<ASTNode> lhs) {
    // term -> factor { mulop factor }
    auto left = lhs ? lhs : parseFactor();
    while (currentToken.type == TokenType::MULTIPLY || currentToken.type == TokenType::DIVIDE) {
        auto binExpr = std::make_shared<BinaryExpr>();
        binExpr->op = currentToken.type;
        binExpr->left = left;
        advance();
        binExpr->right = parseFactor();
        left = binExpr;
    }
    return left;
}

std::shared_ptr<ASTNode> Parser::parseFactor() {
    // factor -> ( expression ) | var | call | NUM
    if (currentToken.type == TokenType::LPAREN) {
        match(TokenType::LPAREN);
        auto expr = parseExpression();
        match(TokenType::RPAREN);
        return expr;
    } else if (currentToken.type == TokenType::NUM) {
        auto constExpr = std::make_shared<ConstExpr>();
        constExpr->value = std::stoi(currentToken.lexeme);
        advance();
        return constExpr;
    } else if (currentToken.type == TokenType::ID) {
        // Could be var, array access, or call
        std::string name = currentToken.lexeme;
        advance();
        if (currentToken.type == TokenType::LPAREN) {
            // Call
            match(TokenType::LPAREN);
            auto call = std::make_shared<CallExpr>();
            call->funcName = name;
             if (currentToken.type != TokenType::RPAREN) {
                 do {
                     if (currentToken.type == TokenType::COMMA) match(TokenType::COMMA);
                     call->args.push_back(parseExpression());
                 } while (currentToken.type == TokenType::COMMA);
             }
            match(TokenType::RPAREN);
            return call;
        } else if (currentToken.type == TokenType::LBRACKET) {
            // Array Access
            match(TokenType::LBRACKET);
            auto arr = std::make_shared<ArrayAccessExpr>();
            arr->name = name;
            arr->index = parseExpression();
            match(TokenType::RBRACKET);
            return arr;
        } else {
            // Var
            auto id = std::make_shared<IdExpr>();
            id->name = name;
            return id;
        }
    } else {
        throw std::runtime_error("Syntax Error: Unexpected token in factor: " + tokenTypeToString(currentToken.type));
    }
}

// --- Interpreter Implementation ---

Environment::Environment(Environment* parent) : parent(parent) {}

void Environment::define(const std::string& name, int value) {
    values[name] = value;
}

void Environment::defineArray(const std::string& name, int size) {
    arrays[name] = std::vector<int>(size, 0);
}

int Environment::get(const std::string& name) {
    if (values.find(name) != values.end()) return values[name];
    if (parent) return parent->get(name);
    throw std::runtime_error("Runtime Error: Undefined variable '" + name + "'");
}

int Environment::getArray(const std::string& name, int index) {
    if (arrays.find(name) != arrays.end()) {
        if (index < 0 || index >= arrays[name].size()) throw std::runtime_error("Runtime Error: Array index out of bounds");
        return arrays[name][index];
    }
    if (parent) return parent->getArray(name, index);
    throw std::runtime_error("Runtime Error: Undefined array '" + name + "'");
}

void Environment::assign(const std::string& name, int value) {
    if (values.find(name) != values.end()) {
        values[name] = value;
        return;
    }
    if (parent) {
        parent->assign(name, value);
        return;
    }
    throw std::runtime_error("Runtime Error: Undefined variable '" + name + "'");
}

void Environment::assignArray(const std::string& name, int index, int value) {
    if (arrays.find(name) != arrays.end()) {
        if (index < 0 || index >= arrays[name].size()) throw std::runtime_error("Runtime Error: Array index out of bounds");
        arrays[name][index] = value;
        return;
    }
    if (parent) {
        parent->assignArray(name, index, value);
        return;
    }
    throw std::runtime_error("Runtime Error: Undefined array '" + name + "'");
}

bool Environment::exists(const std::string& name) {
    if (values.find(name) != values.end()) return true;
    if (arrays.find(name) != arrays.end()) return true;
    if (parent) return parent->exists(name);
    return false;
}

void Interpreter::interpret(const std::vector<std::shared_ptr<Declaration>>& program) {
    globalEnv = new Environment();
    currentEnv = globalEnv;
    
    // 1. Process global declarations
    std::shared_ptr<FunDeclaration> mainFunc = nullptr;
    
    for (const auto& decl : program) {
        if (decl->getKind() == NodeKind::VarDecl) {
            auto varDecl = std::dynamic_pointer_cast<VarDeclaration>(decl);
            if (varDecl->isArray) {
                globalEnv->defineArray(varDecl->name, varDecl->arraySize);
            } else {
                globalEnv->define(varDecl->name, 0);
            }
        } else if (decl->getKind() == NodeKind::FunDecl) {
            auto funDecl = std::dynamic_pointer_cast<FunDeclaration>(decl);
            // Store function AST in a way we can retrieve it? 
            // We can't store AST in Environment<int>. 
            // For simplicity, let's keep a separate map of functions in Interpreter, or just search the program AST.
            // Better: search program AST when calling.
            if (funDecl->name == "main") mainFunc = funDecl;
        }
    }

    if (!mainFunc) {
        throw std::runtime_error("Runtime Error: 'main' function not found");
    }

    // 2. Execute main
    try {
        // We need to pass the program to executeCall or store functions somewhere.
        // Let's make a map of functions for O(1) lookup
        // Hack: We'll just store them in a member variable or static map?
        // Let's use a member map.
    } catch (const std::exception& e) {
        std::cerr << e.what() << std::endl;
    }
    
    // Clean up
    delete globalEnv;
}

// We need a way to look up functions. Let's add a map to the Interpreter class in the .cpp file (hidden) or just pass it around.
// Since I can't easily change the header now without another tool call, I'll use a static map in this translation unit or modify the class structure if I could.
// But wait, I can just scan the `program` vector passed to `interpret`. It's available in `interpret`.
// I will store `program` in a member variable of Interpreter.

// Re-declaring Interpreter members to include function map logic would require header change.
// I will assume `interpret` sets up the function map.

static std::map<std::string, std::shared_ptr<FunDeclaration>> functionMap;

void Interpreter::execute(std::shared_ptr<ASTNode> node) {
    if (!node) return;
    if (isReturning) return;

    switch (node->getKind()) {
        case NodeKind::Compound: executeCompound(std::dynamic_pointer_cast<CompoundStmt>(node)); break;
        case NodeKind::Selection: executeSelection(std::dynamic_pointer_cast<SelectionStmt>(node)); break;
        case NodeKind::Iteration: executeIteration(std::dynamic_pointer_cast<IterationStmt>(node)); break;
        case NodeKind::Return: executeReturn(std::dynamic_pointer_cast<ReturnStmt>(node)); break;
        case NodeKind::Assign: executeAssign(std::dynamic_pointer_cast<AssignExpr>(node)); break;
        case NodeKind::Call: executeCall(std::dynamic_pointer_cast<CallExpr>(node)); break;
        // Expression statements (like just "input();")
        case NodeKind::Op: evaluate(node); break;
        default: break;
    }
}

int Interpreter::evaluate(std::shared_ptr<ASTNode> node) {
    if (!node) return 0;
    
    switch (node->getKind()) {
        case NodeKind::Const: return std::dynamic_pointer_cast<ConstExpr>(node)->value;
        case NodeKind::Id: return currentEnv->get(std::dynamic_pointer_cast<IdExpr>(node)->name);
        case NodeKind::ArrayAccess: {
            auto arr = std::dynamic_pointer_cast<ArrayAccessExpr>(node);
            int idx = evaluate(arr->index);
            return currentEnv->getArray(arr->name, idx);
        }
        case NodeKind::Op: {
            auto op = std::dynamic_pointer_cast<BinaryExpr>(node);
            int l = evaluate(op->left);
            int r = evaluate(op->right);
            switch (op->op) {
                case TokenType::PLUS: return l + r;
                case TokenType::MINUS: return l - r;
                case TokenType::MULTIPLY: return l * r;
                case TokenType::DIVIDE: return (r != 0) ? l / r : 0; // Avoid div by zero
                case TokenType::LESS: return l < r;
                case TokenType::LESS_EQUAL: return l <= r;
                case TokenType::GREATER: return l > r;
                case TokenType::GREATER_EQUAL: return l >= r;
                case TokenType::EQUAL: return l == r;
                case TokenType::NOT_EQUAL: return l != r;
                default: return 0;
            }
        }
        case NodeKind::Call: return executeCall(std::dynamic_pointer_cast<CallExpr>(node));
        case NodeKind::Assign: {
             // Assignment is an expression in C, but in C-Minus usually statement?
             // Our AST treats it as Expression.
             executeAssign(std::dynamic_pointer_cast<AssignExpr>(node));
             // Return value of assignment? C returns the assigned value.
             // Let's return the value.
             auto assign = std::dynamic_pointer_cast<AssignExpr>(node);
             if (assign->index) return currentEnv->getArray(assign->varName, evaluate(assign->index));
             return currentEnv->get(assign->varName);
        }
        default: return 0;
    }
}

void Interpreter::executeCompound(std::shared_ptr<CompoundStmt> stmt) {
    // Enter new scope? C-Minus usually has scope per function, but compound blocks can have locals?
    // "Variables: Global and local integer variables with proper scoping."
    // Yes, let's create a new environment.
    Environment* prevEnv = currentEnv;
    currentEnv = new Environment(prevEnv);
    
    for (auto decl : stmt->localDecls) {
        if (decl->isArray) currentEnv->defineArray(decl->name, decl->arraySize);
        else currentEnv->define(decl->name, 0);
    }
    
    for (auto s : stmt->statements) {
        execute(s);
        if (isReturning) break;
    }
    
    Environment* temp = currentEnv;
    currentEnv = prevEnv;
    delete temp;
}

void Interpreter::executeSelection(std::shared_ptr<SelectionStmt> stmt) {
    if (evaluate(stmt->condition)) {
        execute(stmt->ifBody);
    } else if (stmt->elseBody) {
        execute(stmt->elseBody);
    }
}

void Interpreter::executeIteration(std::shared_ptr<IterationStmt> stmt) {
    while (evaluate(stmt->condition)) {
        execute(stmt->body);
        if (isReturning) break;
    }
}

void Interpreter::executeReturn(std::shared_ptr<ReturnStmt> stmt) {
    if (stmt->expression) {
        returnValue = evaluate(stmt->expression);
    }
    isReturning = true;
}

void Interpreter::executeAssign(std::shared_ptr<AssignExpr> stmt) {
    int val = evaluate(stmt->expression);
    if (stmt->index) {
        int idx = evaluate(stmt->index);
        currentEnv->assignArray(stmt->varName, idx, val);
    } else {
        currentEnv->assign(stmt->varName, val);
    }
}

int Interpreter::input() {
    int val;
    std::cout << "input: "; // Prompt
    std::cin >> val;
    return val;
}

void Interpreter::output(int value) {
    std::cout << value << std::endl;
}

int Interpreter::executeCall(std::shared_ptr<CallExpr> expr) {
    if (expr->funcName == "input") return input();
    if (expr->funcName == "output") {
        int val = evaluate(expr->args[0]);
        output(val);
        return 0; // Void return
    }

    if (functionMap.find(expr->funcName) == functionMap.end()) {
        throw std::runtime_error("Runtime Error: Undefined function '" + expr->funcName + "'");
    }

    auto func = functionMap[expr->funcName];
    if (func->params.size() != expr->args.size()) {
        throw std::runtime_error("Runtime Error: Argument count mismatch for '" + expr->funcName + "'");
    }

    // Evaluate args in current scope
    std::vector<int> argValues;
    for (auto arg : expr->args) {
        argValues.push_back(evaluate(arg));
    }

    // Switch context
    Environment* savedEnv = currentEnv;
    // Function scope parent should be globalEnv (static scoping), NOT currentEnv (dynamic scoping)
    // Unless we want nested functions (not in C-Minus).
    currentEnv = new Environment(globalEnv);

    // Bind params
    for (size_t i = 0; i < func->params.size(); ++i) {
        currentEnv->define(func->params[i]->name, argValues[i]);
    }

    // Execute body
    bool savedIsReturning = isReturning;
    isReturning = false;
    int savedReturnValue = returnValue;
    returnValue = 0;

    execute(func->body);

    int result = returnValue;

    // Restore
    Environment* temp = currentEnv;
    currentEnv = savedEnv;
    delete temp;
    
    isReturning = savedIsReturning;
    returnValue = savedReturnValue;

    return result;
}

// Redefine interpret to populate map
void Interpreter::interpret(const std::vector<std::shared_ptr<Declaration>>& program) {
    functionMap.clear();
    globalEnv = new Environment();
    currentEnv = globalEnv;
    isReturning = false;
    returnValue = 0;

    std::shared_ptr<FunDeclaration> mainFunc = nullptr;

    for (const auto& decl : program) {
        if (decl->getKind() == NodeKind::VarDecl) {
            auto varDecl = std::dynamic_pointer_cast<VarDeclaration>(decl);
            if (varDecl->isArray) {
                globalEnv->defineArray(varDecl->name, varDecl->arraySize);
            } else {
                globalEnv->define(varDecl->name, 0);
            }
        } else if (decl->getKind() == NodeKind::FunDecl) {
            auto funDecl = std::dynamic_pointer_cast<FunDeclaration>(decl);
            functionMap[funDecl->name] = funDecl;
            if (funDecl->name == "main") mainFunc = funDecl;
        }
    }

    if (!mainFunc) {
        std::cerr << "Runtime Error: 'main' function not found" << std::endl;
        return;
    }

    try {
        // Execute main
        // Main has no args in C-Minus usually
        Environment* savedEnv = currentEnv;
        currentEnv = new Environment(globalEnv);
        execute(mainFunc->body);
        delete currentEnv;
        currentEnv = savedEnv;
    } catch (const std::exception& e) {
        std::cerr << e.what() << std::endl;
    }

    delete globalEnv;
}

// --- Main ---

int main(int argc, char* argv[]) {
    if (argc != 2) {
        std::cerr << "Usage: " << argv[0] << " <source_file>" << std::endl;
        return 1;
    }

    std::ifstream file(argv[1]);
    if (!file.is_open()) {
        std::cerr << "Error: Could not open file " << argv[1] << std::endl;
        return 1;
    }

    try {
        Lexer lexer(file);
        Parser parser(lexer);
        auto program = parser.parse();
        
        Interpreter interpreter;
        interpreter.interpret(program);
        
    } catch (const std::exception& e) {
        std::cerr << e.what() << std::endl;
        return 1;
    }

    return 0;
}
