import { Link, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Menu, X, Instagram, Facebook, Mail } from 'lucide-react';
import { useState } from 'react';

export default function Layout() {
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
              href="https://wa.me/50372018215" 
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
              href="https://wa.me/50372018215" 
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
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
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
              <a href="mailto:info@jarvisrealestate.com" className="hover:text-white transition-colors">
                info@jarvisrealestate.com
              </a>
              <p>San Salvador, El Salvador</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm uppercase tracking-widest mb-6 text-[#C9A84C]">Síguenos</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-white hover:text-[#1A1A1A] hover:border-white transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-white hover:text-[#1A1A1A] hover:border-white transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-white hover:text-[#1A1A1A] hover:border-white transition-all">
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-800 text-xs text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4 uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} Jarvis Real Estate. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-300">Política de Privacidad</a>
            <a href="#" className="hover:text-gray-300">Términos de Servicio</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
