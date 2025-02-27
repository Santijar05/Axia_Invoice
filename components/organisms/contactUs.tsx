export default function ContactUs() {
    return (
      <section
        id="contact"
        className="relative overflow-hidden bg-black py-20 flex flex-col items-center justify-center"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/30 via-black/90 to-black opacity-95 blur-[100px]" />
  
        <div className="relative z-10 max-w-4xl px-4 text-center mt-10">
          <h2 className="text-4xl font-bold text-white mb-4">Contáctanos</h2>
          <p className="text-gray-300 mb-8 text-lg mb-10">
            Si tienes alguna pregunta o deseas más información, no dudes en ponerte en contacto con nosotros.
          </p>
  
          <form className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Nombre"
                className="w-full p-4 rounded-lg bg-white/10 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-homePrimary-200"
              />
            </div>

            <div>
              <input
                type="email"
                placeholder="Correo electrónico"
                className="w-full p-4 rounded-lg bg-white/10 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-homePrimary-200"
              />
            </div>
  
            <div>
              <input
                type="text"
                placeholder="Teléfono (opcional)"
                className="w-full p-4 rounded-lg bg-white/10 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-homePrimary-200"
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="Asunto"
                className="w-full p-4 rounded-lg bg-white/10 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-homePrimary-200"
              />
            </div>
  
            <div>
                <textarea
                    placeholder="Mensaje"
                    className="w-full h-40 p-4 rounded-lg bg-white/10 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-homePrimary-200"
                />
            </div>
  
            <button
              type="submit"
              className="bg-homePrimary hover:bg-primary text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
            >
              Enviar Mensaje
            </button>
          </form>
        </div>
      </section>
    );
  }
  