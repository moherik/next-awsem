import { AppPropsType } from "next/dist/next-server/lib/utils";
import { Provider } from "next-auth/client";
import { Button, Grommet } from "grommet";
import { grommet, ThemeType } from "grommet/themes";
import { ContextWrapper } from "../context/ContextWrapper";

import { SideDialog } from "../components/SideDialog";
import { ModalDialog } from "../components/ModalDialog";

import "../styles/app.css";

const theme: ThemeType = {
  ...grommet,
  global: {
    colors: {
      "accent-1": { dark: "tomato", light: "red" },
      focus: undefined,
    },
  },
};

function MyApp({ Component, pageProps }: AppPropsType) {
  return (
    <Provider session={pageProps.session}>
      <Grommet theme={theme}>
        <ContextWrapper>
          <SideDialog />
          <ModalDialog />
          <Component {...pageProps} />
        </ContextWrapper>
      </Grommet>
    </Provider>
  );
}

export default MyApp;
