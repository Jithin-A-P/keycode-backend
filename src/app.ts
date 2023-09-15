import * as dotenv from 'dotenv'
dotenv.config({ path: __dirname + '/.env' })

import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import userRoute from './routes/user.route'
import loggerMiddleware from './middleware/logger.middleware'
import dataSource from './db/postgres.db'
import errorMiddleware from './middleware/error.middleware'
import responseMiddleware from './middleware/response.middleware'
import logger from './utils/winston.logger'
import { Server as SocketIOServer } from 'socket.io'
import http from 'http';
import { createClient } from "redis";
import { createAdapter } from "@socket.io/redis-adapter";

const server = express()
const PORT = process.env.PORT

server.use(cors())
server.use(express.json())
server.use(loggerMiddleware)
server.use('/api/users', userRoute)
server.use(responseMiddleware)
server.use(errorMiddleware)

const pubClient = createClient({  url: "redis://localhost:6379" });
const subClient = pubClient.duplicate();


dataSource
  .initialize()
  .then(() => {
    server.listen(PORT, () => {
      logger.log({ level: 'info', message: `Server started on port : ${PORT}` })
    })
  })
  .catch((error: Error) => {
    logger.log({
      level: 'error',
      message: `Error, can't connect to db ${error}`,
    })
  })

const websocketServer = http.createServer();
const socketioWebSocket = new SocketIOServer(websocketServer, {cors: {origin: "*"}});
const screenPool = {};
socketioWebSocket.on('connection', (socket) => {
  logger.log({ level: 'info', message: 'Socket.io HTTP client connected' });
  const connectionDetails = socket.handshake.query;
  const screenId: string = connectionDetails["screenId"] as string;
  console.log(connectionDetails);
  if(connectionDetails["type"] === 'playerA'){
    // check if any game is in queue already, if yes reject
    console.log("joining to room", connectionDetails["gameRoomId"])
     socket.join(connectionDetails["gameRoomId"]);
  }
    if(connectionDetails["type"] === 'screen'){
      // check if any game is in queue already, if yes reject
      console.log("joining to room", connectionDetails["gameRoomId"])
      
      screenPool[screenId] = socket;
  }
  socket.on("game_started", (gameRoomId: string)=> {
    console.log("game starting");
    socketioWebSocket.emit("show_buttons");
  })
  socket.on("button_click", (data)=> {
    console.log("sending button click data");
    screenPool[screenId].emit("button_click_data", data); 
  })

  socket.on('message', (message) => {
    logger.log({
      level: 'info',
      message: `Received Socket.io HTTP message: ${message}`,
    })
  });


  socket.on('disconnect', () => {
    logger.log({ level: 'info', message: 'Socket.io HTTP client disconnected' })
  });
});

Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
  socketioWebSocket.adapter(createAdapter(pubClient, subClient));
  websocketServer.listen(5050, () => {
    logger.log({
      level: 'info',
      message: 'WebSocket Server listening on port 5050',
    })
  })
  socketioWebSocket.emit("hello", "world");
});
