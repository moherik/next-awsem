import React, { createContext, useContext, useState } from "react";
import { Post } from "../models/Post";

const PostContext = createContext(null);

export const PostContextProvider: React.FC<{}> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [feed, setFeed] = useState<Post[]>();

  const openDialog = () => setOpen(true);

  const closeDialog = () => setOpen(false);

  const initializeFeed = (feed: Post[]) => setFeed(feed);

  const addToFeed = (post: Post) => {
    feed.unshift(post);
  };

  const toggleLike = (postId: number) => {
    const selectFeed = feed.findIndex((x) => x.id == postId);
    const likes = feed[selectFeed]._count.likes;
    feed[selectFeed]._count.likes = (parseInt(likes) + 1).toString();
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
