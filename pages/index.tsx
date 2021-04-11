import { Box } from "grommet";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { FeedItem } from "../components/FeedItem";
import { Layout } from "../components/Layout";
import { Sidebar } from "../components/Sidebar";
import { useAppContext } from "../context/AppContext";

import prisma from "../lib/prisma";
import { Post } from "../models/Post";

export const getStaticProps = async () => {
  const posts = await prisma.post.findMany({
    include: {
      author: { select: { name: true, username: true, image: true } },
      _count: { select: { likes: true } },
    },
    orderBy: { createdAt: "desc" },
  });
  return { props: { posts } };
};

type Props = {
  posts: Post[];
};

const Home: React.FC<Props> = ({ posts }) => {
  const { initializeFeed, feed } = useAppContext();

  useEffect(() => {
    initializeFeed(posts);
  }, [feed]);

  return (
    <Layout>
      <Head>
        <title>Awsem Content</title>
      </Head>

      <Box gap="medium" direction="row">
        <Box flex>
          <Sidebar />
        </Box>
        <Box width="580px" gap="medium">
          {feed && feed.map((post) => <FeedItem post={post} />)}
        </Box>
      </Box>
    </Layout>
  );
};

export default Home;
