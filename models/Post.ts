export type Post = {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  author: {
    name: string;
    username: string;
    image: string;
  } | null;
  createdAt: Date;
};
