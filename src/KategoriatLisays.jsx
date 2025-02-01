import './App.css'
import KategoriaService from './services/Kategoria'
import React, {useEffect, useState} from 'react'



const UusiKategoria = ({setLisäystila, setViesti, setShowViesti,reloadNow}) => {




const [newKategoriaNimi, setNewKategoriaNimi] = useState('')

useEffect(() => {

    const token = localStorage.getItem('token')
        KategoriaService.setToken(token)
    },[] 
  );


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
       reloadNow(true)
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