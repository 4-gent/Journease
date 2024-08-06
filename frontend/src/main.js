import "./public/main.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Background from "./components/Background";

export default function Main() {
  return (
    <Background>
      {
        <>
          <Header />
          <Hero />
          <Footer />
        </>
      }
    </Background>
  );
}
