const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root =  null;
		this.parentNodes = [];
		this.sizeOfHeap = 0;
	}

	push(data, priority) {
		let node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
		this.sizeOfHeap++;
	}

	pop() {
		if (!this.root) return;
		this.sizeOfHeap--;

		let rootData = this.root.data;
		let detached = this.detachRoot();
		//detached = {};
		this.restoreRootFromLastInsertedNode(detached);

		if (this.root)
			this.shiftNodeDown(this.root);
		return rootData;
		
	}

	detachRoot() {
		let root = this.root;
		let rootPos = this.parentNodes.indexOf(this.root);
		this.root = null;
		if (rootPos != -1)
			this.parentNodes.splice(rootPos, 1);
		
		return root;
	}

	restoreRootFromLastInsertedNode(detached) {
		
		let lastInsertedNode = this.parentNodes.pop();
		if (!lastInsertedNode || !detached) return;
		let lastInsertedNodeParent = lastInsertedNode.parent;
		
		/*let detachedInParentNodes = this.parentNodes.indexOf(detached);
		if (detachedInParentNodes !== -1)
			this.parentNodes.splice(detachedInParentNodes, 1); */

		if (lastInsertedNodeParent && lastInsertedNodeParent.right == lastInsertedNode &&
			lastInsertedNodeParent != detached)
			this.parentNodes.unshift(lastInsertedNodeParent);

		this.root = lastInsertedNode;
		if (detached.left != lastInsertedNode){
			this.root.left = detached.left;
			if (this.root.left)
				this.root.left.parent = lastInsertedNode;
		}
		
		if (detached.right != lastInsertedNode) {
			this.root.right = detached.right;
			if (this.root.right)
				this.root.right.parent = lastInsertedNode;
		}
		
		if (this.root.right === null)
			this.parentNodes.unshift(lastInsertedNode);
		lastInsertedNode.remove();

	
	}

	size() {
		return this.sizeOfHeap;
	}

	isEmpty() {
		if (this.parentNodes.length == 0) return true;
		return false;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.sizeOfHeap = 0;
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

		this.lastInsertedNode = node;
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

		if (node.parent == null) this.root = node;
		else {
			if (node.parent.priority <= node.priority){
				this.correctParentNodes(node);
				node.swapWithParent();
				this.shiftNodeUp(node);
			}
		}	
	}


	shiftNodeDown(node) {

		if (!node.left) return;
		let maxChild;
		
		if (node.right && node.right.priority > node.left.priority &&
		node.right.priority > node.priority)
			maxChild = node.right;
		else if(node.left.priority > node.priority )
			maxChild = node.left;
		else return;

						
		this.shiftNodeUp(maxChild);
		this.shiftNodeDown(node);
		
		
	}
}
// const h = new MaxHeap();
//      console.log(h.size());
module.exports = MaxHeap;

