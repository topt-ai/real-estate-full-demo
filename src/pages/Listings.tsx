import { useEffect } from 'react';
import { useListings } from '../lib/api';
import ListingCard from '../components/ListingCard';

export default function Listings() {
  const { listings, loading, error } = useListings();

  useEffect(() => {
    document.title = 'Propiedades | Jarvis Acevedo Real Estate';
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F6F2] pt-12 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-serif text-[#1A1A1A] mb-6">Propiedades</h1>
          <p className="text-lg text-[#2C2C2C] font-light max-w-2xl">
            Descubra nuestra exclusiva colección de propiedades en El Salvador. 
            Cada hogar ha sido seleccionado por su diseño excepcional y ubicación privilegiada.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-6 border border-red-100 mb-12">
            <p>Hubo un error al cargar las propiedades. Por favor, intente de nuevo más tarde.</p>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse bg-white border border-gray-100 h-[500px]">
                <div className="w-full h-[300px] bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 w-3/4 mb-4"></div>
                  <div className="h-8 bg-gray-200 w-1/2 mb-8"></div>
                  <div className="h-4 bg-gray-200 w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : listings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white border border-gray-100">
            <h3 className="text-2xl font-serif text-[#1A1A1A] mb-4">No se encontraron propiedades</h3>
            <p className="text-gray-500 font-light">Actualmente no hay propiedades disponibles.</p>
          </div>
        )}
      </div>
    </div>
  );
}
