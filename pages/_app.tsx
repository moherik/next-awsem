import { AppPropsType } from "next/dist/next-server/lib/utils";
import "../styles/globals.css";
import "antd/dist/antd.css";

function MyApp({ Component, pageProps }: AppPropsType) {
  return <Component {...pageProps} />;
}

export default MyApp;
