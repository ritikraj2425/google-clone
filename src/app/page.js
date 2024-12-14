import Navbar from "./components/navbar";
import Main from "./components/main";
import Footer from "./components/footer";

export default function Home() {
  return (
    <div className="bg-[#202124] relative min-h-screen">
      <Navbar/>
      <Main/>
      <Footer/>
    </div>
  );
}
