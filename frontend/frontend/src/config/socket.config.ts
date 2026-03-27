import {io} from "socket.io-client";

export const socket = io("https://task-manager-pro-y78v.onrender.com/", {
  autoConnect: true,
});