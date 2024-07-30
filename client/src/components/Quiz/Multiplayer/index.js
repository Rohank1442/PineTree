import React from 'react'
import JoinPage from './JoinPage';
import QuizPage from './QuizPage';
import { Route, Routes } from 'react-router-dom';
import Provider from './Provider';
import ConnectionContext from '../../Context/ConnectionContext';

const index = () => {
    return (
        <ConnectionContext>
            <Provider>
                <Routes>
                    <Route path='join' element={<JoinPage />} />
                    <Route path='quiz' element={<QuizPage />} />
                </Routes>
            </Provider>
        </ConnectionContext>
    )
}

export default index;