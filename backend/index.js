const http = require("http");
const app = require("./src/config/express.config");
const { initSocket } = require("./src/config/socket");

const port = process.env.PORT || 9003;
const host = "0.0.0.0";

const httpServer = http.createServer(app);

initSocket(httpServer);

httpServer.listen(port, host, (err) => {
  if (!err) {
    console.log(`Server is running at http://${host}:${port}`);
  } else {
    console.error(`Error starting server,${err}`);
  }
});
