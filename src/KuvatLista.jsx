import './App.css'
import React, {useState, useEffect} from 'react'
import KuvatService from './services/Kuvat'
import Kuva from './Kuvats'
const KuvatLista = ({setViesti, setShowViesti}) => {

    // Komponentin tilan määritys
    const [kuvat, setKuvat] = useState([])
    const [showKuvat, setShowKuvat] = useState(false)
    
    const [showDetails, setShowDetails] = useState(false)
    const [lisäystila, setLisäystila] = useState(false)
    // const [muokkaustila, setMuokkaustila] = useState(false)
    const [reload, reloadNow] = useState(false)
    // const [muokattavaCustomer, setMuokattavaCustomer] = useState(false)
    // const [search, setSearch] = useState("")
    
    useEffect(() => {
        KuvatService.haeKaikki()
        .then(data => {
          setKuvat(data)
        })
    },[]
    )
        return (
            <>
                
                
                <h1><nobr style={{ cursor: 'pointer' }}
                onClick={() => setShowKuvat(!showKuvat)}>Kuvat</nobr>

                {!lisäystila && <button className="nappi" onClick={() => setLisäystila(true)}>lisää uusi kuva</button>}</h1>
                {lisäystila && <UusiKuva setLisäystila={setLisäystila} setViesti={setViesti} setShowViesti={setShowViesti}/>}
                {
                    showKuvat && kuvat && kuvat.map(k => (
                        <Kuva setShowDetails={setShowDetails} showDetails={showDetails} setViesti={setViesti} setShowViesti={setShowViesti} reload={reload} reloadNow={reloadNow} key={k.kuvaId} kuva={k}/>
                        
                        
                    )
                )
                
                }

            </>
      )
    }
    
    export default KuvatLista