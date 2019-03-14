class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (this.left == null){
			this.left = node;
			this.left.parent = this;
		}
		else if (this.right == null){
			this.right = node;
			this.right.parent = this;
		}
	}

	removeChild(node) {
		if (node.parent.left == node) this.left = null;
		if (node.parent.right == node) this.right = null;
		node.parent = null;
	}

	remove() {
		if (this.parent != null) this.parent.removeChild(this);
	}

	swapWithParent() {
		if (this.parent != null) {
			let grandParent = this.parent.parent;
			let sibl = null;
			let thisLeft, thisRight, parentLeft, parentRight;
			thisLeft = this.left;
			thisRight = this.right;
			parentLeft = this.parent.left;
			parentRight = this.parent.right;

			/*проверяет, является ли левым потомком родитель this (для своего родителя)*/
			let isParentLeft = false;
			if (this.parent.parent != null) {
				if (this.parent.parent.left == this.parent) isParentLeft = true;
			}
			/**/

			if (parentLeft == this && parentRight != null)
				sibl = parentRight;
			else 
				if (parentRight == this)
					sibl = parentLeft;

			if (this.left)
				this.left.parent = this.parent;
			if (this.right)
				this.right.parent = this.parent;

			this.parent.parent = this;
			if (parentLeft == this) {
				this.right = parentRight;
				this.left = this.parent;
			}
			else {
				this.left = parentLeft;
				this.right = this.parent;
			}
			if (sibl)
				sibl.parent = this;
			this.parent.left = thisLeft;
			this.parent.right = thisRight;
					
			this.parent = grandParent;
			if (grandParent)
			if (isParentLeft) grandParent.left = this;
			else grandParent.right = this;
		}

	}
}

module.exports = Node;
