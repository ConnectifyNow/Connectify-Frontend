import React from "react";
import "./index.css";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";

export const metadata = {
  title: "Connectify",
  description: "Connecting associations with skilled volunteers"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
}
