import { useEffect, useState } from "react";
import { NavLink, redirect, useNavigate } from "react-router-dom";
import axios from "axios";

const SignupPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      try {
        const parsedToken = JSON.parse(token);
        if (parsedToken) {
          navigate("/");
        }
      } catch (error) {}
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted:", { setEmail, password });
    try {
      const response = await axios.post(
        "http://localhost:3000/authenticate/signup",
        {
          email,
          password,
        }
      );

      console.log("Authentication successful");
      console.log(response.data);
      if (response?.data?.status) {
        localStorage.setItem(
          "userToken",
          JSON.stringify(response?.data?.token)
        );
        localStorage.setItem(
          "sessionId",
          JSON.stringify(response?.data?.sessionId)
        );
        console.log("signed");
        navigate("/");
      } else {
        console.log(response?.data?.msg);
        setError(response?.data?.msg);
      }
    } catch (error) {
      setError(error?.response?.data?.msg);
      console.error("Authentication failed:", error);
    }

    setEmail("");
    setPassword("");
  };
  return (
    <>
      <div className="flex justify-center items-center bg-gray-100 w-[100vw] h-[100vh] flex-col">
        <h1 className="font-bold text-4xl mb-8">Signup</h1>
        {error && <p className="font-bold text-red-700 mb-6">{error}</p>}
        <form
          className="flex flex-col items-center gap-7"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-3">
            <label htmlFor="email">email</label>
            <input
              className="w-[300px] h-8"
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="password">Password</label>
            <input
              className="w-[300px] h-8"
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <NavLink to={"/login"} className="w-full text-end hover:text-red-600">
            <p>Already have account?</p>
          </NavLink>
          <button
            className="p-2 pl-12 pr-12 bg-gray-700 rounded-md text-white"
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};

export default SignupPage;
