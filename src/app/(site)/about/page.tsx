
import { Metadata } from "next"
import AboutIndex from "@/components/Aboutpage";
export const metadata: Metadata = {
  title: "About Us - CV Analyzer",
  icons: "/globe-icon.svg",
  description: "Learn more about CV Analyzer, our mission, and the team behind the project.",
}
const AboutPage = () => {
  return (
    <AboutIndex/>
  )
}

export default AboutPage