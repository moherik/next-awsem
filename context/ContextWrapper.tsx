import { AppContextProvider } from "./AppContext";
import { ModalContextProvider } from "./ModalContext";

export const ContextWrapper: React.FC<{}> = ({ children }) => {
  return (
    <AppContextProvider>
      <ModalContextProvider>{children}</ModalContextProvider>
    </AppContextProvider>
  );
};
