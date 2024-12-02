import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import KategoriatLista from './KategoriatLista'
import KuvatLista from './KuvatLista'
import Viesti from './Viesti'
import KategorianKuvat from './KategorianKuvat'
const App = () => {

  const [kuvat, setKuvat] = useState(null)
  const[kategoriat, setKategoriat] = useState(null)
  const [showViesti, setShowViesti] = useState(false)
  const [valittuKategoria, setValittuKategoria] = useState(null)
  const [kategorianValinta] = useState(null)
const [viesti, setViesti] = useState('')

  

  return (
    <>
      <div>
       <h1>Opiskelijan Kuvapankki</h1> 
       
       <KategorianKuvat kuvat={kuvat} setKuvat={setKuvat} kategoriat={kategoriat} setKategoriat={setKategoriat} valittuKategoria={valittuKategoria} setValittuKategoria={setValittuKategoria} kategorianValinta={kategorianValinta} />
       {/* {showViesti && <Viesti viesti={viesti} />}
       <KategoriatLista setViesti={setViesti} setShowViesti={setShowViesti}/>
       <KuvatLista setViesti={setViesti} setShowViesti={setShowViesti}/> */}
      </div>
      
    </>
  )
}

export default App
