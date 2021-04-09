import React, { createContext, useContext, useState } from "react";
import { Post } from "../models/Post";

type PostContextState = {
  feed: Post[];
  initializeFeed: (feed: Post[]) => void;
  addToFeed: (post: Post) => void;
  open: boolean;
  openDialog: () => void;
  closeDialog: () => void;
};

const intialState: PostContextState = {
  feed: [],
  initializeFeed: () => {},
  addToFeed: () => {},
  open: false,
  openDialog: () => {},
  closeDialog: () => {},
};

const PostContext = createContext(intialState);

export const PostContextProvider: React.FC<{}> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [feed, setFeed] = useState<Post[]>();

  const openDialog = () => setOpen(true);

  const closeDialog = () => setOpen(false);

  const initializeFeed = (feed: Post[]) => setFeed(feed);

  const addToFeed = (post: Post) => {
    feed.unshift(post);
  };

  return (
    <PostContext.Provider
      value={{ open, feed, initializeFeed, addToFeed, openDialog, closeDialog }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => useContext(PostContext);
