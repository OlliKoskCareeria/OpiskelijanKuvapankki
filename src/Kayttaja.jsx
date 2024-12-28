import './App.css'
import React, {useState} from 'react'
import LoginService from './services/Login'
import LoginEdit from './LoginMuokkaa'
import 'bootstrap/dist/css/bootstrap.min.css'
import Table from 'react-bootstrap/Table';

const Kayttaja = ({user, editLogins, setViesti, setShowViesti, reload, reloadNow}) => {


const [showDetails, setShowDetails] = useState(false)

const deleteUser = (user) => {
    let vastaus = window.confirm(`Poistetaanko käyttäjä ${user.kayttajaTunnus}`)

    if (vastaus === true) {
    LoginService.poista(user.loginId)
    .then(res => {
        if (res.status === 200) {
        setViesti(`Poistettiin käyttäjä ${user.kayttajaTunnus}`)
        
        setShowViesti(true)
        window.scrollBy(0, -10000) 

        
        setTimeout(() => {
        setShowViesti(false)},
        5000
        )
        reloadNow(!reload)
        }
        
            }
        )
        .catch(error => {
            if(error.code == 'ERR_BAD_RESPONSE'){
                setViesti("Käyttäjän poisto ei onnistunut")
            }
            else{
            setViesti(error.message)
            }
            
            setShowViesti(true)
            window.scrollBy(0, -10000) // siirtyy ylös
    
            setTimeout(() => {
              setShowViesti(false)
             }, 6000)
          })

    } // peruutus
    else {
    setViesti('Poisto peruttu')
        
        setShowViesti(true)
        window.scrollBy(0, -10000) // siirtyy ylös

        // piilotus
        setTimeout(() => {
        setShowViesti(false)},
        5000
        )
    }
}

  return (
    <div className='userDiv'>
        
        <h4 onClick={() => setShowDetails(!showDetails)}>
           {user.kayttajaTunnus}
        </h4>

       {showDetails && <div className="userDetails">
                
                <button onClick={() => deleteUser(user)}>Poista</button>
                <button onClick={() => editLogins(user)}>Muokkaa</button>
                
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Käyttäjätunnus</th>
                            <th>Nimi</th>
                            <th>Yhteystieto</th>
                            
                            {/* <th>pword</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{user.loginId}</td>
                            <td>{user.kayttajaTunnus}</td>
                            <td>{user.nimi}</td>
                            <td>{user.yhteystieto}</td>
                            
                            {/* <td>{user.passWord}</td> */}
                        </tr>
                    </tbody>
                </Table></div>}
    </div>
  )
}

export default Kayttaja