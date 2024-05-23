import { useEffect, useState } from 'react';
import data from '../components/Quiz/Database/data';
import { useDispatch } from 'react-redux';
import * as Action from '../components/Redux/store';

export const useFetchQuestion = () => {
    const dispatch = useDispatch();
    const [getData, setGetData] = useState({ isLoading: false, apiData: [], serverError: null })

    useEffect(() => {
        setGetData(prev => ({ ...prev, isLoading: true }));

        (async () => {
            try {
                let question = await data;
                console.log(question)
                if (question.length > 0) {
                    setGetData(prev => ({ ...prev, isLoading: false }));
                    setGetData(prev => ({ ...prev, apiData: question }));
                    dispatch(Action.startExamAction({ question }));
                } else {
                    throw new Error("No Question Available")
                }
            } catch (error) {
                setGetData(prev => ({ ...prev, isLoading: false }));
                setGetData(prev => ({ ...prev, serverError: false }));
            }
        })();
    }, [dispatch])

    return [getData, setGetData];
}