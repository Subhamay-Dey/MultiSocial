import type { Metadata } from "next";
import "./globals.css";
import SessionProviderWrapper from "@/lib/SessionProviderWrapper"
import { Toaster } from "@/components/ui/sonner";
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
        <body className="dark">
          <SessionProviderWrapper>
            {children}
          </SessionProviderWrapper>
          <Toaster />
        </body>
      </html>
  );
}