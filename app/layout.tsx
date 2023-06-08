import './globals.css';
import localFont from 'next/font/local';

const MasonSerif = localFont({ src: '../public/fonts/MasonSerif-Regular.ttf' });

export const metadata = {
  title: 'An Interface of Ice and Fire',
  description: 'SoundCloud coding challenge',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={MasonSerif.className}>{children}</body>
    </html>
  );
}
