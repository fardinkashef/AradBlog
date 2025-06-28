export type post = {
  title: string;
  excerpt: string;
  content: string;
  imageSrc: string;
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
