import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { getSession } from "next-auth/client";
import prisma from "../../../../lib/prisma";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  const { postId } = req.query;

  const session = await getSession({ req });
  const user = await prisma.user.findFirst({
    where: { email: session?.user.email },
    include: { bookmark: { where: { id: Number(postId) } } },
  });

  if (user.bookmark.length > 0) {
    await prisma.user.update({
      where: { email: session.user.email },
      data: { bookmark: { disconnect: { id: Number(postId) } } },
    });
  } else {
    await prisma.user.update({
      where: { email: session.user.email },
      data: { bookmark: { connect: { id: Number(postId) } } },
    });
  }

  res.status(200).json("OK");
});

export default handler;
