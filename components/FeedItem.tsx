import axios from "axios";
import { Avatar, Box, Button, Heading, Text } from "grommet";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import {
  IoBookmarkOutline,
  IoGiftOutline,
  IoHeart,
  IoHeartOutline,
  IoPlayCircleOutline,
  IoShareSocialOutline,
} from "react-icons/io5";
import ReactPlayer from "react-player";
import { useModal } from "../context/ModalContext";
import { Post } from "../pages";

export const FeedItem: React.FC<{ post: Post }> = ({ post }) => {
  const router = useRouter();
  const [session, loading] = useSession();
  const [play, setPlay] = useState(false);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const videoPlayerRef = useRef();

  const { handleDialogModal } = useModal();

  const handleLike = async (postId: number) => {
    if (!session) {
      return handleDialogModal({
        method: "open",
        child: {
          title: "Login",
          body: "Silahkan login untuk bisa berinteraksi",
          button: (
            <Button
              label="Login"
              onClick={() => {
                handleDialogModal({ method: "close" });
                router.push("/auth/signin");
              }}
            />
          ),
        },
      });
    }

    if (!isLiked) {
      setLikes(likes + 1);
    } else {
      if (likes > 0) setLikes(likes - 1);
    }

    setIsLiked(!isLiked);

    await axios.get(`/api/post/${postId}/like`);
  };

  const handleFollowUser = async (userId: number) => {
    if (isFollowing) {
      return handleDialogModal({
        method: "open",
        child: {
          title: "Berhenti mengikuti?",
          body: "Konfirmasi untuk berhenti mengikuti",
          button: (
            <Box direction="row" justify="between" width="100%">
              <Button
                plain
                label="Batal"
                onClick={() => {
                  handleDialogModal({ method: "close" });
                }}
              />
              <Button
                label="Lanjutkan"
                onClick={() => {
                  performFollowUser(userId);
                  setIsFollowing(!isFollowing);
                  handleDialogModal({ method: "close" });
                }}
              />
            </Box>
          ),
        },
      });
    }

    setIsFollowing(!isFollowing);
    performFollowUser(userId);
  };

  const performFollowUser = async (userId: number) => {
    await axios.get(`/api/user/${userId}/follow`);
  };

  const handleCheckFollow = async (userId: number) => {
    await axios
      .get(`/api/user/${userId}/checkFollow`)
      .then((response) => setIsFollowing(response.data.check));
  };

  useEffect(() => {
    setLikes(post._count.likes);
    handleCheckFollow(post.author.id);
    if (session && post.likes.length > 0) setIsLiked(true);
  }, [post, session]);

  return (
    <Box
      background="white"
      round="xsmall"
      overflow="hidden"
      border={{ color: "#e0e0e0" }}
      flex
    >
      <Box direction="row" align="center" gap="small" pad="small">
        <Avatar src={post.author.image} size="38px" />
        <Box>
          <Heading level="5" margin="none">
            {post.author.name}
          </Heading>
          {post.author.username && (
            <Text size="small">@{post.author.username}</Text>
          )}
        </Box>
        {session && post.author.email != session?.user.email && (
          <Button
            primary={isFollowing}
            label={isFollowing ? "Mengikuti" : "Ikuti"}
            size="small"
            margin={{ left: "auto" }}
            onClick={() => handleFollowUser(post.author.id)}
          />
        )}
      </Box>

      <Box pad={{ horizontal: "small", top: "0", bottom: "small" }}>
        <Heading level="4" margin={{ vertical: "xxsmall" }}>
          {post.title}
        </Heading>
        <Text size="xsmall">
          Diupload pada: {post.createdAt.toLocaleDateString()}
        </Text>
      </Box>

      <Box height="360px">
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
          height="360px"
          onClickPreview={() => setPlay(true)}
          ref={videoPlayerRef}
        />
      </Box>

      <Box pad="small" direction="row" gap="medium">
        <Box align="center" onClick={() => handleLike(post.id)}>
          {isLiked ? (
            <IoHeart size={24} color="red" />
          ) : (
            <IoHeartOutline size={24} />
          )}
          <Text size="xsmall" weight="bold">
            {likes} Suka
          </Text>
        </Box>
        <Box align="center">
          <IoGiftOutline size={24} />
          <Text size="xsmall" weight="bold">
            Support
          </Text>
        </Box>
        <Box align="center">
          <IoShareSocialOutline size={24} />
          <Text size="xsmall" weight="bold">
            Bagikan
          </Text>
        </Box>
        <Box align="center" margin={{ start: "auto" }}>
          <IoBookmarkOutline size={24} />
          <Text size="xsmall" weight="bold">
            Simpan
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
