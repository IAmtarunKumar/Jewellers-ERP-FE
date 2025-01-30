import { createContext, useContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [privileges, setPrivileges] = useState({
    admin: false,
    read: false,
    edit: false,
    create: false,
    delete: false,
    print: false,
  });

  useEffect(() => {
    if (localStorage.getItem("userDetail")) {
      const decodedUser = jwtDecode(
        localStorage.getItem("userDetail")
      ).foundUser;
      // console.log(decodedUser);
      setUser(decodedUser);
      setIsAdmin(decodedUser?.privileges?.[0]);

      if (decodedUser?.privileges) {
        setPrivileges({
          admin: decodedUser.privileges[0],
          read: decodedUser.privileges[1],
          edit: decodedUser.privileges[2],
          create: decodedUser.privileges[3],
          delete: decodedUser.privileges[4],
          print: decodedUser.privileges[5],
        });
      }
    }
  }, []);

  const value = {
    user,
    isAdmin,
    ...privileges,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
