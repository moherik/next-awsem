import axios from "axios";
import { Avatar, Box, Button, Heading, Stack, Text, Video } from "grommet";
import React from "react";
import {
  IoBookmarkOutline,
  IoHeartOutline,
  IoPaperPlaneOutline,
  IoThumbsDownOutline,
  IoThumbsUpOutline,
} from "react-icons/io5";
import { Post } from "../models/Post";

export const FeedItem: React.FC<{ post: Post }> = ({ post }) => {
  const handleLike = async (postId: number) => {
    await axios
      .get(`/api/post/like/${postId}`)
      .then((response) => console.log(response.data))
      .catch((err) => console.error(err.response.data));
  };

  return (
    <Box key={post.id} direction="row" gap="medium" align="start">
      <Box
        background="white"
        elevation="small"
        round="small"
        overflow="hidden"
        flex
      >
        <Stack anchor="bottom-right">
          {/* <Image
            src="https://placeimg.com/640/360/animals"
            width="640px"
            height="360px"
            fit="contain"
          /> */}
          <Video controls="over" fit="cover">
            <source
              key="video"
              src={`uploads/${post.videoUrl}`}
              type="video/mp4"
            />
          </Video>

          <Box
            background="black"
            color="white"
            margin="small"
            pad={{ horizontal: "xsmall", vertical: "xxsmall" }}
            round="xsmall"
          >
            <Text size="xsmall">02:50</Text>
          </Box>
        </Stack>

        <Box pad="small">
          <Heading level="4" margin={{ vertical: "xxsmall" }}>
            {post.title}
          </Heading>
          <Text size="small">{post.description}</Text>
          <Text size="xsmall" margin={{ top: "small" }}>
            Diupload pada: {post.createdAt.toLocaleDateString()}
          </Text>
        </Box>
      </Box>

      <Box width="30%">
        <Box gap="medium">
          <Box
            background="white"
            elevation="small"
            pad="small"
            round="small"
            gap="small"
          >
            <Box direction="row-responsive" align="center" gap="small">
              <Avatar src={post.author.image} size="38px" />
              <Box>
                <Heading level="5" margin="none">
                  {post.author.name}
                </Heading>
                {post.author.username && (
                  <Text size="small">@{post.author.username}</Text>
                )}
              </Box>
              <Button label="Ikuti" size="small" margin={{ left: "auto" }} />
            </Box>

            {post.author.bio && (
              <Box gap="small">
                <Text size="small">{post.author.bio}</Text>
              </Box>
            )}
          </Box>

          <Box
            background="white"
            elevation="small"
            pad="small"
            round="small"
            direction="row-responsive"
            justify="around"
            align="center"
          >
            <Box
              align="center"
              flex
              gap="4px"
              onClick={() => handleLike(post.id)}
            >
              <IoHeartOutline size={24} />
              <Text size="small" weight="bold">
                {post._count.likes} Suka
              </Text>
            </Box>
            <Box align="center" flex gap="4px">
              <IoPaperPlaneOutline size={24} />
              <Text size="small" weight="bold">
                Bagikan
              </Text>
            </Box>
            <Box align="center" flex gap="4px">
              <IoBookmarkOutline size={24} />
              <Text size="small" weight="bold">
                Simpan
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
