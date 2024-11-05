import './App.css'
import React, {useState} from 'react'
import KategoriaService from './services/Kategoria'



const UusiKategoria = ({setLisäystila, setViesti, setShowViesti}) => {

// Komponentin state määritys


const [newKategoriaNimi, setNewKategoriaNimi] = useState('')



// onSubmit funktio
const handleSubmit = (event) => {
      event.preventDefault()
      var newKategoria = {
        kategoriaNimi: newKategoriaNimi
    }
    
    KategoriaService.lisaaUusi(newKategoria)
    
    .then(response => {
      if (response.status === 200) {
        
        setViesti(`Lisättiin uusi kategoria: ${newKategoria.kategoriaNimi}`)
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
       <h2>Lisää Uusi Kategoria</h2>

       <form onSubmit={handleSubmit}>
       
            <div>
                <input type="text" value={newKategoriaNimi} placeholder="Kategorian nimi"
                    onChange={({ target }) => setNewKategoriaNimi(target.value)} required />
            </div>
            
         
         <input type='submit' value='Tallenna' />
         <input type='button' value='Takaisin' onClick={() => setLisäystila(false)} />
         
       </form>

    </div>
  )
}

export default UusiKategoria