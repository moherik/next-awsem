import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { getSession } from "next-auth/client";
import prisma from "../../../lib/prisma";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.patch(async (req, res) => {
  const { name, username, bio } = req.body;
  const session = await getSession({ req });

  try {
    const user = await prisma.user.update({
      where: { email: session?.user.email },
      data: { name, username, bio },
    });
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
  }
});

export default handler;
