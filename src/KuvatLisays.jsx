import './App.css'
import React, {useState} from 'react'
import KuvatService from './services/Kuvat'



const UusiKuva = ({setLisäystila, setViesti, setShowViesti}) => {

// Komponentin state määritys


const [newKuvaNimi, setNewKuvaNimi] = useState('')



// onSubmit funktio
const handleSubmit = (event) => {
      event.preventDefault()
      var newKuva = {
        kuvaNimi: newKuvaNimi
    }
    
    KuvatService.lisaaUusi(newKuva)
    
    .then(response => {
      if (response.status === 200) {
        
        setViesti(`Lisättiin uusi kuva: ${newKuva.kuvaNimi}`)
       setShowViesti(true)
      
       setTimeout(() => {
        setShowViesti(false)
       }, 5000)

       setLisäystila(false)
    }

      
    })
    .catch(error => {
      setViesti(error.message)
      
      setShowViesti(true)

      setTimeout(() => {
        setShowViesti(false)
       }, 6000)
    })
  }

   
  


  return (
    <div id="lisaaUusi">
       <h2>Lisää Uusi Kuva</h2>

       <form onSubmit={handleSubmit}>
       
            <div>
                <input type="text" value={newKuvaNimi} placeholder="Kuvan nimi"
                    onChange={({ target }) => setNewKuvaNimi(target.value)} required />
            </div>
            
         
         <input type='submit' value='Tallenna' />
         <input type='button' value='Takaisin' onClick={() => setLisäystila(false)} />
         
       </form>

    </div>
  )
}

export default UusiKuva