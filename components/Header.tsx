import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import {
  Avatar,
  Box,
  Button,
  Header as BaseHeader,
  Heading,
  Menu,
  ResponsiveContext,
  Spinner,
} from "grommet";
import { IoMenuOutline, IoNotificationsOutline } from "react-icons/io5";
import Link from "next/link";
import React from "react";
import { usePostContext } from "../context/PostContext";

type Props = {
  width?: string;
};

export const Header: React.FC<Props> = ({ width = "900px" }) => {
  const { openDialog } = usePostContext();
  const router = useRouter();
  const [session, loading] = useSession();

  return (
    <BaseHeader
      background="white"
      pad="small"
      elevation="xsmall"
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 2 }}
    >
      <Box
        width={width}
        margin="0px auto"
        justify="between"
        align="center"
        direction="row-responsive"
      >
        <Link href="/">
          <Heading as="a" level="4">
            Awsem
          </Heading>
        </Link>
        <ResponsiveContext.Consumer>
          {(size) =>
            size === "small" ? (
              <Box justify="end">
                <Menu
                  a11yTitle="Navigation Menu"
                  dropProps={{ align: { top: "bottom", right: "right" } }}
                  icon={<IoMenuOutline />}
                  items={[
                    {
                      label: (
                        <Box pad="small">
                          <IoNotificationsOutline />
                        </Box>
                      ),
                      href: "https://v2.grommet.io/",
                    },
                    {
                      label: <Box pad="small">Feedback</Box>,
                      href: "https://github.com/grommet/grommet/issues",
                    },
                  ]}
                />
              </Box>
            ) : (
              <Box
                justify="end"
                align="center"
                direction="row"
                style={{ columnGap: 20 }}
              >
                {loading ? (
                  <Spinner />
                ) : !session ? (
                  <Button
                    label="Masuk"
                    onClick={() => router.push("/auth/signin")}
                  />
                ) : (
                  <>
                    <IoNotificationsOutline />
                    <Button
                      label="Upload Video"
                      size="small"
                      onClick={openDialog}
                    />
                    <Avatar
                      src={session.user.image}
                      size="32px"
                      onClick={() => router.push("/profile")}
                    />
                  </>
                )}
              </Box>
            )
          }
        </ResponsiveContext.Consumer>
      </Box>
    </BaseHeader>
  );
};
