export default function MisionVision() {
    return (
      <section className="relative overflow-hidden bg-black py-20 flex flex-col items-center justify-center mt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/30 via-black/90 to-black opacity-95 blur-[100px]" />
  
        <div className="z-10 max-w-4xl px-4 mb-8 text-center mb-20">
          <h1 className="text-5xl font-bold text-white mb-4">Axia InvoIce SAS</h1>
          <p className="text-gray-300 text-lg">
            Axia InvoIce S.A.S. es una empresa innovadora en el ámbito de la tecnología financiera, especializada en el desarrollo de software de contabilidad y facturación electrónica. Fundada en 2023, nos comprometemos a transformar la gestión empresarial mediante soluciones eficientes y seguras que potencien el crecimiento y la productividad.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 z-10 max-w-4xl px-4">
          <div className="bg-white/10 p-6 rounded-lg shadow-lg text-center backdrop-blur-sm w-full md:w-[45%]">
            <h2 className="text-2xl font-semibold text-white mb-4">Misión</h2>
            <p style={{ textAlign: 'justify' }} className="text-gray-300">
              En Axia Invoice SAS, nos dedicamos a simplificar y optimizar la gestión financiera y contable de las empresas a través de soluciones tecnológicas innovadoras. Nuestro software de contabilidad y facturación electrónica está diseñado para ser intuitivo, eficiente y seguro, permitiendo a nuestros clientes ahorrar tiempo, reducir costos y cumplir con las normativas vigentes. Nos comprometemos a ofrecer herramientas que impulsen el crecimiento y la productividad de nuestros usuarios, brindando un soporte excepcional y adaptándonos a sus necesidades en constante evolución.
            </p>
          </div>
  
          <div className="bg-white/10 p-6 rounded-lg shadow-lg text-center backdrop-blur-sm w-full md:w-[45%]">
            <h2 className="text-2xl font-semibold text-white mb-4">Visión</h2>
            <p style={{ textAlign: 'justify' }} className="text-gray-300">
              Ser reconocidos como líderes en el desarrollo de software de contabilidad y facturación electrónica en América Latina para 2030. Aspiramos a transformar la manera en que las empresas gestionan sus finanzas, siendo sinónimo de innovación, confiabilidad y excelencia en el servicio. A través de la tecnología de vanguardia y un enfoque centrado en el cliente, buscamos empoderar a las empresas para que alcancen su máximo potencial, contribuyendo así al desarrollo económico y tecnológico de la región.
            </p>
          </div>
        </div>
      </section>
    );
  }
  