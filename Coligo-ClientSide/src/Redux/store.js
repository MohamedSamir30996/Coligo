import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userReducer';

const initialState = {
    name: null,
    id: null,
};

const store = configureStore({
    reducer: userReducer,
    preloadedState: initialState,
});

export default store;