import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import type { ChatMessage } from "../types/chat";

type OnMessageHandler = (msg: ChatMessage) => void;

export function useChatWebSocket(
  sessionId: string | undefined,
  onMessage: OnMessageHandler
) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!sessionId) return;

    const socket: Socket = io("http://localhost:3000", {
      path: "/api/chat",
      transports: ["websocket"],
      withCredentials: true,
      query: { sessionId },
    });

    socket.on("connect", () => {
      console.log("socket.io: Connected!", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("socket.io: Disconnected!");
    });

    socket.on("message", (msg: ChatMessage) => {
      console.log("socket.io: Message received:", msg);
      onMessage?.(msg);
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [sessionId, onMessage]);
}
