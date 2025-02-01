import './App.css'
import React, {useState, useEffect} from 'react'
import OmatKuvat from './OmatKuvat'
import OmatTiedot from './OmatTiedot'

const OmaSivu = ({setViesti,setShowViesti,loggedAdmin,loggedInUser}) => {


    const [showOmatKuvat, setShowOmatKuvat] = React.useState(false);
    const [showOmatTiedot, setShowOmatTiedot] = React.useState(false);

    return (
        <>
            {!showOmatKuvat && <OmatTiedot showOmatTiedot={showOmatTiedot} setShowOmatTiedot={setShowOmatTiedot} setViesti={setViesti} setShowViesti={setShowViesti} loggedInUser={loggedInUser} loggedAdmin={loggedAdmin}/>}
            
            <OmatKuvat showOmatKuvat={showOmatKuvat} setShowOmatKuvat={setShowOmatKuvat} setViesti={setViesti} setShowViesti={setShowViesti} loggedInUser={loggedInUser} loggedAdmin={loggedAdmin}/>
        </>
    )
}
export default OmaSivu