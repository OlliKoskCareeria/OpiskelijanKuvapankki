import LoginService from './services/Login'
import './App.css'
import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import OmatTiedotEdit from './OmatTiedotEdit';


const OmatTiedot = ({setViesti,setShowViesti,loggedInUser,setShowOmatTiedot,showOmatTiedot}) => {

    const [kayttaja, setKayttaja] = useState([])
    const [muokkaustila, setMuokkaustila] = useState(false)
    const [reload, reloadNow] = useState(false)
    const [muokattavaLogi, setMuokattavaLogi] = useState([])

    

    useEffect(() => {
    
        const token = localStorage.getItem('token')
            LoginService
                .setToken(token)
        

                

      LoginService.HaeYksiKayttaja(localStorage.getItem('loginId'))
      .then(data => {
        setKayttaja(data)
        
        
            })
        },[reload,muokkaustila,loggedInUser]

        

        

        
      )
      

      
      const editLogins = (login) => {
        
        setMuokattavaLogi(login)
        setMuokkaustila(true)
    }
      
    return (
        <div className='userDiv'>
        {muokkaustila &&<OmatTiedotEdit setMuokkaustila={setMuokkaustila} muokattavaLogi={muokattavaLogi} setViesti={setViesti} setShowViesti={setShowViesti} loggedInUser={loggedInUser}></OmatTiedotEdit>}
        <h4 onClick={() => setShowOmatTiedot(!showOmatTiedot)}>
           Omat tiedot
        </h4>

       {showOmatTiedot && <div className="userDetails">
                
                <button onClick={() => deleteUser(kayttaja)}>Poista</button>
                <button onClick={() => editLogins(kayttaja)}>Muokkaa</button> 
                
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
                            <td>{kayttaja.loginId}</td>
                            <td>{kayttaja.kayttajaTunnus}</td>
                            <td>{kayttaja.nimi}</td>
                            <td>{kayttaja.yhteystieto}</td>
                            
                            {/* <td>{user.passWord}</td> */}
                        </tr>
                    </tbody>
                </Table></div>}
    </div>
      
      
    )
  };
  
  export default OmatTiedot;