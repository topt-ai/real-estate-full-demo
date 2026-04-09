import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  whatsapp: string;
  titulo: string;
  pageUrl: string;
  className?: string;
}

export default function WhatsAppButton({ whatsapp, titulo, pageUrl, className = '' }: WhatsAppButtonProps) {
  // Use the provided default number if none is provided in the sheet
  const phoneNumber = whatsapp || '50372018215';
  // Strip non-numeric characters for the URL
  const cleanNumber = phoneNumber.replace(/\D/g, '');
  
  const text = `Hola Jarvis! Me interesa la propiedad: ${titulo} - ${pageUrl}`;
  const encodedText = encodeURIComponent(text);
  const url = `https://wa.me/${cleanNumber}?text=${encodedText}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#b39543] text-white font-medium py-3 px-6 rounded-none transition-colors duration-300 w-full md:w-auto ${className}`}
    >
      <MessageCircle size={20} />
      <span>Consultar por WhatsApp</span>
    </a>
  );
}
