import { Outlet } from "react-router-dom";

import NavBar from "../components/Navbar";
import Container from "../components/Container";
import Footer from "../components/Footer";

export default function BasicLayout() {
  return (
    <>
      <header>
        <Container>
          <NavBar />
        </Container>
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
