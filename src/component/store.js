import { createStore } from 'react-redux';
import { addressReducer } from './reducers';

const store = createStore(addressReducer);

export default store;