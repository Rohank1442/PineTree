// import { createSlice } from "@reduxjs/toolkit";

// export const questionReducer = createSlice({
//     name: 'questions',
//     initialState: {
//         queue: [],
//         answers: [],
//         trace: 0
//     },
//     reducers: {
//         startExamAction: (state, action) => {
//             let { question } = action.payload
//             return {
//                 ...state,
//                 queue: question
//             }
//         }
//     }
// })

// export const { startExamAction } = questionReducer.actions;
// export default questionReducer.reducer;