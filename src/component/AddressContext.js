import React, { createContext, useState } from 'react';

export const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [currentAddress, setCurrentAddress] = useState(null);
  const [currentLatitude, setCurrentLatitude] = useState(null);
  const [currentLongitude, setCurrentLongitude] = useState(null);

  const setAddress = (address) => {
    setCurrentAddress(address);
  };

  const setCoordinates = (latitude, longitude) => {
    setCurrentLatitude(latitude);
    setCurrentLongitude(longitude);
  };

  const addressContextValue = {
    currentAddress,
    currentLatitude,
    currentLongitude,
    setAddress,
    setCoordinates
  };

  return (
    <AddressContext.Provider value={addressContextValue}>
      {children}
    </AddressContext.Provider>
  );
};