export type post = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  readTime: number;
  imageSrc: string;
  attachments: string[]; // The names of the attached files(.e.g ['article.pdf' , 'photo.jpg'])
  youtubeVideoId?: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
};

// user 👇:
export type user = {
  _id: string;
  email: string;
  username: string;
  password: string;
  enrolledCourses: string[];
  //   createdCourses: string[],
  learntWordsIds: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type sessionUser = {
  _id: string;
  username: string;
  email: string;
};
