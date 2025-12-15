import React from "react";
import "./globals.css";
import Navegation from "./components/navegationComponents/navbar.home";
import ThemeRegistry from "./infra/themeregistry";
import { AuthProvider } from "./(rotas)/(auth)/_AuthContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ThemeRegistry>
            {/* <Navegation /> */}
            {children}
          </ThemeRegistry>
        </AuthProvider>
      </body>
    </html>
  );
}
