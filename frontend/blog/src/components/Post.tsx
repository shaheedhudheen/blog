const Post = () => {
  return (
    <div className="mb-8 md:grid grid-cols-blog gap-5 items-start">
      <div className="rounded-xl overflow-hidden">
        <img
          src="https://techcrunch.com/wp-content/uploads/2023/09/GettyImages-1440554393.jpg?w=1390&crop=1"
          alt=""
        />
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-bold">
          Fintech faces its reckoning: It’s only a matter of time until the
          house of cards collapses
        </h2>
        <p className="space-x-2 text-sm text-gray-500 font-semibold">
          <a href="/" className="text-gray-700">
            Ahammed Shaheedhudheen
          </a>
          <time>20-05-2024 1:43</time>
        </p>
        <p className="text-base">
          The 2008 Global Financial Crisis was easily the most destructive
          economic crisis since the Great Depression. And yet, it’s not without
          a touch of irony that without it, we wouldn’t have a thriving startup
          ecosystem.
        </p>
      </div>
    </div>
  );
};

export default Post;
