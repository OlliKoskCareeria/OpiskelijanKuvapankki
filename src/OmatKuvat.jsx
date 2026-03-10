import './App.css'
import React, { useState, useEffect } from 'react'
import KuvatService from './services/Kuvat'
import LatausButton from './KuvanLataus'
import UusiKuva from './KuvatLisays'
import KuvaModaali from './KuvaModaali'

//tällä sivulla näytetään kuvat kirjautuneen käyttäjän perusteella

const OmatKuvat = ({
  showOmatKuvat,
  setShowOmatKuvat,
  setViesti,
  setShowViesti,
  loggedInUser
}) => {
  const [reloadOmatKuvat, setReloadOmatKuvat] = useState(false)
  const [omatkuvat, setOmatkuvat] = useState([])
  const [lisäystila, setLisäystila] = useState(false)

  // Sivutus
  const [currentPage, setCurrentPage] = useState(1)
  const imagesPerPage = 9

  const token = localStorage.getItem('token')
  KuvatService.setToken(token)

  const [modalData, setModalData] = useState({
    show: false,
    id: null
  })

  const suljeModaali = () => setModalData({ show: false, id: null })
  const naytaModaali = (id) => setModalData({ show: true, id })

  const PoistaKuva = (kuva) => {
    let vastaus = window.confirm(`poista kuva ${kuva.kuvaNimi}`)

    if (vastaus) {
      KuvatService.poista(kuva.kuvaId)
        .then(res => {
          if (res.status === 200) {
            setViesti(`Poistettu ${kuva.kuvaNimi}`)
            setShowViesti(true)
            window.scrollBy(0, -10000) //Siirtyy ylös näyttää viestin

            setTimeout(() => setShowViesti(false), 5000)
            setReloadOmatKuvat(prev => !prev)
          }
        })
        .catch(error => {
          setViesti(
            error.code === 'ERR_BAD_RESPONSE'
              ? 'Kuvan poisto ei onnistunut'
              : error.message
          )
          setShowViesti(true)
          window.scrollBy(0, -10000)   //Siirtyy ylös näyttää viestin 
          setTimeout(() => setShowViesti(false), 6000)
        })
    } else {
      setViesti('Poisto peruttu onnistuneesti.')
      setShowViesti(true)
      window.scrollBy(0, -10000) //Siirtyy ylös näyttää viestin
      setTimeout(() => setShowViesti(false), 5000)
    }
  }

  useEffect(() => {
    KuvatService.haeKayttajanPerusteella(loggedInUser)
      .then(data => {
        setOmatkuvat(data)
        setCurrentPage(1) // resetoi sivutuksen
      })
  }, [reloadOmatKuvat, loggedInUser])

  // Lasketaan sivujen määrä
  const indexOfLastImage = currentPage * imagesPerPage
  const indexOfFirstImage = indexOfLastImage - imagesPerPage
  const currentImages = omatkuvat.slice(indexOfFirstImage, indexOfLastImage)
  const totalPages = Math.ceil(omatkuvat.length / imagesPerPage)

  return (
    <div className='omatkuvatdiv'>
      <h4 onClick={() => setShowOmatKuvat(!showOmatKuvat)}>
        Omat kuvat
      </h4>

      {modalData.show && (
        <KuvaModaali
          show={modalData.show}
          onClose={suljeModaali}
          id={modalData.id}
          content={null}
        />
      )}

      {showOmatKuvat && !lisäystila && (
        <button
          className="btn btn-secondary"
          onClick={() => setLisäystila(true)}
        >
          Lisää Uusi Kuva
        </button>
      )}

      {lisäystila && (
        <UusiKuva
          setLisäystila={setLisäystila}
          setReloadOmatKuvat={setReloadOmatKuvat}
          reloadOmatKuvat={reloadOmatKuvat}
          setViesti={setViesti}
          setShowViesti={setShowViesti}
          loggedInUser={loggedInUser}
        />
      )}

      {showOmatKuvat && (
        <>
          <div
            className="omatKuvatDetails"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              justifyContent: "center"
            }}
          >
            {currentImages.map(kuva => (//kuvatlista käydään läpi mapin avulla oliot näytetään image-card tyylisessä wrapperissä 64 stringi renderöidään suoraan
              <div className='image-card' key={kuva.kuvaId}>
                <img
                  src={`data:kuva/jpeg;base64,${kuva.kuvaData}`}
                  alt="Kuvaa ei ollut"
                />

                <div className='image-info'>
                  <p>{kuva.kuvaNimi}</p>
                  <p>{kuva.kuvaaja}</p>
                  <p>{kuva.yhteystieto}</p>
                  <LatausButton id={kuva.kuvaId} />
                  <button
                    className="btn btn-secondary"
                    onClick={() => PoistaKuva(kuva)}
                  >
                    Poista Kuva
                  </button>
                  <p />
                  <button
                    className='btn btn-secondary'
                    onClick={() => naytaModaali(kuva.kuvaId)}
                  >
                    Suurenna
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Sivutus painikkeet*/}
          {totalPages > 1 && (
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <button
                className="btn btn-secondary"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
              >
                Edellinen
              </button>

              <span style={{ margin: "0 10px" }}>
                Sivu {currentPage} / {totalPages}
              </span>

              <button
                className="btn btn-secondary"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
              >
                Seuraava
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default OmatKuvat
