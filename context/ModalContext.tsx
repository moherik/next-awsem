import React, { createContext, useContext, useState } from "react";

interface ContextValue {
  isSideOpen: boolean;
  sideChild: {
    title: string;
    body: React.ReactNode;
  };
  handleSideModal: ({}: HandleSideParams) => void;
  isDialogOpen: boolean;
  dialogChild: DialogChildContent;
  handleDialogModal: ({}: HandleDialogParams) => void;
}

interface HandleSideParams {
  method: "open" | "close";
  child?: {
    title: string;
    body: React.ReactNode;
  };
}

interface HandleDialogParams {
  method: "open" | "close";
  child?: DialogChildContent;
}

export interface DialogChildContent {
  title: string;
  body: string;
  button?: React.ReactNode;
}

const ModalContext = createContext<ContextValue>(null);

export const ModalContextProvider: React.FC<{}> = ({ children }) => {
  const [isSideOpen, setIsSideOpen] = useState(false);
  const [sideChild, setSideChild] = useState<{
    title: string;
    body: React.ReactNode;
  }>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogChild, setDialogChild] = useState<DialogChildContent>();

  const handleSideModal = ({ method, child }: HandleSideParams) => {
    switch (method) {
      case "open":
        setSideChild(child);
        setIsSideOpen(true);
        break;

      case "close":
        setSideChild(null);
        setIsSideOpen(false);
        break;
    }
  };

  const handleDialogModal = ({ method, child }: HandleDialogParams) => {
    switch (method) {
      case "open":
        setDialogChild(child);
        setIsDialogOpen(true);
        break;

      case "close":
        setDialogChild(null);
        setIsDialogOpen(false);
        break;
    }
  };

  return (
    <ModalContext.Provider
      value={{
        isSideOpen,
        sideChild,
        handleSideModal,
        isDialogOpen,
        dialogChild,
        handleDialogModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
