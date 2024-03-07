import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const logout = async () => {
    const sessionId = localStorage.getItem("sessionId");
    console.log(sessionId, "sessionid");
    const response = await axios.post(
      "http://localhost:3000/authenticate/logout",
      {
        sessionId,
      }
    );
    if (response) {
      localStorage.clear();
      navigate("/login");
    }
  };
  return (
    <div className="w-full h-20 bg-rose-900 flex justify-around items-center">
      <ul className="flex flex-row gap-5">
        <li className="text-white cursor-pointer">
          <NavLink to={"/"}>Home</NavLink>
        </li>
        <li className="text-white cursor-pointer">
          <NavLink to={"createcourse"}>Create course</NavLink>
        </li>
      </ul>
      <button
        className=" p-1 border- pl-8 pr-8 rounded-md text-white border bg-rose-700 border-white hover:bg-rose-600 hover:border-white"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
