export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative h-screen flex items-center justify-center overflow-hidden shadow-xl"
    >
      <img
        src="/hero.jpg"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      ></img>
      <div className="relative z-10 text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold text-rose-400 drop-shadow-lg mb-6">
          💅 Bienvenido a Serenity Nails
        </h1>
        <p className="text-lg md:text-2xl text-rose-400 mb-8">
          Transforma tus uñas con arte, color y cuidado profesional en Serenity
          Nails
        </p>
        <a
          href="#servicios"
          className="bg-rose-400 hover:bg-rose-500 text-white font-semibold px-8 py-4 rounded-full shadow-lg transition-all"
        >
          Ver Servicios
        </a>
      </div>
    </section>
  );
}
