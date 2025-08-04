import { io } from "socket.io-client";

const socket = io('https://pinetree-1.onrender.com/user-namespace');

export default socket;