import { createSlice } from '@reduxjs/toolkit';
import { getLocalStorage } from '../helper';
import { v4 } from 'uuid';

function constructComment(text) {
    return {
        id: v4(),
        text: text,
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
                id: v4(),
                coords: payload.coords,
                targetSelector: payload.targetSelector,
                comments: [ constructComment(payload.text) ]
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

            selectedNote.comments.push( constructComment(payload.text) );
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