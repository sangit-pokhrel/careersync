import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Contact Queries - CV Saathi",
  description: "View your contact inquiries and support tickets",
};

export default function ContactInquiriesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}