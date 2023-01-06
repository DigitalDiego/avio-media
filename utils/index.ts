import sanityClient from "@sanity/client";

export const saveToStorage = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    return window.localStorage.setItem(key, value);
  }
};

export const getFromStorage = (key: string) => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem(key);
  }
};

export const removefromStorage = () => {
  if (typeof window !== "undefined") {
    return window.localStorage.clear();
  }
};

export const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: "2023-01-06",
  useCdn: false,
  dataset: "production",
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

export const fetchPosts = `*[_type == "post"] | order(_createdAt desc) {
  user,
  _createdAt,
  image,
  content,
  _id
}`;

export const fetchPost = (id: any) => {
  const query = `*[_type == "post" && _id == "${id}"]{
    user,
    _createdAt,
    image,
    content,
    _id
  }`;
  return query;
};

export const fetchComments = (id: any) => {
  const query = `*[_type == 'comment' && postId == '${id}'] | order(_createdAt desc) {
    user,
    comment,
    _id,
    _createdAt,
    image
  }`;
  return query;
};
