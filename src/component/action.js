//action.js
export const setCurrentAddress = (address) => ({
    type: 'SET_CURRENT_ADDRESS',
    payload: address,
  });
export const setCurrentlatitude = (latitude) => ({
    type: 'SET_CURRENT_Latitude',
    payload: latitude,
  });
export const setCurrentlongitude = (longitude) => ({
    type: 'SET_CURRENT_Longitude',
    payload: longitude,
  });