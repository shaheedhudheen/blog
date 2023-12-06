import { format } from "date-fns";
import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../context/userContext";

type PostProps = {
  _id: string;
  file: string;
  title: string;
  summary: string;
  content: string;
  createdAt: string;
  author: {
    username: string;
    _id: string;
  };
};

const PostPage = () => {
  const [postInfo, setPostInfo] = useState<PostProps>();
  const { id } = useParams();
  const userContext = useContext(UserContext);


  
  

  useEffect(() => {
    fetch(`http://localhost:3000/post/${id}`).then((response) => {
      response.json().then((info) => {
        setPostInfo(info);
      });
    });
  }, []);

  if (!postInfo) return;

  return (
    <div className="flex justify-center flex-col space-y-8">
      <h1 className="text-5xl font-bold text-gray-800 text-justify">
        {postInfo.title}
      </h1>
      <div className="flex gap-6">
        <time>{format(new Date(postInfo.createdAt), "d MM yyyy hh:mm a")}</time>
        <p>{postInfo.author.username}</p>
        {userContext?.userInfo?._id === postInfo.author._id && (
          <div>
            <Link
              to={`/edit/${postInfo._id}`}
              className="px-2 py-1 border-black border rounded-lg"
            >
              Edit
            </Link>
          </div>
        )}
      </div>
      <img
        src={`http://localhost:3000/${postInfo.file}`}
        alt=""
        className="max-w-full bg-red-200"
      />
      <p className="text-2xl font-semibold text-gray-500">{postInfo.summary}</p>
      <div
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
        className="text-xl space-y-5 font leading-10 text-justify"
      />
    </div>
  );
};

export default PostPage;
