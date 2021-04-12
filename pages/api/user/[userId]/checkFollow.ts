import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { getSession } from "next-auth/client";
import prisma from "../../../../lib/prisma";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  const { userId: followUserId } = req.query;
  const session = await getSession({ req });

  const user = await prisma.user.findFirst({
    where: { email: session?.user.email },
    include: { following: { where: { id: Number(followUserId) } } },
  });

  let isExist = false;
  if (user.following.length > 0) {
    isExist = true;
  }

  res.status(200).json({ check: isExist });
});

export default handler;
