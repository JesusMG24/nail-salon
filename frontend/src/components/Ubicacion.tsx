export default function Ubicacion() {
  return (
    <section id="ubicacion" className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-rose-400 text-center mb-12">
        Encuéntranos
      </h2>
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-2/3 h-80 md:h-96">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d465.8048253229762!2d-89.71319477846957!3d20.934894379961793!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e0!3m2!1ses!2smx!4v1761250377046!5m2!1ses!2smx"
            width="100%"
            height="100%"
            className="border-0 rounded-lg"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="w-full md:w-1/3 text-gray-700">
          <p className="mb-4">
            <strong className="text-rose-400">Dirección:</strong> Calle 43,
            Mérida, Yucatán
          </p>
          <p className="mb-4">
            <strong className="text-rose-400">Horario:</strong> Lun-Vie 10:00 -
            18:00
          </p>
          <p className="mb-4">
            <strong className="text-rose-400">Contacto:</strong>{" "}
            <a
              href="tel:+5219996401914"
              className="underline hover:text-yellow-900"
            >
              +52 1 999 640 1914
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
