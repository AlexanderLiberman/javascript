import { head, tail, pair, Pair, is_null, list, append } from '../../generalLibraries/list';
import { Tree, make_leaf, make_tree, left_branch, right_branch, value, is_empty_tree } from '../../generalLibraries/binary_search_tree';

/* Type declarations DO NOT MODIFY */
type Exp = BinaryExp | Variable | Literal | Invalid;
type Table<K, V> = null | Tree<Pair<K, V>>;
/* End of type declarations */

/*
    TASK 1: type the following Table functions
    ONLY add types, and otherwise DO NOT modify the code.
*/

function make_table<K, V>():Table<K, V> {
    return null;
}

// Adds (or updates) a key => value mapping in the table
function table_insert<K, V>(t: Table<K, V>, k: K, v: V): Table<K, V> {
    return t === null
        ? make_leaf(pair(k, v))
        : head(value(t)) === k
        ? make_tree(pair(k, v), left_branch(t), right_branch(t))
        : head(value(t)) > k
        ? make_tree(value(t), table_insert(left_branch(t), k, v), right_branch(t))
        : make_tree(value(t), left_branch(t), table_insert(right_branch(t), k, v));
}

function table_has_key<K, V>(t: Table<K, V>, k: K): Boolean  {
    return table_get_value(t, k) !== null;
}

function table_get_value<K, V>(t: Table<K, V>, k: K): V | null {
    return t === null
        ? null
        : head(value(t)) === k
        ? tail(value(t))
        : head(value(t)) > k
        ? table_get_value(left_branch(t), k)
        : table_get_value(right_branch(t), k);
}

function display_table<K, V>(t: Table<K, V>): void {
    function concat<K, V>(t: Table<K, V>): string {
        return is_empty_tree(t)
            ? ""
            : concat(left_branch(t)) + " ("+ value(t) + "), " + concat(right_branch(t))
    }
    console.log(concat(t));
}

// Small test program
const keys: string[] = ["b", "a", "c"];
const values: number[] = [2, 1, 3];
let table: Table<string, number> = make_table();
for (let i = 0; i < keys.length; i = i + 1) {
    table = table_insert(table, keys[i], values[i]);
}
display_table(table);

/*
    TASK 2: type the following Expression functions
    ONLY add types, and otherwise DO NOT modify the code.
*/

// define the following types:
type BinaryExp = [string, [any, any]];
type Variable = ['variable', string];
type Literal = ['number', number];
type Invalid = [string, string];

function make_binary_expression(tag: string, lhs: Exp, rhs: Exp): BinaryExp {
    if (tag === "+" || tag === "-" || tag === "*" || tag === "/") {
        return pair(tag, pair(lhs, rhs));
    } else {
        return pair("+", pair(lhs, rhs));
    }
}

function get_lhs(exp: BinaryExp): Exp {
    return head(tail(exp));
}

function get_rhs(exp: BinaryExp): Exp {
    return tail(tail(exp));
}

function make_add(lhs: Exp, rhs: Exp): BinaryExp {
    return make_binary_expression("+", lhs, rhs);
}

function make_sub(lhs: Exp, rhs: Exp): BinaryExp {
    return make_binary_expression("-", lhs, rhs);
}

function make_mul(lhs: Exp, rhs: Exp): BinaryExp {
    return make_binary_expression("*", lhs, rhs);
}

function make_div(lhs: Exp, rhs: Exp): BinaryExp {
    return make_binary_expression("/", lhs, rhs);
}

function make_number(num: number): Literal {
    return pair("number", num);
}

function make_variable(name: string): Variable {
    return pair("variable", name);
}

function is_binary(exp: Exp): exp is BinaryExp {
    const tag: string = head<string, any>(exp);
    return tag === "+" || tag === "-" || tag === "*" || tag === "/";
}

function needs_parentheses(exp: BinaryExp): Boolean{
    const tag: string = head(exp);
    return tag === "+" || tag === "-";
}
function get_operator(exp: BinaryExp): string { return head(exp); } // operator is given as string

function is_add(exp: BinaryExp): boolean { return head(exp) === "+"; }
function is_sub(exp: BinaryExp): boolean { return head(exp) === "-"; }
function is_mul(exp: BinaryExp): boolean { return head(exp) === "*"; }
function is_div(exp: BinaryExp): boolean { return head(exp) === "/"; }

// do not modify the function is_number
function is_number(exp: Exp): exp is Literal { return head<string, any>(exp) === "number"; }

function get_value(exp: Literal): number { return tail(exp); }
function is_variable(exp: Exp): exp is Variable { return head<string, any>(exp) === "variable"; }
function get_var_name(exp: Variable): string { return tail(exp); }

function evaluate(exp: Exp, env: Table<string, number>): Exp {
    function evaluate_binary(bin_exp: BinaryExp): Literal | BinaryExp {
        const lhs: Exp = evaluate(get_lhs(bin_exp), env);
        const rhs: Exp = evaluate(get_rhs(bin_exp), env);
        if (is_number(lhs) && is_number(rhs)) {
            return is_add(bin_exp) ? make_number(get_value(lhs) + get_value(rhs))
                : is_sub(bin_exp) ? make_number(get_value(lhs) - get_value(rhs))
                : is_mul(bin_exp) ? make_number(get_value(lhs) * get_value(rhs))
                :               make_number(get_value(lhs) / get_value(rhs));
        } else {
            return make_add(lhs, rhs);
        }
    }
    function evaluate_variable(exp: Variable): Exp {
        const var_name: string = get_var_name(exp);
        return table_has_key(env, var_name)
            ? make_number(table_get_value(env, var_name) as number) 
            : exp; 
    }
    return is_number(exp)
        ? exp
        : is_variable(exp)
        ? evaluate_variable(exp as Variable)
        : evaluate_binary(exp as BinaryExp);
}

/*
    Test code for task 2
*/
const exp1 = make_mul(make_add(make_number(5), make_mul(make_number(6), make_number(8))), make_add(make_number(5), make_add(make_number(6), make_number(8))));
const exp2 = make_add(make_number(5), make_add(make_mul(make_number(6), make_mul(make_number(8), make_number(5))), make_add(make_number(6), make_number(8))));

// prints: [ 'number', 1007 ]
console.log(evaluate(exp1, table));
// prints: [ 'number', 259 ]
console.log(evaluate(exp2, table));

/*
    TASK 3: implement and type the function pretty-print
    DO NOT change the signature of this function, i.e. the number of arguments etc.
*/

/** 
 * Rewrites an expression into a string, following arithmetic rules of formatting (uses parenthesis when multiplying/dividing two binary expressions, eg. (6 + 2) * (2+1))
 * @precondition Assumes that input is of type BinaryExp, Literal, Variable
 * @example  
 * // prints: (5 + 6 * 8) * (5 + 6 + 8)
 * console.log(pretty_print(make_mul(make_add(make_number(5), make_mul(make_number(6), make_number(8))), make_add(make_number(5), make_add(make_number(6), make_number(8)))));
 * @param exp expression to be rewritten 
 * @returns Returns expression written as a string,following arithmetic rules of formatting 
 */

function pretty_print(exp: Exp): string {
    function parPicker(xpres: Exp, par: boolean): string {
        return  is_binary(xpres)
                ? is_mul(xpres) || is_div(xpres) // Checks if the operator is '*' or '/' -> To decide whether to add a parenthesis or not
                    ? parPicker(get_lhs(xpres), true) + ' ' + get_operator(xpres) + ' ' + parPicker(get_lhs(xpres), true)
                    : par
                        ? '(' + parPicker(get_lhs(xpres), false) + ' ' + get_operator(xpres) + ' ' + parPicker(get_rhs(xpres), false) + ')' // If we need parenthesis (expression is a multiplication with 2 binary expressions)
                        : parPicker(get_lhs(xpres), false) + ' ' + get_operator(xpres) + ' ' + parPicker(get_rhs(xpres), false) // If we don't need parenthesis
                : is_variable(xpres) // Checks if expression is a variable
                    ? get_var_name(xpres) // Returns name of variable (eg. 'x')
                : is_number(xpres) // Checks if expression is a number
                    ? get_value(xpres).toString() // Returns value of number (eg. '15' <- NOTE: number is given as a string)
                : '?'; // Returns ? if no predicates are true
    } return parPicker(exp, false);
}

/*
    Test code for task 3
*/

// prints: (5 + 6 * 8) * (5 + 6 + 8)
console.log(pretty_print(exp1));
// prints: 5 + 6 * 8 * 5 + 6 + 8
console.log(pretty_print(exp2));