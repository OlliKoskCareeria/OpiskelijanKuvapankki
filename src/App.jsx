import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import KategoriatLista from './KategoriatLista'
import KuvatLista from './KuvatLista'
import Viesti from './Viesti'
const App = () => {

  const [showViesti, setShowViesti] = useState(false)
const [viesti, setViesti] = useState('')

  

  return (
    <>
      <div>
       <h1>Opiskelijan Kuvapankki</h1> 
       {showViesti && <Viesti viesti={viesti} />}
       <KategoriatLista setViesti={setViesti} setShowViesti={setShowViesti}/>
       <KuvatLista/>
      </div>
      
    </>
  )
}

export default App
