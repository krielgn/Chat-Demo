# Basic Chatrooms with Peerjs


Session based WebRTC chatroom:
 - [peerjs](https://peerjs.com/) for connections
 - Each client can host one room and join unlimited
 - Room information (name, host, users) is stored in Firebase
   - Rooms are deleted / left when the session is closed
 - Messages are per-session, and stored in the browser (cleared on session end _and_ room delete)

Required to run:
 - Firestore Database
 - Signalling server for peerjs. By default, this uses a publicly available one. [Hosting this one also suffices](https://github.com/peers/peerjs-server)
 - Two or more clients (and/or web browsers)
