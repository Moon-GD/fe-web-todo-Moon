class Queue {
    #_array = [];

    constructor(assignedList = []) { this.#_array = assignedList; }

    enque(item) { this.#_array.push(item); }

    deque = () => this.#_array.shift();

    getLength = () => this.#_array.length;
}

export { Queue }
