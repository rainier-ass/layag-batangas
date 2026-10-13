import type { Metadata } from "next";
import { Fraunces, Work_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar";
import { TripPlannerProvider } from "../components/trip-planner";
import TravelAssistant from "../components/travel-assistant";
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
  description:
    "Discover the beaches, heritage towns, and dive spots of Batangas.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${workSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <TripPlannerProvider>
          <Navbar />
          {children}
          <Footer />
          <TravelAssistant />
        </TripPlannerProvider>
      </body>
    </html>
  );
}
