import UKSalesSection from "@/components/CompaniesSection";
import NavBar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen font-myriad ">

      <NavBar />

      {/* HERO */}
      <section className="min-h-screen bg-black flex flex-col items-center justify-start pt-8 sm:pt-12 md:pt-16 px-4 text-center">

        {/* Logo */}
        <Image
          src={"/logo.png"}
          width={140}
          height={150}
          alt="BUYSUPPLY Logo"
          className="w-[140px] sm:w-[150px] md:w-[170px] h-auto mb-6 sm:mb-8"
        />

        {/* Brand Text */}
        <h1 className="font-[900] font-myriad text-white tracking-[2px] leading-tight text-[41px] sm:text-[52px] md:text-[68px] mb-2 ">
          BUYSUPPLY
        </h1>

        {/* Tagline */}
        <p className="mt-2 text-[16px] sm:text-[22px] md:text-[28px] font-semibold text-white leading-snug sm:leading-normal max-w-[90%] sm:max-w-[720px] font-myriad">
          Buying & Supplying in the Office Industry <br />
          Since 2001
        </p>

        {/* Description */}
        <p className="mt-5 text-[14px] sm:text-[16px] md:text-[18px] text-white/70 max-w-[90%] sm:max-w-[640px] mx-auto leading-relaxed font-myriad">
          We buy & sell photocopiers, printers, peripherals, toners, ink, and consumables.
        </p>

        {/* CTA Section */}
        <section className="mt-10 sm:mt-14 flex flex-col items-center">

          <h2 className="text-white font-semibold text-[15px] sm:text-[28px] md:text-[36px] mb-6 sm:mb-8 font-myriad">
            PRESS HERE FOR STOCK
          </h2>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-12 md:gap-16">

            {/* Printers Button */}
            <div className="flex flex-col items-center gap-2 font-myriad">
              <span className="text-white/80 text-[10px] sm:text-[14px] md:text-[16px] font-medium tracking-wider uppercase text-center">
                Printers & Photocopiers
              </span>

              <Link
                href="/products"
                className="w-[62px] h-[62px] sm:w-[75px] sm:h-[75px] md:w-[85px] md:h-[85px] 
                           rounded-full transition-all duration-300 
                           hover:scale-105 active:scale-95 shadow-lg overflow-hidden"
              >
                <Image
                  src="/button.png"
                  alt="Printers & Copier"
                  className="w-full h-full object-cover"
                  width={100}
                  height={100}
                />
              </Link>

              <span className="text-white/70 text-[8px] sm:text-[13px] md:text-[14px]">
                Start
              </span>
            </div>

            {/* Consumables Button */}
            <div className="flex flex-col items-center gap-2 font-myriad">
              <span className="text-white/80 text-[10px] sm:text-[14px] md:text-[16px] font-medium tracking-wider uppercase text-center">
                Consumables
              </span>

              <Link
                href="/products"
                className="w-[62px] h-[62px] sm:w-[75px] sm:h-[75px] md:w-[85px] md:h-[85px] 
                           rounded-full transition-all duration-300 
                           hover:scale-105 active:scale-95 shadow-lg overflow-hidden"
              >
                <Image
                  src="/button.png"
                  alt="Consumables"
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </Link>

              <span className="text-white/70 text-[8px] sm:text-[13px] md:text-[14px]">
                Start
              </span>
            </div>

          </div>
        </section>
      </section>

      <hr className="border-gray-800 mx-16" />


      <UKSalesSection />
      <hr className="border-gray-800 mx-4 sm:mx-16" />

      {/* FOOTER */}
      <footer className="bg-black/90 text-white py-12 font-myriad">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Logo + About */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-black/20 flex items-center justify-center p-2">
                <Image
                  width={60}
                  height={100}
                  src={"/logo.png"}
                  alt="My Store Logo"
                  className="w-full max-w-[150px] h-auto object-contain"
                />
              </div>
            </div>
            <p className="text-white/70 text-sm">

            </p>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-white/70 text-sm">
              <li><Link href="/" className="hover:text-white transition">Home</Link></li>
              <li><Link href="/products" className="hover:text-white transition">Products</Link></li>
            </ul>
          </div>

          {/* Contact / Socials */}
          <div>
            <h3 className="font-semibold mb-3">Contact Us</h3>
            <p className="text-white/70 text-sm"> Sales@buysupply.me</p>
            <div className="flex gap-3 mt-2">
              {/* Replace with social icons later if needed */}
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="mt-8 text-center text-xs text-white/50">
          &copy; 2026 buysupply. All rights reserved.
        </div>
      </footer>

    </div>
  );
}
