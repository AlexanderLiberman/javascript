"use strict";
exports.__esModule = true;
exports.element_for_path = exports.path_for_element = exports.build_tree = exports.display_tree = exports.is_empty_tree = exports.make_empty_tree = exports.make_leaf = exports.make_tree = exports.right_branch = exports.left_branch = exports.value = void 0;
var list_1 = require("./list");
function value(tree) {
    return (0, list_1.head)(tree);
}
exports.value = value;
function left_branch(tree) {
    return (0, list_1.head)((0, list_1.tail)(tree));
}
exports.left_branch = left_branch;
function right_branch(tree) {
    return (0, list_1.tail)((0, list_1.tail)(tree));
}
exports.right_branch = right_branch;
function make_tree(value, left, right) {
    return (0, list_1.pair)(value, (0, list_1.pair)(left, right));
}
exports.make_tree = make_tree;
function make_leaf(value) {
    return make_tree(value, make_empty_tree(), make_empty_tree());
}
exports.make_leaf = make_leaf;
function make_empty_tree() {
    return null;
}
exports.make_empty_tree = make_empty_tree;
function is_empty_tree(tree) {
    return tree === null;
}
exports.is_empty_tree = is_empty_tree;
// convenience function to print a tree in a simple textual format
function display_tree(tree) {
    return display_tree_helper(tree, "", true);
}
exports.display_tree = display_tree;
function display_tree_helper(tree, path, leftmost) {
    if (is_empty_tree(tree)) {
        return;
    }
    else {
        var v = value(tree);
        // print tree label, with indentation pre-fixed
        console.log(path + "├─ " + v);
        // print right node first, then left
        if (leftmost) {
            display_tree_helper(right_branch(tree), "   " + path, false);
            display_tree_helper(left_branch(tree), "   " + path, leftmost);
        }
        else {
            display_tree_helper(right_branch(tree), path + "|  ", false);
            display_tree_helper(left_branch(tree), path + "|  ", leftmost);
        }
    }
}
function build_tree(elements) {
    function insert(tree, element) {
        if (is_empty_tree(tree)) {
            return make_leaf(element);
        }
        else {
            var current = value(tree);
            var left = left_branch(tree);
            var right = right_branch(tree);
            return current > element
                ? make_tree(current, insert(left, element), right)
                : make_tree(current, left, insert(right, element));
        }
    }
    function build(tree, elements) {
        return (0, list_1.is_null)(elements)
            ? tree
            : build(insert(tree, (0, list_1.head)(elements)), (0, list_1.tail)(elements));
    }
    return build(make_empty_tree(), elements);
}
exports.build_tree = build_tree;
function char_at(s, i) {
    return s[i];
}
function path_for_element(tree, elem) {
    function move(tree, path) {
        if (is_empty_tree(tree)) {
            return null;
        }
        else {
            var current = value(tree);
            return current === elem
                ? path
                : current > elem
                    ? move(left_branch(tree), path + 'L')
                    : move(right_branch(tree), path + 'R');
        }
    }
    return move(tree, "");
}
exports.path_for_element = path_for_element;
function element_for_path(tree, path) {
    function move(tree, path_index) {
        if (is_empty_tree(tree)) {
            return null;
        }
        else {
            var char = char_at(path, path_index);
            return char === undefined
                ? value(tree)
                : char === "L"
                    ? move(left_branch(tree), path_index + 1)
                    : move(right_branch(tree), path_index + 1);
        }
    }
    return move(tree, 0);
}
exports.element_for_path = element_for_path;
