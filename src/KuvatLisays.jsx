import './App.css'
import KuvatService from './services/Kuvat'
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import KategoriaService from './services/Kategoria'




const UusiKuva = ({setLisäystila, setViesti, setShowViesti,loggedInUser,setReloadOmatKuvat,reloadOmatKuvat}) => {

    const [newKuvaNimi, setNewKuvaNimi] = useState('')
    const[newLoginId, setNewLoginId] = useState('')
    const[newKategoriaId, setNewKategoriaId] = useState('')
    const[newKuvaLinkki, setNewKuvaLinkki] = useState('')
    const[newKuvaBytes, setNewKuvaBytes] = useState(null)
    const [kategoriat, setKategoriat] = useState([]);
    

  useEffect(() => 
    {
        let nimi = localStorage.getItem("nimi")
        
        let id = localStorage.getItem("loginId")
        setNewLoginId(id)
        
              
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
         setReloadOmatKuvat(!reloadOmatKuvat)
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
    //   setNewLoginId(''); loginid tulee automaattisesti localstoragesta sitä ei tarvitse pyyhkiä
  };

  


  return (
    <>
    <h6>Täällä voit ladata kuvia palveluun</h6>
    <h6>Lataa palveluun vain itseottamiasi kuvia</h6>
      <h6>Kuvat julkaistaan Creative Commonsin BY-NC 4.0 lisenssillä. Lue lisää <a href='https://creativecommons.org/licenses/by-nc/4.0/'>CC BY-NC</a></h6>
      <h6>Tutustu valokuvaajan oikeuksiin ja velvollisuuksiin.<a href="https://www.minilex.fi/a/valokuvaus#:~:text=Valokuvaamisessa%20kuvaajalla%20on%20sek%C3%A4%20oikeuksia%20sek%C3%A4%20velvollisuuksia.%20Kuvaajalla,Kirjallisen%20tai%20taiteellisen%20teoksen%20luojalla%20on%20teokseensa%20tekij%C3%A4noikeus.">Minilex:Valokuvaus</a></h6>
      
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
                            <Form.Label>KuvaLinkki:</Form.Label>
                            <Form.Label>Jos kuvasi löytyy verkosta voit kirjoittaa linkin tähän</Form.Label>
                            
                            <Form.Control
                                type="text"
                                value={newKuvaLinkki}
                                onChange={(e) => setNewKuvaLinkki(e.target.value)}
                                
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

                        <Form.Group controlId="loginId" style={{ display: 'none' }}>
                            <Form.Label>LoginId</Form.Label>
                            <Form.Control
                                type="text"
                                value={newLoginId}
                                // onChange={(e) => setNewKuvaNimi(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Lisää
                        </Button>
                        
                        
                    </Form>
                </Col>
            </Row>
        </Container>
        </>
  )
}

export default UusiKuva