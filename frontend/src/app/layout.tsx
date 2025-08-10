import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Indian Equity Market Trading Platform",
  description: "A comprehensive web application for Indian equity market with advanced charting and real-time data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
