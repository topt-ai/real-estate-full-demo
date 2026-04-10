import { Link, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Menu, X, Smartphone, MessageCircle, Search } from 'lucide-react';

export default function Layout() {
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6F2] font-sans text-[#1A1A1A]">
      {/* Navigation */}
      <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-40 border-b border-gray-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="text-2xl font-serif tracking-tight text-[#1A1A1A]">
            JARVIS<span className="text-[#C9A84C]">.</span>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm uppercase tracking-widest hover:text-[#C9A84C] transition-colors">
              Inicio
            </Link>
            <Link to="/propiedades" className="text-sm uppercase tracking-widest hover:text-[#C9A84C] transition-colors">
              Propiedades
            </Link>
            <a 
              href="https://wa.me/50372018215?text=Me%20interesa%20tener%20mi%20sitio%20personal%20de%20real%20estate" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm uppercase tracking-widest border border-[#1A1A1A] px-6 py-2 hover:bg-[#1A1A1A] hover:text-white transition-colors"
            >
              Contacto
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-[#1A1A1A]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 py-6 px-6 flex flex-col gap-6 shadow-xl">
            <Link to="/" className="text-lg tracking-widest uppercase">Inicio</Link>
            <Link to="/propiedades" className="text-lg tracking-widest uppercase">Propiedades</Link>
            <a 
              href="https://wa.me/50372018215?text=Me%20interesa%20tener%20mi%20sitio%20personal%20de%20real%20estate" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-lg tracking-widest uppercase text-[#C9A84C]"
            >
              Contacto
            </a>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        {isBannerVisible && (
          <div className="bg-[#1A1A1A] text-white py-2 px-4 flex justify-between items-center text-xs md:text-sm shadow-sm relative z-30">
            <div className="mx-auto text-center flex-1 pr-4">
              Este es un sitio demo. Las propiedades mostradas son solo para demostración. ¿Quieres uno así para tu negocio?{' '}
              <a href="https://calendly.com/tommy-tuwebsv/30min" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] hover:underline inline-block mt-1 md:mt-0 md:ml-1 font-medium">
                → Agenda una llamada gratis
              </a>
            </div>
            <button onClick={() => setIsBannerVisible(false)} className="text-gray-400 hover:text-white flex-shrink-0" aria-label="Cerrar banner">
              <X size={16} />
            </button>
          </div>
        )}
        <Outlet />
      </main>

      {/* New Section Before Footer */}
      <section className="w-full bg-[#F8F6F2] py-24 px-6 border-t border-gray-200">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-[#C9A84C] text-sm font-bold uppercase tracking-widest mb-4 block">
            TU MARCA PERSONAL
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-6">
            Deja de depender de Marketplace.
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-16 max-w-3xl mx-auto">
            Los mejores agentes no esperan que los clientes los encuentren en Encuentra24, construyen su propia marca, su propio espacio, sus propias reglas. Tu sitio web personal: muestra tus propiedades, genera confianza y convierte visitas en consultas directo a tu WhatsApp.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {/* Benefit 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 text-[#C9A84C]">
                <Smartphone size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-medium text-[#1A1A1A] mb-3">Tus listings, tu marca</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Sube propiedades nuevas desde tu celular o laptop desde donde sea. Sin depender de nadie.
              </p>
            </div>
            
            {/* Benefit 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 text-[#C9A84C]">
                <MessageCircle size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-medium text-[#1A1A1A] mb-3">Leads directo a WhatsApp</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Cada propiedad tiene un botón que conecta al comprador contigo al instante.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 text-[#C9A84C]">
                <Search size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-medium text-[#1A1A1A] mb-3">Aparece en Google</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Tu sitio refuerza tu presencia local y te ayuda a rankear cuando alguien busca un agente en tu zona.
              </p>
            </div>
          </div>

          <a 
            href="https://calendly.com/tommy-tuwebsv/30min" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-[#C9A84C] text-white px-8 py-4 uppercase tracking-widest text-sm hover:bg-[#b09342] transition-colors"
          >
            Quiero mi sitio web
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <Link to="/" className="text-3xl font-serif tracking-tight mb-6 block">
              JARVIS<span className="text-[#C9A84C]">.</span>
            </Link>
            <p className="text-gray-400 font-light leading-relaxed max-w-sm">
              Encontrando el hogar que mereces. Bienes raíces exclusivos en El Salvador.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm uppercase tracking-widest mb-6 text-[#C9A84C]">Contacto</h4>
            <div className="flex flex-col gap-4 text-gray-400 font-light">
              <a href="https://wa.me/50372018215" className="hover:text-white transition-colors">
                +503 7201 8215
              </a>
              <a href="mailto:hola@tuwebsv.com" className="hover:text-white transition-colors">
                hola@tuwebsv.com
              </a>
              <p>San Salvador, El Salvador</p>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-800 flex flex-col items-center gap-4">
          <p className="text-xs text-gray-400 uppercase tracking-widest text-center max-w-2xl leading-relaxed">
            &copy; 2026 Jarvis Real Estate. Sitio de demostración, las propiedades mostradas son ficticias.
          </p>
          <p className="text-xs text-gray-500">
            Sitio demo creado por <a href="https://tuwebsv.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline">TuWebSV</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
