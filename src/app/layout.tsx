import type { Metadata } from "next";
import { Merriweather } from "next/font/google";
import "./globals.css";

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "VERA · Home Hunters Australia",
  description:
    "Your AI guide through the NSW first home buyer journey — calm, plain-English help with each milestone.",
  openGraph: {
    title: "VERA · Home Hunters Australia",
    description: "Your AI guide through the NSW first home buyer journey.",
    images: ["/vera-portrait.png"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={merriweather.variable}>
      <body className={`${merriweather.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
