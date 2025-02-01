import './App.css'
import React, {useState, useEffect} from 'react'
import KategoriatService from './services/Kategoria'
import UusiKategoria from './KategoriatLisays'
import Kategoria from './Kategoriats'



const KategoriatLista = ({setViesti, setShowViesti}) => {

    
    const [kategoriat, setKategoriat] = useState([])
    const [showKategoriat, setShowKategoriat] = useState(false)
    const [lisäystila, setLisäystila] = useState(false)
    const [showDetails, setShowDetails] = useState(false)
    const [reload, reloadNow] = useState(false)
    
    
    useEffect(() => {
        KategoriatService.haeKaikki()
        .then(data => {
          setKategoriat(data)
        })
    },[reload]
    )
        return (
            <>
                
                
                <h1><nobr style={{ cursor: 'pointer' }}
                onClick={() => setShowKategoriat(!showKategoriat)}>Kategoriat</nobr>

                {!lisäystila && <button className="nappi" onClick={() => setLisäystila(true)}>lisää uusi kategoria</button>}</h1>
                {lisäystila && <UusiKategoria setLisäystila={setLisäystila} setViesti={setViesti} setShowViesti={setShowViesti} reloadNow={reloadNow}/>}
                {
                    showKategoriat && kategoriat && kategoriat.map(k => (
                        <Kategoria setShowDetails={setShowDetails} showDetails={showDetails} setViesti={setViesti} setShowViesti={setShowViesti} reload={reload} reloadNow={reloadNow} key={k.kategoriaId} kategoria={k}/>
                        
                        
                    )
                )
                
                }

            </>
      )
    }
    
    export default KategoriatLista