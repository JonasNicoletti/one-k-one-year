import React, { createContext, ReactNode, useContext } from "react";
import { useState } from "react";
import { useAsync } from "react-async";
import {
  getActivities,
  getStartingDate,
  storeStartingDate,
  getMockedActivities,
} from "../utils/AuthClient";
import { Activity, StravaUser } from "../utils/models";
import { useAuth } from "./AuthProvider";

type UserContextProps = {
  user: StravaUser | undefined;
  activities: Activity[] | undefined;
  mockedActivities: Activity[] | undefined;
  startingDate: Date;
  saveStartingDate: Function;
};

const UserContext = createContext<UserContextProps>({
  startingDate: new Date(),
  user: undefined,
  activities: [],
  mockedActivities: [],
  saveStartingDate: () => {},
});

type UserProviderProps = {
  children: ReactNode;
};

function UserProvider(props: UserProviderProps) {
  const { user } = useAuth();
  const { data: activities } = useAsync({ promiseFn: getActivities });
  const mockedData = getMockedActivities();
  const [startingDate, setStartingDate] = useState(getStartingDate());

  const saveStartingDate = (d: Date, isDemo: boolean) => {
    setStartingDate(d);
    if (isDemo) return;
    storeStartingDate(d);
  };

  return (
    <UserContext.Provider
      value={{
        user: user,
        activities: activities,
        mockedActivities: mockedData,
        startingDate: startingDate,
        saveStartingDate: (d: Date, isDemo: boolean) => saveStartingDate(d, isDemo),
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
