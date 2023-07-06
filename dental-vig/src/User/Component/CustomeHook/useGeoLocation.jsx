import React, { useContext, useEffect, useState } from 'react'
import { UserValAuthContext } from '../Context/UserValContext';

const useGeoLocation = (setLocationState) => {
  const val = useContext(UserValAuthContext);
  const [location, setLocation] = useState({
    loaded: false,
    cordinates: { lat: "", lng: "" },
  });

  const onSuccess = (location) => {
    setLocation({
      loaded: true,
      cordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      error,
    });
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
           
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
            setLocationState(result.state);

          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
            setLocationState(result.state);
          } else if (result.state === "denied") {
            setLocationState(result.state);
           
          }
          result.onchange = function () {
            console.log(result.state);
            if (result.state === "granted") {
              console.log(result.state);
             
              navigator.geolocation.getCurrentPosition(onSuccess, onError);
              setLocationState(result.state);

            } else if (result.state === "prompt") {
              navigator.geolocation.getCurrentPosition(onSuccess, onError);
              setLocationState(result.state);
            } else if (result.state === "denied") {
              setLocationState(result.state);
              navigator.geolocation.getCurrentPosition(onSuccess, onError);
           
            }
          };
        });
    } else {
      alert("Sorry Not available!");
    }
  
  }, []);

  return location;
}

export default useGeoLocation