import { configureStore, createSlice } from '@reduxjs/toolkit';

const emailSlice = createSlice({
    name: 'email',
    initialState: '',
    reducers: {
        setEmails: (state, action) => {
            return action.payload;
        }
    }
});

const topicNameSlice = createSlice({
    name: 'topicName',
    initialState: '',
    reducers: {
        setTopicNames: (state, action) => {
            return action.payload;
        }
    }
});

const subtopicNameSlice = createSlice({
    name: 'subtopicName',
    initialState: '',
    reducers: {
        setsubtopicNames: (state, action) => {
            return action.payload;
        }
    }
})

export const { setEmails } = emailSlice.actions;
export const { setTopicNames } = topicNameSlice.actions;
export const { setsubtopicNames } = subtopicNameSlice.actions;

export default configureStore({
    reducer: {
        email: emailSlice.reducer,
        topicName: topicNameSlice.reducer
    }
});
