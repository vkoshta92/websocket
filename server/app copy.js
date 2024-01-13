import express from 'express';
import {Server} from "socket.io";
import {createServer} from "http";
import cors from 'cors';
// import  jwt from 'jsonwebtoken';
// import cookieParser from 'cookie-parser';
const port=3000;
const app= express();

//make a server
const server = createServer(app);

// const io= new Server(server);cors error ayegi
const io= new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        method:["GET","POST"],
        credentials:true,
    }
});

//circit
io.on("connection",(socket)=>{
console.log('user connected',socket.id);
// console.log("Id",socket.id);
// // socket.emit("chacha",`welcome to the server ${socket.id}`);// si perticuler socket ko message jega.
// socket.emit("chacha","Welcome to ther server");
// socket.broadcast.emit("chacha",` ${socket.id} joined the server`); // ab dusre ko data jega main is socket ki nhi.

// socket.on("disconnect", ()=>{
//     console.log("User Disconected",socket.id);
// });



// meessage event
socket .on("bhatija",({room,message})=>{ // ye same hona chiye message frontend se
console.log({room, message});
// io.emit("recive-message",data); // io kiya h to entire circit ko data milega
// socket.broadcast.emit("recive-message",data);// ab jo bhej rh ah usko nhi milega bki dusre ko milega
socket.to(room).emit("recive-message",message);// ab ak perticuler ko bhej rhe h to me socket ya io ho matter nhi karta hai. but  jb join room use krenge to socket ke case me data dusre ko dikhega io ke case me dono ko dikhega.



})

// join room event
socket.on("join_room",(room)=>{
    
    socket.join(room); // indivisul socket ki jisne req kiya h vhi join krega.
    console.log(`User ${socket.id} joined ${room}`);

    //  // Emit a message only to the user who joined the room
    //  socket.emit("recive-message", `You joined the room: ${room}`);

// // Emit a message only to the user who joined the room
// io.to(socket.id).emit("recive-message", `You joined the room: ${room}`);

});

});

app.use(cors({
    origin:"http://localhost:5173",
    method:["GET","POST"],
    credentials:true,
}));

// middleware
const isUser=false;
io.use((socket,next)=>{



// if(isUser) next(); // ab connect nhi hoga
if(!isUser) next(); // ab connect hoga ab sab kam krega.

})

app.get("/",(req,res)=>{
    res.send("Hello World")
})




server.listen(port,()=>{
    console.log("Server is running on port 3000"); // anagr app.listen krenge to nya server activate ho jega isliye hm serveer .listen use krenge
})