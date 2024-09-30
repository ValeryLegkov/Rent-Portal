import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";
import { AuthProvider } from "@/components/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/assets/styles/globals.css";

export const metadata: Metadata = {
  title: "Rent Portal",
  keywords: ["service", "portal", "rental", "rent"],
  description: "Service portal for rental",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <main>
            <Navbar />
            {children}
            <Footer />
            <ToastContainer />
          </main>
        </body>
      </html>
    </AuthProvider>
  );
}
