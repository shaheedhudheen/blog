import { useState, useContext } from "react"
import { Navigate } from "react-router-dom"
import { UserContext } from "../../context/userContext"

const LoginPage = () => {
  
  //?state for storing username and password
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [redirect, setRedirect] = useState(false)

  const userContext = useContext(UserContext)

  //?handle login on submit
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    })

    if (response.ok) {
      response.json().then((userInfo) => {
        userContext?.setUserInfo(userInfo)
      })
      setRedirect(true)
    } else {
      alert("wrong credentials")
    }
  }

  //conditional rendering
  if (redirect) return <Navigate to={"/"} />

  return (
    <form className=" mx-auto gap-4 max-w-lg space-y-4" onSubmit={handleLogin}>
      <h1 className="text-4xl font-bold text-center">Login</h1>

      <input
        type="text"
        placeholder="Username"
        className="border-2 px-4 py-2 rounded-lg block w-full"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border-2 px-4 py-2 rounded-lg block w-full"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-black text-white rounded-lg px-4 py-2 font-semibold w-full">
        Login
      </button>
    </form>
  )
}

export default LoginPage
