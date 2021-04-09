import { AppPropsType } from "next/dist/next-server/lib/utils";
import { Provider } from "next-auth/client";
import { Grommet } from "grommet";
import { grommet } from "grommet/themes";

import "../styles/app.css";
import { UploadDialog } from "../components/UploadDialog";
import { PostContextProvider } from "../context/PostContext";

function MyApp({ Component, pageProps }: AppPropsType) {
  return (
    <PostContextProvider>
      <Provider session={pageProps.session}>
        <Grommet theme={grommet}>
          <UploadDialog />
          <Component {...pageProps} />
        </Grommet>
      </Provider>
    </PostContextProvider>
  );
}

export default MyApp;
