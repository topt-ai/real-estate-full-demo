import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] bg-[#F8F6F2] flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <h1 className="text-8xl font-serif text-[#C9A84C] mb-6">404</h1>
        <h2 className="text-3xl font-serif text-[#1A1A1A] mb-6">Página no encontrada</h2>
        <p className="text-[#2C2C2C] font-light mb-10 leading-relaxed">
          Lo sentimos, la página que está buscando no existe o ha sido movida.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center gap-3 bg-[#1A1A1A] text-white px-8 py-4 uppercase tracking-widest text-sm hover:bg-[#C9A84C] transition-colors duration-300"
        >
          <ArrowLeft size={18} /> Volver al inicio
        </Link>
      </div>
    </div>
  );
}
