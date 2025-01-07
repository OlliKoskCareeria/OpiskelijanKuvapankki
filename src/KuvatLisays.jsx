import './App.css'
import KuvatService from './services/Kuvat'
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import KategoriaService from './services/Kategoria'
import LoginService from './services/Login'



const UusiKuva = ({setLisäystila, setViesti, setShowViesti}) => {

    const [newKuvaNimi, setNewKuvaNimi] = useState('')
    // const[newKuvaId, setNewKuvaId] = useState('')
    const[newLoginId, setNewLoginId] = useState('')
    const[newKategoriaId, setNewKategoriaId] = useState('')
    const[newKuvaLinkki, setNewKuvaLinkki] = useState('')
    const[newKuvaBytes, setNewKuvaBytes] = useState(null)
    const [kategoriat, setKategoriat] = useState([]);
    const [logins, setLogins] = useState([]);

  useEffect(() => 
    {
      LoginService.haeKaikki()
        .then(data => {
          setLogins(data)
              })

      KategoriaService.haeKaikki()
              .then(data => {
                setKategoriat(data)
              })
    }
    , []);
   
    const handleSubmit = async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append('KuvaNimi', newKuvaNimi);
      formData.append('KuvaLinkki', newKuvaLinkki);
      formData.append('KuvaBytes', newKuvaBytes);
      formData.append('KategoriaId', newKategoriaId);
      formData.append('LoginId', newLoginId);

      await KuvatService.LisaaUusi(formData)
      .then(response => {
        if (response.status === 200) {
         setViesti(`Uusi kuva lisätty: ${newKuvaNimi}`)
         
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

      // Resetoidaan kentät
      setNewKuvaNimi('');
      setNewKuvaLinkki('');
      setNewKuvaBytes(null);
      setNewKategoriaId('');
      setNewLoginId('');
  };

  


  return (
    <Container>
            <Row className="justify-content-md-center">
                <Col md="6">
                    <h2>Lisää Kuva</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="kuvaNimi">
                            <Form.Label>Kuvan nimi</Form.Label>
                            <Form.Control
                                type="text"
                                value={newKuvaNimi}
                                onChange={(e) => setNewKuvaNimi(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="kuvaLinkki">
                            <Form.Label>Image Link</Form.Label>
                            <Form.Control
                                type="text"
                                value={newKuvaLinkki}
                                onChange={(e) => setNewKuvaLinkki(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="kuvaBytes">
                            <Form.Label>Lataa kuvatiedosto</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={(e) => setNewKuvaBytes(e.target.files[0])}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="kategoriaId">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                as="select"
                                value={newKategoriaId}
                                onChange={(e) => setNewKategoriaId(e.target.value)}
                                required
                            >
                                <option value="">Select Category</option>
                                {kategoriat.map(kategoria => (
                                    <option key={kategoria.kategoriaId} value={kategoria.kategoriaId}>
                                        {kategoria.kategoriaNimi}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="loginId">
                            <Form.Label>Login</Form.Label>
                            <Form.Control
                                as="select"
                                value={newLoginId}
                                onChange={(e) => setNewLoginId(e.target.value)}
                                required
                            >
                                <option value="">Select Login</option>
                                {logins.map(login => (
                                    <option key={login.loginId} value={login.loginId}>
                                        {login.nimi}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Lisää
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
  )
}

export default UusiKuva