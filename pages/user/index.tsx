import {
  Avatar,
  Box,
  Card,
  Grid,
  Heading,
  Image,
  ResponsiveContext,
  Stack,
  Text,
} from "grommet";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import Head from "next/head";
import { useContext, useRef, useState } from "react";
import { IoPlayCircleOutline } from "react-icons/io5";
import { Layout } from "../../components/Layout";
import prisma from "../../lib/prisma";

export interface Profile {
  id: number;
  name: string;
  username: string;
  email: string;
  image: string;
  bio: string;
  follower: [];
  following: [];
}

export interface MyPost {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  createdAt: Date;
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  const user = await prisma.user.findUnique({
    where: { email: session?.user.email },
    include: { following: true, follower: true },
  });
  const posts = await prisma.post.findMany({ where: { authorId: user.id } });
  return { props: { user, posts } };
};

type Props = {
  user: Profile;
  posts: MyPost[];
};

const Profile: React.FC<Props> = ({ user, posts }) => {
  const size = useContext(ResponsiveContext);
  const playBtn = useRef();

  return (
    <Layout>
      <Head>
        <title>
          {user.name} {user.username && `@${user.username}`}
        </title>
      </Head>

      <Box gap="large">
        <Box align="center">
          <Avatar src={user.image} size="large" />
          <Heading level="4" margin={{ vertical: "small" }}>
            {user.name}
          </Heading>
          <Text>{user.username}</Text>
          <Box direction="row" gap="medium">
            <Heading level="5" margin="0px">
              {user.following.length} Mengikuti
            </Heading>
            <Heading level="5" margin="0px">
              {user.follower.length} Pengikut
            </Heading>
          </Box>
        </Box>

        <Box>
          <Grid columns={size !== "small" ? "medium" : "100%"} gap="medium">
            {posts.map((post) => (
              <Item post={post} key={post.id} />
            ))}
          </Grid>
        </Box>
      </Box>
    </Layout>
  );
};

const Item: React.FC<{ post: MyPost }> = ({ post }) => {
  const [hover, setHover] = useState(false);

  return (
    <Card elevation="xsmall" round="xsmall" border={{ color: "#e0e0e0" }}>
      <Box
        onClick={() => {}}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Stack anchor="center">
          <Image src={`uploads/thumbs/${post.thumbnailUrl}`} width="100%" />
          {hover && (
            <Box
              background="#0000008f"
              color="white"
              margin="small"
              round="xlarge"
            >
              <IoPlayCircleOutline size={65} />
            </Box>
          )}
        </Stack>
      </Box>
      <Box pad="small">
        <Heading level="5" margin="0">
          {post.title}
        </Heading>
        <Text size="xsmall">
          Diupload pada {post.createdAt.toLocaleDateString()}
        </Text>
      </Box>
    </Card>
  );
};

export default Profile;
