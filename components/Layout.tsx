import { Box, Grid, Main } from "grommet";
import React from "react";
import { Header } from "./Header";

export const Layout: React.FC<{}> = ({ children }) => {
  return (
    <Box background="#f2f2f2">
      <Header width="850px" />
      <Main
        width="850px"
        margin="90px auto 20px auto"
        pad={{ bottom: "small" }}
      >
        {children}
      </Main>
    </Box>
  );
};
