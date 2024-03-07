import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      try {
        const parsedToken = JSON.parse(token);
        if (parsedToken) {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted:", { email, password });
    try {
      const response = await axios.post(
        "http://localhost:3000/authenticate/login",
        {
          email,
          password,
        }
      );
      if (response?.data?.status) {
        localStorage.setItem(
          "userToken",
          JSON.stringify(response?.data?.token)
        );
        localStorage.setItem(
          "sessionId",
          JSON.stringify(response?.data?.sessionId)
        );
        console.log("logined");
        navigate("/");
      } else {
        console.log(response?.data?.msg);
        setError(response?.data?.msg);
      }
      console.log("Authentication successful");
      console.log(response?.data); // Assuming backend sends back some data upon successful authentication
    } catch (error) {
      console.error("Authentication failed:", error);
      setError(error?.response?.data?.msg);
    }

    setEmail("");
    setPassword("");
  };
  return (
    <>
      <div className="flex justify-center items-center bg-gray-100 w-[100vw] h-[100vh] flex-col">
        <h1 className="font-bold text-4xl mb-8">Login</h1>
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
          <NavLink
            to={"/signup"}
            className="w-full text-end hover:text-red-600"
          >
            <p>Create new account</p>
          </NavLink>
          <button
            className="p-2 pl-12 pr-12 bg-gray-700 rounded-md text-white"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
