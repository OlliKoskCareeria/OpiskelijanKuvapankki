import './App.css'
import React, {useState, useEffect} from 'react'
import KuvatService from './services/Kuvat'
import LatausButton from './KuvanLataus'
import UusiKuva from './KuvatLisays'

const OmatKuvat = ({showOmatKuvat,setShowOmatKuvat,setViesti, setShowViesti, loggedAdmin,loggedInUser}) =>{

    const [omatkuvat, setOmatkuvat] = React.useState([]);
    const [kaikkikuvat, setKaikkiKuvat] = React.useState([]);
    const [lisäystila, setLisäystila] = useState(false)
    const token = localStorage.getItem('token')
            KuvatService
                .setToken(token)

    useEffect(() => {
        KuvatService.haeKayttajanPerusteella("ollikoski84@gmail.com")
        .then(data => {
          setOmatkuvat(data)
        })
    },[kaikkikuvat]
    )
    return(
        <div className='omatkuvatdiv'>
        
        <h4 onClick={() => setShowOmatKuvat(!showOmatKuvat)}>
           Omat kuvat   
        </h4>
        {showOmatKuvat && !lisäystila && <button className="btn btn-secondary" onClick={() => setLisäystila(true)}>Lisää Uusi Kuva</button>}
        {lisäystila && <UusiKuva setLisäystila={setLisäystila} 
            setViesti={setViesti} setShowViesti={setShowViesti}
            />}

       {showOmatKuvat && <div className="omatKuvatDetails"style={{display:"flex",
                        flexWrap:"wrap",
                        gap:"20px",
                        justifyContent:"center",

            }} >
                
        {omatkuvat.map(kuva => (
                <div className='image-card' key={kuva.kuvaId}>
                <img key ={kuva.kuvaId} src={`data:kuva/jpeg;base64,${kuva.kuvaData}`} alt={"Kuvaa ei ollut"}/>
                
                <div className='image-info'>
                    <p>{kuva.kuvaNimi}</p>
                    <p>{kuva.kuvaaja}</p>
                    <p>{kuva.yhteystieto}</p>
                    <LatausButton id={kuva.kuvaId}/>
                    
                </div>
            </div>
            ))}
            
        </div>}
             
       </div>
    )
    
}
export default OmatKuvat