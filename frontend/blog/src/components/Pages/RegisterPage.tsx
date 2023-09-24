import React, { useState } from "react";

const RegisterPage = () => {
  //?state for storing username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //?handle register on submit
  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.status === 200) {
      alert("registration sucessfull");
    } else {
      alert("registration failed");
    }
  };

  return (
    <form
      className=" mx-auto gap-4 max-w-lg space-y-4"
      onSubmit={handleRegister}
    >
      <h1 className="text-4xl font-bold text-center">Register</h1>

      <input
        type="text"
        placeholder="Username"
        className="border-2 px-4 py-2 rounded-lg block w-full"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="Password"
        className="border-2 px-4 py-2 rounded-lg block w-full"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button className="bg-black text-white rounded-lg px-4 py-2 font-semibold w-full">
        Register
      </button>
    </form>
  );
};

export default RegisterPage;
