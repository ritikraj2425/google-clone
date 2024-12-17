import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DataProvider } from "./context/context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export const metadata = {
  title: "Google",
  description: "Made by Ritik",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DataProvider>
        {children}
        </DataProvider>
      </body>
    </html>
  );
}
