
import Metadata from "next";

export const metadata: Metadata = {
  title: "Contacts - CV Saathi Admin",
  description: "View and manage your contacts",
};

export default function ContactsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}