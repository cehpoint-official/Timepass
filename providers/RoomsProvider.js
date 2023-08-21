import { useAuthContext } from "./AuthProvider";
import { createContext, useContext, useEffect, useState } from "react";
import { firebase } from "@react-native-firebase/firestore";

const RoomsContext = createContext();

export const RoomsProvider = ({ children }) => {
  const { user } = useAuthContext();
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    let unsubscribe;
    if (user.auth.uid === undefined || user.auth.uid === null) return;
    unsubscribe = firebase
      .firestore()
      .collection("rooms")
      .onSnapshot((snapshot) => {
        let rooms = [];
        snapshot.forEach((doc) => {
          rooms.push({ ...doc.data(), id: doc.id });
        });
        setRooms(rooms);
      });
    return () => (unsubscribe !== null ? unsubscribe() : null);
  }, [user]);
  return (
    <RoomsContext.Provider
      value={{
        rooms,
      }}
    >
      {children}
    </RoomsContext.Provider>
  );
};

export const useRoomsContext = () => useContext(RoomsContext);