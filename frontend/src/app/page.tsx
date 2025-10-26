import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Servicios from "@/components/Servicios";
import Ubicacion from "@/components/Ubicacion";

export default function Home() {
  return (
    <main className="bg-linear-to-b from-rose-50 to-rose-100">
      <Header />
      <Hero />
      <Servicios />
      <Ubicacion />
      <Footer />
    </main>
  );
}
