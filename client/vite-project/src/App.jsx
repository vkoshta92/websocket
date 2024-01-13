import React, { useEffect, useMemo, useState } from 'react'
import {io} from  "socket.io-client";
const App = () => {
// const socket= io("http://localhost:3000/");
const socket=useMemo(()=>io("http://localhost:3000/",{
  withCredentials:true, // ye true hoga tbhi mera data show hoga  tbhi hm chat kr skte h
}),[]);

const[message,setMessage]=useState("");
const[chat,setChat]=useState([]);
const [room,setRoom]=useState("");
const [socketID,setSocketID]=useState("");
const [roomName,setRoomName]=useState("");
console.log('arraymesage',chat);

const handleSubmit=(e)=>{
e.preventDefault();
socket.emit("bhatija",{message,room});
setMessage("");
}

const joinRoomHandler=(e)=>{
  e.preventDefault();
  socket.emit('join_room',roomName);
  setRoomName("");
}

useEffect(()=>{
socket.on("connect",()=>{
  setSocketID(socket.id);
  console.log('connected',socket.id);
});
// socket.on("chacha",(s)=>{
// console.log(s);
// });

// return ()=>{ // return me disccont hota h sbse phle return run hota h
//   socket.disconnect();
// };

socket.on("recive-message",(data)=>{
  // console.log('recive-message');
  console.log("data",data);
  setChat((d)=>[...d,data])
})
},[]);



  return (
    <div>
      Welcome to socket.io
      <br></br>
      {socketID}

{/*  */}
<form onSubmit={joinRoomHandler}>
  <h5>
    Join Room 
    </h5>
    <br></br>
    <label>Room Name</label>
        <input value={roomName}  onChange={(e)=>setRoomName(e.target.value)}/>
        <button type='submit'>join</button>
  
</form>

{/*  */}
      <form onSubmit={handleSubmit}>
        <label>Message</label>
        <input value={message} label="Message" onChange={(e)=>setMessage(e.target.value)}/>
        <br></br>
        <br></br>
        <label>Room</label>
        <input value={room} label="Room" onChange={(e)=>setRoom(e.target.value)}/>
        <button type='submit'>send</button>
      </form>



{/* showing data */}

        {/* <ul>
          {
           chat.map(function(item, i){
             
             return <li key={i} style={{ listStyleType: 'square', color: 'blue', margin: '5px' }}>{item}</li>
           })
         }
        </ul> */}

<div style={{ width: '100%', height: '100%', overflowY: 'scroll' }}>
  <ul style={{ listStyleType: 'none', padding: 0 }}>
    {chat.map(function (item, i) {
      const isUser = i % 2 === 0; // Just an example, you might have a better way to identify user messages
      const bubbleStyle = {
        backgroundColor: isUser ? '#dcf8c6' : '#fff',
        color: isUser ? '#000' : '#000',
        padding: '10px',
        margin: '5px',
        borderRadius: isUser ? '10px 10px 0 10px' : '10px 10px 10px 0',
        maxWidth: '70%',
        alignSelf: isUser ? 'flex-end' : 'flex-start',
      };

      return (
        <li key={i} style={bubbleStyle}>
          {item}
        </li>
      );
    })}
  </ul>
</div>





      </div>


    
  )
}

export default App
