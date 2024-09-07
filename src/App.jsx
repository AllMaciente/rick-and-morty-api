import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ConsumoApiRick from "./pages/ConsumoApiRick";

function App() {
  return (
    <>
      <Header />
      <main>
        <ConsumoApiRick />
      </main>
      <Footer />
    </>
  );
}

export default App;
