import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  weight: ["500", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "OLXITA",
  description: "OLX do H8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={cn("antialiased", inter.variable, poppins.variable)}>
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
