export type Post = {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  author: {
    name: string;
    email: string;
    username: string;
    image: string;
    bio: string;
  } | null;
  createdAt: Date;
  _count: {
    likes: string;
  };
};
