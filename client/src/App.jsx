import { useEffect, useState } from 'react'
import {io} from "socket.io-client";
import {Container} from "@mui/material";

function App() {

  const handelSubmit = (e)=> {
      e.preventDefault();
  };

  useEffect(()=> {
    socket.on("connect", ()=> {
     console.log("Connected by useEffect by ID : ", socket.id);;
    })

    socket.on("welcome-msz", (msz)=> {
      console.log(msz);
    })


    return ()=> {
      socket.disconnect();
    };

  }, []);

  const [count, setCount] = useState(0)
  const socket  = io("http://localhost:3000");
  return (
    <>
     <Container maxWidth="sm"> 
     <h3>Welcome to our chat app</h3>
     <form onSubmit={handelSubmit}>
      <input type="text" />
      <button type='submit'>Send Chat</button>
     </form>

     </Container>
    </>
  )
}

export default App
