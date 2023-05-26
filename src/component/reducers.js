export const setCurrentAddress = (address) => ({
  type: 'SET_CURRENT_ADDRESS',
  payload: address,
});

const initialState = {
  currentAddress: null,
};

export const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_ADDRESS':
      return {
        ...state,
        currentAddress: action.payload,
      };
    default:
      return state;
  }
};