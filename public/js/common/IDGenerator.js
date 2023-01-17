class IDGenerator {
    #statusID = 2;

    createStatusID() {
        this.#statusID += 1;

        return this.#statusID;
    }
}

const idGenerator = new IDGenerator();

export { idGenerator }