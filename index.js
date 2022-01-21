import express from "express";
import { Socket } from "socket.io";
import { Server } from "socket.io";

// let express = require ('express');
// let socket = require('socket.io');

let app = express();
app.use(express.static("./public"));

let server = app.listen(4000,"192.168.0.102",()=>{console.log("http://192.168.0.102:4000");});

// let io = new Socket(server);
const io = new Server(server);

io.on("connection",(socket)=>{
    console.log("Client Id is = "+socket.id);

    socket.on("file_path", (path) => {
        //console.log("File path => ", path); 
        socket.broadcast.emit("file_path", path)
    });

});





// import express from "express";

// import { Server } from "socket.io";

// const app = express();
// app.use(express.static("./public"));

// const express_server = createServer(app);
// const io = new Server(express_server,()=>{console.log("sf");});

// io.on("connection", (socket) => {
//   // ...
// });

// express_server.listen(4000);