import React from 'react';
import { useSettings } from '../contexts/SettingsProvider';
import { v4 as uuidv4 } from 'uuid';
import { useImmerReducer } from 'use-immer';
import produce from 'immer';


export const useNote = () => {
    const { url } = useSettings();
    const [notes, dispatch] = useImmerReducer(notesReducer, {});

    function notesReducer(notes, action) {
        const { payload, type } = action;

        switch (type) {
            case 'note_added':
                return {
                    ...notes,
                    [url]: [
                        ...notes[url] || [],
                        {
                            id: uuidv4(),
                            coords: payload.coords,
                            comments: [
                                {
                                    id: `${ uuidv4() }C`,
                                    text: payload.text,
                                    time: Date.now()
                                }
                            ]
                        }
                    ]
                };

            case 'comment_added':
                return produce(notes, draftNotes => {
                    const selectedNote = draftNotes[url].find(note => note.id === payload.id);

                    selectedNote.comments.push(
                        {
                            id: `${ uuidv4() }C`,
                            text: payload.text,
                            time: Date.now()
                        }
                    )
                });

            case 'comment_updated':
                return produce(notes, draftNotes => {
                    const selectedNote = draftNotes[url].find(note => note.id === payload.noteId);
                    const selectedComment = selectedNote.comments(comment => comment.id === payload.commentId);

                    selectedComment.text = payload.text;
                });

            case 'comment_deleted':
                return produce(notes, draftNotes => {
                    const selectedNote = draftNotes[url].find(note => note.id === payload.noteId);

                    selectedNote.comments.filter(comment => comment.id !== payload.commentId);
                });
    
            default: {
                throw Error('Unknown action: ' + type);
            }
        }
    }

    return {
        notes,
        dispatch
    };
};

