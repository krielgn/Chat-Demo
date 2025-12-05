export interface ChatMessage {
    userId: string,
    name: string,
    color: string,
    text: string,
    time: number,
}

Storage.prototype.setObj = function(key: string, obj: any) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key: string) {
    return JSON.parse(this.getItem(key)!)
}

export const initRoomLocalStorage = (roomId: string) => {
    const currentRoomMessages: ChatMessage[] = sessionStorage.getObj(roomId);
    if (!currentRoomMessages) {
        sessionStorage.setObj(roomId, {messages: []});
    }
};

export const addMessageToRoomStorage = (roomId: string, message: ChatMessage, receivedFromPeer=false) => {
    const current: ChatMessage[] = sessionStorage.getObj(roomId).messages;
    sessionStorage.setObj(roomId, {messages: [...current, message]});
    if (receivedFromPeer) {
        window.dispatchEvent(new Event("storage"));
        let event = new CustomEvent("newMessage", { detail: roomId});
        window.dispatchEvent(event);
    }
}

export const clearRoomFromStorage = (roomId: string, receivedFromPeer=false) => {
    if (!sessionStorage.getItem(roomId)) {
        console.log("Invalid storage item called");
    }

    sessionStorage.removeItem(roomId);
    if (receivedFromPeer){
        window.dispatchEvent(new Event("storage"));
    }
}