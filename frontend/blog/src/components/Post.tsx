import { format } from "date-fns";
import { Link } from "react-router-dom";

type postProps = {
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

const Post = ({ title, summary, file, createdAt, author, _id }: postProps) => {
  return (
    <div className="mb-8 md:grid grid-cols-blog gap-8">
      <div className="rounded-xl overflow-hidden place-self-center">
        <Link to={`/post/${_id}`}>
          <img
            src={"http://localhost:3000/" + file}
            alt=""
            className="aspect-video object-cover"
          />
        </Link>
      </div>
      <div className="space-y-2">
        <Link to={`/post/${_id}`}>
          <h2 className="text-xl font-bold">{title}</h2>
        </Link>
        <p className="space-x-2 text-sm text-gray-500 font-semibold">
          <a href="/" className="text-gray-700">
            {author.username}
          </a>
          <time>{format(new Date(createdAt), "d MM yyyy hh:mm a")}</time>
        </p>
        <p className="text-base">{summary}</p>
      </div>
    </div>
  );
};

export default Post;
