import { Suspense } from "react";
import Header from "@/components/Header";
import "./globals.css";

export const metadata = {
  title: "Next.js Supabase Post App",
  description: "A simple CRUD post app built with Next.js and Supabase",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Header reads the URL with usePathname, so it needs a Suspense boundary */}
        <Suspense>
          <Header />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
