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
  title: "Rosfandy",
  description: "Rosfandy Blog",
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
