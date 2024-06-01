import {createBrowserRouter} from "react-router-dom";
import App from "./App";
import Base from "./pages/home/Home";
import NotFound from "./shared/NotFound";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Admin from "./pages/admin/Admin"
import User from "./pages/user/User";
import Questions from "./pages/admin/ManageQuestiosn/Questions";
import AddQuestion from "./pages/admin/ManageQuestiosn/AddQuestion";
import UpdateQuestion from "./pages/admin/ManageQuestiosn/UpdateQuestion";
import Responses from "./pages/admin/ManageResponses/Responses";
import AddResponse from "./pages/admin/ManageResponses/AddResponse";
import UpdateResponse from "./pages/admin/ManageResponses/UpdateResponse";
import Users from "./pages/admin/ManageUsers/Users";
import AddUser from "./pages/admin/ManageUsers/AddUser";
import UpdateUser from "./pages/admin/ManageUsers/UpdateUser";
import Test from "./pages/user/pages/Test";
import History from "./pages/user/pages/History";
import QuestionDetails from "./pages/admin/ManageQuestiosn/QuestionDetails";
import ResponseDetails from "./pages/admin/ManageResponses/ResponseDetails";
import UserDetails from "./pages/admin/ManageUsers/UserDetails";
import GuestAuth from "./middleware/GuestAuth";
import UserAuth from "./middleware/UserAuth";
import AdminAuth from "./middleware/AdminAuth";
import UnapprovedUsers from "./pages/admin/ManageUsers/UnapprovedUsers";
import Result from "./pages/user/componenets/Result";

export const router = createBrowserRouter([
    {
        path: "",
        element: <App />,
        children: [
            {
                path: "",
                element: <Base />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/contact",
                element: <Contact />,
            },
            {
                element: <GuestAuth />,
                children: [
                    {
                        path: "/login",
                        element: <Login />,
                    },
                    {
                        path: "/register",
                        element: <Register />,
                    },
                ]
            },
            {
                path: "/admin",
                element: <AdminAuth />,
                children: [
                    {
                        path: "",
                        element: <Admin />,
                    },
                    {
                        path: "my-profile",
                        element: <Admin />,
                    },
                    {
                        path: "unapproved-users",
                        element: <UnapprovedUsers />,
                    },
                    {
                        path: "manage-users",
                        children: [
                            {
                                path: "",
                                element: <Users />,
                            },
                            {
                                path: ":id",
                                element: <UserDetails/>,
                            },
                            {
                                path: "add",
                                element: <AddUser/>,
                            },
                            {
                                path: "update/:id",
                                element: <UpdateUser />,
                            },
                        ]
                    },
                    {
                        path: "manage-questions",
                        children: [
                            {
                                path: "",
                                element: <Questions />,
                            },
                            {
                                path: ":id",
                                element: <QuestionDetails/>,
                            },
                            {
                                path: "add",
                                element: <AddQuestion/>,
                            },
                            {
                                path: "update/:id",
                                element: <UpdateQuestion />,
                            },
                        ]
                    },
                    {
                        path: "manage-responses",
                        children: [
                            {
                                path: "",
                                element: <Responses />,
                            },
                            {
                                path: ":id",
                                element: <ResponseDetails/>,
                            },
                            {
                                path: "add",
                                element: <AddResponse/>,
                            },
                            {
                                path: "update/:id",
                                element: <UpdateResponse />,
                            },
                        ]
                    },
                ]
            },
            {
                path: "/user",
                element: <UserAuth />,
                children: [
                    {
                        path: "",
                        element: <User />,
                    },
                    {
                        path: "my-profile",
                        element: <User />,
                    },
                    {
                        path: "test",
                        element: <Test />,
                    },
                    {
                        path: "result",
                        element: <Result />,
                    },
                    {
                        path: "history",
                        element: <History />,
                    },
                ]
            },
            {
                path: "*",
                element: <NotFound/>,
            },
        ]
    },
]);