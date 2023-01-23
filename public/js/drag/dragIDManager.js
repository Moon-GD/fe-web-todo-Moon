class DragIDManager {
    movedCardID = 0;

    setCurrentCardID = (cardID) => this.movedCardID = cardID;

    getCurrentCardID = () => this.movedCardID;
}

const dragIDManager = new DragIDManager();

export { dragIDManager }