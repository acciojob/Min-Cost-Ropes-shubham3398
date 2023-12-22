class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  extractMin() {
    if (this.isEmpty()) {
      return null;
    }

    const minValue = this.heap[0];
    const lastValue = this.heap.pop();

    if (!this.isEmpty()) {
      this.heap[0] = lastValue;
      this.heapifyDown();
    }

    return minValue;
  }

  heapifyUp() {
    let currentIndex = this.heap.length - 1;

    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);

      if (this.heap[currentIndex] < this.heap[parentIndex]) {
        this.swap(currentIndex, parentIndex);
        currentIndex = parentIndex;
      } else {
        break;
      }
    }
  }

  heapifyDown() {
    let currentIndex = 0;

    while (true) {
      const leftChildIndex = 2 * currentIndex + 1;
      const rightChildIndex = 2 * currentIndex + 2;
      let smallestChildIndex = currentIndex;

      if (
        leftChildIndex < this.heap.length &&
        this.heap[leftChildIndex] < this.heap[smallestChildIndex]
      ) {
        smallestChildIndex = leftChildIndex;
      }

      if (
        rightChildIndex < this.heap.length &&
        this.heap[rightChildIndex] < this.heap[smallestChildIndex]
      ) {
        smallestChildIndex = rightChildIndex;
      }

      if (currentIndex !== smallestChildIndex) {
        this.swap(currentIndex, smallestChildIndex);
        currentIndex = smallestChildIndex;
      } else {
        break;
      }
    }
  }

  swap(i, j) {
    const temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

function mincost(arr) {
  const minHeap = new MinHeap();

  // Insert all ropes into the min heap
  for (const length of arr) {
    minHeap.insert(length);
  }

  let totalCost = 0;

  // Combine ropes until only one remains
  while (minHeap.heap.length > 1) {
    const firstMin = minHeap.extractMin();
    const secondMin = minHeap.extractMin();

    const currentCost = firstMin + secondMin;
    totalCost += currentCost;

    minHeap.insert(currentCost);
  }

  return totalCost;
}

module.exports = mincost;

