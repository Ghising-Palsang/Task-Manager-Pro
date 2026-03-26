const http = require("http");
const app = require("./src/config/express.config");
const { Server } = require("socket.io");
const { initSocket } = require("./src/config/socket");

const port = process.env.PORT || 9003;
const host = "localhost";

const httpServer = http.createServer(app);

const io = initSocket(httpServer);

httpServer.listen(port, host, (err) => {
  if (!err) {
    console.log(`Server is running at http://${host}:${port}`);
  } else {
    console.error(`Error starting server,${err}`);
  }
});
