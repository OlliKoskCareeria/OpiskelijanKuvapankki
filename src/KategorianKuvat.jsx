import './App.css'
import React, {useState, useEffect} from 'react'
import KuvatService from './services/Kuvat'
import KategoriaService from './services/Kategoria'
import LatausButton from './KuvanLataus'
import Etusivu from './Etusivu'

const KategorianKuvat = () => {
const [kategoriat, setKategoriat] = React.useState([]);
const [kuvat, setKuvat] = React.useState([]);
const [valittuKategoria, setValittuKategoria] = React.useState([]);
const [showEtusivu, setShowEtusivu] = React.useState(true);
useEffect(() => {
    KategoriaService.haeKaikki()
    .then(data => {
      setKategoriat(data)
    })
},[]
)

const kategorianValinta = (knimi) => {
    KuvatService.haeKategorianPerusteella(knimi)
    .then(data => { 
      setKuvat(data)
      console.log(knimi)
    
      console.log(kuvat)
      console.log(data)
    })
};

// useEffect(() => {
//         kategorianValinta(kategoriaNimi);
    
    
    
// },[valittuKategoria]
// )

return (
    <div>
        <nav>
            {kategoriat.map((kategoria) =>(
                <button key={kategoria.kategoriaNimi} onClick={() => {
                    setShowEtusivu(false);
                    setValittuKategoria(kategoria.kategoriaNimi);
                    kategorianValinta(kategoria.kategoriaNimi);
                }}
                    
                    >
                        {kategoria.kategoriaNimi}
                        
                    </button>
                    
            ))}
        </nav>
        
        <main>
           {showEtusivu&&<Etusivu/>}
            <h2>{valittuKategoria}</h2>
            <div style={{display:"flex",
                        flexWrap:"wrap",
                        gap:"20px",
                        justifyContent:"center",

            }}>
            {kuvat.map(kuva => (
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
            </div>  
        </main>
    </div>
);
};
export default KategorianKuvat;