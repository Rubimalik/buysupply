import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen font-brand ">

      {/* TOP BAR */}
      <div className="flex justify-between items-center px-2 lg:px-16 py-4 border-b border-gray-800 lg:max-w-7xl mx-auto " >
        <div className="flex items-center gap-1 lg:gap-3 text-xs lg:text-sm">
          <svg className="w-2 h-2 lg:w-5 lg:h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
          </svg>
          01753971125
        </div>
        <div className="flex items-center gap-3 text-xs lg:text-sm">
          <svg className="w-2 h-2 lg:w-5 lg:h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
          sales@buysupply.me
        </div>
      </div>
    
      {/* HERO */}
      <section className="flex flex-col items-center justify-center px-5 pt-20 pb-16 text-center font-b">
        <Image src="/hero.png" alt="BuySupply Logo" width={150} height={150} />

        <h1 className="text-3xl md:text-7xl font-black tracking-widest mb-5 mt-5 font-brand ">BUYSUPPLY</h1>

        <p className="text-lg md:text-xl font-bold mb-3">
          Buying &amp; Supplying in the Office Industry<br />Since 2001
        </p>

        <p className="text-sm text-gray-400 mb-12">
          We buy &amp; sell photocopiers, printers, peripherals, toners, ink, and consumables.
        </p>

        <p className="text-3xl md:text-4xl font-black tracking-wide mb-16 cursor-pointer hover:opacity-80 transition-opacity">
          PRESS HERE FOR STOCK
        </p>

        {/* Category Buttons */}
        <div className="flex justify-center gap-20 pb-20">
          {["PRINTERS & PHOTOCOPIERS", "CONSUMABLES"].map((label) => (
            <div key={label} className="flex flex-col items-center gap-3">
              <span className="text-xs font-bold tracking-widest">{label}</span>

              <button className="w-20 h-20 rounded-full bg-teal-400 flex items-center justify-center hover:scale-105 hover:opacity-90 transition-transform cursor-pointer">
                <Link href={'/products'}>
                  <svg className="w-8 h-8 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </Link>
              </button>
              <span className="text-xs text-gray-400">Start</span>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-gray-800 mx-16" />

      {/* UK SALES */}
      <div className="max-w-4xl mx-auto px-5 sm:px-10 py-14 sm:py-20">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-widest text-center mb-12 sm:mb-16">UK SALES</h2>

        <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">
          Buy Supply – Quality Used Copiers, Delivered Nationwide
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-10">
          At Buy Supply, we specialise in supplying high-quality used copiers to dealers across the UK. With extensive stock available for immediate dispatch, we help you secure the right machines quickly, efficiently, and with complete confidence.
        </p>

        <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">Industry Expertise You Can Rely On</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          Our UK Sales Team is made up of experienced used copier specialists who understand the market inside and out. We work hard to stay ahead of model updates, product variations, and dealer demand — giving you informed, practical guidance when selecting the right machines for your customers.
        </p>
        <p className="text-gray-400 text-sm leading-relaxed mb-10">
          Whether you need a single unit or multiple machines, our team is here to support you from initial enquiry through to delivery.
        </p>

        <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">Stock from Leading Manufacturers</h3>
        <ul className="list-disc pl-6 text-gray-400 text-sm space-y-2 mb-8">
          <li>Canon</li>
          <li>Ricoh</li>
          <li>Konica Minolta</li>
          <li>And other leading manufacturers</li>
        </ul>
        <ul className="list-disc pl-6 text-gray-400 text-sm space-y-2 mb-10">
          <li>Thoroughly cleaned and tested by our in-house engineers</li>
          <li>Professionally prepared prior to dispatch</li>
          <li>Supplied with securely cleansed HDDs where required</li>
        </ul>

        <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">Safe, Secure &amp; Reliable Delivery</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          Once your order is placed, your machine is individually wrapped and carefully prepared for transport. Delivery is managed professionally to ensure your equipment arrives safely, securely, and ready for installation.
        </p>
        <p className="text-gray-400 text-sm leading-relaxed mb-10">
          From enquiry to arrival, your order is handled with care and attention to detail.
        </p>

        <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">Speak to the Team</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          To enquire about current stock or place an order, contact our UK Sales Team:
        </p>
        <div className="flex flex-col gap-2 mb-8">
          <a href="tel:01753971125" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            01753 971125
          </a>
          <a href="mailto:Sales@buysupply.me" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            Sales@buysupply.me
          </a>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed">
          At BuySupply, we combine product knowledge, quality stock, and dependable service to help you keep your customers satisfied and your business moving forward.
        </p>
      </div>

      <hr className="border-gray-800 mx-4 sm:mx-16" />

      {/* EXPORT SALES */}
      <div className="max-w-4xl mx-auto px-5 sm:px-10 py-14 sm:py-20">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-widest text-center mb-12 sm:mb-16">EXPORT SALES</h2>

        <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">Photocopier &amp; Printer Export</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-10">
          Our export division is a growing part of our business and we are actively building long-term partnerships with buyers around the world. With over 30 years in the office equipment trade, we supply reliable used and refurbished photocopiers and printers to international customers who need dependable machines at competitive prices.
        </p>

        <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">Global Export Markets</h3>
        <ul className="list-disc pl-6 text-gray-400 text-sm space-y-2 mb-10">
          <li>Africa</li>
          <li>United Arab Emirates</li>
          <li>India</li>
          <li>Pakistan</li>
          <li>And other international markets</li>
        </ul>

        <p className="text-gray-400 text-sm leading-relaxed mb-10">
          We understand the requirements of overseas buyers and work closely with freight forwarders and shipping agents to ensure smooth and efficient collection.
        </p>

        <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">Fast Delivery to UK Shipping Hubs</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-10">
          We deliver to UK shipping hubs six days a week, making it easy for international customers and freight partners to move goods quickly. Whether you are consolidating shipments or loading containers regularly, we can get stock to your chosen port or warehouse promptly.
        </p>

        <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">Large &amp; Constantly Changing Stock</h3>
        <ul className="list-disc pl-6 text-gray-400 text-sm space-y-2 mb-10">
          <li>Canon</li>
          <li>Xerox</li>
          <li>Ricoh</li>
          <li>Konica Minolta</li>
          <li>Toshiba</li>
          <li>And many more</li>
        </ul>
        <p className="text-gray-400 text-sm leading-relaxed mb-10">
          From reliable office machines to production equipment, spare parts and toner, we always have a wide range available for export buyers.
        </p>

        <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">Built for Long-Term Supply</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-10">
          Export is currently a smaller part of our business, but demand is growing rapidly. Due to this growth we are planning to move into larger premises in the near future, which will allow us to load containers directly on site, making the buying process even easier for our overseas partners.
        </p>

        <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">Work With Us</h3>
        <ul className="list-disc pl-6 text-gray-400 text-sm space-y-2 mb-8">
          <li>International dealers</li>
          <li>Export traders</li>
        </ul>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          If you are looking for a reliable UK supplier of photocopiers, printers, parts or toner, we would be pleased to work with you.
        </p>
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          Get in touch today to discuss current stock and export opportunities.
        </p>
        <div className="flex flex-col gap-2">
          <a href="tel:01753971125" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            01753 971125
          </a>
          <a href="mailto:Sales@buysupply.me" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            Sales@buysupply.me
          </a>
        </div>
      </div>

      <hr className="border-gray-800 mx-4 sm:mx-16" />

      {/* LEASING */}
      <div className="max-w-4xl mx-auto px-5 sm:px-10 py-14 sm:py-20">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-widest text-center mb-12 sm:mb-16">LEASING</h2>

        <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">
          Lease Return Specialists for the UK Photocopier Industry
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-10">
          Buysupply is one of the leading lease return partners within the photocopier industry across the United Kingdom. We provide leasing companies with a fully managed, end-to-end solution designed to simplify the asset return process and maximise value.
        </p>

        <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">Our Service</h3>
        <ul className="list-disc pl-6 text-gray-400 text-sm space-y-2 mb-8">
          <li>Direct liaison with end users</li>
          <li>Nationwide collections</li>
          <li>Secure and certified data erasure</li>
          <li>Comprehensive condition reporting</li>
          <li>Efficient asset processing and remarketing</li>
        </ul>
        <p className="text-gray-400 text-sm leading-relaxed mb-10">
          Our structured and transparent approach ensures a seamless experience for both leasing providers and their customers.
        </p>

        <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">Why Partner With Buysupply?</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          From the largest leasing organisations to smaller, specialist providers, we deliver tailored solutions to meet your operational requirements. As a leading supplier to both the UK trade and international export markets, we possess in-depth market knowledge that enables us to offer highly competitive pricing on ex-leased copiers.
        </p>
        <p className="text-gray-400 text-sm leading-relaxed mb-10">
          Our expertise, efficiency, and understanding of market demand ensure you achieve the strongest possible returns on your assets.
        </p>

        <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">Become a Partner</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          If you would like to explore how Buysupply can support your business, please contact us at:
        </p>
        <div className="flex flex-col gap-2">
          <a href="tel:01753971125" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            01753 971125
          </a>
          <a href="mailto:Sales@buysupply.me" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            Sales@buysupply.me
          </a>
        </div>
      </div>

      <hr className="border-gray-800 mx-4 sm:mx-16" />

      {/* COLLECTION & STORAGE */}
      <div className="max-w-4xl mx-auto px-5 sm:px-10 py-14 sm:py-20">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-widest text-center mb-12 sm:mb-16">COLLECTION &amp; STORAGE</h2>

        <p className="text-gray-400 text-sm leading-relaxed mb-10">
          We provide reliable copier and printer collection services across the entire UK. Whether the equipment is located locally or further afield, we can arrange fast and professional collection through our trusted national logistics network.
        </p>
        <p className="text-gray-400 text-sm leading-relaxed mb-10">
          Over the years we've built strong partnerships with specialist transport companies, allowing us to organise efficient, safe collections anywhere in the country.
        </p>

        <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">Specialist Equipment &amp; Experienced Handling</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          Photocopiers and production printers can be heavy, awkward and sensitive to move. Our team has the experience and the right equipment to remove machines from:
        </p>
        <ul className="list-disc pl-6 text-gray-400 text-sm space-y-2 mb-6">
          <li>Offices</li>
          <li>Print rooms</li>
          <li>Warehouses</li>
          <li>Tight access locations</li>
          <li>Upper floors or restricted spaces</li>
        </ul>
        <p className="text-gray-400 text-sm leading-relaxed mb-10">
          No matter where your machine is located, we have the tools and expertise to get it moved safely.
        </p>

        <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">UK-Wide Support for Dealers &amp; Businesses</h3>
        <ul className="list-disc pl-6 text-gray-400 text-sm space-y-2 mb-6">
          <li>Office equipment dealers</li>
          <li>Leasing companies</li>
          <li>Manufacturers</li>
          <li>Businesses relocating or upgrading equipment</li>
        </ul>
        <p className="text-gray-400 text-sm leading-relaxed mb-10">
          Whether it's a single machine or multiple units, we can coordinate the collection and onward movement quickly and professionally.
        </p>

        <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">Secure Storage in Slough</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          We also offer flexible weekly storage at our secure facility on the Slough Trading Estate.
        </p>
        <ul className="list-disc pl-6 text-gray-400 text-sm space-y-2 mb-6">
          <li>Your customer is moving premises and needs temporary storage</li>
          <li>Equipment has been removed and is awaiting delivery elsewhere</li>
          <li>Machines need holding before export or redistribution</li>
          <li>You need short-term logistics support</li>
        </ul>
        <p className="text-gray-400 text-sm leading-relaxed mb-10">
          Our storage solution gives you a safe and convenient place to hold equipment until it's ready for its next destination.
        </p>

        <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">A Simple, Reliable Service</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          Our goal is to make collections, transport and storage as straightforward as possible. From the moment you contact us, we'll arrange everything needed to ensure your equipment is handled professionally and efficiently.
        </p>
        <p className="text-gray-400 text-sm leading-relaxed">
          If you need a copier collected, moved or stored, get in touch with our team today.
        </p>
      </div>

      <hr className="border-gray-800 mx-4 sm:mx-16" />

      {/* FOOTER */}
      <footer className="px-5 sm:px-16 py-12 sm:py-16 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <svg width="40" height="40" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="fpink" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e91e8c" />
                <stop offset="100%" stopColor="#c2185b" />
              </linearGradient>
              <linearGradient id="fcyan" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4dd0e1" />
                <stop offset="100%" stopColor="#0097a7" />
              </linearGradient>
              <linearGradient id="fyellow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffe234" />
                <stop offset="100%" stopColor="#f9a825" />
              </linearGradient>
            </defs>
            <path d="M100 30 C130 30, 165 55, 155 95 C145 135, 105 150, 85 130 C65 110, 75 75, 100 70 C115 65, 130 75, 125 90 C120 105, 100 110, 88 100" fill="none" stroke="url(#fpink)" strokeWidth="22" strokeLinecap="round" />
            <path d="M60 50 C35 70, 30 110, 55 135 C80 160, 120 155, 135 130 C150 105, 135 72, 112 68 C96 65, 82 78, 88 95 C94 112, 112 118, 118 106" fill="none" stroke="url(#fcyan)" strokeWidth="22" strokeLinecap="round" />
            <path d="M140 50 C165 75, 160 120, 130 140 C100 160, 58 145, 52 115 C46 85, 75 62, 100 70 C118 76, 126 95, 115 108 C104 121, 85 118, 82 104" fill="none" stroke="url(#fyellow)" strokeWidth="22" strokeLinecap="round" />
          </svg>
          <span className="text-xl font-extrabold tracking-wide">BuySupply</span>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-sm mb-4">Quick Links</h4>
          <a href="#" className="block text-sm text-gray-400 mb-2 hover:text-white transition-colors">Home</a>
          <a href="#" className="block text-sm text-gray-400 hover:text-white transition-colors">Products</a>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold text-sm mb-4">Contact Us</h4>
          <a href="mailto:Sales@buysupply.me" className="text-sm text-gray-400 hover:text-white transition-colors">
            Sales@buysupply.me
          </a>
        </div>

        {/* Copyright */}
        <div className="md:col-span-3 border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
          © 2026 buysupply. All rights reserved.
        </div>
      </footer>

    </div>
  );
}
