import { NextApiRequest, NextApiResponse, PageConfig } from "next";
import nc from "next-connect";
import multer from "multer";
import { getSession } from "next-auth/client";
import prisma from "../../../lib/prisma";

const handler = nc<NextApiRequest, NextApiResponse>();

type UploadRequest = {
  filename: string;
};

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req: any, file, cb) => {
      const arrFilename = file.originalname.split(".");
      const randNumber = Math.random().toString(36).substring(7);
      const filename = `${randNumber}-${arrFilename[0]}.${arrFilename[1]}`;

      req.filename = filename;
      cb(null, filename);
    },
  }),
});

handler.use(upload.array("video"));

handler.post<UploadRequest>(async (req, res) => {
  const { title, description } = req.body;
  const session = await getSession({ req });
  const result = await prisma.post.create({
    data: {
      title: title,
      description: description,
      videoUrl: req.filename,
      author: { connect: { email: session.user.email } },
    },
    include: { author: true, _count: { select: { likes: true } } },
  });
  res.status(200).json(result);
});

export default handler;

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};
