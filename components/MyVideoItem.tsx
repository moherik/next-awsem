import { Box, Card, Heading, Image, Stack, Text } from "grommet";
import { useState } from "react";
import { IoPlayCircleOutline } from "react-icons/io5";
import { MyPost } from "../pages/user/index";

export const MyVideoItem: React.FC<{ post: MyPost }> = ({ post }) => {
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
