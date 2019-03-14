const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		this.maxSize = maxSize;
		if (maxSize == undefined) this.maxSize = 30;
		this.heap = new MaxHeap();
	}

	push(data, priority) {
		if (this.heap.sizeOfHeap >= this.maxSize)
			throw new Error();
		this.heap.push(data, priority);
	}

	shift() {
		if (this.isEmpty())
			throw new Error();
		let removedNode = this.heap.pop();
		return removedNode;

	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		if (this.size() === 0)
			return true;
		return false;
	}
}

module.exports = PriorityQueue;
