export default function Footer() {
  return (
    <footer className="bg-white/40 text-yellow-50 py-8 mt-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-lg font-bold text-rose-500">
          💅 Bienvenido a Serenity Nails
        </div>
        <div className="flex gap-6">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            className="text-rose-500 hover:text-yellow-900 transition"
          >
            Facebook
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            className="text-rose-500 hover:text-yellow-900 transition"
          >
            Instagram
          </a>
        </div>
        <div className="text-sm text-rose-500">
          &copy; {new Date().getFullYear()} Serenity Salon. Todos los derechos
          reservados.
        </div>
      </div>
    </footer>
  );
}
