import { createBrowserRouter, Outlet } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/Login/Login";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import SignupPage from "./pages/Signup/Signup";
import CreateCourse from "./pages/CreateCourse/CreateCourse";
import Error from "./pages/Error/Error";
const AppLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/createcourse",
        element: <CreateCourse />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <Error />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
    errorElement: <Error />,
  },
]);

export default appRouter;
