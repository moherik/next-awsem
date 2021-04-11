import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  const { postId } = req.query;
  res.status(200).json({ data: postId });
});

export default handler;
