import { Box, Button, Heading, Nav, Text } from "grommet";
import { useRouter } from "next/router";
import {
  IoBookmarksOutline,
  IoCompassOutline,
  IoHomeOutline,
  IoPeopleOutline,
} from "react-icons/io5";

const NavItem = ({ icon, label, active = false, ...rest }) => (
  <Button plain {...rest}>
    {({ hover }) => (
      <Box direction="row" gap="small" align="center">
        {icon}
        <Text
          size="18px"
          color={hover || active ? "tomato" : undefined}
          weight={active ? "bold" : undefined}
        >
          {label}
        </Text>
      </Box>
    )}
  </Button>
);

export const Sidebar: React.FC<{}> = () => {
  const router = useRouter();
  const { p: page } = router.query;

  return (
    <Nav gap="medium" responsive={true}>
      <NavItem
        icon={<IoCompassOutline size={24} />}
        active={!page || page == "explore"}
        label="Jelajah"
        onClick={() => router.push("?p=explore")}
      />
      <NavItem
        icon={<IoPeopleOutline size={24} />}
        active={page == "follow"}
        label="Mengikuti"
        onClick={() => router.push("/?p=follow")}
      />
      <NavItem
        icon={<IoBookmarksOutline size={22} />}
        active={page == "bookmarks"}
        label="Disimpan"
        onClick={() => router.push("/?p=bookmarks")}
      />
      <Heading level="5">Topik</Heading>
    </Nav>
  );
};
