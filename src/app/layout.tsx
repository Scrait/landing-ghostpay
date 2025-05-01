import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron, Space_Grotesk } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const space_grostek = Space_Grotesk({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'GhostPay — DAO wallet on TON with Telegram integration',
  description:
    'GhostPay is a decentralized multisig wallet with Telegram control, DAO governance, and secure on-chain voting — powered by TON.',
  alternates: {
    canonical: 'https://ghost-pay.run/',
    languages: {
      en: 'https://ghost-pay.run/',
    },
  },
  openGraph: {
    title: 'GhostPay — DAO wallet on TON with Telegram integration',
    description:
      'GhostPay is a decentralized multisig wallet with Telegram control, DAO governance, and secure on-chain voting — powered by TON.',
    url: 'https://ghost-pay.run/',
    siteName: 'GhostPay',
    images: [
      {
        url: 'https://ghost-pay.run/ghost.png',
        width: 1200,
        height: 630,
        alt: 'GhostPay preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GhostPay — DAO wallet on TON',
    description:
      'GhostPay is a decentralized multisig wallet with Telegram control and on-chain governance.',
    images: ['https://ghost-pay.run/ghost.png'],
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-black ${orbitron}`}>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
