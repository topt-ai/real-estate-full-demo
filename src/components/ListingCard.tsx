import { Link } from 'react-router-dom';
import { Bed, Bath, Square } from 'lucide-react';
import { Listing } from '../lib/api';
import WhatsAppButton from './WhatsAppButton';

interface ListingCardProps {
  listing: Listing;
  key?: string | number;
}

export default function ListingCard({ listing }: ListingCardProps) {
  const firstPhoto = listing.fotos[0] || 'https://picsum.photos/seed/house/800/600';
  const listingUrl = `${window.location.origin}/propiedades/${listing.id}`;

  return (
    <div className="group flex flex-col bg-white border border-gray-100 hover:border-[#C9A84C] transition-all duration-500 shadow-sm hover:shadow-xl hover:-translate-y-1 h-full">
      <Link to={`/propiedades/${listing.id}`} className="block relative aspect-[4/3] overflow-hidden">
        <img 
          src={firstPhoto} 
          alt={listing.titulo} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold tracking-wider uppercase text-[#1A1A1A]">
          {listing.ubicacion}
        </div>
      </Link>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex-grow">
          <Link to={`/propiedades/${listing.id}`}>
            <h3 className="text-xl font-medium text-[#1A1A1A] mb-2 line-clamp-2 font-serif group-hover:text-[#C9A84C] transition-colors">
              {listing.titulo}
            </h3>
          </Link>
          <p className="text-2xl font-light text-[#1A1A1A] mb-6">
            {listing.precio}
          </p>
          
          <div className="flex items-center gap-6 text-[#2C2C2C] mb-8 border-t border-gray-100 pt-4">
            <div className="flex items-center gap-2">
              <Bed size={18} className="text-[#C9A84C]" />
              <span className="text-sm">{listing.habitaciones}</span>
            </div>
            <div className="flex items-center gap-2">
              <Bath size={18} className="text-[#C9A84C]" />
              <span className="text-sm">{listing.banos}</span>
            </div>
            <div className="flex items-center gap-2">
              <Square size={18} className="text-[#C9A84C]" />
              <span className="text-sm">{listing.metros}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-auto">
          <WhatsAppButton 
            whatsapp={listing.whatsapp} 
            titulo={listing.titulo} 
            pageUrl={listingUrl} 
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
