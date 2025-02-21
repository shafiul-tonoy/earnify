import { Outlet } from "react-router-dom";

import NavBar from "../components/Navbar";
import Container from "../components/Container";
import Footer from "../components/Footer";

export default function BasicLayout() {
  return (
    <>
      <header>
        <div className="fixed top-0 left-0 right-0 z-[1000] w-screen bg-white">
          <Container>
            <NavBar />
          </Container>
        </div>
      </header>
      <main className="font-content min-h-[calc(100vh-300px)]">
        <Outlet />
      </main>
      <footer className="bg-base-200">
        <Container>
          <Footer />
        </Container>
      </footer>
    </>
  );
}
