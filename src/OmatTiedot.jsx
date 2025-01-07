import LoginService from './services/Login'
import './App.css'
import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import OmatTiedotEdit from './OmatTiedotEdit';


const OmatTiedot = ({setViesti,setShowViesti,loggedAdmin,loggedInUser,setShowOmatTiedot,showOmatTiedot}) => {

    const [login, setLogin] = useState([])
    const [muokkaustila, setMuokkaustila] = useState(false)
    const [reload, reloadNow] = useState(false)
    const [muokattavaLogin, setMuokattavaLogin] = useState(null)

    const editLogins = (login) => {
         setMuokattavaLogin(login)
         setMuokkaustila(true)
       }

    useEffect(() => {
    
        const token = localStorage.getItem('token')
            LoginService
                .setToken(token)
        
        // setLogin(localStorag
    
      LoginService.HaeYksiKayttaja(localStorage.getItem('loginId'))
      .then(data => {
        setLogin(data)
            })
        },[reload, muokkaustila]

        
      )
    return (
        <div className='userDiv'>
        {muokkaustila&&<OmatTiedotEdit muokattavaLogin={muokattavaLogin}setViesti={setViesti} setShowViesti={setShowViesti} loggedInUser={loggedInUser} loggedAdmin={loggedAdmin}></OmatTiedotEdit>}
        <h4 onClick={() => setShowOmatTiedot(!showOmatTiedot)}>
           Omat tiedot
        </h4>

       {showOmatTiedot && <div className="userDetails">
                
                <button onClick={() => deleteUser(login)}>Poista</button>
                <button onClick={() => editLogins(muokattavaLogin)}>Muokkaa</button> 
                
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
                            <td>{login.loginId}</td>
                            <td>{login.kayttajaTunnus}</td>
                            <td>{login.nimi}</td>
                            <td>{login.yhteystieto}</td>
                            
                            {/* <td>{user.passWord}</td> */}
                        </tr>
                    </tbody>
                </Table></div>}
    </div>
      
      
    )
  };
  
  export default OmatTiedot;