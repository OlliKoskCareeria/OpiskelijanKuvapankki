import './App.css'
import React, {useState} from 'react'
import LoginService from './services/Auth'
import md5 from 'md5'

const Login = ({setViesti, setShowViesti, setLoggedInUser}) => {

// Komponentin tilan määritys
const [kayttajatunnus, setKayttajatunnus] = useState('')
const [ssana, setSsana] = useState('')


// onSubmit tapahtumankäsittelijä funktio
const handleSubmit = (event) => {
      event.preventDefault()
      var userForAuth = {
        kayttajaTunnus: kayttajatunnus,
        ssana: md5(ssana) // Salataan md5 kirjaston metodilla
    }
    console.log(userForAuth)
    // Käytetään services/Auth.js tiedoston metodia
    LoginService.authenticate(userForAuth)
    .then(response => {
      
        if (response.status == 200) {
          console.log("kirjautuminen ok:")
          console.log(response)
        // Talletetaan tietoja selaimen local storageen (f12 application välilehti)
        localStorage.setItem("kayttajaTunnus", response.data.kayttajaTunnus)
        localStorage.setItem("accesslevelId", response.data.accesslevelId)
        localStorage.setItem("token", response.data.token)
        
        // Asetetaan app komponentissa olevaan stateen
        setLoggedInUser(response.data.kayttajaTunnus)

       setViesti(`Kirjautuneena: ${userForAuth.kayttajaTunnus}`)
       
       setShowViesti(true)
      
       setTimeout(() => {
        setShowViesti(false)
       }, 5000)

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

    // Kenttien tyhjennys
    const emptyFields = () => {
        setUsername("")
        setPassword("")
    } 


  return (
    <div id="loginWindow">
       <h2>Login</h2>

       <form onSubmit={handleSubmit}>
            <div>
                <input type="text" value={kayttajatunnus} placeholder="Käyttäjätunnus"
                    onChange={({ target }) => setKayttajatunnus(target.value)} />
            </div>
            <div>
                <input type="password" value={ssana} placeholder="Salasana"
                    onChange={({ target }) => setSsana(target.value)} />
            </div>
            
         <input type='submit' value='Login' />
         <input type='button' value='Empty' onClick={() => emptyFields()} />
       </form>

    </div>
  )
}

export default Login