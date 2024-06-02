import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";
import { Navbar } from "./components";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Articles",
  description:
    "Articles Written by Yash Kumar Dromar on various political, social and technical topics",
  keywords: "Political Social Politics Hindu History Ancient Bharat India",
  openGraph: {
    title: "Articles",
    description:
      "Articles Written by Yash Kumar Dromar on various political, social and technical topics",
  },
  twitter: {
    title: "Articles",
    description:
      "Articles Written by Yash Kumar Dromar on various political, social and technical topics",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID!}>
        <body className={inter.className}>
          <Navbar />
          <div style={{ height: "calc(100vh - 80px)", overflow: "auto" }}>
            {children}
          </div>
          <ToastContainer
            position="top-center"
            autoClose={2999}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={"light"}
          />
        </body>
      </GoogleOAuthProvider>
    </html>
  );
}
