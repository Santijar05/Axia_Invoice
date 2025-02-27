export default function AboutUs() {

  return (
    <section
      className="relative overflow-hidden bg-black py-20 flex flex-col items-center justify-center "
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/30 via-black/90 to-black opacity-95 blur-[100px]" />

      <div className="relative z-10 max-w-4xl text-center px-4">
        <h1
          className={`text-4xl font-bold text-white mb-8 transition-all duration-700 ease-out transform`}
        >
          Sobre Nosotros
        </h1>

        <p
          className={`text-gray-300 mb-12 transition-all duration-700 ease-out transform delay-150 `}
        >
          Somos tres estudiantes de Ingeniería de Sistemas apasionados por la tecnología y el desarrollo de software.
          Este proyecto es parte de nuestro aprendizaje y nuestra pasión por crear soluciones innovadoras.
        </p>

        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-700 ease-out transform delay-300`}
        >
          <div className="bg-white/10 p-6 rounded-lg shadow-lg text-center backdrop-blur-sm">
            <img
              src="/Images/22495.png"
              alt="Foto de Juan Campos"
              className="w-32 h-32 mx-auto rounded-full mb-4"
            />
            <h3 className="text-xl text-white font-semibold mb-2">Juan Campos</h3>
            <p className="text-gray-300 mb-2">Estudiante de ingenira de sistemas</p>
            <p className="text-gray-400">Fundador</p>
          </div>

          <div className="bg-white/10 p-6 rounded-lg shadow-lg text-center backdrop-blur-sm">
            <img
              src="/Images/22495.png"
              alt="Foto de Santi Jimenez"
              className="w-32 h-32 mx-auto rounded-full mb-4"
            />
            <h3 className="text-xl text-white font-semibold mb-2">Santiago Jimenez</h3>
            <p className="text-gray-300 mb-2">Estudiante de ingenira de sistemas</p>
            <p className="text-gray-400">Fundador</p>
          </div>

          <div className="bg-white/10 p-6 rounded-lg shadow-lg text-center backdrop-blur-sm">
            <img
              src="/Images/22495.png"
              alt="Foto de Jassy"
              className="w-32 h-32 mx-auto rounded-full mb-4"
            />
            <h3 className="text-xl text-white font-semibold mb-2">Jassy</h3>
            <p className="text-gray-300 mb-2">Estudiante de ingenira de sistemas</p>
            <p className="text-gray-400">Fundadora</p>
          </div>
        </div>
      </div>
    </section>
  );
}