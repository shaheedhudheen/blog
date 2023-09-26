import Post from "../Post";
import { useEffect, useState } from "react";

type postType = {
  _id: string;
  title: string;
  summary: string;
  content: string;
  file: string;
  createdAt: string;
  author: {
    username: string;
  };
};

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/posts").then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
        console.log(posts);
      });
    });
  }, []);
  return (
    <>
      {posts.length > 0 &&
        posts.map((post: postType) => <Post {...post} key={post._id} />)}
    </>
  );
};

export default Home;
