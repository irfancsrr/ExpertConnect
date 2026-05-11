import React, { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import {API_URL} from "../utils/path";

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(API_URL, { transports: ["websocket"] });
 // backend socket server
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
