import { Box, Button, Heading, Nav, Text } from "grommet";
import { IoHomeOutline, IoPeopleOutline } from "react-icons/io5";

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
        <NavItem icon={<IoHomeOutline size={24} />} label="Beranda" />
        <NavItem icon={<IoPeopleOutline size={24} />} label="Mengikuti" />
        <Heading level="5" margin={{ horizontal: "small", vertical: "small" }}>
          Topik
        </Heading>
      </Nav>
    </Box>
  );
};
