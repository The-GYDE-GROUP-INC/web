import type { Metadata } from 'next';
import './globals.css';
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import LayoutClient from '@/layout/LayoutClient';

export const metadata: Metadata = {
  title: 'Gyde',
  description: '',
};

interface Props {
  children: React.ReactNode;
  params: Promise<{
    lang: string;
  }>;
}

export default async function RootLayout({ children, params: paramsPromise }: Props) {
  const messages = await getMessages();
  const params = await paramsPromise;
  const { lang } = params;

  return (
    <html lang={lang}>
      <body className={'antialiased font-helvetica font-normal'}>
        <NextIntlClientProvider messages={messages}>
          <LayoutClient>{children}</LayoutClient>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
