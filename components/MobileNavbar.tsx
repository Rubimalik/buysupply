import { Phone, Mail } from "lucide-react"
import Link from "next/link"

export default function MobileNav() {
  return (
    <div className="md:hidden w-full h-16 relative flex items-center">

      {/* LEFT — Phone */}
      <Link
        href="tel:01753971125"
        className="absolute left-3 flex items-center gap-1  text-white/60 hover:text-white transition" style={{ fontSize: "clamp(10px, 2.5vw, 20px)" }}>
        <Phone size={16} className="shrink-0" />
        <span className="leading-none">01753971125</span>
      </Link>

      {/* RIGHT — Email */}
      <Link
        href="mailto:sales@buysupply.me"
        className="absolute right-3 flex items-center gap-1  text-white/60 hover:text-white transition"
        style={{ fontSize: "clamp(10px, 2.5vw, 20px)" }}
      >
        <Mail size={14} className="shrink-0" />
        <span className="leading-none ">sales@buysupply.me</span>
      </Link>

    </div>
  )
}