
import Container from "@/globals/container";
import HersoSection from "./heroSection";
import CoreValuesSection from "./coreValuesSection";

import SuccessStoriesSection from "./successStoriesSection";
const AboutIndex = ()=>{
  return(
    <Container>
      
     <HersoSection/>
      <CoreValuesSection/>
      <SuccessStoriesSection/>
    </Container>
  )
} 

export default AboutIndex;