const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root =  null;
		this.parentNodes = [];
	}

	push(data, priority) {
		let node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	pop() {
		if (this.root != null) {
			let rootData = this.root.data;
			//this.root = ;
			return rootData;
		}
	}

	detachRoot() {
		let root = this.root;
		let rootPos = this.parentNodes.indexOf(this.root);
		this.root = null;
		this.parentNodes.splice(rootPos, 1);
		
		return root;
	}

	restoreRootFromLastInsertedNode(detached) {
		
	}

	size() {
		
	}

	isEmpty() {
		if (this.parentNodes.length == 0) return true;
		return false;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
	}

	insertNode(node) {
		if (this.root == null) {
			this.root = node;
			this.parentNodes.push(node);
		} else {

			this.parentNodes[0].appendChild(node);

			if (this.parentNodes[0].left != null && this.parentNodes[0].right != null) 
				this.parentNodes.shift();
			
			this.parentNodes.push(node);
		}

	}
	correctParentNodes(node){
		let pos = this.parentNodes.indexOf(node);
		let parentPos = this.parentNodes.indexOf(node.parent);

		if (parentPos !== -1) {
			this.parentNodes[pos] = node.parent;
			this.parentNodes[parentPos] = node;
		}
		else {
			this.parentNodes[pos] = node.parent;
		}

	}

	shiftNodeUp(node) {
		/*while (node.parent != null && node.parent.priority <= node.priority){
			this.correctParentNodes(node);
			node.swapWithParent();
		}
		if (node.parent == null) this.root = node; */

		if (node.parent == null) this.root = node;
		else {
			if (node.parent.priority <= node.priority){
				this.correctParentNodes(node);
				node.swapWithParent();
				this.shiftNodeUp(node);
			}
		}

		
	}

	// hasChild(node) {
		
	// 	if (node.left || node.right) return true;
	// 	return false;
	// }
	/*maxChild(node) {
		/*
		if (this.left !== undefined && this.right === undefined) {console.log("left1"); return this.left};
		if (this.right !== undefined && this.left === undefined) {console.log("right1"); return this.right; }
		if (this.left.priority > this.right.priority) 
		{console.log("left2"); return this.left; }
		console.log("right2");
		return this.right;*/
		//console.log(node.left.priority);
		//let maxiChild = [];

		/*if (node.left && !node.right) return node.left;
		if (node.left.priority > node.right.priority) return node.left;
		return node.right; */
		/*if (node.right) {
			if (node.left.priority < node.right.priority) return node.right;
		}
		return node.left;
	}*/

	shiftNodeDown(node) {
		//if (node === null) return;
			if (!node.left) return;
			
			let maxiChild;
			if (node.right)
				if (node.left.priority < node.right.priority)
					maxiChild = node.right;
				else maxiChild = node.left;
			else
				maxiChild = node.left;
			
				
			if (node.priority < maxiChild.priority){
				if (this.root === node) {
					this.root = maxiChild;
				}

				this.correctParentNodes(maxiChild);
				maxiChild.swapWithParent();
		/*console.log(node.priority);		
		console.log(this.root.priority);
		console.log(this.root.left.priority);
		console.log(this.root.right.priority);
		console.log(this.root.left.left.priority); */
			//	if (node)
			//npm	this.shiftNodeDown(node);
			}
			else return;
		
	}
}

module.exports = MaxHeap;
