declare type ColorValueHex = `#${string}`;

interface Room {
    name: string;
    hostId: string;
    ownedByCurrentUser: boolean;
    joinedByCurrentUser: boolean;
}