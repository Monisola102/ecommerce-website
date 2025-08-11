import { X, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { useOutsideClick } from "@/hooks";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu = ({ isOpen, onClose }: SidebarProps) => {
  const sideBarRef = useOutsideClick<HTMLDivElement>(onClose);

  return (
    <div className="md:hidden">
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />
      <div
        className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          ref={sideBarRef}
          className="w-[80vw] sm:w-72 bg-black h-full p-8 flex flex-col"
        >
          {/* Close Button */}
          <div className="flex justify-end mb-6">
            <button
              onClick={onClose}
              className="hover:bg-orange-300/90 p-2 rounded transition duration-300"
            >
              <X color="white" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-4 text-white font-semibold text-base">
            <Link href="/Women" onClick={onClose}>WOMEN</Link>
            <Link href="/Men" onClick={onClose}>MEN</Link>
            <Link href="/Kids" onClick={onClose}>KIDS</Link>
            <Link href="/Sale" onClick={onClose}>SALE</Link>
            <Link href="/New" onClick={onClose}>NEW IN</Link>
            <Link href="/Shoes" onClick={onClose}>SHOES</Link>
            <Link href="/Brands" onClick={onClose}>BRANDS</Link>
            <Link href="/support" onClick={onClose}>SUPPORT</Link>
          </nav>

          {/* Spacer */}
          <div className="flex-grow" />

          {/* Contact Info */}
          <div className="mt-auto pt-6 border-t border-gray-700 text-white text-sm space-y-3">
            <a href="mailto:support@example.com" className="flex items-center gap-2 hover:underline">
              <Mail size={16} />
              support@example.com
            </a>
            <a href="tel:+2348001234567" className="flex items-center gap-2 hover:underline">
              <Phone size={16} />
              +234 800 123 4567
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
