import type { Metadata } from "next";
import "@/styles/globals.css"

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className=" bg-gray-100" >
        {children}
      </body>
    </html>
  );
}
