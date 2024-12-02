import './App.css'
import React, {useState, useEffect} from 'react'
import KuvatService from './services/Kuvat'
import KategoriaService from './services/Kategoria'
import LatausButton from './KuvanLataus'

const KategorianKuvat = () => {
const [kategoriat, setKategoriat] = React.useState([]);
const [kuvat, setKuvat] = React.useState([]);
const [valittuKategoria, setValittuKategoria] = React.useState([]);

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
                    
                    setValittuKategoria(kategoria.kategoriaNimi);
                    kategorianValinta(kategoria.kategoriaNimi);
                }}
                    
                    >
                        {kategoria.kategoriaNimi}
                        
                    </button>
                    
            ))}
        </nav>
        
        <main>
            <h3>Tämä sivusto sisältää ilmaisia kuvia.</h3>
            <h3>Kuvat on julkaistu CC0 lisenssillä. Lue lisää.</h3><a href='https://creativecommons.org/publicdomain/zero/1.0/'>Creative Commons CC0</a>
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