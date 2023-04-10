import { createSlice } from '@reduxjs/toolkit';
import { getLocalStorage } from '../utils/localstorage';
import { v4 as uniqueID } from 'uuid';

function makeComment(text) {
    return {
        id: uniqueID(),
        text,
        time: Date.now() 
    }
}

export const notesSettingsSlice = createSlice({
    name: 'notesSettings',
    initialState: {
        isActive: false,
        entities: getLocalStorage()
    },
    reducers: {
        toggleNoteMode: (state) => {
            const { isActive } = state;

            state.isActive = ! isActive;
        },

        addNote: (state, action) => {
            const { payload } = action;

            state.entities.push({
                id: uniqueID(),
                coords: payload.coords,
                targetSelector: payload.targetSelector,
                comments: [ makeComment(payload.text) ]
            });
        },

        deleteNote: (state, action) => {
            const { entities } = state;
            const { payload } = action;

            state.entities = entities.filter(note => note.id !== payload);
        },

        addComment: (state, action) => {
            const { payload } = action;
            const selectedNote = state.entities.find(note => note.id === payload.id);

            selectedNote.comments.push( makeComment(payload.text) );
        },

        updateComment: (state, action) => {
            const { payload } = action;
            const { entities } = state;

            for (const note of entities) {
                const selectedComment = note.comments.find(comment => comment.id === payload.id);

                if(selectedComment) {
                    selectedComment.text = payload.text;
                    break;
                }
            }
        }
    }
});

export const { toggleNoteMode, addNote, deleteNote, addComment, updateComment } = notesSettingsSlice.actions;

export const selectNotes = (state) => state.notesSettings.entities;
export const selectIsNotMode = (state) => state.notesSettings.isActive;

export default notesSettingsSlice.reducer;