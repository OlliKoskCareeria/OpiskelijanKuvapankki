import './App.css'
import React, {useState, useEffect} from 'react'
import KuvatService from './services/Kuvat'
import LatausButton from './KuvanLataus'
import UusiKuva from './KuvatLisays'
import KuvaModaali from './KuvaModaali'
//tällä sivulla tehdään kuvalista, mutta nyt loggedInUser(käyttäjätunnus) tiedon perusteella
const OmatKuvat = ({showOmatKuvat,setShowOmatKuvat,setViesti, setShowViesti,loggedInUser}) =>{
    const [reloadOmatKuvat, setReloadOmatKuvat] = useState(false)//Tämän tilan muuttuessa omatkuvat päivittyy
    const [omatkuvat, setOmatkuvat] = useState([]);
    const [lisäystila, setLisäystila] = useState(false)
    const token = localStorage.getItem('token') //haetaan token
            KuvatService
                .setToken(token)
    const[modalData, setModalData] = useState({ //alustetaan modaali-ikkuna
        show: false,
        id: null,
     })
    
    const suljeModaali = () => setModalData({show: false, id: null})
    const naytaModaali = (parametri) => setModalData({show: true, id:parametri})
    const PoistaKuva = (kuva, setViesti, setShowViesti)  => {
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

    useEffect(() => {
        KuvatService.haeKayttajanPerusteella(loggedInUser)
        .then(data => {
          setOmatkuvat(data)
        })
    },[reloadOmatKuvat]//päivittää omat kuvat lisäyksen jälkeen
    )
    return(
        <div className='omatkuvatdiv'>
        
        <h4 onClick={() => setShowOmatKuvat(!showOmatKuvat)}>
           Omat kuvat   
        </h4>
        {modalData.show&&<KuvaModaali 
                        show={modalData.show}
                        onClose={suljeModaali}
                        id={modalData.id}
                        content={null}
                        /> }
        {showOmatKuvat && !lisäystila && <button className="btn btn-secondary" onClick={() => setLisäystila(true)}>Lisää Uusi Kuva</button>}
        {lisäystila && <UusiKuva setLisäystila={setLisäystila} setReloadOmatKuvat={setReloadOmatKuvat} reloadOmatKuvat={reloadOmatKuvat}
            setViesti={setViesti} setShowViesti={setShowViesti} loggedInUser={loggedInUser}
            />}

       {showOmatKuvat && <div className="omatKuvatDetails"style={{display:"flex",
                        flexWrap:"wrap",
                        gap:"20px",
                        justifyContent:"center",}} >
                
        {omatkuvat.map(kuva => (//kuvatlista käydään läpi mapin avulla oliot näytetään image-card tyylisessä wrapperissä 64 stringi renderöidään suoraan
                <div className='image-card' key={kuva.kuvaId}>
                <img key ={kuva.kuvaId} src={`data:kuva/jpeg;base64,${kuva.kuvaData}`} alt={"Kuvaa ei ollut"}/>
                
                <div className='image-info'>
                    <p>{kuva.kuvaNimi}</p>
                    <p>{kuva.kuvaaja}</p>
                    <p>{kuva.yhteystieto}</p>
                    <LatausButton id={kuva.kuvaId}/>
                    <button className="btn btn-secondary" onClick={() => PoistaKuva(kuva,setViesti,setShowViesti)}>Poista Kuva</button>
                    <p> </p>
                    <button className='btn btn-secondary' onClick={() => naytaModaali(kuva.kuvaId)}>Suurenna</button>
                </div>
            </div>
            ))}
            
        </div>}
             
       </div>
    )
    
}
export default OmatKuvat