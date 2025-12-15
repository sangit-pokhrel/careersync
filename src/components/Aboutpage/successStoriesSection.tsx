import Section from "@/globals/section";
import "@/globals/styles/style.color.css"


const Card = ({title,description}:{title:string,description:string})=>{
  return(
    <div>
      
    </div>
  )
}

const SuccessStoriesSection = () => {
  return(
    <Section>
      <div>
        <div>
          <h1 className="font-bold text-4xl secondary">Success Stories</h1>
          <p className="font-extralight text-sm">Every story here represents a journey challenges overcome, goals acheived and creers transformed</p>
        </div>
      </div>
    </Section>
  )
}

export default SuccessStoriesSection;