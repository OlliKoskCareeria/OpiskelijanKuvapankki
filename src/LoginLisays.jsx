import './App.css'
import React, {useEffect, useState} from 'react'
import LoginService from './services/Login'
import md5 from 'md5'

const UusiLogin = ({setLisäystila, setViesti, setShowViesti}) => {


const [newKayttajaTunnus, setNewKayttajaTunnus] = useState("")
const [newNimi, setNewNimi] = useState("")
const [newYhteystieto, setNewYhteystieto] = useState("")
const [newPassword, setNewPassword] = useState('')
const [confirmPassword, setConfirmPassword] = useState('')
const [passwordMessage, setPasswordMessage] = useState('')
const [passwordMessageColor, setPasswordMessageColor] = useState('')
// tämä lauseke vertaa salasana kenttien arvoja ja asettaa viestin sen perusteella
useEffect(() =>{
  if(newPassword && confirmPassword){
    if(newPassword === confirmPassword){
      setPasswordMessage('Salasanan tarkistus OK!');
      setPasswordMessageColor('green');
    } else {
      setPasswordMessage('Salasanat eivät täsmää');
      setPasswordMessageColor('red')
    }
  }else {
    setPasswordMessage('');
    setPasswordMessageColor('');
  } 
},[newPassword, confirmPassword]);
// onSubmit tapahtumankäsittelijä funktio
const handleSubmit = (event) => {
      event.preventDefault()
      var newLogin = {
          kayttajaTunnus: newKayttajaTunnus,
          nimi: newNimi,
          yhteystieto: newYhteystieto,
          ssana:md5(newPassword)
      
        
    }
    
    

    LoginService.LisaaUusi(newLogin)
    .then(response => {
      if (response.status === 200) {
       setViesti(`Uuden käyttäjän lisääminen onnistui: ${newLogin.nimi} ${newLogin.kayttajaTunnus}`)
       
       setShowViesti(true)
      
       setTimeout(() => {
        setShowViesti(false)
       }, 5000)

       setLisäystila(false)
    }

      })
      .catch(error => {
        console.log(error.response.data)
        setViesti(error.response.data.message)//näytetään backendin viesti
        
        setShowViesti(true)

        setTimeout(() => {
          setShowViesti(false)
         }, 10000)
      })
    }


  return (
    <div id="addNew">
       <h2>Rekisteröidy</h2>
       
       <form onSubmit={handleSubmit}>
            <div>
                <input type="text" value={newNimi} placeholder="nimi"
                    onChange={({ target }) => setNewNimi(target.value)} required />
            </div>
            <div>
                <input type="email" value={newKayttajaTunnus} placeholder="Sähköposti"
                    onChange={({ target }) => setNewKayttajaTunnus(target.value)} required />
            </div>
            <div>
                <input type="text" value={newYhteystieto} placeholder="Yhteystieto"
                    onChange={({ target }) => setNewYhteystieto(target.value)} />
            </div>
            <div>
                <input type="password" value={newPassword} placeholder="Salasana"
                    onChange={({ target }) => setNewPassword(target.value)} />
            </div>
            <div>
                <input type="password" value={confirmPassword} placeholder="Vahvista salasana"
                    onChange={({ target }) => setConfirmPassword(target.value)} />
            </div>
            {/* tämä label näyttää viestin sen perusteella ovatko salasanat yhteneväiset */}
            <div>
              <label style={{color: passwordMessageColor}}>{passwordMessage}</label>
            </div>
            
         <input type='submit' value='Tallenna' />
         <input type='button' value='Peruuta' onClick={() => setLisäystila(false)} />
       </form>

    </div>
  )
}

export default UusiLogin