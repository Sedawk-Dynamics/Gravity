import { site } from '@/data/site';
import Icon from './Icon';

const message = encodeURIComponent("Hi Gravity Academy, I'd like to know more about your programs.");
const href = `https://wa.me/${site.whatsapp}?text=${message}`;

export default function WhatsAppFloat() {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] py-3 pl-3 pr-3 text-white shadow-lift transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/45 sm:pr-4"
    >
      <Icon name="whatsapp" size={26} />
      <span className="hidden text-sm font-semibold sm:inline">Chat with us</span>
    </a>
  );
}
