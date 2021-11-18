const http = require("http")
const express = require("express")
const socketio = require("socket.io")

const app = express()
const server = http.createServer(app)
const io = socketio.listen(server)

app.set("port",process.env.PORT || 3000)

require("./socket.js")(io,app)

app.use(express.static("./public"))

server.listen(app.get("port"),()=>{
    console.log("Servidor creado en el puerto: " + app.get("port"))
})