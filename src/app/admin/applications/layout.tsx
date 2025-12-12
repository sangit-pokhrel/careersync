
import Metadata from "next";
import Applications from './../../../components/admin/pages/Applications';

export const metadata: Metadata = {
  title: "Job Applications - CV Saathi Admin",
  description: "View and manage your job applications",
};

export default function ApplicationsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}