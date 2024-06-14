const basename = import.meta.env.VITE_BASENAME;

// App components
import Header from "./components/Header";
import Footer from "./components/Footer";

// App pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Password from "./pages/Password";
import NotFound from "./pages/NotFound";
import UserSettings from "./pages/UserSettings";

// external
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { unknownUser, userAtom } from "./app/atoms";
import { loadCookie } from "./app/utils";

function App() {
  // verifier si User connecté (cookie ou unknownUser)
  const [, setUser] = useAtom(userAtom);
  useEffect(() => {
    setUser(loadCookie() ? loadCookie() : unknownUser);
  }, [setUser]);
  
  return (
    <BrowserRouter basename={basename}>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password/:action" element={<Password />} />
          <Route path="/user_settings" element={<UserSettings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
