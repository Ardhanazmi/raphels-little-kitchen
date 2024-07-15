import { Mail } from "lucide-react";
import Link from "next/link";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="py-6 text-white bg-brand">
      <div className="container mx-auto px-4">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div className="w-full md:w-1/3">
            <h3 className="mb-4 text-lg font-semibold">
              Rapels Little Kitchen
            </h3>
            <p className="font-medium text-sm">
              Menyediakan kue-kue lezat yang dibuat dengan cinta dan bahan
              berkualitas tinggi. Nikmati setiap gigitannya yang penuh dengan
              rasa dan kelezatan.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Kontak Kami</h3>
            <ul className="space-y-2">
              <li className="hover:text-brand-secondary">
                <Link
                  href="https://www.instagram.com/raphels.littlekitchen"
                  target="_blank"
                >
                  <FaInstagram className="inline-block w-5 h-5 mr-2" />
                  @raphels.littlekitchen
                </Link>
              </li>
              <li className="hover:text-brand-secondary">
                <Link href="https://wa.me/6285156929136" target="_blank">
                  <FaWhatsapp className="inline-block w-5 h-5 mr-2" />
                  +62 851 5692 9136
                </Link>
              </li>
              <li className="hover:text-brand-secondary">
                <Link
                  href="mailto:raphels.littlekitchen@gmail.com"
                  target="_blank"
                >
                  <Mail className="inline-block w-5 h-5 mr-2" />
                  raphels.littlekitchen@gmail.com
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>© 2024 Raphels Little Kitchen. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
