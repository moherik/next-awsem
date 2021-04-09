import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getProviders, signIn } from "next-auth/client";
import { Providers } from "next-auth/providers";
import { Button, Container, Segment } from "semantic-ui-react";
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
      <Container>
        {Object.values(providers).map((provider) => (
          <Segment key={provider.name}>
            <Button onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
              Login dengan {provider.name}
            </Button>
          </Segment>
        ))}
      </Container>
    </Layout>
  );
}
