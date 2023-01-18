class IDGenerator {
    #statusID = 2;
    #cardID;

    createStatusID() {
        this.#statusID += 1;

        return this.#statusID;
    }

    createCardID() {
        this.#cardID = new Date()

        return this.#cardID;
    }
}

const idGenerator = new IDGenerator();

export { idGenerator }