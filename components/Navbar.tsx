import DesktopNav from "./DesktopNavbar";
import MobileNav from "./ui/MobileNavbar";


export default function NavBar() {
    return (
        <header className="sticky top-0 z-50 w-full bg-black/90 backdrop-blur-sm border-b border-white/10">
            <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center relative">

                {/* Desktop Layout */}
                <DesktopNav />

                {/* Mobile Layout */}
                <MobileNav />

            </div>
        </header>
    )
}
