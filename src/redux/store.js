import { configureStore } from '@reduxjs/toolkit';
import notesSettingsReducer from './notesSettings.js';
import { saveLocalStorage } from '../utils/localstorage.js';

const store = configureStore({
    reducer: {
        notesSettings: notesSettingsReducer
    }
});

store.subscribe(() => {
    saveLocalStorage(store.getState().notesSettings.notes);
});

export default store;
