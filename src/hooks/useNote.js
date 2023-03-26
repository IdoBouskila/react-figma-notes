import React, { useReducer } from 'react';
import { v4 as uniqueID } from 'uuid';

export const useNote = () => {
    const [notes, dispatch] = useReducer(notesReducer, []);
    
    function notesReducer(notes, action) {
        const { payload, type } = action;

        switch (type) {
            case 'note_added':
                return [
                    ...notes,
                        {
                            id: uniqueID(),
                            coords: payload.coords,
                            target_selector: payload.target_selector,
                            comments: [
                                {
                                    id: `${ uniqueID() }C`,
                                    text: payload.text,
                                    time: Date.now()
                                }
                            ]
                        }
                    ];

            case 'comment_added':
                return notes.map((note) => {
                    if(note.id === payload.id) {
                        return {
                            ...note,
                            comments: [
                                ...note.comments,
                                {
                                    id: `${ uniqueID() }C`,
                                    text: payload.text,
                                    time: Date.now()
                                }

                            ]
                        }
                    }

                    return note;
                });

            case 'comment_updated':
                return notes.map((note) => {
                    const { comments } = note;
                    const commentFound = comments.find((comment) => comment.id === payload.id);

                    if(commentFound) {
                        return {
                            ...note,
                            commments: comments.map((comment) => {
                                if(comment.id === payload.id) {
                                    return comment.text = payload.text
                                }

                                return comment;
                            })
                        }    
                    }

                    return note;

                })

            case 'note_deleted':
                return notes.filter((note) => note.id !== payload.id);

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

