import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "ADS-STORE",
  description: "Um e-commerce para o nosso projeto de web III",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  );
}
