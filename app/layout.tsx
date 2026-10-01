import type { Metadata, Viewport } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Michel Ayikoe Atayi — Software Engineer",
  description: "Computer science student at Livingstone College building thoughtful software. Explore Michel Atayi’s projects, engineering experience, and technical skills.",
  openGraph: { title: "Michel Ayikoe Atayi — Software Engineer", description: "Thoughtful software. From idea to interface.", type: "website", locale: "en_US", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Michel Ayikoe Atayi — Computer Science Student & Software Engineer" }] },
  twitter: { card: "summary_large_image", title: "Michel Ayikoe Atayi — Software Engineer", images: ["/opengraph-image"] },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { themeColor: "#f4f2ec" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
