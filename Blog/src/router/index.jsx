import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import { ProtectedAuth } from '../components/index.js';
import Login from '../pages/Login.jsx';
import Signup from '../pages/SignUp.jsx';
import AllPosts from '../pages/AllPosts.jsx';
import AddPost from '../pages/AddPost.jsx';
import EditPost from '../pages/EditPost.jsx';
import Post from '../pages/Post.jsx'
import App from '../App.jsx'


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/Login",
                element: (
                    <ProtectedAuth authentication={false}>
                        <Login />
                    </ProtectedAuth>
                )
            },
            {
                path: "/signup",
                element: (
                    <ProtectedAuth authentication={false}>
                        <Signup />
                    </ProtectedAuth>
                ),
            },
            {
                path: "/all-posts",
                element: (
                    <ProtectedAuth authentication>
                        {" "}
                        <AllPosts />
                    </ProtectedAuth>
                ),
            },
            {
                path: "/add-post",
                element: (
                    <ProtectedAuth authentication>
                        {" "}
                        <AddPost />
                    </ProtectedAuth>
                ),
            },
            {
                path: "/edit-post/:slug",
                element: (
                    <ProtectedAuth authentication>
                        {" "}
                        <EditPost />
                    </ProtectedAuth>
                ),
            },
            {
                path: "/post/:slug",
                element: <Post />,
            },
        ]
    }
]);

export default router;
