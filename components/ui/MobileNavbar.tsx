import { Phone, Mail } from "lucide-react"

export default function MobileNav() {
  return (
    <div className="md:hidden w-full h-16 relative flex items-center">

      {/* LEFT — Phone */}
      <a
        href="tel:01753971125"
        className="absolute left-3 flex items-center gap-1 text-xs sm:text-sm text-white/60 hover:text-white transition"
      >
        <Phone size={14} className="shrink-0" />
        <span className="leading-none">01753971125</span>
      </a>

      {/* RIGHT — Email */}
      <a
        href="mailto:sales@buysupply.me"
        className="absolute right-3 flex items-center gap-1 text-xs sm:text-sm text-white/60 hover:text-white transition"
      >
        <Mail size={14} className="shrink-0" />
        <span className="leading-none">sales@buysupply.me</span>
      </a>

    </div>
  )
}