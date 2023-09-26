import { format } from "date-fns";

type postProps = {
  title: string;
  summary: string;
  content: string;
  file: string;
  createdAt: string;
  author: {
    username: string;
  };
};

const Post = ({ title, summary, file, createdAt, author }: postProps) => {
  return (
    <div className="mb-8 md:grid grid-cols-blog">
      <div className="rounded-xl overflow-hidden place-self-center">
        <img
          src={"http://localhost:3000/" + file}
          alt=""
          className="max-h-72"
        />
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-bold">{title}</h2>
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
