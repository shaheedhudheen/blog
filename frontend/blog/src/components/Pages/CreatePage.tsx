import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  // const formats = [
  //   "header",
  //   "bold",
  //   "italic",
  //   "underline",
  //   "strike",
  //   "blockquote",
  //   "list",
  //   "bullet",
  //   "indent",
  //   "link",
  //   "image",
  // ];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const data = 
    event.preventDefault();
    fetch("http://localhost:3000/create", {
      method: "POST",
    });
  };

  return (
    <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
      <label htmlFor="title" className="font-medium">
        Title:
      </label>
      <input
        type="text"
        id="title"
        className="border-2 px-4 py-2 rounded-lg block w-full"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      ></input>

      <label htmlFor="summary" className="font-medium">
        Summary:
      </label>
      <input
        type="text"
        id="summary"
        className="border-2 px-4 py-2 rounded-lg block w-full"
        value={summary}
        onChange={(event) => setSummary(event.target.value)}
      ></input>

      <label htmlFor="file" className="font-medium">
        Image:
      </label>
      <input
        type="file"
        id="file"
        className="border-2 px-4 py-2 rounded-lg block w-full"
      />
      <ReactQuill
        value={content}
        modules={modules}
        // formats={formats}
        onChange={(value) => {
          setContent(value);
          console.log(content);
        }}
        placeholder="Write here...."
      />
      <button
        type="submit"
        className="bg-black text-white rounded-lg px-4 py-2 font-semibold"
      >
        Create Post
      </button>
    </form>
  );
};

export default CreatePage;
