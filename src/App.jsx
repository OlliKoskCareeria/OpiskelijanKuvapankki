import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import KategoriatLista from './KategoriatLista'
import KuvatLista from './KuvatLista'
import Viesti from './Viesti'
import KategorianKuvat from './KategorianKuvat'
import Etusivu from './Etusivu'
import Login from './Login'
const App = () => {

  const [kuvat, setKuvat] = useState(null)
  const[kategoriat, setKategoriat] = useState(null)
  const [showViesti, setShowViesti] = useState(false)
  const [valittuKategoria, setValittuKategoria] = useState(null)
  const [kategorianValinta] = useState(null)
const [viesti, setViesti] = useState('')
const [loggedInUser, setLoggedInUser] = useState('')
const[loggedAccessLevel, setLoggedAccessLevel] = useState(false)
const [loginLevel, setLoginLevel] = useState('')
  

  return (
    <>
      <div>
       <h1>Opiskelijan Kuvapankki</h1> 
       {!loggedInUser && <Login setViesti={setViesti}
                setShowViesti={setShowViesti} setLoggedInUser={setLoggedInUser}/> }
       <h3>Tämä sivusto sisältää ilmaisia kuvia.</h3>
            <h4>Kuvat on julkaistu CC0 lisenssillä. Lue lisää <a href='https://creativecommons.org/publicdomain/zero/1.0/'>Creative Commons CC0.</a></h4>
        
       <KategorianKuvat kuvat={kuvat} setKuvat={setKuvat} kategoriat={kategoriat} setKategoriat={setKategoriat} valittuKategoria={valittuKategoria} setValittuKategoria={setValittuKategoria} kategorianValinta={kategorianValinta} />
       {}
      </div>
      
    </>
  )
}

export default App
