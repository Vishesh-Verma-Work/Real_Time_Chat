import { useEffect, useMemo, useState } from 'react'
import {io} from "socket.io-client";
import {Container, Stack} from "@mui/material";

function App() {
  const socket  = useMemo(()=>io("http://localhost:3000"),[])


  const handelSubmit = (e)=> {
      e.preventDefault();
      socket.emit("msz", {message,room});
      setMessage("");
  };

  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketID, setSocketID] = useState("");
  const [mszsArray, SetMszsArray] = useState([]);
  console.log(mszsArray);
  useEffect(()=> {
    socket.on("connect", ()=> {
      setSocketID(socket.id);
     console.log("Connected by useEffect by ID : ", socket.id);;
    })

    socket.on("welcome-msz", (msz)=> {
      console.log(msz);
    })

    socket.on("recMsz", (data)=> {
      SetMszsArray((mszsArray)=> [...mszsArray, data])
      console.log(data);
    })

 

    return ()=> {
      socket.disconnect();
    };

  }, []);

  
  return (
    <>
     <Container maxWidth="sm"> 
     <h3>Welcome to our chat app</h3>
     <h6>Socket ID : {socketID} </h6>


     <form onSubmit={handelSubmit}>
    
      <input 
      value={room}
      placeholder='Room ID'
      onChange={(e)=> setRoom(e.target.value)}
      name='room'
      type="text" />
      
      <br/>
      <br/>
      <input 
      value={message}
      placeholder='Write you Chat'
      name='message'
      onChange={(e)=> setMessage(e.target.value)}
      type="text" />


<br/>
<br/>
      <button type='submit'>Send Chat</button>
     </form>


     <Stack>
      {
        mszsArray.map((m,i)=> {
          <h4 key={i}>{m}</h4>
        })
      }
     </Stack>

     </Container>

    
    </>
  )
}

export default App
