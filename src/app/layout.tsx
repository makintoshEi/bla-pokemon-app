import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Pokemon App ! search yours</title>
      </head>
      <body
        style={{ margin: 0 }}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main role="main">{children}</main>
      </body>
    </html>
  );
}
