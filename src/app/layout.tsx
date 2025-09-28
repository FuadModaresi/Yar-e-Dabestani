import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { GlossaryProvider } from '@/hooks/use-glossary';
import { UserProvider } from '@/hooks/use-user';
import MainLayout from '@/components/layout/main-layout';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'یار دبستانی من',
  description: 'پلتفرم آموزشی برای دانش‌آموزان دبیرستانی ایران',
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <UserProvider>
          <GlossaryProvider>
            <MainLayout>{children}</MainLayout>
            <Toaster />
          </GlossaryProvider>
        </UserProvider>
        <Script src="https://www.desmos.com/api/v1.11/calculator.js?apiKey=3714ac8791764c0f9bf109c91d74f2b4" />
      </body>
    </html>
  );
}
