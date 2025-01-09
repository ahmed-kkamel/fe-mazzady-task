import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Mazzady Technical Task",
  description: "A technical task including static page design and dynamic category management form.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className="bg-gray-100">{children}</body>
    </html>
  );
}
