import { statusListOnLocal, cardListOnLocal } from "../store/store.js";
import { CARD_ID, STATUS } from "./commonVariable.js";

class IDGenerator {
    #cardID = 0;
    #statusID = 0;

    async initialize() {
        for(const statusJSON of statusListOnLocal) {
            if(statusJSON && statusJSON[STATUS.ID] > this.#statusID) {
                this.#statusID = statusJSON[STATUS.ID];
            }
        }

        for(const cardJSON of cardListOnLocal) {
            if(cardJSON && cardJSON.length && Number(cardJSON[0][CARD_ID]) < this.#cardID) {
                this.#cardID = Number(cardJSON[0][CARD_ID]);
            }
        }
    }

    createStatusID() {
        this.#statusID += 1;
        return this.#statusID;
    }

    createCardID() {
        this.#cardID -= 1;
        return this.#cardID;
    }

    createMenuID() {
        return new Date().getMilliseconds();
    }
}

const idGenerator = new IDGenerator();

export { idGenerator }