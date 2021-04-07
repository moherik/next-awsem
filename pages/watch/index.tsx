import Text from "antd/lib/typography/Text";
import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";

export default function View() {
  const router = useRouter();
  const { v } = router.query;

  return (
    <Layout>
      <Head>
        <title>Tonton</title>
      </Head>

      <Text>Hello {v}</Text>
    </Layout>
  );
}
