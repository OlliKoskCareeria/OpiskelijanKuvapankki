import React from "react";
import axios from "axios";

const baseUrl = "https://localhost:7079/api/Kuvat"

const LatausButton = ({id}) => {
    const handleLataus = async () => {
        try{
            const response = await axios.get(`https://localhost:7079/api/Kuvat/lataa/${id}` , {
                responseType: "blob",//kerrotaan että käsitellään binääritiedostoa
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "image.jpg"); //määritetään tiedoston nimi ja tyyppi
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            
            console.error("kuvaa ladattaessa tapahtui virhe", error);
        }
    };

    return <button onClick={handleLataus}>Lataa kuva</button>;
};

export default LatausButton;