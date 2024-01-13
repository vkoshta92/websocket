//http- server  apne ap data nhi bhejta - one way comnication
// websockets- client server jab chae ak dusre ko data bhej skte hai.
//socket.io websockets ko hi use karta hai.
// iske andr hr socket me room hote h
//io- entire circit
//socket - induvisula user
// har socket ki ak id hoti h isesocket.id kr skte hai.
//emit- event trigger or listner   (event(data)) , emit daata bhejta h
//on- emit vla data recieve krenge   , on recive krta hai

// socket.brodcast.emit- to usko chor ke bkime message jega
//to- for person message to triger event for peticuler room  => socket.to(room id).emit();
//join- to join pepole in room => socket.join(room name)


// server-
// npm init -y
// npm i express socket.io
//npm i --save-dev nodemon
//npm i cors
// npm i jsonwebtoken cookie-parser

//client-
//npm create vite@latest
//react
//js+swc
//npm i
//npm install @mui/material @emotion/react @emotion/styled
//npm i socket.io-client


// emit frontend se krte h aur server me listner lagate hai.