const http = require('http');
const app = require('./src/config/express.config');

const port = 9002;
const host = "localhost";

const httpServer = http.createServer(app);

httpServer.listen(port, host, (err)=> {
    if(!err){
        console.log(`Server is running at http://${host}:${port}`)
    }else{
        console.error(`Error starting server,${err}`)
    }
})