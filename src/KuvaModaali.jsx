import './App.css'
import {Modal} from "react-bootstrap";
import KuvatService from './services/Kuvat'
import React, {useState, useEffect} from 'react'
import { Button } from "bootstrap";
import { Await } from "react-router-dom";

const KuvaModaali = ({show, onClose, id, content }) => {
const[modaalinKuva, setModaalinKuva] = useState(null)
const [loading, setLoading] = useState(false)
const[imageSrc, setImageSrc] = useState(null)

       useEffect(() => {
        
            KuvatService.haeKorkealuokkainenKuva(id)
                .then(data => {
                    setModaalinKuva(data)
                    setImageSrc("1")
                })
            },[])
            console.log(KuvatService.haeKorkealuokkainenKuva(id))
        

        
   
        
        return(
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modaali{id}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='justify-content-center align-items-center'>
            <div>
                {imageSrc &&<img src={`data:kuva/jpeg;base64,${modaalinKuva}`} className='img-fluid' alt="ladattu kuva" />}
            </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={onClose}>Sulje</button>
                </Modal.Footer>
            </Modal>
        )
}
export default KuvaModaali