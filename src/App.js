import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import CreatePost from "./pages/createPost.js";
import Home from './pages/home.js'
import Login from "./pages/login.js";
import { auth } from "./firebase-config.js";
import { signOut } from "firebase/auth";

function App() {
  
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signOutUser = () => {
    signOut(auth).then(() => {
      localStorage.clear()
      setIsAuth(false)
      window.location.pathname = "/login"
    })
  }

  return (
    <Router>
      <nav className="flex justify-around items-center w-full h-20 text-xl text-center bg-gray-900 text-white">
        <Link to="/" className="w-4/12"> Home </Link>
        {!isAuth ? 
          (
            <Link to="/login" className="w-4/12"> Login </Link>
          ) : (
            <div className="w-8/12 flex justify-around items-center text-center">
              <Link to="/createpost"> Post </Link>
              <button onClick={signOutUser} className="bg-gray-600 rounded-xl p-3"> Log Out </button>
            </div>
          ) 
        }
      </nav>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />}/>
        <Route path="/login" element={<Login setIsAuth={setIsAuth}/>}/>
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />}/>
      </Routes>
    </Router>
  );
}

export default App;
