import { createContext, useContext } from 'react';
import { useState,useEffect } from "react";
import auth from '@react-native-firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        const unsub = auth().onAuthStateChanged((user) => {
          if (user){
            console.log("User logged in");
            //setUser({uid: user.uid});
            } else{
              console.log('No one is signed in');
            };
        });
        return unsub;
    }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
