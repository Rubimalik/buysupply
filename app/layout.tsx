
import localFont from "next/font/local";
import { Roboto } from "next/font/google";
import "./globals.css";

const myriadPro = localFont({
  src: [
    {
      path: '../assets/fonts/myriad-pro/Myriad Pro/Myriad Pro Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../assets/fonts/myriad-pro/Myriad Pro/Myriad Pro Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/myriad-pro/Myriad Pro/Myriad Pro Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../assets/fonts/myriad-pro/Myriad Pro/Myriad Pro Semibold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../assets/fonts/myriad-pro/Myriad Pro/Myriad Pro Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../assets/fonts/myriad-pro/Myriad Pro/Myriad Pro Black.otf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-myriad'
})

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-roboto", // optional CSS variable
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased ${myriadPro.variable} ${roboto.variable}  bg-white text-gray-900`}
      >
        {children}
      </body>
    </html>
  );
}
