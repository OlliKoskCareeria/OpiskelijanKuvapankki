import './App.css'
import React, {useState} from 'react'

const Etusivu = () =>{


return( 
<>
    <img src="/images/jarvimaisema.jpg" style={{pointerEvents:"none",width:"100%", maxWidth:"780px",
        height: "auto",margin:"0px",
        borderRadius: "10px",}} alt="jarvimaisema"/>
    <p style={{textAlign:"left",fontSize:"10px",fontWeight:"bold",width:"100%", maxWidth:"800px",}}> Järvimaisema  Noora Luomala  pvm:13.08.2023</p>
</>
)
}
export default Etusivu;