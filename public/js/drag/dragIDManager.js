class DragIDManager {
    #ID = 0;
    movedCardID = 0;

    setCurrentCardID(cardID) {
        this.movedCardID = cardID;
    }

    getCurrentCardID() {
        return this.movedCardID;
    }
}

const dragIDManager = new DragIDManager();

export { dragIDManager }