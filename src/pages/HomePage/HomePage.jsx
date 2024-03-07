import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import deleteicon from "../../assets/icons/delete.svg";
import add from "../../assets/icons/add.svg";
import downArrow from "../../assets/icons/downArrow.svg";
import down from "../../assets/icons/down.svg";
import Modal from "../../components/Modal/Modal";
const HomePage = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [chapters, setChapters] = useState();
  const [topic, setTopic] = useState();
  const [openChapterInput, setopenChapterInput] = useState("");
  const [openTopicInput, setopenTopicInput] = useState(null);
  const [inputChapter, setInputChapter] = useState("");
  const [showTopic, setShowTopic] = useState("");
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true);
    const token = localStorage.getItem("userToken");
    if (!token) {
      navigate("/login");
    }
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    const course = await axios.get("http://localhost:3000/course");
    console.log(course, "this is courses");
    if (course) {
      setCourses(course.data.courses);
      setLoader(false);
    }
  };
  const submitTopic = async (id) => {
    const chapter = await axios.post(
      `http://localhost:3000/course/addchapter`,
      {
        courseId: id,
        title: inputChapter,
      }
    );
    setInputChapter("");
    const courseData = chapter?.data?.updatedCourse;
    setCourses((prevCourses) => {
      return prevCourses.map((course) => {
        if (course._id === courseData._id) {
          return courseData; // Updated course details
        }
        return course;
      });
    });
    console.log(chapter, "this is updated chapter and topoic");
  };

  // const onClose = () => {
  //   setopenTopicInput("");
  // };
  const onSubmit = async (form, id, courseId) => {
    const topic = await axios.post(`http://localhost:3000/course/addtopic`, {
      form,
      id,
    });
    console.log(form, id, topic, "thisisform");
    setCourses((prevCourses) => {
      return prevCourses.map((course) => {
        if (course._id === courseId) {
          return {
            ...course,
            chapters: course.chapters.map((chapter) => {
              if (chapter._id === topic.data.chapter._id) {
                return topic.data.chapter;
              }
              return chapter;
            }),
          };
        }
        return course;
      });
    });
  };
  return (
    <div className="flex flex-col gap-3 p-3 min-h-[calc(100vh-80px)] bg-red-400 text-white">
      <h1 className="text-black">Courses</h1>
      {!loader ? (
        <div className="flex flex-col gap-3 m-3 text-white">
          {courses.length === 0 && <h1> currently no course avaliable now</h1>}
          {courses.map((course) => {
            console.log(course, "thissadfasdf");
            return (
              <div
                key={course._id}
                className=" flex bg-gray-500 p-2 rounded-md justify-between"
              >
                <div className="flex justify-center flex-col  gap-1 w-full ">
                  <div className="flex flex-row w-full justify-between">
                    <h1 className="font-bold cursor-pointer">
                      {course?.title}
                    </h1>
                    <ul className="flex gap-1 h-full justify-center items-center ">
                      <li className=" cursor-pointer">
                        <img src={deleteicon} alt="" width={15} height={15} />
                      </li>
                      <li
                        onClick={() =>
                          setopenChapterInput((pre) => {
                            return pre === course._id ? "" : course._id;
                          })
                        }
                        className="cursor-pointer"
                      >
                        <img src={add} alt="" width={15} height={15} />
                      </li>
                      <li
                        className="cursor-pointer"
                        onClick={() =>
                          setChapters((pre) => {
                            return pre === course._id ? "" : course._id;
                          })
                        }
                      >
                        <img src={downArrow} alt="" width={15} height={15} />
                      </li>
                    </ul>
                  </div>
                  {openChapterInput === course?._id && (
                    <div className="flex items-center ">
                      <input
                        className="rounded-md h-8 text-black"
                        type="text"
                        id="chapter"
                        name="chapter"
                        value={inputChapter}
                        onChange={(e) => setInputChapter(e.target.value)}
                        required
                      />
                      <div className="flex gap-2 p-1">
                        <button
                          onClick={() => submitTopic(course?._id)}
                          className="flex items-center justify-center"
                        >
                          {/* <img src={add} alt="add" width={15} height={15} /> */}
                          Add
                        </button>
                        <button
                          onClick={() => setopenChapterInput("")}
                          className="flex items-center justify-center"
                        >
                          cancel
                        </button>
                      </div>
                    </div>
                  )}
                  {/** HERE CHAPTERS START */}
                  {chapters == course?._id && (
                    <div className=" flex flex-col w-full gap-2">
                      {course?.chapters?.length > 0 ? (
                        course?.chapters?.map((chapter) => {
                          return (
                            <div
                              key={chapter?._id}
                              className="flex flex-col w-full bg-amber-200 justify-between"
                            >
                              <div className="flex flex-row  justify-between items-center p-2">
                                <div className="flex flex-col">
                                  Chapter: {chapter?.title}
                                  {openTopicInput === chapter?._id && (
                                    <Modal
                                      onClose={() => setopenTopicInput(null)}
                                      onSubmit={onSubmit}
                                      chapterId={chapter?._id}
                                      courseId={course?._id}
                                    />
                                  )}
                                  {/* {openTopicInput === chapter._id && (
                                <div className="flex items-center">
                                  <input
                                    className="rounded-md h-8 text-black"
                                    type="text"
                                    id="chapter"
                                    name="chapter"
                                    value={inputTopic}
                                    onChange={(e) =>
                                      setInputTopic(e.target.value)
                                    }
                                    required
                                  />
                                  <div onClick={() => submitTopic(course._id)}>
                                    <button className="flex items-center justify-center">
                                      <img
                                        src={add}
                                        alt="add"
                                        width={15}
                                        height={15}
                                      />
                                      Add
                                    </button>
                                  </div>
                                </div>
                              )} */}
                                </div>
                                <div className="flex">
                                  <div
                                    onClick={() =>
                                      setopenTopicInput(chapter?._id)
                                    }
                                  >
                                    <img
                                      src={add}
                                      alt="add"
                                      width={15}
                                      height={15}
                                    />
                                  </div>

                                  <div
                                    className=""
                                    onClick={() =>
                                      setTopic((pre) => {
                                        return pre === chapter?._id
                                          ? ""
                                          : chapter?._id;
                                      })
                                    }
                                  >
                                    <img
                                      src={downArrow}
                                      alt="down"
                                      width={15}
                                      height={15}
                                    />
                                  </div>
                                </div>
                              </div>

                              {/** HERE TOPOIC STARTS */}
                              {topic === chapter._id && (
                                <div>
                                  {chapter?.topics?.length > 0 ? (
                                    <div className="flex flex-col gap-2">
                                      {chapter?.topics?.map((topic) => {
                                        return (
                                          <div
                                            key={topic._id}
                                            className="flex flex-col bg-gray-600 m-1 rounded-md"
                                          >
                                            <div className=" p-1 rounded-md flex justify-between">
                                              <h1>topic: {topic?.title}</h1>
                                              <img
                                                src={down}
                                                alt="arrow"
                                                width={15}
                                                height={15}
                                                onClick={() =>
                                                  setShowTopic((pre) =>
                                                    pre === topic._id
                                                      ? ""
                                                      : topic._id
                                                  )
                                                }
                                              />
                                            </div>
                                            {topic._id === showTopic && (
                                              <div className="mm-1 p-1">
                                                <p>Content: {topic.content}</p>
                                                <p>
                                                  Description:{" "}
                                                  {topic.description}
                                                </p>
                                                <p>
                                                  attachments:
                                                  {topic.attachments.length >
                                                  0 ? (
                                                    topic.attachments.map(
                                                      (item) => {
                                                        return (
                                                          <h1 key={item}>
                                                            {item}
                                                          </h1>
                                                        );
                                                      }
                                                    )
                                                  ) : (
                                                    <span>
                                                      current no attachment
                                                    </span>
                                                  )}
                                                </p>
                                              </div>
                                            )}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  ) : (
                                    <div> currently no topics</div>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })
                      ) : (
                        <div className="flex gap-3 w-full flex-col ">
                          <div className="flex flex-row gap-5">
                            <h1> Currently no chapter</h1>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {/* <div className="w-[20%]">
              <ul className="flex gap-1 h-full justify-center items-start ">
                <li className=" cursor-pointer">
                  <img src={deleteicon} alt="" width={15} height={15} />
                </li>
                <li
                  onClick={() =>
                    setopenChapterInput((pre) => {
                      return pre === course._id ? "" : course._id;
                    })
                  }
                  className="cursor-pointer"
                >
                  <img src={add} alt="" width={15} height={15} />
                </li>
                <li
                  className="cursor-pointer"
                  onClick={() =>
                    setChapters((pre) => {
                      return pre === course._id ? "" : course._id;
                    })
                  }
                >
                  <img src={downArrow} alt="" width={15} height={15} />
                </li>
              </ul>
            </div> */}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-black">
          <h1>Loading...</h1>
        </div>
      )}
    </div>
  );
};

export default HomePage;
