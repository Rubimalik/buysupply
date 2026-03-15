import { Phone, Mail } from "lucide-react"

export default function DesktopNav() {
  return (
    <div className="hidden md:flex items-center justify-between w-full bg-black px-[40px]" style={{ height: "30px" }}>

      {/* LEFT — Phone */}
      <div className="flex items-center gap-[12px] text-white/70 text-[16px] hover:text-white transition duration-300">
        <Phone size={28} />
        <a href="tel:01753971125">01753971125</a>
      </div>

      {/* RIGHT — Email */}
      <div className="flex items-center gap-[12px] text-white/70 text-[16px] hover:text-white transition duration-300">
        <Mail size={28} />
        <a href="mailto:sales@buysupply.me">sales@buysupply.me</a>
      </div>

    </div>
  )
}