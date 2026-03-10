import './App.css'
import React, {useState} from 'react'
import LoginService from './services/Auth'
import md5 from 'md5'
import { useNavigate } from 'react-router-dom';
import Viesti from './Viesti';


const Login = ({setViesti,viesti, setShowViesti, setLoggedInUser,loggedInUser,setLoggedAdmin}) => {

// Komponentin tilan määritys
const [kayttajatunnus, setKayttajatunnus] = useState('')
const [ssana, setSsana] = useState('')
const navigate = useNavigate();



const handleSubmit = (event) => {
      event.preventDefault()
      var userForAuth = {
        kayttajaTunnus: kayttajatunnus,
        ssana: md5(ssana) 
    }
    
    LoginService.authenticate(userForAuth)
    .then(response => {
      
        if (response.status == 200) {
          console.log("kirjautuminen ok:")
          
          
        localStorage.setItem("kayttajaTunnus", response.data.kayttajaTunnus)
        localStorage.setItem("accesslevelId", response.data.accesslevelId)
        localStorage.setItem("loginId", response.data.loginId)
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("nimi", response.data.nimi)
        setLoggedInUser(response.data.kayttajaTunnus)
        setLoggedAdmin(true)
        setViesti("")
        
        

       
       
      //  setShowViesti(true)
      // setViesti("Kirjaudutaan!")
      //  setTimeout(() => {
      //   setShowViesti(false)
      //  }, 5000)
       navigate('/Etusivu');
    }
      })
      .catch(error => {
        setViesti("Käyttäjätunnus ja salasana eivät täsmää!")
        console.log(viesti)
        setShowViesti(true)
        emptyFields()
        //  navigate('/Login')
      })
    }
    

    // Kenttien tyhjennys
    const emptyFields = () => {
        setKayttajatunnus("")
        setSsana("")
    } 


  return (
    <div id="loginWindow">
       <h2>Kirjaudu sisään</h2>
      {/* <Viesti viesti={viesti}></Viesti> */}
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