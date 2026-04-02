import './globals.css';

export const metadata = {
  title: "ECLIPSAI – Skills Marketplace for Claude Cowork",
  description: "A curated directory of enterprise AI skills — tested and reviewed.",
  openGraph: {
    title: "ECLIPSAI – Skills Marketplace for Claude Cowork",
    description: "A curated directory of enterprise AI skills — tested and reviewed.",
    url: "https://eclipsai.com",
    siteName: "ECLIPSAI",
    type: "website",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <footer style={{ maxWidth: 1140, margin: '0 auto', padding: '0 36px 28px' }}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 11, color: '#d4d4d8' }}>
            All skills are third-party. Curated, not endorsed.
          </p>
        </footer>
      </body>
    </html>
  );
}
