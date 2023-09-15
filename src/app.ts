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
import http from 'http'
import kioskRouter from './routes/kiosk.router'
import mediaRouter from './routes/media.router'
import campaignRouter from './routes/campaign.router'

const server = express()
const PORT = process.env.PORT

server.use(cors())
server.use(express.json())
server.use(loggerMiddleware)
server.use('/api/kiosks', kioskRouter)
server.use('/api/medias', mediaRouter)
server.use('/api/campaigns', campaignRouter)

server.use(responseMiddleware)
server.use(errorMiddleware)

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

const websocketServer = http.createServer()
websocketServer.listen(5050, () => {
  logger.log({
    level: 'info',
    message: 'WebSocket Server listening on port 5050',
  })
})

const socketioWebSocket = new SocketIOServer(websocketServer)

socketioWebSocket.on('connection', (socket) => {
  logger.log({ level: 'info', message: 'Socket.io HTTP client connected' })

  socket.on('message', (message) => {
    logger.log({
      level: 'info',
      message: `Received Socket.io HTTP message: ${message}`,
    })
  })

  socket.on('disconnect', () => {
    logger.log({ level: 'info', message: 'Socket.io HTTP client disconnected' })
  })
})

socketioWebSocket.on('connection', (socket) => {
  logger.log({ level: 'info', message: 'Socket.io WebSocket client connected' })

  socket.on('message', (message) => {
    logger.log({
      level: 'info',
      message: `Received Socket.io WebSocket message: ${message}`,
    })
  })

  socket.on('disconnect', () => {
    logger.log({
      level: 'info',
      message: 'Socket.io WebSocket client disconnected',
    })
  })
})
