import './globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'MovieDB',
  description: 'App de filmes com Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
