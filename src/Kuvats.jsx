import './App.css'
import React, {useState} from 'react'
import KuvatService from './services/Kuvat'

// props is named customer
const Kuva = ({kuva, setViesti, setShowViesti, reload, reloadNow}) => {

// component state definition
const [showDetails, setShowDetails] = useState(false)

const PoistaKuva = (kuva, setViesti, setShowViesti, reload, reloadNow)  => {
    let vastaus = window.confirm(`poista kuva ${kuva.kuvaNimi}`)

    if (vastaus === true) {
    KuvatService.poista(kuva.kuvaId)
    .then(res => {
        if (res.status === 200) {
        setViesti(`Poistettu ${kuva.kuvaNimi}`)
        
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
                setViesti("Kuvan poisto ei onnistunut")
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
    <div className='kuvaDiv'>
        
        <h4 onClick={() => setShowDetails(!showDetails)}>
           {kuva.kuvaNimi}
        </h4>

    {showDetails && <div className="kuvaDetails">
        <div className="img-container">
            <div className='image-card'>
        <img
            src={`data:kuva/jpeg;base64,${kuva.kuvaData}`}
            alt={kuva.kuvaNimi}
            className="image-card-img"
        />
        <div className="image-card-info">
        <h3 className='image-kuvaNimi'>{kuva.kuvaNimi}</h3> 
        <p className= "image-kuvaaja">{kuva.kuvaaja}</p> 
        <p className= "image-kategoria">{kuva.kategoria}</p>
        <p className= "image-yhteystieto">{kuva.yhteystieto}</p>  
        <button className="nappi"onClick={() => PoistaKuva(kuva,setViesti,setShowViesti,reload,reloadNow)}>Delete</button>
            </div>               
         </div>           
    </div>
</div>
}
</div>
  )
}

export default Kuva