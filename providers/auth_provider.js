import { createContext, useContext } from 'react';
import { auth } from '../firebase';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        const unsub = auth().onAuthStateChanged(onAuthStateChanged);
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
