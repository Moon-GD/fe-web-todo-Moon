class IDGenerator {
    #statusID = 2;
    #cardID = 3;

    createStatusID() {
        this.#statusID += 1;

        return this.#statusID;
    }

    createCardID() {
        this.#cardID += 1;

        return this.#cardID;
    }
}

const idGenerator = new IDGenerator();

export { idGenerator }