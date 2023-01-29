import {
	head, tail, pair, is_null, List
} from './list';

export type Tree<T> = Leaf | TreeNode<T>;
export type Leaf = null;
export type TreeNode<T> = [T, [Tree<T>, Tree<T>]];

export function value<T>(tree : TreeNode<T>): T {
	return head(tree);
}

export function left_branch<T>(tree: TreeNode<T>): Tree<T> {
	return head(tail(tree));
}

export function right_branch<T>(tree: TreeNode<T>): Tree<T> {
	return tail(tail(tree));
}

export function make_tree<T>(value: T, left: Tree<T>, right: Tree<T>): Tree<T> {
	return pair(value, pair(left, right));
}

export function make_leaf<T>(value: T): Tree<T> {
	return make_tree(value,
                 	make_empty_tree(),
                 	make_empty_tree());
}

export function make_empty_tree(): null {
	return null;
}

export function is_empty_tree<T>(tree: Tree<T>): tree is null {
	return tree === null;
}

// convenience function to print a tree in a simple textual format
export function display_tree<T>(tree: Tree<T>) {
    return display_tree_helper(tree, "", true);
}

function display_tree_helper<T>(tree: Tree<T>, path: string, leftmost: boolean) {
    if (is_empty_tree(tree)) {
        return;
    } else {
        const v = value(tree);
        // print tree label, with indentation pre-fixed
        console.log(path + "├─ " + v);

        // print right node first, then left
        if (leftmost) {
            display_tree_helper(right_branch(tree), "   " + path, false);
            display_tree_helper(left_branch(tree), "   " + path, leftmost);
        } else {
			display_tree_helper(right_branch(tree), path + "|  ", false);
			display_tree_helper(left_branch(tree), path + "|  ", leftmost);
        }
    }
}

export function build_tree<T>(elements: List<T>): Tree<T> {
	function insert(tree: Tree<T>, element: T): Tree<T> {
    	if (is_empty_tree(tree)) {
        	return make_leaf(element);
    	} else {
        	const current = value(tree);
        	const left = left_branch(tree);
        	const right = right_branch(tree);

        	return current > element
            	? make_tree(current,
                        	insert(left, element),
                        	right)
            	: make_tree(current,
                        	left,
                        	insert(right, element));
    	}
	}
	function build(tree: Tree<T>, elements: List<T>): Tree<T> {
    	return is_null(elements)
        	? tree
        	: build(insert(tree, head(elements)),
                	tail(elements));
	}
	return build(make_empty_tree(),
             	elements);
}

function char_at(s: string, i: number): string | undefined {
	return s[i];
}

export function path_for_element<T>(tree: Tree<T>, elem: T): string | null {
	function move(tree: Tree<T>, path: string): string | null {
		if (is_empty_tree(tree)) {
			return null;
		} else {
			const current = value(tree);
			return current === elem
				? path
				: current > elem
				? move(left_branch(tree), path + 'L')
				: move(right_branch(tree), path + 'R');
		}
	}
	return move(tree, "");
}

export function element_for_path<T>(tree: Tree<T>, path: string): T | null {
	function move(tree: Tree<T>, path_index: number): T | null {
		if (is_empty_tree(tree)) {
			return null;
		} else {
			const char = char_at(path, path_index);
			return char === undefined
				? value(tree)
				: char === "L"
				? move(left_branch(tree), path_index + 1)
				: move(right_branch(tree), path_index + 1);
		}
	}
	return move(tree, 0);
}

