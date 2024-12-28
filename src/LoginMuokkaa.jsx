import './App.css'
import React, {useState} from 'react'
import LoginService from './services/Login'
import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form';

const LoginEdit = ({setMuokkaustila, setViesti, setShowViesti, muokattavaLogin}) => {

// Component state definition
const [newLoginId, setNewLoginId] = useState(muokattavaLogin.loginId)
const [newKayttajaTunnus, setNewKayttajaTunnus] = useState(muokattavaLogin.kayttajaTunnus)
const [newNimi, setNewNimi] = useState(muokattavaLogin.nimi)
const [newYhteystieto, setNewYhteystieto] = useState(muokattavaLogin.yhteystieto)
const [newSsana, setNewSsana] = useState(muokattavaLogin.ssana)
    



const handleSubmit = (event) => {
      event.preventDefault()
      var newLogin = {
        loginId: newLoginId,
        kayttajaTunnus: newKayttajaTunnus,
        nimi: newNimi,
        yhteystieto: newYhteystieto,
        ssana:newSsana
    }
    
    LoginService.muokkaaKayttajaa(newLogin)
    .then(response => {
      if (response.status === 200) {
       setViesti("Muokattu tietoja" + newLogin.userName)
       
       setShowViesti(true)
      
       setTimeout(() => {
        setShowViesti(false)
       }, 5000)

       setMuokkaustila(false)
    }

      })
      .catch(error => {
        setViesti(error)
        setShowViesti(true)

        setTimeout(() => {
          setShowViesti(false)
         }, 6000)
      })
    }


  return (
    <div>
       <h2>Muokkaa käyttäjätietoja</h2>

       <form onSubmit={handleSubmit}>
       <div>
       <label>LoginID</label>
                <input type="text" value={newLoginId} disabled />
            </div>
            <div>
                <label>Nimi </label>
                <input type="text" value={newNimi} placeholder="Nimi"
                    onChange={({ target }) => setNewNimi(target.value)} required />
            </div>
            <div>
            <label>Yhteystieto</label>
                <input type="text" value={newYhteystieto} placeholder="Yhteystieto"
                    onChange={({ target }) => setNewYhteystieto(target.value)} />
            </div>
            <div>
            <label>Käyttäjätunnus </label>
                <input type="text" value={newKayttajaTunnus} disabled />
            </div>
            <div>
            <label>Salasana </label>
                <input type="password" value={newSsana} placeholder="Salasana" disabled />
            </div>
            
         <input type='submit' value='save' />
         <input type='button' value='back' onClick={() => setMuokkaustila(false)} />
       </form>

    </div>
  )
}

export default LoginEdit