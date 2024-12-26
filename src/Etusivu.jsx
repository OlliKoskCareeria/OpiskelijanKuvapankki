import './App.css'
import React, {useState} from 'react'

const Etusivu = () =>{


return( 
<>
<h2>Opiskelijan Kuvapankki</h2>
      <h6>Tämä sivusto sisältää ilmaisia kuvia, joita voit käyttää opiskelutarkoituksiin.</h6>
      <h6>Kuvat on julkaistu Creative Commonsin BY-NC 4.0 lisenssillä. Lue lisää <a href='https://creativecommons.org/licenses/by-nc/4.0/'>CC BY-NC</a></h6>
    <img src="/images/jarvimaisema.jpg" style={{pointerEvents:"none",width:"100%", maxWidth:"780px",
        height: "auto",margin:"0px",
        borderRadius: "10px",}} alt="jarvimaisema"/>
    <p style={{textAlign:"left",fontSize:"10px",fontWeight:"bold",width:"100%", maxWidth:"800px",}}> Järvimaisema  Noora Luomala  pvm:13.08.2023</p>
</>
)
}
export default Etusivu;