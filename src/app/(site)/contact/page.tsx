import { Metadata } from "next";
import ContactIndex from "@/components/ContactPage";
import ProtectedRoute from "@/globals/protectedRoute";
export const metadata:Metadata  ={
  title:"Contact page",
  description:"To contact us call 12365478910",

} 
  const ContactPage = () => {
  return (
      <ProtectedRoute>

        <ContactIndex/>
      </ProtectedRoute>

   
  )
}

export default ContactPage;