import Peer, { type DataConnection } from "peerjs";
import { addMessageToRoomStorage, clearRoomFromStorage, type ChatMessage } from "./logManager";
import type { User } from "@/types/user";

export class MyPeer {    
    peer: Peer | undefined;
    private hostConnection: DataConnection | undefined;
    private _connections: DataConnection[] = [];

    // The user object that manages this peer
    private _controllingUser;

    private _roomName: string = "";
    private _connectionId = ""
    private _type: "host" | "client" = "host";

    public constructor(user: User);
    public constructor(user: User, roomId: string, roomName: string);
    public constructor(user: User, roomId: string, roomName: string, hostId: string);

    public constructor(...arr: any[]) {
        this._controllingUser = arr[0];

        if (arr[2]){
            this._roomName = arr[2];
        }
        if (arr[3]){
            // Specified host id? This is a client connection!
            this._type = "client";
        }
        if (this._type == "host"){
            this._connectionId = this._controllingUser.userId + "-" + arr[1];
            this.peer = this.initializePeer(this._connectionId);
            this.assignHostEvents();
        } else {
            this._connectionId = this._controllingUser.userId + "-" + arr[1];
            this.peer = this.initializePeer(this._connectionId);        
            // Socket doesn't open immediately, need to wait.            
            this.peer?.once("open", ()=> {
                // hostid + roomid
                let conh = this.peer!.connect(arr[3] + "-" + arr[1]);
                this.hostConnection = conh;

                this.assignClientEvents(conh);
            });   
        }
    }

    public get user(){
        return this._controllingUser;
    }
    
    public get roomName() {
        return this._roomName;
    }
    public get type() {
        return this._type;
    }

    public get currentRoomHostId() {
        if (this.hostConnection){
            return this._idSplit(0, this.hostConnection!.peer);
        } else {
            return this._idSplit(0, this._connectionId);
        }        
    }
    public get roomId(){
        return this._idSplit(1, this._connectionId);
    }
    private _idSplit(index: number, conId: string){        
        if (conId.includes("-")){
            return conId.split("-")[index];
        }
        return "";
    }
    
    initializePeer(id: string) {
        // All IDs for connections are: userId-roomId
        
        // I'll use the publicly hosted one for now, with the option to prop one up later.
        let peerData = {};
        if (import.meta.env.RELAY_SERVER){
            peerData = {
                host: import.meta.env.RELAY_SERVER,
                port: import.meta.env.RELAY_PORT,
                path: import.meta.env.RELAY_PATH,
                debug: import.meta.env.RELAY_DEBUG,
                secure: import.meta.env.RELAY_SSL,
            }
        }
        return new Peer(id, peerData);
    }

    // For rooms this user hosts
    assignHostEvents(){
        if (!this.peer) return;
        console.log('adding host events')
        this.peer.on('open', (id) => {
            console.log('Connection to signaller established.');
            console.log(`Assigning id: ${id}`);
        });
        this.peer.on('connection', (connection) => {
            console.log(connection.peer + " attempting to join")
            connection.on('open', () => {
                console.log(connection.peer + " joined.");

                this.addConnection(connection);               
            });
            connection.on('data', (data: any) => {
                // A joined user sent data
                console.log("Host received data: ", data);
                addMessageToRoomStorage(this.roomId!, data, true);
                // Host propogates the message to all other connected. Kind of cheating but 🤷‍♂️
                this.sendEx(data, data.userId + "-" + this.roomId);
            });
            connection.on('close', () => {
                console.log("Peer closed: ", connection.peer)
                this.removeConnection(connection.peer);
            });
            connection.on('error', (error) => {
                console.log("Host connection error:", error);
            });
        });

        this.peer.on('disconnected', () => {
            console.log('Disconnected from server.');
        });
        this.peer.on('error', (error) => {
            console.log("Host init error:", error);
        });
    }

    // Called when joining a room, immediately after setting up a new Peer.
    private assignClientEvents(connection: DataConnection){

        connection.on('open', () => {
            console.log("connected to host: ", connection.peer);
        });
        connection.on('data', (data: any) => {
            console.log("Received data from host: ", data);
            addMessageToRoomStorage(this.roomId!, data, true);           
        });
        connection.on('close', () => {
            let roomId = Object.keys(this.peer!.connections)[0].split("-").at(-1)!;
            if (this._controllingUser.pruneDisconnectedRooms()){
                // If the MyPeer was still in joinedRooms[], that means the host deleted the room and
                //  the client needs to perform clean up on its end.

                // Preserve storage in case the client chooses to re-join later.
                clearRoomFromStorage(roomId, true);
            }

            console.log("left client...",);
            this.peer?.destroy();
        });
        connection.on('error', (error) => {
            console.log(error);
        });
    }

    // User joins room
    private addConnection(inC: DataConnection) {
        this._connections.push(inC);
    }
    // User leaves room
    private removeConnection(peerId: string){
        this._connections = this._connections.filter((x)=> x.peer == peerId);
    }
    send(message: ChatMessage) {
        // Sending message in room
        if (this.hostConnection){
            this.hostConnection.send(message);
        } else {
            this._connections.forEach((connection) => {
                connection.send(message);
            });
        }        
    }

    // Send a message to all in the connections array, excluding an ID
    sendEx(message: ChatMessage, excludeId: string) {        
        this._connections.forEach((connection) => {
            if (excludeId != connection.peer){
                connection.send(message);
            }
        });
    }

    public leave(){
        if (!this.peer) return;
        console.log("left from leave() ", this.peer.id)
        this.peer?.destroy()
    }
}