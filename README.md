# Basic Chatrooms with Peerjs



Session based WebRTC chatroom:
 - [peerjs](https://peerjs.com/) for connections
 - Each client can host one room and join unlimited
 - Room information is stored in Firebase
 - Messages are per-session, and stored in the browser

Required to run:
 - Connection to Firebase
 - Signalling server for peerjs. By default, this uses a publicly available one. [Hosting this one also suffices](https://github.com/peers/peerjs-server)
 - Two or more clients (and/or web browsers)
