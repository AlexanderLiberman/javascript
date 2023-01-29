import { head, tail, pair } from '../../generalLibraries/list';

type Tree<T> = Leaf | TreeNode<T>;
type Leaf = null;
type TreeNode<T> = [T, [Tree<T>, Tree<T>]];

function value<S>(tree:TreeNode<S>): S {
	return head(tree);
}

function left_branch<S>(tree:TreeNode<S>): TreeNode<S> | Leaf {
	return head(tail(tree));
}

function right_branch<S>(tree:TreeNode<S>): TreeNode<S> | Leaf {
	return tail(tail(tree));
}

function make_tree<S>(value: S, left: TreeNode<S> | Leaf, right: TreeNode<S> | Leaf): Tree<S> {
	return pair(value, pair(left, right));
}

function make_leaf<S>(value: S): Tree<S> {
	return make_tree(value,
                 	make_empty_tree(),
                 	make_empty_tree());
}

function make_empty_tree(): Leaf {
	return null;
}

function is_empty_tree<S>(tree:Tree<S>): tree is null {
	return tree === null;
}

// convenience function to print a tree in a simple textual format
function display_tree<S>(tree: Tree<S> ): void {
    return display_tree_helper(tree, "", true);
}

function display_tree_helper<S>(tree: Tree<S>, path: String, leftmost: Boolean): void {
    if (tree === null) {
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

function build_tree<S>(elements: List<S>): Tree<S> {
	function insert<S>(tree: Tree<S>, element: S): Tree<S>  {
    	if (tree === null) {
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
	function build<S>(tree: Tree<S>, elements: List<S>): Tree<S> {
    	return elements === null
        	? tree
        	: build(insert(tree, head(elements)),
                	tail(elements));
	}
	return build(make_empty_tree(),
             	elements);
}