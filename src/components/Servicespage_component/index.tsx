import Container from "@/globals/container";
import HeroSection from "./heroSection";
import ServiceCard from "./servicesCard";
import Section from "@/globals/section";
import GetPreminumNowSection from "./getPreminumNowSection";
const ServicesIndex = ()=>{
  return(
    <Container>
      <HeroSection />
      
       <Section>
        <div className="grid grid-cols-3 gap-y-8  mt-15">
         <ServiceCard/>
         <ServiceCard/>
         <ServiceCard/>
         <ServiceCard/>
       </div>
       </Section>
       <GetPreminumNowSection/>
     
    </Container>
  )
}

export default ServicesIndex;