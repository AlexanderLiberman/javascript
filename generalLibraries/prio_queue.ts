

/**
 * A homogeneous queue.
 */
export type Prio_Queue<T> = [number, number, Array<[number, T]>];
// representation: [points to head index, points to next empty index, values]

/**
 * Constructs a queue without any elements.
 * @returns Returns an empty queue.
 */
export function empty<T>(): Prio_Queue<T> {
    return [0, 0, []];
}

/**
 * Checks whether a queue is empty.
 * @param q queue to check for emptiness
 * @returns Returns true, if the queue q has elements, false otherwise.
 */
export function is_empty<T>(q: Prio_Queue<T>): boolean {
    return q[0] === q[1];
}

/**
 * Adds an element to the queue.
 * @param e element to add
 * @param q queue that is modified such that the element e is added
 */
export function enqueue<T>(prio: number, e: T, q: Prio_Queue<T>) {
    const tail_index = q[1];
    q[2][tail_index] = [prio, e];
    if (!is_empty(q)) {
        // we have at least one element
        const head_index = q[0];
        const elems = q[2];
        elems[tail_index] = [prio, e];
        // swap elements until we find the right spot
        for (let i = tail_index; i > head_index; i = i - 1) {
            if (elems[i - 1][0] >= elems[i][0]) {
                break;
            } else { //swap
                swap(elems, i, i - 1);
            }
        }
    } else {}
    q[1] = tail_index + 1;  // update tail index
}

function swap<T>(A: Array<T>, i: number, j: number) {
    const tmp = A[i];
    A[i] = A[j];
    A[j] = tmp;
}

/**
 * Retrieves the element with the highest priority from the queue.
 * If two elements have the same priority the one that was
 * enqueued first is returned.
 * @precondition Assumes q to be non-empty
 * @param q queue to get the highest-priority element of
 * @returns Returns the element of the queue that has the highest priority.
 */
export function head<T>(q: Prio_Queue<T>): T {
    const head_index = q[0];
    return q[2][head_index][1];
}

/**
 * Removes the element with highest priority from a queue.
 * If two elements have the same priority the one that was
 * enqueued first is dequeued first.
 * @precondition Assumes q to be non-empty
 * @param q queue that is modified such that the element
 *          with the highest priority is removed
 */
export function dequeue<T>(q: Prio_Queue<T>) {
    const head_index = q[0];
    q[0] = head_index + 1;
}

/**
 * Pretty-prints the contents of a queue.
 * @param q queue to pretty-print
 */
export function display_queue<T>(q: Prio_Queue<T>) {
    console.log(q[2].slice(q[0], q[1]));
}