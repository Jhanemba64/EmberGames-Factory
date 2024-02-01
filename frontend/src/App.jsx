import { Outlet } from "react-router-dom";
import { useState } from "react";
import NavBar from "./components/Navbar";
import "./index.css";
import BasketProvider from "./context/BasketContext";
import FavoritProvider from "./context/FavoritContext";

function App() {
  const [user, setUser] = useState("");

  return (
    <div className="relative">
      <div className="absolute inset-0 ">
        <iframe
          src="https://www.youtube.com/embed/OrX8K0BUebU?autoplay=1&mute=1&loop=1&playlist=OrX8K0BUebU"
          className="video-background w-full h-full sm:h-100 md:block "
          allow="autoplay; encrypted-media "
          title="Video background"
        />
      </div>
      <FavoritProvider>
        <BasketProvider>
          <div className="relative ">
            <NavBar user={user} setUser={setUser} />
            <Outlet context={{ user, setUser }} />
          </div>
        </BasketProvider>
      </FavoritProvider>
    </div>
  );
}

export default App;
