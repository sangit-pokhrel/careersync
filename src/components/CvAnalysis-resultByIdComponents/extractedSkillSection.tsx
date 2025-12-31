import Section from "@/globals/section"

type ExtractedSkillsProps = {
  Skills:string[]
}

const SkillCard = ({skill}:{skill:string})=>{
  return(
    <div>
        <div className="border bg-gray-200">
          <p>{skill}</p>
        </div>
    </div>
  )

}

const ExtractedSkillsSection = ({Skills}:ExtractedSkillsProps)=>{
  return(
    <Section>
        <div className="grid grid-cols-2">
          {Skills.map((skill,index)=>{
          return (<div key={index}>
            <SkillCard skill={skill}/>
          </div>)
        })}
        </div>
    </Section>
  )
}
export default ExtractedSkillsSection;