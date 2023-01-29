"use strict";
// Provides a typed implementation of Source lists
exports.__esModule = true;
exports.append = exports.list = exports.is_null = exports.tail = exports.head = exports.pair = void 0;
function pair(hd, tl) {
    return [hd, tl];
}
exports.pair = pair;
function head(p) {
    return p[0];
}
exports.head = head;
function tail(p) {
    return p[1];
}
exports.tail = tail;
function is_null(v) {
    return v === null;
}
exports.is_null = is_null;
function list() {
    var elements = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        elements[_i] = arguments[_i];
    }
    var lst = null;
    for (var i = elements.length - 1; i >= 0; i -= 1) {
        lst = pair(elements[i], lst);
    }
    return lst;
}
exports.list = list;
function append(xs, ys) {
    return is_null(xs) ? ys : pair(head(xs), append(tail(xs), ys));
}
exports.append = append;
