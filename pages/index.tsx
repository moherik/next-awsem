import { Box, Text } from "grommet";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/client";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FeedItem } from "../components/FeedItem";
import { Layout } from "../components/Layout";
import { Sidebar } from "../components/Sidebar";
import { useAppContext } from "../context/AppContext";

import prisma from "../lib/prisma";

export type Post = {
  id: number;
  title: string;
  description: string;
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
  bookmarks: [];
  _count: {
    likes: number;
  };
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  const email = session?.user.email;

  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          id: true,
          name: true,
          username: true,
          email: true,
          image: true,
        },
      },
      likes: { where: { email } },
      bookmarks: { where: { email } },
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
  const router = useRouter();
  const { p: page } = router.query;

  useEffect(() => {
    initializeFeed(posts);
  }, [feed]);

  const explorePage = () => {
    return (
      <Box gap="large">
        {feed && feed.map((post) => <FeedItem post={post} />)}
      </Box>
    );
  };

  const checkPage = () => {
    let component: React.ReactNode;
    if (!page) return explorePage();
    switch (page) {
      case "explore":
        component = explorePage();
        break;
      case "follow":
        component = <Text>Follow</Text>;
        break;
      case "bookmarks":
        component = <Text>Bookmark</Text>;
        break;
    }

    return component;
  };

  return (
    <Layout>
      <Head>
        <title>Awsem Content</title>
      </Head>

      <Box gap="medium" direction="row">
        <Box flex alignSelf="start" style={{ position: "sticky", top: "85px" }}>
          <Sidebar />
        </Box>
        <Box width="640px">{checkPage()}</Box>
      </Box>
    </Layout>
  );
};

export default Home;
