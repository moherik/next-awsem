import axios from "axios";
import { Avatar, Box, Button, Heading, Text } from "grommet";
import React, { useRef, useState } from "react";
import {
  IoBookmarkOutline,
  IoGiftOutline,
  IoPlayCircleOutline,
  IoShareSocialOutline,
  IoThumbsDownOutline,
  IoThumbsUpOutline,
} from "react-icons/io5";
import ReactPlayer from "react-player";
import { Post } from "../models/Post";
import { useOnScreen } from "./CustomHook";

export const FeedItem: React.FC<{ post: Post }> = ({ post }) => {
  const [play, setPlay] = useState(false);
  const videoPlayerRef = useRef();
  const isPlay = useOnScreen(videoPlayerRef);

  const handleLike = async (postId: number) => {
    await axios
      .get(`/api/post/like/${postId}`)
      .then((response) => console.log(response.data))
      .catch((err) => console.error(err.response.data));
  };

  return (
    <Box
      background="white"
      round="xsmall"
      overflow="hidden"
      border={{ color: "#e0e0e0" }}
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

      <Box pad={{ horizontal: "small", top: "0", bottom: "small" }}>
        <Heading level="4" margin={{ vertical: "xxsmall" }}>
          {post.title}
        </Heading>
        <Text size="xsmall">
          Diupload pada: {post.createdAt.toLocaleDateString()}
        </Text>
      </Box>

      <Box ref={videoPlayerRef} overflow="hidden">
        <ReactPlayer
          url={`uploads/${post.videoUrl}`}
          playing={play}
          controls={true}
          light={`uploads/thumbs/${post.thumbnailUrl}`}
          style={{ backgroundColor: "black" }}
          playIcon={
            <Box
              background="#0000008f"
              color="white"
              margin="small"
              round="xlarge"
            >
              <IoPlayCircleOutline size={65} />
            </Box>
          }
          width="100%"
          onClickPreview={() => setPlay(true)}
        />
      </Box>

      <Box pad="small" direction="row-responsive" justify="start" gap="medium">
        <Box align="center" gap="4px" onClick={() => handleLike(post.id)}>
          <IoThumbsUpOutline size={24} />
          <Text size="xsmall">0 Suka</Text>
        </Box>
        <Box align="center" gap="4px" onClick={() => handleLike(post.id)}>
          <IoThumbsDownOutline size={24} />
          <Text size="xsmall">0 Tidak Suka</Text>
        </Box>
        <Box align="center" gap="4px">
          <IoGiftOutline size={24} />
          <Text size="xsmall">Support</Text>
        </Box>
        <Box align="center" gap="4px">
          <IoShareSocialOutline size={24} />
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
