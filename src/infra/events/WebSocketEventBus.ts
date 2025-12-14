import { WebSocketServer, WebSocket } from "ws";
import type { IEventBus } from "@/core/ports/IEventBus.js";

type ClientMap = Map<string, WebSocket>;

export class WebSocketEventBus implements IEventBus {
  private clients: ClientMap = new Map();

  constructor(wss: WebSocketServer) {
    wss.on("connection", (ws, req) => {
      const url = new URL(req.url || "", "http://localhost");
      const userId = url.searchParams.get("userId");

      if (!userId) {
        ws.close();
        return;
      }

      this.clients.set(userId, ws);

      ws.on("close", () => {
        this.clients.delete(userId);
      });
    });
  }

  publish(event: string, payload: any): void {
    const { userId } = payload;

    const client = this.clients.get(userId);
    if (!client) return;

    client.send(
      JSON.stringify({
        event,
        payload
      })
    );
  }
}