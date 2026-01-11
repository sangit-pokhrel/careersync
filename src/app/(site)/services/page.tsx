import { Metadata } from "next";
import ServicesIndex from "@/components/Servicespage_component";
export const metadata: Metadata = {
  title: "Service Page",
  icons: "/favicon.ico",
  description: "This is the service page description.",
};
const ServicePage = () => {
  return (
    <ServicesIndex />
  );
}
export default ServicePage;