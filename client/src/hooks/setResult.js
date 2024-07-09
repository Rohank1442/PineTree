import { useEffect } from 'react'
import * as Action from '../components/Redux/store'
import { postServerData } from '../helper'

export const pushAnswer = (result) => async (dispatch) => {
    try {
        await dispatch(Action.pushResultAction(result))
    } catch (error) {
        console.log(error)
    }
}

export const usePublishResult = (resultData) => {
    console.log(resultData)
    const { result, username } = resultData;
    (async () => {
        // try {
        //     if (result !== [] && !username) throw new Error("Couldn't get Result");
        //     await postServerData(`${process.env.REACT_APP_SERVER_NAME}api/result`, resultData, data => data);
        // } catch (error) {
        //     console.log(error)
        // }
    })();
}