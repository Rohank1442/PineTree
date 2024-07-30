import React, { createContext, useEffect, useRef, useState } from 'react'
import Loader from '../../Loader';
import socket from '../../Api/socket';

export const SocketContext = createContext();

const ConnectionContext = ({children}) => {
    const socketInstance = useRef(socket);
    const [connecting, setConnecting] = useState(true);

    useEffect(() => {
        const retryInterval = setInterval(() => {
            if (socketInstance.current?.connected) {
                setConnecting(false);
                clearInterval(retryInterval);
            }
            console.log("connecting...");
        }, 1000);

        return () => {
            clearInterval(retryInterval);
        }
    }, []);

    return (
        <SocketContext.Provider value={{
            socketInstance
        }}>
            {
                connecting
                ?
                <Loader />
                :
                children
            }
        </SocketContext.Provider>
    )
}

export default ConnectionContext