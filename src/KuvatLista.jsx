import './App.css'
import React, {useState, useEffect} from 'react'
import KuvatService from './services/Kuvat'

const KuvatLista = () => {

    // Komponentin tilan määritys
    const [kuvat, setKuvat] = useState([])
    const [showKuvat, setShowKuvat] = useState(false)
    // const [lisäystila, setLisäystila] = useState(false)
    // const [muokkaustila, setMuokkaustila] = useState(false)
    // const [reload, reloadNow] = useState(false)
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
                <h2 onClick={() => setShowKuvat(!showKuvat)}>Kuvat</h2>
                {
                    showKuvat && kuvat && kuvat.map(k => (
                        <h3 key={k.kuvaId}>{k.kuvaNimi}</h3>
                    )
                )
                }

            </>
      )
    }
    
    export default KuvatLista