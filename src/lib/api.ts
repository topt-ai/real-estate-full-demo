import { useEffect, useState } from 'react';

export interface Listing {
  id: string;
  titulo: string;
  precio: string;
  ubicacion: string;
  descripcion: string;
  habitaciones: string;
  banos: string;
  metros: string;
  fotos: string[];
  whatsapp: string;
  activo: boolean;
}

const MOCK_LISTINGS: Listing[] = [
  {
    id: '1',
    titulo: 'Villa de Lujo en San Benito',
    precio: '$850,000',
    ubicacion: 'San Benito, San Salvador',
    descripcion: 'Espectacular villa de diseño contemporáneo con acabados de lujo. Cuenta con amplios jardines, piscina privada y seguridad 24/7. Perfecta para familias que buscan exclusividad y confort en la mejor zona de la ciudad.',
    habitaciones: '4',
    banos: '5',
    metros: '650 m²',
    fotos: [
      'https://picsum.photos/seed/villa1/1200/800',
      'https://picsum.photos/seed/villa2/1200/800',
      'https://picsum.photos/seed/villa3/1200/800'
    ],
    whatsapp: '50372018215',
    activo: true
  },
  {
    id: '2',
    titulo: 'Penthouse con Vista al Volcán',
    precio: '$420,000',
    ubicacion: 'Colonia Escalón',
    descripcion: 'Impresionante penthouse de dos niveles con vistas panorámicas a la ciudad y al volcán. Diseño de concepto abierto, terraza privada, y amenidades de primer nivel en el edificio.',
    habitaciones: '3',
    banos: '3.5',
    metros: '320 m²',
    fotos: [
      'https://picsum.photos/seed/penthouse1/1200/800',
      'https://picsum.photos/seed/penthouse2/1200/800',
      'https://picsum.photos/seed/penthouse3/1200/800'
    ],
    whatsapp: '50372018215',
    activo: true
  },
  {
    id: '3',
    titulo: 'Casa Moderna en Santa Elena',
    precio: '$550,000',
    ubicacion: 'Santa Elena, Antiguo Cuscatlán',
    descripcion: 'Hermosa residencia a estrenar en residencial privado. Iluminación natural, techos altos, cocina italiana y un amplio jardín ideal para reuniones sociales.',
    habitaciones: '3',
    banos: '4',
    metros: '450 m²',
    fotos: [
      'https://picsum.photos/seed/modernhouse1/1200/800',
      'https://picsum.photos/seed/modernhouse2/1200/800'
    ],
    whatsapp: '50372018215',
    activo: true
  }
];

export async function fetchListings(): Promise<Listing[]> {
  try {
    const url = 'https://docs.google.com/spreadsheets/d/1qGezW2qSMzriidC2ap8w1kKfh80WBab6SbXoCmymZCA/gviz/tq?tqx=out:json&sheet=Sheet1';
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const text = await response.text();
    const jsonString = text.match(/google\.visualization\.Query\.setResponse\(([\s\S\w]+)\);/)?.[1];
    
    if (!jsonString) {
      throw new Error('Formato de respuesta inválido');
    }
    
    const data = JSON.parse(jsonString);
    const rows = data.table.rows;
    
    const listings: Listing[] = rows.map((row: any) => {
      const c = row.c;
      const activoVal = c[10]?.v;
      const isActivo = activoVal === true || activoVal === 'TRUE' || activoVal === 'true' || activoVal === 1;
      
      return {
        id: c[0]?.v?.toString() || '',
        titulo: c[1]?.v?.toString() || '',
        precio: c[2]?.v?.toString() || '',
        ubicacion: c[3]?.v?.toString() || '',
        descripcion: c[4]?.v?.toString() || '',
        habitaciones: c[5]?.v?.toString() || '',
        banos: c[6]?.v?.toString() || '',
        metros: c[7]?.v?.toString() || '',
        fotos: c[8]?.v?.toString().split(',').map((url: string) => url.trim()).filter(Boolean) || [],
        whatsapp: c[9]?.v?.toString() || '',
        activo: isActivo,
      };
    });
    
    const activeListings = listings.filter(l => l.activo && l.id);
    
    // If sheet is empty but fetch succeeded, we might still want to show mock data for the demo
    if (activeListings.length === 0) {
      console.warn('No active listings found in sheet, using mock data');
      return MOCK_LISTINGS;
    }
    
    return activeListings;
  } catch (error) {
    console.error('Error fetching from Google Sheets, using mock data fallback:', error);
    // Return mock data if the sheet is private (401) or fails to load
    return MOCK_LISTINGS;
  }
}

export function useListings() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchListings()
      .then(data => {
        setListings(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error in useListings:', err);
        setError(err);
        setLoading(false);
      });
  }, []);

  return { listings, loading, error };
}
