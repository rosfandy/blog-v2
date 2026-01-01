import type { Metadata } from "next";
import { Inter, Anton, Oswald } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import ClientLayout from "@/components/layouts/ClientLayout";
import QueryProvider from "@/components/provider/QueryProvider";
import { ToastProvider } from "@/components/ui/CustomToast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: {
    default: "Rosfandy - Welcome, Home Sweet Home",
    template: "%s | Rosfandy"
  },
  description: "Rosfandy's personal blog — programming and tech documetaions journey.",
  keywords: ["programming", "blog", "technology", "development"],
  authors: [{ name: "Bagus Rosfandy" }],
  creator: "Bagus Rosfandy",
  publisher: "Bagus Rosfandy",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${process.env.NEXT_PUBLIC_APP_URL}`,
    siteName: "Rosfandy Blog",
    title: "Rosfandy - Welcome, Home Sweet Home",
    description: "Personal blog, portfolio, programming and tech.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: "Bagus Rosfandy"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Rosfandy - Welcome, Home Sweet Home",
    description: "Rosfandy's personal blog — programming and tech docs journey.",
    creator: "@yourtwitterhandle",
    images: [`${process.env.NEXT_PUBLIC_APP_URL}/og-default.jpg`]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "36TF-qR2DYcm_aZoCR2-EQCq9Bgsu0GlIahNTg3chF8",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${anton.variable} ${oswald.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
        >
          <ToastProvider>
            <QueryProvider>
              <ClientLayout>
                {children}
              </ClientLayout>
            </QueryProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
