import React, { createContext, ReactNode, useContext } from "react";
import { useState } from "react";
import {
  getActivities,
  getStartingDate,
  storeStartingDate,
  getMockedActivities,
} from "../utils/AuthClient";
import { StravaUser } from "../utils/models";
import { useAuth } from "./AuthProvider";

type UserContextProps = {
  user: StravaUser | undefined;
  fetchActivities: Function;
  startingDate: Date;
  saveStartingDate: Function;
};

const UserContext = createContext<UserContextProps>({
  startingDate: new Date(),
  user: undefined,
  fetchActivities: () => Promise.resolve([]),
  saveStartingDate: () => {},
});

type UserProviderProps = {
  children: ReactNode;
};

function UserProvider(props: UserProviderProps) {
  const { user } = useAuth();

  const fetchActivities = (isDemo: boolean) => isDemo ? getMockedActivities() : getActivities();
  const [startingDate, setStartingDate] = useState(getStartingDate());

  const saveStartingDate = (d: Date, isDemo: boolean) => {
    if (!isDemo) {
      storeStartingDate(d);
    }
    setStartingDate(d);
  };

  return (
    <UserContext.Provider
      value={{
        user: user,
        fetchActivities: fetchActivities,
        startingDate: startingDate,
        saveStartingDate: (d: Date, isDemo: boolean) =>
          saveStartingDate(d, isDemo),
      }}
      {...props}
    />
  );
}

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserProvider`);
  }
  return context;
}

export { UserProvider, useUser };
