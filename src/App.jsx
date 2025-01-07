import { useState } from 'react'
import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import KategoriatLista from './KategoriatLista'
import LoginsLista from './LoginsLista'
import KuvatLista from './KuvatLista'
import Viesti from './Viesti'
import KategorianKuvat from './KategorianKuvat'
import Login from './Login'
import Etusivu from './Etusivu'
import CustomNavbar from './CustomNavbar'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import OmaSivu from './OmaSivu'

const App = () => {

const [kuvat, setKuvat] = useState(null)
const[kategoriat, setKategoriat] = useState(null)
const [showViesti, setShowViesti] = useState(false)
const [valittuKategoria, setValittuKategoria] = useState(null)
const [kategorianValinta] = useState(null)
const [viesti, setViesti] = useState('')
const [loggedInUser, setLoggedInUser] = useState('')
const[loggedAdmin, setLoggedAdmin] = useState(false)

  
const logout = () => {
  localStorage.clear()
  setLoggedInUser('')
  setLoggedAdmin(false)
  console.log(loggedInUser)
}

useEffect(() => {
  let storedUser = localStorage.getItem("kayttajaTunnus")
  if (storedUser !== null) {
    setLoggedInUser(storedUser)
    console.log(loggedInUser)
  }
},[])

useEffect(() => {
  let storedAccessLevel = localStorage.getItem("accesslevelId")
  if (storedAccessLevel == 1) {
    setLoggedAdmin(true)
  }
},[])

  return (
    <>
      <div>
      {
     <Router>
      {/* <CustomNavbar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} logout={logout} loggedAdmin={loggedAdmin} setLoggedAdmin={setLoggedAdmin} /> */}
      <Navbar  bg="dark" variant="dark" style={{ borderRadius: '10px' }}>
        <Nav className="mr-auto">
            <Nav.Link href="/Etusivu">Etusivu</Nav.Link>
            <Nav.Link href='/KategorianKuvat'>Selaa kuvia</Nav.Link>
            {loggedInUser&&<Nav.Link href='/OmaSivu'>Omat sivut</Nav.Link>}
            {loggedAdmin&&<Nav.Link href='/LoginsLista'>Käyttäjät</Nav.Link>}
            {!loggedInUser&&<Nav.Link href='/Login'>Kirjaudu sisään</Nav.Link>}
            {loggedAdmin && <Nav.Link href='/KategoriatLista'>Kategoriat</Nav.Link>}
            {loggedInUser&&<button className='nappi' onClick={() => logout()}>Kirjaudu ulos</button>}
        </Nav>
      </Navbar>
                    
  {loggedInUser&&<h6>Kirjautuneena {loggedInUser} </h6>}    
  {showViesti && <Viesti viesti={viesti}/>}

    <Routes>

    <Route path="/" element={<Etusivu setViesti={setViesti} setShowViesti={setShowViesti} />} />

    <Route path="/Etusivu" element={<Etusivu setViesti={setViesti} setShowViesti={setShowViesti} setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} loggedAdmin={loggedAdmin}setLoggedAdmin={setLoggedAdmin} />} />

    <Route path="/KategorianKuvat" element={<KategorianKuvat setViesti={setViesti} 
    setShowViesti={setShowViesti} loggedInUser={loggedInUser} />}/>

    <Route path="/OmaSivu" element={loggedInUser&&<OmaSivu setViesti={setViesti} setShowViesti={setShowViesti}
     loggedInUser={loggedInUser} loggedAdmin={loggedAdmin} />}/>
      

    <Route path="/Login" element={!loggedInUser&&<Login setViesti={setViesti} viesti={viesti} setShowViesti={setShowViesti}
    setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} loggedAdmin={loggedAdmin}setLoggedAdmin={setLoggedAdmin} />}/>
      

    <Route path="/KategoriatLista" element={<KategoriatLista setViesti={setViesti} setShowViesti={setShowViesti}
    setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} loggedAdmin={loggedAdmin}setLoggedAdmin={setLoggedAdmin}/>}/>
      
      <Route path="/LoginsLista" element={<LoginsLista setViesti={setViesti} setShowViesti={setShowViesti}
    setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} loggedAdmin={loggedAdmin}setLoggedAdmin={setLoggedAdmin}/>}/>

      </Routes>
  </Router>
}
      </div>
      
    </>
  )
}

export default App
