import React, { createContext, useState } from 'react';

export const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [currentAddress, setCurrentAddress] = useState(null);
  const [currentLatitude, setCurrentLatitude] = useState(null);
  const [currentLongitude, setCurrentLongitude] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUserRole, setCurrentUserRole] = useState(null);


  const setAddress = (address) => {
    setCurrentAddress(address);
  };

  const setCoordinates = (latitude, longitude) => {
    setCurrentLatitude(latitude);
    setCurrentLongitude(longitude);
  };

  const setUserId = (userId) => {
    setCurrentUserId(userId);
  };
  const setUserRole= (userRole) => {
    setCurrentUserRole(userRole);
  };

  const addressContextValue = {
    currentAddress,
    currentLatitude,
    currentLongitude,
    currentUserId,
    currentUserRole,
    setAddress,
    setCoordinates,
    setUserId,
    setUserRole
  };

  return (
    <AddressContext.Provider value={addressContextValue}>
      {children}
    </AddressContext.Provider>
  );
};