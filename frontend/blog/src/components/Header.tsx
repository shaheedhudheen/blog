import user from "../assets/user.svg"
import { Link, useLocation } from "react-router-dom"
import { useEffect, useContext } from "react"
import { UserContext } from "../context/userContext"

const Header = () => {
  const userContext = useContext(UserContext)

  const { pathname } = useLocation()
  console.log(pathname)

  useEffect(() => {
    fetch("http://localhost:3000/profile", {
      credentials: "include",
    }).then((res) => {
      res.json().then((userInfo) => {
        userContext?.setUserInfo(userInfo)
      })
    })
  }, [])

  const logout = () => {
    fetch("http://localhost:3000/logout", {
      credentials: "include",
      method: "POST",
    })
    userContext?.setUserInfo(null)
  }

  return (
    <header className="flex justify-between items-center py-4 mb-4">
      <Link to="/" className="font-bold text-2xl text-gray-700">
        AS Blogs
      </Link>
      <nav className="text-xl flex space-x-3">
        {userContext?.userInfo?.username ? (
          <>
            <p>
              <span>
                <img src={user} alt="user icon" className="inline px-2" />
              </span>
              {userContext?.userInfo?.username}
            </p>
            <Link to="/create" className="cursor-pointer">
              <span className="px-2 py-1 rounded-md border border-blue-500">
                New Post
              </span>
            </Link>
            <a onClick={logout} className="cursor-pointer">
              <span className="bg-red-500 px-2 py-1 rounded-md text-white border border-red-500">
                Log Out
              </span>
            </a>
          </>
        ) : (
          <>
            {pathname === "/login" ? (
              <Link to="/register">
                <span className="bg-blue-500 px-2 py-1 rounded-md text-white border border-blue-500">
                  Register
                </span>
              </Link>
            ) : pathname === "/register" ? (
              <Link to="/login">
                <span className="bg-green-500 px-2 py-1 rounded-md text-white border border-green-500">
                  Log In
                </span>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <span className="bg-green-500 px-2 py-1 rounded-md text-white border border-green-500">
                    Log In
                  </span>
                </Link>
                <Link to="/register">
                  <span className="bg-blue-500 px-2 py-1 rounded-md text-white border border-blue-500">
                    Register
                  </span>
                </Link>
              </>
            )}
          </>
        )}
      </nav>
    </header>
  )
}

export default Header
