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



export async function fetchListings(): Promise<Listing[]> {
  try {
    const url = 'https://docs.google.com/spreadsheets/d/1qGezW2qSMzriidC2ap8w1kKfh80WBab6SbXoCmymZCA/gviz/tq?tqx=out:json&sheet=Sheet1';
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const text = await response.text();
    const data = JSON.parse(text.substring(47).slice(0, -2));
    const rows = data.table.rows;
    
    const listings: Listing[] = rows.map((row: any) => {
      const c = row.c;
      const activoVal = c[10]?.v;
      const isActivo = activoVal === true || activoVal === 'TRUE' || activoVal === 'true' || activoVal === 1;
      
      return {
        id: c[0]?.v?.toString() || '',
        titulo: c[1]?.v?.toString() || '',
        precio: c[2]?.f || (c[2]?.v ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(Number(c[2].v)) : ''),
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
    
    return activeListings;
  } catch (error) {
    console.error('Error fetching from Google Sheets:', error);
    return [];
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
