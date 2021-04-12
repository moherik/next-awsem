import { createContext, useContext, useState } from "react";
import { Post } from "../pages";

interface ContextValue {
  feed: Post[];
  initializeFeed: (feed: Post[]) => void;
  addToFeed: (post: Post) => void;
}

const AppContext = createContext<ContextValue>(null);

export const AppContextProvider: React.FC<{}> = ({ children }) => {
  const [feed, setFeed] = useState<Post[]>();
  const initializeFeed = (feed: Post[]) => setFeed(feed);
  const addToFeed = (post: Post) => {
    feed.unshift(post);
  };

  const value: ContextValue = {
    feed,
    initializeFeed,
    addToFeed,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
