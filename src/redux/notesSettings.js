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
        isNoteMode: false,
        notes: getLocalStorage()
    },
    reducers: {
        toggleNoteMode: (state) => {
            const { isNoteMode } = state;

            state.isNoteMode = ! isNoteMode;
        },

        addNote: (state, action) => {
            const { payload } = action;

            state.notes.push({
                id: uniqueID(),
                coords: payload.coords,
                targetSelector: payload.targetSelector,
                comments: [ makeComment(payload.text) ]
            });
        },

        deleteNote: (state, action) => {
            const { notes } = state;
            const { payload } = action;

            state.notes = notes.filter(note => note.id !== payload);
        },

        addComment: (state, action) => {
            const { payload } = action;
            const selectedNote = state.notes.find(note => note.id === payload.id);

            selectedNote.comments.push( makeComment(payload.text) );
        },

        updateComment: (state, action) => {
            const { payload } = action;
            const { notes } = state;

            for (const note of notes) {
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

export const selectNotes = (state) => state.notesSettings.notes;
export const selectIsNotMode = (state) => state.notesSettings.isNoteMode;

export default notesSettingsSlice.reducer;