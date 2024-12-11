"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { io as ClientIo, Socket } from "socket.io-client";

import { SITE_URL } from "@/config";

const SocketContext = createContext<{
  isConnected: boolean;
  socket: Socket | null;
}>({
  isConnected: false,
  socket: null,
});

export const useSocket = () => useContext(SocketContext);

export const WebSocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socketInstance = ClientIo(SITE_URL);

    socketInstance.on("connect", () => {
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
      setIsConnected(false);
      setSocket(null);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ isConnected, socket }}>
      {children}
    </SocketContext.Provider>
  );
};
