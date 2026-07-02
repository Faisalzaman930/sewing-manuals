import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.sewingmachinemanuals.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Industrial Sewing Machine Manuals, Specs & Troubleshooting",
    template: "%s | SewingMachineManuals.com",
  },
  description:
    "Free manuals, specs, and troubleshooting guides for industrial sewing machines — Juki, Consew, Brother, Singer, and more. Find your model, fix your machine.",
  openGraph: {
    siteName: "SewingMachineManuals.com",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-iron-50">
        <header className="border-b border-iron-200 bg-steel-900">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
            <Link href="/" className="shrink-0 no-underline">
              <span className="text-lg font-bold text-white">
                🧵 SewingMachineManuals
              </span>
            </Link>
            <nav className="flex shrink-0 gap-4 text-sm">
              <Link href="/brands" className="text-iron-300 hover:text-white">
                Brands
              </Link>
              <Link href="/troubleshooting" className="text-iron-300 hover:text-white">
                Troubleshooting
              </Link>
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>

        <footer className="mt-16 border-t border-iron-200 bg-steel-900 py-8">
          <div className="mx-auto max-w-5xl px-4 text-sm text-iron-300">
            <div className="grid gap-6 sm:grid-cols-3">
              <div>
                <p className="font-semibold text-white">Browse by brand</p>
                <ul className="mt-2 space-y-1">
                  <li><Link href="/brands/juki" className="hover:text-white">Juki</Link></li>
                  <li><Link href="/brands/consew" className="hover:text-white">Consew</Link></li>
                  <li><Link href="/brands/brother" className="hover:text-white">Brother</Link></li>
                  <li><Link href="/brands/singer" className="hover:text-white">Singer</Link></li>
                  <li><Link href="/brands/chandler" className="hover:text-white">Chandler</Link></li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-white">Popular manuals</p>
                <ul className="mt-2 space-y-1">
                  <li><Link href="/brands/juki/juki-ddl-8700" className="hover:text-white">Juki DDL-8700</Link></li>
                  <li><Link href="/brands/consew/consew-206rb-5" className="hover:text-white">Consew 206RB-5</Link></li>
                  <li><Link href="/brands/singer/singer-111w155" className="hover:text-white">Singer 111W155</Link></li>
                  <li><Link href="/brands/brother/brother-db2-b791" className="hover:text-white">Brother DB2-B791</Link></li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-white">Troubleshooting</p>
                <ul className="mt-2 space-y-1">
                  <li><Link href="/troubleshooting" className="hover:text-white">All problems</Link></li>
                  <li><Link href="/troubleshooting#tension" className="hover:text-white">Thread tension</Link></li>
                  <li><Link href="/troubleshooting#timing" className="hover:text-white">Hook timing</Link></li>
                  <li><Link href="/troubleshooting#feed" className="hover:text-white">Feed problems</Link></li>
                </ul>
              </div>
            </div>
            <p className="mt-6 text-xs text-iron-600">
              Manuals are linked from manufacturer and retailer sources. We do not host copyrighted PDFs.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
