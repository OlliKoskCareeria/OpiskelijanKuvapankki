import './App.css'
import React, {useState, useEffect} from 'react'
import LoginService from './services/Login'
import Kayttaja from './Kayttaja'
import UusiLogin from './LoginLisays'
import LoginEdit from './LoginMuokkaa'


const LoginsLista = ({setViesti,setShowViesti}) => {

const [logins, setLogins] = useState([])
const [lisäystila, setLisäystila] = useState(false)
const [muokkaustila, setMuokkaustila] = useState(false)
const [reload, reloadNow] = useState(false)
const [muokattavaLogin, setMuokattavaLogin] = useState(false)
// const [search, setSearch] = useState("")
const [showLogins, setShowLogins] = useState(false)

useEffect(() => {

    const token = localStorage.getItem('token')
        LoginService
            .setToken(token)


  LoginService.haeKaikki()
  .then(data => {
    setLogins(data)
        })
    },[lisäystila, reload, muokkaustila] // Nämä statet jos muuttuu niin useEffect() ajetaan uudestaan
  )

  //Hakukentän onChange tapahtumankäsittelijä
// const handleSearchInputChange = (event) => {
//     setSearch(event.target.value.toLowerCase())
// }

const editLogins = (login) => {
  setMuokattavaLogin(login)
  setMuokkaustila(true)
}

  return (
    <>
    <h1><nobr style={{ cursor: 'pointer' }}
            onClick={() => setShowLogins(!showLogins)}>Käyttäjät      </nobr>

            {!lisäystila && <button className="btn btn-secondary" onClick={() => setLisäystila(true)}>Lisää Uusi</button>}</h1>
            
            {/* {!lisäystila && !muokkaustila &&
            <input placeholder="Search by UserName" value={search} onChange={handleSearchInputChange} />
            } */}

            {lisäystila && <UusiLogin setLisäystila={setLisäystila} 
            setViesti={setViesti} setShowViesti={setShowViesti}
            />}

            {muokkaustila && <LoginEdit setMuokkaustila={setMuokkaustila} 
            setViesti={setViesti} setShowViesti={setShowViesti}
            muokattavaLogin={muokattavaLogin}
            />}

    
    
{
        !lisäystila && !muokkaustila && showLogins && logins && logins.map(c =>
          {
            
            // const lowerCaseName = c.kayttajaTunnus.toLowerCase()
            // if (lowerCaseName.indexOf(search) > -1) {
                return(
            <Kayttaja key={c.loginId} user={c} reloadNow={reloadNow} reload={reload}
            setViesti={setViesti} setShowViesti={setShowViesti}
            editLogins={editLogins}
            />
          )
                // }
              }
        )
    }

</>
        )
    }

export default LoginsLista