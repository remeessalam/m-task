import { useState } from "react";
import PropTypes from "prop-types";

const Modal = ({ onClose, onSubmit, chapterId, courseId }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    attachments: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, chapterId, courseId);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50 z-50 text-black">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Add New Topic</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block font-semibold mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block font-semibold mb-1">
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block font-semibold mb-1">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="attachments" className="block font-semibold mb-1">
              Attachments
            </label>
            <input
              type="file"
              id="attachments"
              name="attachments"
              multiple
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className=" bg-rose-700 border-white hover:bg-rose-600 text-white px-4 py-2 rounded-md mr-2"
            >
              Submit
            </button>
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  chapterId: PropTypes.string.isRequired,
  courseId: PropTypes.string.isRequired,
};

export default Modal;
