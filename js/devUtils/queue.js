class Queue {
    #_array = [];

    constructor(assignedList=[]) {
        this.#_array = assignedList;
    }

    enque(item) {
        this.#_array.push(item);
    }

    deque() {
        return this.#_array.shift();
    }

    getLength() {
        return this.#_array.length;
    }
}

export { Queue }
