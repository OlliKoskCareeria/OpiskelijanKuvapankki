import React, { useEffect } from 'react';
import KuvatService from './services/Kuvat';
import { useState } from 'react';

const KopioPolkuna = ({ id }) => {

const [imageData, setImageData] = useState(null);
const [path, setPath] = React.useState([]);
  
const handleCopy = async () => {
  KuvatService.haeKuvanPolku(id)
    
    .then(data =>  {
      
      console.log(data.path);
      setPath(data.path);
        console.log(path)
        
    })
    
    
    try {
      await navigator.clipboard.writeText(path);
      alert("kopioitu leikepöydälle");
      console.log('kopioitu navigator.clipboard:', path);
    } catch (err) {
      console.error('leikepöydälle kopiointi epäonnistui navigator.clipboard:', err);
    }
  };
  return (
    <button onClick={handleCopy}>Copy Image URL</button>
  );
};

export default KopioPolkuna;