export interface IPost {
  _id: string;
  user: string;
  image: string;
  _createdAt: string;
  content: string;
}

export interface IComment {
  _id: string;
  comment: string;
  user: string;
  image: string;
  _createdAt: string;
}
