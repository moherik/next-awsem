import { Box, Main } from "grommet";
import React from "react";
import { Header } from "./Header";

export const Layout: React.FC<{}> = ({ children }) => {
  return (
    <Box background="white">
      <Header width="915px" />
      <Box width="915px" margin="85px auto 20px auto" pad={{ bottom: "small" }}>
        {children}
      </Box>
    </Box>
  );
};
