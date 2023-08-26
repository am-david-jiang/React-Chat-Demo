const path = require("path");
const sharp = require("sharp");
const { Server } = require("socket.io");

const Message = require("../model/Message");

const publicPath = path.join(__dirname, "..", "public");
let onlineUserList = { current: [] };
let tempMessages = {};

function createSocket(httpServer) {
  const server = new Server(httpServer, {
    withCredentials: true,
    cors: {
      origin: "http://localhost:5173",
    },
  });
  server.on("connection", (socket) => {
    let user;

    socket.on("online", (username) => {
      user = username;
      onlineUserList.current.push({ username, socketId: socket.id });

      // Check if temp messages exist. If so, send them to the user
      setTimeout(() => {
        const tempMsg = tempMessages[username];
        if (tempMsg) {
          while (tempMsg.length) {
            const msg = tempMsg.shift();
            if (msg.type === "image") {
              socket.emit("imageMessage", {
                user: msg.user,
                image: msg.message,
                date: msg.date,
              });
            } else {
              socket.emit("textMessage", {
                user: msg.user,
                text: msg.message,
                date: msg.date,
              });
            }
          }
        }
      }, 1000);

      // Broadcast the online status
      socket.broadcast.emit("userOnline", user);
    });

    socket.on("textMessage", ({ receiverUsername, text, date }) => {
      const receiver = checkOnline(receiverUsername);
      if (receiver) {
        const socketId = receiver.socketId;
        server.to(socketId).emit("textMessage", { user, text, date });
      } else {
        if (receiverUsername in tempMessages) {
          tempMessages[receiverUsername].push({
            user,
            message: text,
            date,
            type: "text",
          });
        } else {
          tempMessages[receiverUsername] = [
            { user, message: text, date, type: "text" },
          ];
        }
      }
    });

    socket.on("imageMessage", ({ receiverUsername, image, date }) => {
      const filename = `${user}-${receiverUsername}-${date}`;
      sharp(image)
        .webp({ lossless: true })
        .toFile(path.join(publicPath, "image", filename + ".raw.webp"))
        .catch((err) => console.log(err));
      sharp(image)
        .resize(200)
        .webp({ nearLossless: true })
        .toFile(path.join(publicPath, "image", filename + ".webp"))
        .then(() => {
          const receiver = checkOnline(receiverUsername);
          if (receiver) {
            const socketId = receiver.socketId;
            server
              .to(socketId)
              .emit("imageMessage", { user, image: filename + ".webp", date });
          } else {
            if (receiverUsername in tempMessages) {
              tempMessages[receiverUsername].push({
                user,
                message: filename + ".webp",
                date,
                type: "image",
              });
            } else {
              tempMessages[receiverUsername] = [
                { user, message: filename + ".webp", date, type: "image" },
              ];
            }
          }
        });
    });

    socket.on("disconnect", () => {
      socket.broadcast.emit("userOffline", user);
      onlineUserList.current = onlineUserList.current.filter(
        (singleUser) => singleUser.username !== user
      );
    });
  });

  return server;
}

const checkOnline = (username) =>
  onlineUserList.current.find((user) => user.username === username);

module.exports = { createSocket, onlineUserList };
