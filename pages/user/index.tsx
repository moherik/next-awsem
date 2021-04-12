import {
  Avatar,
  Box,
  Button,
  Grid,
  Heading,
  ResponsiveContext,
  Stack,
  Text,
} from "grommet";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/client";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { IoCreateOutline } from "react-icons/io5";
import { Layout } from "../../components/Layout";
import { MyVideoItem } from "../../components/MyVideoItem";
import { UpdateProfileForm } from "../../components/UpdateProfileForm";
import { useModal } from "../../context/ModalContext";
import prisma from "../../lib/prisma";
import Error from "next/error";

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

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
  res,
}) => {
  const { u: userId } = query;
  let userEmail: string;
  let error: boolean = false;

  if (userId == null) {
    const session = await getSession({ req });
    userEmail = session?.user.email;
  } else {
    let getUser: any = null;

    if (!isNaN(Number(userId))) {
      getUser = await prisma.user.findFirst({
        where: { id: Number(userId || -1) },
        select: { email: true },
      });
    } else {
      getUser = await prisma.user.findFirst({
        where: { username: String(userId || "") },
        select: { email: true },
      });
    }

    if (getUser == null) {
      error = true;
      res.statusCode = 404;
      return { props: { error } };
    }

    userEmail = getUser.email;
  }

  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    include: { following: true, follower: true },
  });
  const posts = await prisma.post.findMany({ where: { authorId: user.id } });
  return { props: { error, user, posts } };
};

type Props = {
  error: boolean;
  user: Profile;
  posts: MyPost[];
};

type Counter = {
  count: number | string;
  title: string;
  onClick?: () => void;
};

const Profile: React.FC<Props> = ({ error, user, posts }) => {
  if (error) return <Error statusCode={404} />;

  const { handleSideModal } = useModal();
  const size = useContext(ResponsiveContext);
  const [counter, setCounter] = useState<Counter[]>([]);
  const router = useRouter();
  const [session] = useSession();

  const refreshData = () => router.replace(router.asPath);

  const handleShowEditDialog = () => {
    if (session.user.email == user.email) {
      handleSideModal({
        method: "open",
        child: {
          title: "Edit Profil",
          body: <UpdateProfileForm user={user} onComplete={refreshData} />,
        },
      });
    }
  };

  useEffect(() => {
    const count: Counter[] = [
      { title: "Video", count: posts.length },
      { title: "Dukungan", count: "Rp. 0" },
      { title: "Mengikuti", count: user.following.length },
      { title: "Pengikut", count: user.follower.length },
    ];
    setCounter(count);
  }, [user]);

  return (
    <Layout>
      <Head>
        <title>
          {user.name} {user.username && `- @${user.username}`}
        </title>
      </Head>

      <Box gap="large">
        <Stack anchor="top-right">
          <Box align="center" gap="small">
            <Avatar src={user.image} size="xlarge" />
            <Box align="center">
              {user.username && <Text>@{user.username}</Text>}
              <Heading level="4" margin="0px">
                {user.name}
              </Heading>
              {user.bio && <Text margin={{ top: "small" }}>{user.bio}</Text>}
            </Box>
            <Box
              direction="row"
              gap="medium"
              border="all"
              pad="small"
              round="xsmall"
              margin={{ top: "small" }}
            >
              {counter.map((item, index) => (
                <Badge count={item.count} title={item.title} key={index} />
              ))}
            </Box>
          </Box>

          {session.user.email == user.email && (
            <Button plain onClick={handleShowEditDialog}>
              {({ hover }) => (
                <Box direction="row" gap="xsmall" onClick={() => {}}>
                  <IoCreateOutline color={hover ? "tomato" : undefined} />
                  <Text size="small" color={hover ? "tomato" : undefined}>
                    Edit Profil
                  </Text>
                </Box>
              )}
            </Button>
          )}
        </Stack>

        <Box>
          <Grid columns={size !== "small" ? "medium" : "100%"} gap="medium">
            {posts.map((post) => (
              <MyVideoItem post={post} key={post.id} />
            ))}
          </Grid>
        </Box>
      </Box>
    </Layout>
  );
};

const Badge: React.FC<Counter> = ({ count, title }) => {
  return (
    <Box direction="column" align="center" width="70px">
      <Heading level="4" margin="0px">
        {count}
      </Heading>
      <Text size="small">{title}</Text>
    </Box>
  );
};

export default Profile;
