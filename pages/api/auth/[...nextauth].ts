import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import Adapters from "next-auth/adapters";
import Providers from "next-auth/providers";

import prisma from "../../../lib/prisma";

const options: NextAuthOptions = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  adapter: Adapters.Prisma.Adapter({ prisma }),
  secret: process.env.SECRET,
  pages: {
    signIn: "/auth/signin",
  },
};

const authHandler: NextApiHandler = (
  req: NextApiRequest,
  res: NextApiResponse
) => NextAuth(req, res, options);
export default authHandler;
