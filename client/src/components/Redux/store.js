import { configureStore, createSlice, combineReducers } from '@reduxjs/toolkit';
// import questionReducer from './question_reducer';
// import resultReducer from './result_reducer';

// const rootReducer = combineReducers({
//     questions: questionReducer,
//     result: resultReducer
// })

const questionReducerSlice = createSlice({
    name: 'questions',
    initialState: {
        queue: [],
        answers: [],
        trace: 2
    },
    reducers: {
        startExamAction: (state, action) => {
            // let { question } = action.payload
            return {
                ...state,
                queue: action.payload.question
            }
        }
    }
})

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
});

const subtopicIdSlice = createSlice({
    name: 'subtopicId',
    initialState: '',
    reducers: {
        setSubtopicId: (state, action) => {
            return action.payload;
        }
    }
})

export const { setEmails } = emailSlice.actions;
export const { setTopicNames } = topicNameSlice.actions;
export const { setsubtopicNames } = subtopicNameSlice.actions;
export const { setSubtopicId } = subtopicIdSlice.actions;
export const { startExamAction } = questionReducerSlice.actions;

export default configureStore({
    reducer: {
        email: emailSlice.reducer,
        topicName: topicNameSlice.reducer,
        subtopicName: subtopicNameSlice.reducer,
        subtopicId: subtopicIdSlice.reducer,
        questions: questionReducerSlice.reducer
    }
});