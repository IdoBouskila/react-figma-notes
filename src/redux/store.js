import { configureStore } from '@reduxjs/toolkit';
import notesSettingsReducer from './notesSettings.js';

export default configureStore({
    reducer: {
        notesSettings: notesSettingsReducer
    }
});
