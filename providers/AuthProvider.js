import {createContext, useContext} from 'react';
import {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/firestore';
const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState({
    auth: null,
    profile: null
  });

  const refreshUserProfile = async (uid) => {
    await firebase.firestore().collection('users').doc(uid).get().then(data => {
      console.log('AAAAAAAAAAAAAAAAAAnik RENDI', uid , data.data());
      if (!data.data()) return;
      setUser(prev => ({ ...prev, profile: data.data() }));  
    });
  }

  useEffect(() => {
    const unsub = auth().onAuthStateChanged(async cUser => {
      if (cUser) {
        console.log('User logged in');
        setUser({ auth: cUser });
        await firebase.firestore().collection('users').doc(cUser.uid).get().then(data => {
          console.log('Anik RENDI', data.data());
          if (!data.data()) return;
          setUser(prev => ({ ...prev, profile: data.data() }));  
        });
        // await refreshUserProfile(user);
      } else {
        console.log('No one is signed in');
      }
    });
    return unsub;
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);