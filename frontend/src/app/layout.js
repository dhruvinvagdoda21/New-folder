import "./globals.css";
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: "PetConnect - Trusted Pet Care Near You",
  description: "Find trusted, verified pet sitters in your area. Book dog walking, pet boarding, daycare, grooming and more on PetConnect — the #1 pet care marketplace.",
  keywords: "pet care, pet sitter, dog walking, pet boarding, pet grooming, daycare",
  openGraph: {
    title: "PetConnect - Trusted Pet Care Near You",
    description: "Find trusted pet sitters and book care services for your furry friends.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased font-[Inter]">
        <Toaster position="top-right" toastOptions={{ style: { borderRadius: '12px', background: '#1e293b', color: '#f1f5f9', fontSize: '14px' } }} />
        {children}
      </body>
    </html>
  );
}
