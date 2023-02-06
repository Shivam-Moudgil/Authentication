import { useState } from "react";
import "./App.css";
import Navbar from "./component/Navbar";
import AllRoutes from "./pages/AllRoutes";
import Footer from "./pages/Footer";

function App() {
  const [render,setRender]=useState(1)
  const token = JSON.parse(localStorage.getItem("role"));
  const form = () => {
  setRender(render+1)
}
  return (
    <>
      <Navbar render={render} form={form} token={token} />
      <AllRoutes form={form} />
      <Footer />
    </>
  );
}

export default App;
