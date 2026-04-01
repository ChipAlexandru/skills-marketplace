import './globals.css';

export const metadata = {
  title: 'Skills for Claude Cowork',
  description: 'Curated enterprise AI skills — tested and reviewed.',
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
