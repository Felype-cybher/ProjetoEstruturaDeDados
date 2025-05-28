class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}
class LinkedQueue {
    constructor() {
        this.head = this.tail = null; this.size = 0;
    }

    enqueue(data) {
        const node = new Node(data);
        if (!this.head) this.head = this.tail = node;
        else { this.tail.next = node; this.tail = node; }
        this.size++;
    }
    dequeue() {
        if (!this.head) return null;
        const data = this.head.data;
        this.head = this.head.next;
        if (!this.head) this.tail = null;
        this.size--;
        return data;
    }
    peek() { 
        return this.head ? this.head.data : null; 
    }
    
    toArray() {
        const arr = [];
        for (let curr = this.head; curr; curr = curr.next) arr.push(curr.data);
        return arr;
    }
}