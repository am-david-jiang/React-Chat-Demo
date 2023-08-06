import { io, Socket } from "socket.io-client";

const socket: Socket = io("ws://localhost:5000", {
  autoConnect: false,
  forceNew: true,
});

export default socket;
