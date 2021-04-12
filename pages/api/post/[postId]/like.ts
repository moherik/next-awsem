import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { getSession } from "next-auth/client";
import prisma from "../../../../lib/prisma";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  const { postId } = req.query;

  const session = await getSession({ req });
  const email = session?.user.email;

  const user = await prisma.user.findUnique({
    where: { email },
    include: { like: { where: { id: Number(postId) } } },
  });

  if (user.like.length > 0) {
    await prisma.user.update({
      where: { email },
      data: { like: { disconnect: { id: Number(postId) } } },
    });
  } else {
    await prisma.user.update({
      where: { email },
      data: { like: { connect: { id: Number(postId) } } },
    });
  }

  res.status(200).json("OK");
});

export default handler;
