import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateCourse = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      navigate("/login");
    }
  }, []);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    category: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const course = await axios.post(
      "http://localhost:3000/course/createcourse",
      {
        formData,
      }
    );
    console.log(course);
    if (course) {
      alert("course added");
      setFormData({
        title: "",
        description: "",
        duration: "",
        category: "",
      });
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div className="flex flex-col w-full h-[calc(100vh-80px)]  p-4 items-center gap-5  bg-red-50">
      <h1 className="text-5xl font-bold"> Create Course </h1>
      <form
        onSubmit={handleSubmit}
        className="flex justify-center h-[70vh] flex-wrap p-3 flex-row items-center gap-3 w-full bg-slate-100 text-black"
      >
        <div className="flex flex-col w-full ">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="rounded-md h-8"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col w-full ">
          <label htmlFor="description">Description</label>
          <textarea
            className="rounded-md max-h-32 h-24 min-h-8 overflow-y-auto"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="w-full flex flex-row  justify-between">
          <div className="flex flex-col w-[45%]">
            <label htmlFor="duration">Duration</label>
            <input
              className="rounded-md h-8"
              type="text"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col w-[45%]">
            <label htmlFor="category">Category</label>
            <input
              className="rounded-md h-8"
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button
          className="p-1 pl-8 pr-8 rounded-md text-white bg-rose-700 hover:bg-rose-600 "
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
