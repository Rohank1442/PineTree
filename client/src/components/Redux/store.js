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

export const { setEmails } = emailSlice.actions;

export default configureStore({
    reducer: {
        email: emailSlice.reducer
    }
});
