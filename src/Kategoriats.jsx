import './App.css'
import React, {useState} from 'react'
import KategoriaService from './services/Kategoria'

// props is named customer
const Kategoria = ({kategoria, setViesti, setShowViesti, reload, reloadNow,showDetails,setShowDetails}) => {

// component state definition


const PoistaKategoria = (kategoria, setViesti, setShowViesti, reload, reloadNow)  => {
    let vastaus = window.confirm(`poista kategoria ${kategoria.kategoriaNimi}`)

    if (vastaus === true) {
    KategoriaService.poista(kategoria.kategoriaId)
    .then(res => {
        if (res.status === 200) {
        setViesti(`Poistettu ${kategoria.kategoriaNimi}`)
        
        setShowViesti(true)
        window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert :)

        // Ilmoituksen piilotus
        setTimeout(() => {
        setShowViesti(false)},
        5000
        )
        reloadNow(!reload)
        }
        
            }
        )
        .catch(error => {
            if(error.code == 'ERR_BAD_RESPONSE'){
                setViesti("Kategoriassa on kuvia poistaminen ei ole tämän vuoksi mahdollista")
            }
            else{
            setViesti(error.message)
            }
            
            setShowViesti(true)
            window.scrollBy(0, -10000) // siirtyy ylös
    
            setTimeout(() => {
              setShowViesti(false)
             }, 6000)
          })

    } // peruutus
    else {
    setViesti('Poisto peruttu onnistuneesti.')
        
        setShowViesti(true)
        window.scrollBy(0, -10000) // siirtyy ylös

        // piilotus
        setTimeout(() => {
        setShowViesti(false)},
        5000
        )
    }
}

  return (
    <div className='kategoriaDiv'>
        
        <h4 onClick={() => setShowDetails(!showDetails)}>
           {kategoria.kategoriaNimi}
        </h4>

       {showDetails && <div className="kategoriaDetails">
                {/* <h3>{kategoria.kategoriaNimi}</h3> */}
                {/* <button className="nappi"onClick={() => PoistaKategoria(kategoria,setViesti,setShowViesti,reload,reloadNow)}>Delete</button> */}
                
                <table>
                    <thead>
                        <tr>
                            <th>KategoriaId</th>
                            <th>KategoriaNimi</th>
                            <th>Poistotoiminto</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{kategoria.kategoriaId}</td>
                            <td>{kategoria.kategoriaNimi}</td>
                            <td><button className="nappi"onClick={() => PoistaKategoria(kategoria,setViesti,setShowViesti,reload,reloadNow)}>Delete</button></td>
                        </tr>
                    </tbody>
                </table></div>}
    </div>
  )
}

export default Kategoria