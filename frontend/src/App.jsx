import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Navbar from "./components/Navbar/Navbar";
import { UserProvider } from "./Contexts/UserContext";

const App = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <img
        src="https://i.pinimg.com/736x/f8/9b/c5/f89bc54334366132d53787d1f9e321b2.jpg"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover opacity-70 -z-10"
      />
      <div className="absolute inset-0 bg-black/10 -z-10" />
      <Router>
        <UserProvider>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/signup" exact element={<SignUp />} />
          </Routes>
        </UserProvider>
      </Router>
    </div>
  );
};

export default App;
