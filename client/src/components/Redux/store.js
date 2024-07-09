import { configureStore, createSlice } from '@reduxjs/toolkit';
import { saveState, loadState } from './localStorage'

const resultReducerSlice = createSlice({
  name: 'result',
  initialState: {
    userEmail: null,
    result: []
  },
  reducers: {
    setUserEmail: (state, action) => {
      state.userEmail = action.payload;
    },
    pushResultAction: (state, action) => {
      state.result.push(action.payload);
    },
    resetResultAction: () => {
      return {
        userEmail: null,
        result: []
      };
    }
  }
});

const questionReducerSlice = createSlice({
  name: 'questions',
  initialState: {
    queue: [],
    answers: [],
    trace: 0
  },
  reducers: {
    startExamAction: (state, action) => {
      let { question, answers } = action.payload;
      return {
        ...state,
        queue: question,
        answers
      };
    },
    moveNextAction: (state) => {
      return {
        ...state,
        trace: state.trace + 1
      };
    },
    resetAllAction: () => {
      return {
        queue: [],
        answers: [],
        trace: 0
      };
    }
  }
});

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
});

export const { setEmails } = emailSlice.actions;
export const { setTopicNames } = topicNameSlice.actions;
export const { setsubtopicNames } = subtopicNameSlice.actions;
export const { setSubtopicId } = subtopicIdSlice.actions;
export const { startExamAction, moveNextAction, resetAllAction } = questionReducerSlice.actions;
export const { setUserEmail, pushResultAction, resetResultAction } = resultReducerSlice.actions;

const persistedState = loadState();

const store = configureStore({
  reducer: {
    email: emailSlice.reducer,
    topicName: topicNameSlice.reducer,
    subtopicName: subtopicNameSlice.reducer,
    subtopicId: subtopicIdSlice.reducer,
    questions: questionReducerSlice.reducer,
    result: resultReducerSlice.reducer
  },
  preloadedState: persistedState
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
