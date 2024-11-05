import './App.css'
import React, {useState, useEffect} from 'react'
import KategoriatService from './services/Kategoria'
import UusiKategoria from './KategoriatLisays'
import Kategoria from './Kategoriats'



const KategoriatLista = ({setViesti, setShowViesti}) => {

    // Komponentin tilan määritys
    const [kategoriat, setKategoriat] = useState([])
    const [showKategoriat, setShowKategoriat] = useState(false)
    const [lisäystila, setLisäystila] = useState(false)
    
    const [showDetails, setShowDetails] = useState(false)
    
    
    // const [muokkaustila, setMuokkaustila] = useState(false)
    const [reload, reloadNow] = useState(false)
    // const [muokattavaKategoria, setMuokattavaKategoria] = useState(false)
    // const [search, setSearch] = useState("")
    
    useEffect(() => {
        KategoriatService.haeKaikki()
        .then(data => {
          setKategoriat(data)
        })
    },[]
    )
        return (
            <>
                
                {/* <h2 onClick={() => setShowKategoriat(!showKategoriat)}>Kategoriat{!lisäystila && <button onClick={() => setLisäystila(true)}>Add new</button>}</h2> */}
                <h1><nobr style={{ cursor: 'pointer' }}
                onClick={() => setShowKategoriat(!showKategoriat)}>Kategoriat</nobr>

                {!lisäystila && <button className="nappi" onClick={() => setLisäystila(true)}>lisää uusi kategoria</button>}</h1>
                {lisäystila && <UusiKategoria setLisäystila={setLisäystila} setViesti={setViesti} setShowViesti={setShowViesti}/>}
                {
                    showKategoriat && kategoriat && kategoriat.map(k => (
                        <Kategoria setViesti={setViesti} setShowViesti={setShowViesti} reload={reload} reloadNow={reloadNow} key={k.kategoriaId} kategoria={k}/>
                        // <h3 Kategoria key={k.kategoriaId}>{k.kategoriaNimi}
                        // {showDetails && <Kategoria/>}</h3>
                        
                    )
                )
                
                }

            </>
      )
    }
    
    export default KategoriatLista