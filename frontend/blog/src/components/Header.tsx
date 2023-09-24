import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import { UserContext } from "../context/userContext";

const Header = () => {
  const userContext = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:3000/profile", {
      credentials: "include",
    }).then((res) => {
      res.json().then((userInfo) => {
        userContext?.setUserInfo(userInfo);
      });
    });
  }, []);

  const logout = () => {
    fetch("http://localhost:3000/logout", {
      credentials: "include",
      method: "POST",
    });
    userContext?.setUserInfo(null);
  };

  return (
    <header className="flex justify-between items-center py-4 mb-4">
      <Link to="/" className="font-bold text-2xl text-gray-700">
        AS Blogs
      </Link>
      <nav className="space-x-4 text-xl">
        {userContext?.userInfo?.username ? (
          <>
            <Link to="/create">New Post</Link>
            <a onClick={logout}>Log Out</a>
          </>
        ) : (
          <>
            <Link to="/login">Log In</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
