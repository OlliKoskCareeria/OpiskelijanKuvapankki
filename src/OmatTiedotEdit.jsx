import LoginService from './services/Login'
import './App.css'
import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const OmatTiedotEdit = ({setMuokkaustila, setViesti, setShowViesti, muokattavaLogi}) => {
console.log(muokattavaLogi)
    const [newLoginId, setNewLoginId] = useState(muokattavaLogi.loginId)
    const [newKayttajaTunnus, setNewKayttajaTunnus] = useState(muokattavaLogi.kayttajaTunnus)
    const [newNimi, setNewNimi] = useState(muokattavaLogi.nimi)
    const [newYhteystieto, setNewYhteystieto] = useState(muokattavaLogi.yhteystieto)
    const [newSsana, setNewSsana] = useState(muokattavaLogi.ssana)

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
             setViesti("Muokattu tietoja" + newLogin.kayttajaTunnus)
             
             setShowViesti(true)
            
             setTimeout(() => {
              setShowViesti(false)
             }, 6000)
      
             setMuokkaustila(false)
    }})
         
    }
    return (
      <div>
        <h2>Muokkaa käyttäjätietoja</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formLoginId">
            <Form.Label>LoginID</Form.Label>
            <Form.Control type="number" value={newLoginId} disabled/>
          </Form.Group>
  
          <Form.Group controlId="formNimi">
            <Form.Label>Nimi</Form.Label>
            <Form.Control
              type="text"
              value={newNimi}
              placeholder="Nimi"
              onChange={({ target }) => setNewNimi(target.value)}
              required
            />
          </Form.Group>
  
          <Form.Group controlId="formYhteystieto">
            <Form.Label>Yhteystieto</Form.Label>
            <Form.Control
              type="text"
              value={newYhteystieto}
              placeholder="Yhteystieto"
              onChange={({ target }) => setNewYhteystieto(target.value)}
            />
          </Form.Group>
  
          <Form.Group controlId="formKayttajaTunnus">
            <Form.Label>Käyttäjätunnus</Form.Label>
            <Form.Control type="email" value={newKayttajaTunnus} />
          </Form.Group>
  
          <Form.Group controlId="formSalasana">
            <Form.Label>Salasana</Form.Label>
            <Form.Control type="password" value={newSsana} placeholder="Salasana" disabled />
          </Form.Group>
  
          <Button variant="primary" type="submit">
            Tallenna
          </Button>
          <Button variant="secondary" type="button" onClick={() => setMuokkaustila(false)}>
            Takaisin
          </Button>
        </Form>
      </div>
    )
  }
  
  export default OmatTiedotEdit;