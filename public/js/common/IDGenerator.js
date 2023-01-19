import { statusListOnLocal, cardListOnLocal } from "../store/store.js";
import { CARD_ID, STATUS_ID } from "./commonVariable.js";

class IDGenerator {
    #cardID = 0;
    #statusID = 0;
    #menuID = 0;

    async initialize() {
        for(const statusJSON of statusListOnLocal) {
            if(statusJSON && statusJSON[STATUS_ID] > this.#statusID) {
                this.#statusID = statusJSON[STATUS_ID];
            }
        }

        for(const cardJSON of cardListOnLocal) {
            if(cardJSON && cardJSON.length && Number(cardJSON[0][CARD_ID]) < this.#cardID) {
                this.#cardID = Number(cardJSON[0][CARD_ID]);
            }
        }
    }

    createStatusID = () => {
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