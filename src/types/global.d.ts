declare type ColorValueHex = `#${string}`;

interface Room {
    name: string;
    hostId: string;
    roomId: string;
    ownedByCurrentUser: boolean;
    joinedByCurrentUser: boolean;
}