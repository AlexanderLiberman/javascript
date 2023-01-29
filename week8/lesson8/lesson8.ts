const a: number = 5;
const b: string = "hello";
const c: [number, number, number] = [1, 2, 3];
const d: [number, string, null] = [1, "a", null];
const e: (x: number) => number = x => x + 2;
const f: number = e(5);
const g: (x: number) => number = x => e(x) + 5;

/* Write a function get_nth that takes as argument an array of numbers and an index into
the array and returns the number at that index. If the index is greater than the length of
the array, it returns null. The function’s arguments and return value should be typed! */

function get_nth(arr:Array<number>, i:number):number | null {
    if (i > arr.length - 1) {
        return null;
    } else {
        return arr[i];
    }
}

// Consider the following typed definition of lists:
type Pair<H, T> = [H, T];
type List<T> = null | [T, List<T>];

function pair<H, T>(hd: H, tl: T): Pair<H, T> {
    return [hd, tl];
}

function head<H, T>(p: Pair<H, T>): H {
    return p[0];
}

function tail<H, T>(p: Pair<H, T>): T {
    return p[1];
}

function is_null(v: any): v is null {
    return v === null;
}

/* The functions list and append have been implemented in Source as follows:

function list(...elements) { 
    // elements is an array
    let lst = null
    for (let i = elements.length - 1; i >= 0; i -= 1) {
        lst = pair(elements[i], lst);
    }
    return lst;
}
function append(xs, ys) {
    return  is_null(xs) 
            ? ys 
            : pair(head(xs), append(tail(xs), ys));
} */

function list<S>(...elements: Array<S>): List<S> {
    let lst:List<S> = null
    for (let i = elements.length - 1; i >= 0; i -= 1) {
        lst = pair(elements[i], lst);
    }
    return lst;
}

function append(xs, ys) {
    return  is_null(xs) 
            ? ys 
            : pair(head(xs), append(tail(xs), ys));
}

/* Implement and fully type the function last that returns the last value of a list. The function
is not well-defined for an empty list; use types to reflect this. */

function last<S>(lst:Pair<S, List<S>>): S{
    const tl = tail(lst);
    return  is_null(tl)
            ? head(lst)
            : last(tl);
}