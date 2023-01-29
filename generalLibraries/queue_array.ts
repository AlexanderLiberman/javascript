
/**
 * A homogeneous queue.
 */
export type Queue<T> = [number, number, Array<T>];
// representation: [points to head index, points to next empty index, values]

/**
 * Constructs a queue without any elements.
 * @returns Returns an empty queue.
 */
export function empty<T>(): Queue<T> {
    return [0, 0, []];
}

/**
 * Checks whether a queue is empty.
 * @param q queue to check for emptiness
 * @returns Returns true, if the queue q has elements, false otherwise.
 */
export function is_empty<T>(q: Queue<T>): boolean {
    return q[0] === q[1];
}

/**
 * Adds an element to the queue.
 * @param e element to add
 * @param q queue that is modified such that the element e is added
 */
export function enqueue<T>(e: T, q: Queue<T>) {
    const tail_index = q[1];
    q[2][tail_index] = e;
    q[1] = tail_index + 1;  // update tail index
}

/**
 * Retrieves the first element of the queue.
 * @precondition Assumes q to be non-empty
 * @param q queue to get the first element of
 * @returns Returns the element of the queue that was enqueued first.
 */
export function head<T>(q: Queue<T>): T {
    const head_index = q[0];
    return q[2][head_index];
}

/**
 * Removes the first element of a queue.
 * @precondition Assumes q to be non-empty
 * @param q queue that is modified such that the element
 *          that was enqueued first is removed
 */
export function dequeue<T>(q: Queue<T>) {
    const head_index = q[0];
    q[0] = head_index + 1;
}

/**
 * Pretty-prints the contents of a queue.
 * @param q queue to pretty-print
 */
export function display_queue<T>(q: Queue<T>) {
    console.log(q[2].slice(q[0], q[1]));
}