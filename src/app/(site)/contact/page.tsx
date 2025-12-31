import { Metadata } from "next";
import ContactIndex from "@/components/coach/pages/CoachDashboard";
import ProtectedRoute from "@/globals/protectedRoute";
import HomeContactPage from "@/components/ContactPage/HomeContactpage";
export const metadata:Metadata  ={
  title:"Contact page",
  description:"To contact us call 12365478910",

} 
  const ContactPageHome = () => {
  return (
     

        <HomeContactPage />
     

   
  )
}

export default ContactPageHome;