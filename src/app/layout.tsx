import type { Metadata } from "next";
import "./globals.css";
import SessionProviderWrapper from "@/lib/SessionProviderWrapper"
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
export const metadata: Metadata = {
  title: "MultiSocial",
  description: "Generated Getstart",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body>
          <SessionProviderWrapper>
          <ThemeProvider defaultTheme="acid">
            {children}
          </ThemeProvider>
          </SessionProviderWrapper>
        </body>
      </html>
  );
}