import { createServer } from "node:http";
import { Server } from "socket.io";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
    addTrailingSlash: false,
  });

  io.on("connection", (socket) => {
    console.log("SOCKET HAS BEEN CREATED! " + socket.id);

    socket.on("join_channel", ({ channelId }) => {
      console.log(`User ${socket.id} joined channel ${channelId}`);
      socket.join(channelId);
    });

    socket.on("join_conversion", ({ conversionId }) => {
      socket.join(conversionId);
    });

    socket.on("send_message", ({ conversionId }) => {
      io.to(conversionId).emit("receive_message");
    });

    socket.on("send_message_channel", ({ channelId }) => {
      // Emit the message to all clients in the channel, including the sender
      io.to(channelId).emit("receive_message_channel");

      // Optional: Log the message or process further
      console.log(`Message sent to channel ${channelId}:`);
    });
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
