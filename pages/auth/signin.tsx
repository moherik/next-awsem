import { Box, Button } from "grommet";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getProviders, signIn } from "next-auth/client";
import { Providers } from "next-auth/providers";
import { Layout } from "../../components/Layout";

export const getServerSideProps = async (
  _context: GetServerSidePropsContext
) => {
  const providers: Providers = await getProviders();
  return { props: { providers } };
};

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout>
      <Box>
        {Object.values(providers).map((provider) => (
          <Box key={provider.name}>
            <Button onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
              Login dengan {provider.name}
            </Button>
          </Box>
        ))}
      </Box>
    </Layout>
  );
}
