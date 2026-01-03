#ifndef COMPILER_H
#define COMPILER_H

#include <string>
#include <vector>
#include <iostream>
#include <fstream>
#include <map>
#include <memory>
#include <stdexcept>

// --- Token Definitions ---

enum class TokenType {
    // Keywords
    ELSE, IF, INT, RETURN, VOID, WHILE,
    // Special Symbols
    PLUS, MINUS, MULTIPLY, DIVIDE,
    LESS, LESS_EQUAL, GREATER, GREATER_EQUAL, EQUAL, NOT_EQUAL,
    ASSIGN, SEMICOLON, COMMA, LPAREN, RPAREN, LBRACKET, RBRACKET, LBRACE, RBRACE,
    // Markers
    ID, NUM, ENDFILE, ERROR
};

struct Token {
    TokenType type;
    std::string lexeme;
    int line;
};

std::string tokenTypeToString(TokenType type);

// --- AST Definitions ---

enum class NodeKind {
    VarDecl, FunDecl, Param,
    Compound, Selection, Iteration, Return, Assign,
    Op, Const, Id, Call, ArrayAccess
};

struct ASTNode {
    virtual ~ASTNode() = default;
    virtual NodeKind getKind() const = 0;
};

// Declarations
struct Declaration : public ASTNode {
    std::string name;
    // For functions: return type (INT/VOID). For vars: type (INT).
    TokenType type; 
};

struct VarDeclaration : public Declaration {
    bool isArray = false;
    int arraySize = 0;
    NodeKind getKind() const override { return NodeKind::VarDecl; }
};

struct Param : public Declaration {
    bool isArray = false;
    NodeKind getKind() const override { return NodeKind::Param; }
};

struct FunDeclaration : public Declaration {
    std::vector<std::shared_ptr<Param>> params;
    std::shared_ptr<ASTNode> body; // Compound statement
    NodeKind getKind() const override { return NodeKind::FunDecl; }
};

// Statements
struct Statement : public ASTNode {};

struct CompoundStmt : public Statement {
    std::vector<std::shared_ptr<VarDeclaration>> localDecls;
    std::vector<std::shared_ptr<Statement>> statements;
    NodeKind getKind() const override { return NodeKind::Compound; }
};

struct SelectionStmt : public Statement {
    std::shared_ptr<ASTNode> condition; // Expression
    std::shared_ptr<Statement> ifBody;
    std::shared_ptr<Statement> elseBody; // Can be null
    NodeKind getKind() const override { return NodeKind::Selection; }
};

struct IterationStmt : public Statement {
    std::shared_ptr<ASTNode> condition; // Expression
    std::shared_ptr<Statement> body;
    NodeKind getKind() const override { return NodeKind::Iteration; }
};

struct ReturnStmt : public Statement {
    std::shared_ptr<ASTNode> expression; // Can be null for void return
    NodeKind getKind() const override { return NodeKind::Return; }
};

// Expressions
struct Expression : public Statement { // Expressions can be statements
};

struct AssignExpr : public Expression {
    std::string varName;
    std::shared_ptr<ASTNode> index; // For array assignment, null otherwise
    std::shared_ptr<ASTNode> expression;
    NodeKind getKind() const override { return NodeKind::Assign; }
};

struct BinaryExpr : public Expression {
    TokenType op;
    std::shared_ptr<ASTNode> left;
    std::shared_ptr<ASTNode> right;
    NodeKind getKind() const override { return NodeKind::Op; }
};

struct ConstExpr : public Expression {
    int value;
    NodeKind getKind() const override { return NodeKind::Const; }
};

struct IdExpr : public Expression {
    std::string name;
    NodeKind getKind() const override { return NodeKind::Id; }
};

struct ArrayAccessExpr : public Expression {
    std::string name;
    std::shared_ptr<ASTNode> index;
    NodeKind getKind() const override { return NodeKind::ArrayAccess; }
};

struct CallExpr : public Expression {
    std::string funcName;
    std::vector<std::shared_ptr<ASTNode>> args;
    NodeKind getKind() const override { return NodeKind::Call; }
};

// --- Lexer ---

class Lexer {
public:
    Lexer(std::istream& source);
    Token getToken();
    Token peekToken(); // Lookahead without consuming

private:
    std::istream& source;
    char currentChar;
    int lineNo;
    Token nextToken; // 1-token lookahead buffer
    bool hasNextToken;

    char getChar();
    void ungetChar(char c);
    Token scanToken();
};

// --- Parser ---

class Parser {
public:
    Parser(Lexer& lexer);
    std::vector<std::shared_ptr<Declaration>> parse();

private:
    Lexer& lexer;
    Token currentToken;

    void advance();
    void match(TokenType type);
    
    // Grammar productions
    std::shared_ptr<Declaration> parseDeclaration();
    std::shared_ptr<VarDeclaration> parseVarDeclaration();
    std::shared_ptr<FunDeclaration> parseFunDeclaration();
    std::vector<std::shared_ptr<Param>> parseParams();
    std::shared_ptr<Param> parseParam();
    std::shared_ptr<CompoundStmt> parseCompoundStmt();
    std::shared_ptr<Statement> parseStatement();
    std::shared_ptr<Statement> parseExpressionStmt();
    std::shared_ptr<SelectionStmt> parseSelectionStmt();
    std::shared_ptr<IterationStmt> parseIterationStmt();
    std::shared_ptr<ReturnStmt> parseReturnStmt();
    std::shared_ptr<ASTNode> parseExpression();
    std::shared_ptr<ASTNode> parseSimpleExpression(std::shared_ptr<ASTNode> lhs = nullptr);
    std::shared_ptr<ASTNode> parseAdditiveExpression(std::shared_ptr<ASTNode> lhs = nullptr);
    std::shared_ptr<ASTNode> parseTerm(std::shared_ptr<ASTNode> lhs = nullptr);
    std::shared_ptr<ASTNode> parseFactor();
};

// --- Interpreter ---

struct Value {
    int intVal = 0;
    // Could add more types if needed, but C-Minus is int only
};

class Environment {
public:
    Environment(Environment* parent = nullptr);
    void define(const std::string& name, int value);
    void defineArray(const std::string& name, int size);
    int get(const std::string& name);
    int getArray(const std::string& name, int index);
    void assign(const std::string& name, int value);
    void assignArray(const std::string& name, int index, int value);
    bool exists(const std::string& name);

private:
    Environment* parent;
    std::map<std::string, int> values;
    std::map<std::string, std::vector<int>> arrays;
};

class Interpreter {
public:
    void interpret(const std::vector<std::shared_ptr<Declaration>>& program);

private:
    Environment* globalEnv;
    Environment* currentEnv;
    
    // Return value handling
    bool isReturning;
    int returnValue;

    void execute(std::shared_ptr<ASTNode> node);
    int evaluate(std::shared_ptr<ASTNode> node);
    
    // Helpers for specific node types
    void executeCompound(std::shared_ptr<CompoundStmt> stmt);
    void executeSelection(std::shared_ptr<SelectionStmt> stmt);
    void executeIteration(std::shared_ptr<IterationStmt> stmt);
    void executeReturn(std::shared_ptr<ReturnStmt> stmt);
    void executeAssign(std::shared_ptr<AssignExpr> stmt);
    int executeCall(std::shared_ptr<CallExpr> expr);
    
    // Built-ins
    int input();
    void output(int value);
};

#endif // COMPILER_H
