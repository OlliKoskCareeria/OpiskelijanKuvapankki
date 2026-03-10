import './App.css'
import React, {useState, useEffect} from 'react'
import KuvatService from './services/Kuvat'
import KategoriaService from './services/Kategoria'
import LatausButton from './KuvanLataus'
// import KopioPolkuna from './LataaURL'



const KategorianKuvat = () => {
const [kategoriat, setKategoriat] = React.useState([]);
const [kuvat, setKuvat] = React.useState([]);
const [valittuKategoria, setValittuKategoria] = React.useState([]);

useEffect(() => {//haetaan kategorioiden tiedot ja muodostetaan niistä navbar
    KategoriaService.haeKaikki()
    .then(data => {
        
      setKategoriat(data)
    })
},[]
)

useEffect(() => {
    if (kategoriat.length > 0) {
      KuvatService.haeKategorianPerusteella(kategoriat[0].kategoriaNimi) //määritetty ensimmäiseen indeksiin että sivulla olisi sisältöä ennen kategorian valintaa
        .then(data => {
          setKuvat(data);
        })
        .catch(error => {
          console.error('Error fetching images:', error);
        });
    }
  }, [kategoriat]);

const kategorianValinta = (knimi) => { //kuvatlista valitun kategorian perusteella
    KuvatService.haeKategorianPerusteella(knimi)
    .then(data => { 
      setKuvat(data)
      
    
      
      
    })
};



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
           
            <h2>{valittuKategoria}</h2>
            <div style={{display:"flex",
                        flexWrap:"wrap",
                        gap:"20px",
                        justifyContent:"center",

            }}>
                
            {kuvat.map(kuva => (
                
                <div className='image-card' key={kuva.kuvaId}>
                {/* <img key ={kuva.kuvaId} src={`data:kuva/jpeg;base64,${kuva.kuvaData}`} alt={"Kuvaa ei ollut"}/> */}
                <img key ={kuva.kuvaId} src={`${import.meta.env.VITE_BASE_URL}/kuva/${kuva.kuvaId}`}alt={"Kuvaa ei ollut"}/>
                
                <div className='image-info'>
                    <p>{kuva.kuvaNimi}</p>
                    <p>{kuva.kuvaaja}</p>
                    <p>{kuva.yhteystieto}</p>
                    <LatausButton id={kuva.kuvaId}/>
                    {/* <KopioPolkuna id={kuva.kuvaId}/> */}
                    
                </div>
            </div>
            
           
            ))}
            </div>  
        </main>
    </div>
);
};
export default KategorianKuvat;
