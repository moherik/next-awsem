import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { getSession } from "next-auth/client";
import prisma from "../../../../lib/prisma";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  const { postId } = req.query;

  const session = await getSession({ req });
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  const like = await prisma.like.findFirst({
    where: { userId: user.id, postId: Number(postId) },
  });

  if (like != null) {
    await prisma.like.delete({ where: { id: like.id } });
  } else {
    await prisma.like.create({
      data: { postId: Number(postId), userId: user.id },
    });
  }

  res.status(200).json({ data: "Added" });
});

export default handler;
