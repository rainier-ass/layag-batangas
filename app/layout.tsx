import type { Metadata } from "next";
import { Fraunces, Work_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "../components/navbar";
import Footer from "./components/footer";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Layag Batangas",
  description: "Discover the beaches, heritage towns, and dive spots of Batangas.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${workSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Navbar />
        {children}
        <Footer />
        <Script
          id="flowise-chatbot"
          type="module"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `import Chatbot from "https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js";
Chatbot.init({
  chatflowid: "d117bb6a-dadf-4421-8030-4a3450db41b9",
  apiHost: "https://cloud.flowiseai.com",
});`,
          }}
        />
      </body>
    </html>
  );
}