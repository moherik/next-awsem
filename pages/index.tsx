import { Box } from "grommet";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/client";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { FeedItem } from "../components/FeedItem";
import { Layout } from "../components/Layout";
import { Sidebar } from "../components/Sidebar";
import { useAppContext } from "../context/AppContext";

import prisma from "../lib/prisma";

export type Post = {
  id: number;
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
  author: {
    id: number;
    name: string;
    username: string;
    email: string;
    image: string;
  } | null;
  createdAt: Date;
  likes: [];
  _count: {
    likes: number;
  };
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          id: true,
          name: true,
          username: true,
          email: true,
          image: true,
          following: true,
        },
      },
      likes: {
        where: { user: { email: session?.user.email } },
      },
      _count: { select: { likes: true } },
    },
    orderBy: { createdAt: "desc" },
  });
  console.log(posts);
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
        <Box width="640px" gap="medium">
          {feed && feed.map((post) => <FeedItem post={post} />)}
        </Box>
      </Box>
    </Layout>
  );
};

export default Home;
