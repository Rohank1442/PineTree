import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem('user'));
        setUser(savedUser);
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// import React, { createContext, useContext, useState } from 'react';

// const UserContext = createContext();

// export const useUser = () => {
//     return useContext(UserContext);
// };

// export const UserProvider = ({ children }) => {
//     const [user, setUser] = useState(null);

//     return (
//         <UserContext.Provider value={{ user, setUser }}>
//             {children}
//         </UserContext.Provider>
//     );
// };