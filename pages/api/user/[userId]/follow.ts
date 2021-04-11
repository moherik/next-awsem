import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { getSession } from "next-auth/client";
import prisma from "../../../../lib/prisma";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, _res) => {
  const { userId: followUserId } = req.query;
  const session = await getSession({ req });
  const user = await prisma.user.findFirst({
    where: { email: session?.user.email },
    include: { following: { where: { id: Number(followUserId) } } },
  });

  if (user.following.length > 0) {
    await prisma.user.update({
      where: { email: session.user.email },
      data: { following: { disconnect: { id: Number(followUserId) } } },
    });
  } else {
    await prisma.user.update({
      where: { email: session.user.email },
      data: { following: { connect: { id: Number(followUserId) } } },
    });
  }
});

export default handler;
