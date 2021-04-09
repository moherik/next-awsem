import { createContext, useContext } from "react";

const AppContext = createContext(null);

export const useAppContext = () => useContext(AppContext);
