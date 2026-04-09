import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Bed, Bath, Square } from 'lucide-react';
import { useEffect } from 'react';
import { useListings } from '../lib/api';
import Gallery from '../components/Gallery';
import WhatsAppButton from '../components/WhatsAppButton';

export default function ListingDetail() {
  const { id } = useParams<{ id: string }>();
  const { listings, loading, error } = useListings();
  
  const listing = listings.find(l => l.id === id);

  useEffect(() => {
    if (listing) {
      document.title = `${listing.titulo} | Jarvis Mendez Real Estate`;
    } else {
      document.title = 'Jarvis Mendez Real Estate';
    }
  }, [listing]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-12 px-6">
        <div className="max-w-7xl mx-auto animate-pulse">
          <div className="h-8 bg-gray-200 w-32 mb-8"></div>
          <div className="w-full aspect-[21/9] bg-gray-200 mb-12"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <div className="h-12 bg-gray-200 w-3/4 mb-6"></div>
              <div className="h-6 bg-gray-200 w-1/4 mb-12"></div>
              <div className="h-4 bg-gray-200 w-full mb-4"></div>
              <div className="h-4 bg-gray-200 w-full mb-4"></div>
              <div className="h-4 bg-gray-200 w-2/3"></div>
            </div>
            <div className="lg:col-span-1">
              <div className="h-[300px] bg-gray-200 w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="min-h-screen bg-[#F8F6F2] flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-serif text-[#1A1A1A] mb-6">Propiedad no encontrada</h1>
          <p className="text-[#2C2C2C] font-light mb-8">La propiedad que busca no existe o ya no está disponible.</p>
          <Link 
            to="/propiedades" 
            className="inline-flex items-center gap-2 text-[#1A1A1A] uppercase tracking-widest text-sm border-b border-[#1A1A1A] pb-1"
          >
            <ArrowLeft size={16} /> Volver a propiedades
          </Link>
        </div>
      </div>
    );
  }

  const currentUrl = window.location.href;

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Back Link */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Link 
          to="/propiedades" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#1A1A1A] uppercase tracking-widest text-xs transition-colors"
        >
          <ArrowLeft size={14} /> Volver a propiedades
        </Link>
      </div>

      {/* Gallery */}
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 mb-16">
        <Gallery photos={listing.fotos} title={listing.titulo} />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Main Details */}
          <div className="lg:col-span-8">
            <div className="mb-12">
              <div className="flex items-center gap-2 text-[#C9A84C] mb-4">
                <MapPin size={18} />
                <span className="uppercase tracking-widest text-sm font-medium">{listing.ubicacion}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#1A1A1A] mb-8 leading-tight">
                {listing.titulo}
              </h1>
              
              <div className="flex flex-wrap items-center gap-8 py-6 border-y border-gray-100 text-[#2C2C2C]">
                <div className="flex items-center gap-3">
                  <Bed size={24} className="text-[#C9A84C]" />
                  <div>
                    <p className="text-xl font-light">{listing.habitaciones}</p>
                    <p className="text-xs uppercase tracking-widest text-gray-500">Habitaciones</p>
                  </div>
                </div>
                <div className="w-px h-10 bg-gray-200 hidden sm:block"></div>
                <div className="flex items-center gap-3">
                  <Bath size={24} className="text-[#C9A84C]" />
                  <div>
                    <p className="text-xl font-light">{listing.banos}</p>
                    <p className="text-xs uppercase tracking-widest text-gray-500">Baños</p>
                  </div>
                </div>
                <div className="w-px h-10 bg-gray-200 hidden sm:block"></div>
                <div className="flex items-center gap-3">
                  <Square size={24} className="text-[#C9A84C]" />
                  <div>
                    <p className="text-xl font-light">{listing.metros}</p>
                    <p className="text-xs uppercase tracking-widest text-gray-500">Metros</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none text-[#2C2C2C] font-light leading-relaxed">
              <h3 className="text-2xl font-serif text-[#1A1A1A] mb-6">Descripción</h3>
              {listing.descripcion.split('\n').map((paragraph, idx) => (
                <p key={idx} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Sidebar / Sticky CTA */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 bg-[#F8F6F2] p-8 md:p-10 border border-gray-100">
              <p className="text-sm uppercase tracking-widest text-gray-500 mb-2">Precio</p>
              <p className="text-4xl md:text-5xl font-light text-[#1A1A1A] mb-10">
                {listing.precio}
              </p>
              
              <div className="mb-10">
                <p className="text-sm text-[#2C2C2C] mb-6 font-light">
                  ¿Interesado en esta propiedad? Contáctenos directamente por WhatsApp para programar una visita o solicitar más información.
                </p>
                <WhatsAppButton 
                  whatsapp={listing.whatsapp}
                  titulo={listing.titulo}
                  pageUrl={currentUrl}
                  className="w-full py-4 text-lg"
                />
              </div>
              
              <div className="border-t border-gray-200 pt-8 mt-8 flex items-center gap-4">
                <img 
                  src="https://picsum.photos/seed/agent/150/150" 
                  alt="Jarvis Mendez" 
                  className="w-16 h-16 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <p className="font-serif text-lg text-[#1A1A1A]">Jarvis Mendez</p>
                  <p className="text-xs uppercase tracking-widest text-[#C9A84C]">Agente Principal</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
