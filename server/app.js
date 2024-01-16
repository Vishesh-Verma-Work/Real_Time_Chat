import express from "express";
import {Server} from "socket.io";
import {createServer} from "http";

const  app = express();
const server = createServer(app);
const io = new Server(server, {
    cors : {
        origin : "http://localhost:5173",
        methods : ["GET", "POST"],
        credentials : true
    }
}); 

io.on("connection", (socket)=> {
    console.log(`Connted to the server, Socket ID : ${socket.id}`);
    socket.emit("welcome-msz", `Welcome to the server ID : ${socket.id}`);

    socket.on("disconnect", ()=> {
        console.log(`User ID ${socket.id} disconnected`);
    })

    socket.on("msz", ({message,room})=> {
        console.log(message);
        socket.to(room).emit("recMsz", message);
    })


});

const port = 3000;

server.listen(port, ()=>{
    console.log(`Server is running on port number : ${port}`);
});

app.get("/", (req,res)=> {
    res.send("Hello world");
});
