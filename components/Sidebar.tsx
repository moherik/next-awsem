import { Anchor, Box, Button, Heading, List, Nav, Text } from "grommet";
import { Home, User } from "grommet-icons";
import {
  IoCompassOutline,
  IoHomeOutline,
  IoPeopleOutline,
} from "react-icons/io5";

const NavItem = ({ icon, label, ...rest }) => (
  <Button plain {...rest}>
    {({ hover }) => (
      <Box
        background={hover ? "selected" : undefined}
        direction="row"
        gap="small"
        pad="small"
        align="center"
      >
        {icon}
        <Text size="16px">{label}</Text>
      </Box>
    )}
  </Button>
);

export const Sidebar: React.FC<{}> = () => {
  return (
    <Box style={{ position: "sticky", top: 0 }}>
      <Nav gap="xxsmall" responsive={true}>
        <NavItem icon={<Home />} label="Beranda" />
        <NavItem icon={<User />} label="Mengikuti" />
        <Heading level="5" margin={{ horizontal: "small", vertical: "small" }}>
          Topik
        </Heading>
      </Nav>
    </Box>
  );
};
