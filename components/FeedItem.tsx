import axios from "axios";
import {
  Avatar,
  Box,
  Button,
  Heading,
  Image,
  Stack,
  Text,
  Video,
} from "grommet";
import React, { ReactEventHandler, useRef, useState } from "react";
import {
  IoBookmarkOutline,
  IoHeartOutline,
  IoPaperPlaneOutline,
  IoPlayCircleOutline,
  IoThumbsDownOutline,
  IoThumbsUpOutline,
} from "react-icons/io5";
import { Post } from "../models/Post";

export const FeedItem: React.FC<{ post: Post }> = ({ post }) => {
  const [play, setPlay] = useState(false);
  const [hoverThumb, setHoverThumb] = useState(false);

  const handleLike = async (postId: number) => {
    await axios
      .get(`/api/post/like/${postId}`)
      .then((response) => console.log(response.data))
      .catch((err) => console.error(err.response.data));
  };

  const handleMetaData = (e: any) => {
    console.log(e.currentTarget.duration);
  };

  return (
    <Box
      background="white"
      elevation="small"
      round="xsmall"
      overflow="hidden"
      flex
    >
      <Box direction="row-responsive" align="center" gap="small" pad="small">
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

      <Stack anchor="bottom-right">
        {!play ? (
          <Stack
            anchor="center"
            onMouseEnter={() => setHoverThumb(true)}
            onMouseLeave={() => setHoverThumb(false)}
            style={{ cursor: "pointer" }}
            onClick={() => setPlay(true)}
          >
            <Image
              src={`uploads/thumbs/${post.thumbnailUrl}`}
              width="640px"
              height="360px"
              fit="contain"
            />

            {hoverThumb && (
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
        ) : (
          <Video
            controls="over"
            height="600px"
            fit="cover"
            onLoadedMetadata={handleMetaData}
            src={`uploads/${post.videoUrl}`}
            autoPlay={play}
          />
        )}

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
        <Text size="xsmall">
          Diupload pada: {post.createdAt.toLocaleDateString()}
        </Text>
      </Box>

      <Box pad="small" direction="row-responsive" justify="start" gap="small">
        <Box align="center" gap="4px" onClick={() => handleLike(post.id)}>
          <IoHeartOutline size={24} />
          <Text size="xsmall">{post._count.likes} Suka</Text>
        </Box>
        <Box align="center" gap="4px">
          <IoPaperPlaneOutline size={24} />
          <Text size="xsmall">Bagikan</Text>
        </Box>
        <Box align="center" gap="4px" margin={{ start: "auto" }}>
          <IoBookmarkOutline size={24} />
          <Text size="xsmall">Simpan</Text>
        </Box>
      </Box>
    </Box>
  );
};
