import { useState, useEffect } from "react"
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      } catch (error) {
        console.log("error in getting user info in :: App.jsx", error)
      } finally {
        setLoading(false);
      }
    })();


  }, [])

  return !loading ? (
    <div className="min-h-screen flex flex-wrap justify-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
