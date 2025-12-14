import React from "react";
import "./globals.css";
import Navegation from "./components/navegationComponents/navbar.home";
import ThemeRegistry from "./infra/themeregistry";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <Navegation />
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
