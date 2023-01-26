import { statusListOnLocal, cardListOnLocal } from "../store/store.js";

class IDGenerator {
    #cardID = 0;
    #statusID = 0;

    async initialize() {
        this.#statusID = Math.max(...statusListOnLocal
            .filter((item) => item)
            .map(({id}) => id)
        );

        cardListOnLocal.forEach((cardArray) =>
            cardArray.forEach((card) => this.#cardID = Math.min(this.#cardID, card.id))
        );
    }

    createStatusID() {
        this.#statusID += 1;
        return this.#statusID;
    }

    createCardID() {
        this.#cardID -= 1;
        return this.#cardID;
    }

    createMenuID = () => new Date().getMilliseconds();
}

const idGenerator = new IDGenerator();

export { idGenerator }