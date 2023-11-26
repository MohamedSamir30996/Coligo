import "@fortawesome/fontawesome-free/css/all.css";
import AppLayout from "./AppLayout";
import NotFound from "./NotFound/NotFound";
import Register from "./user/Register";
import AuthGuard from "./guards/authGuard";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./user/Login";
import Dashboard from "./Dashboard/Dashboard";
import DashboardLayout from "./DashboardLayout";
import Courses from "./Courses/Courses";
import Announcement from "./Announcement/Announcement";
import Exam from "./Exam/Exam";
import store from "./Redux/store";
import { Provider } from "react-redux";
import Languages from "./LocalizaionTest/Languages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,

    children: [
      { index: true, element: <Login /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      {
        // path: "/",
        element: <DashboardLayout />,
        children: [
          { path: "/dashboard", element: <AuthGuard><Dashboard /></AuthGuard>, errorElement: <NotFound />, },
          { path: "/courses", element: <Courses />, errorElement: <NotFound />, },
          { path: "/announcements", element: <Announcement />, errorElement: <NotFound />, },
          { path: "/exam/:id", element: <Exam />, errorElement: <NotFound />, },
          { path: "/translate", element: <Languages />, errorElement: <NotFound />, },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);


function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
  </Provider>
  )
}

export default App
