
import './App.css';
import React, { useEffect, useState } from "react";
import Weather from './components/Weather'
import axios from 'axios'
import { Dimmer, Loader } from 'semantic-ui-react';

export default function App() {

  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    //fait cette methode pour juste rendre la recuperation de données async
    const fetchData = async () => {

      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      await axios.get(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
        .then(result => {
          setData(result.data)
          console.log(result.data);
        })
    }

    fetchData();

  }, [lat, long])

  return (
    <div className="App">
      {data.main ? (
        <Weather weatherData={data} />
      ) : (
        <div>
          <Dimmer active>
            <Loader>Loading..</Loader>
          </Dimmer>
        </div>
      )}

    </div>
  );
}
