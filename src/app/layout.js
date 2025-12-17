import React from "react";
import "./globals.css";
import Navegation from "./components/navegationComponents/navbar.home";
import ThemeRegistry from "./infra/themeregistry";
import { AuthProvider } from "./(rotas)/(auth)/_AuthContext";
import { ProductProvider } from "./(rotas)/(client-area)/client-products/_NewProductContext";
// import { ProductProvider } from "./(rotas)/(client-area)/client-products/_ProductContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ProductProvider>
          <ThemeRegistry>
            {/* <Navegation /> */}
            {children}
          </ThemeRegistry>
          </ProductProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
