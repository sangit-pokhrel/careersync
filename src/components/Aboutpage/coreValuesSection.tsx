"use client"
import React,{useState} from 'react'
import FullWidthContainer from "@/globals/fullwidthcontainer"
import { FiTarget} from "react-icons/fi";
import Section from "@/globals/section"

interface CardsDataType{
  icon:React.ReactNode
  Heading:string,
  Description:string
};
const  CardsData:CardsDataType[] =[{
  icon:<FiTarget size={20}/>,
  Heading:"Ats Optimization",
  Description:"Ensure your resume passes Applicant Tracking System"
},
{
  icon:<FiTarget size={20}/>,
  Heading:"Ats Optimization",
  Description:"Ensure your resume passes Applicant Tracking System"
},
{
  icon:<FiTarget size={20}/>,
  Heading:"Ats Optimization",
  Description:"Ensure your resume passes Applicant Tracking System"
},
{
  icon:<FiTarget size={20}/>,
  Heading:"Ats Optimization",
  Description:"Ensure your resume passes Applicant Tracking System"
}];

const Cards = ({data}:{data:CardsDataType})=>{
 
  return(
    <div className='bg-white rounded-md md:max-w-[400px] py-4'>
      <div className='flex flex-col gap-y-2 px-4 '>
        <div>
          {data.icon}
        </div>
           <h5 className='font-semibold text-lg'>{data.Heading} </h5>
           <p className='text-sm text-gray-400'>{data.Description}</p>

      </div>
    </div>
  )
}

const CoreValuesSection = () => {
  const [isSeeMore,setIsSeeMore] = useState(false);
     const handleSeemore =()=>{
      setIsSeeMore(prev=>!prev);
     }
    return(
    <Section>
       <FullWidthContainer>
        <div className=' flex flex-col gap-y-12 py-8'>
       <div className="flex flex-col gap-y-5">
        <h1 className="font-bold text-4xl text-white text-center">Our Core Values</h1>
        <p className="font-normal text-center text-white text-xs">We combine advanced AI with real HR expertise to create solutiions that evolve with the mordern hiring landscape</p>
       </div>
       {/* Desktop View */}
              <div className=" hidden md:flex justify-evenly gap-x-10 px-10">
                {
                  CardsData.map((data,index)=>
                    <div key={index}>
                      <Cards data={data}/>
                    </div>
                  )
                }

              </div>
              {/* Mobile view */}
               <div className="md:hidden flex flex-col justify-center items-center gap-y-5">
                {
                  !isSeeMore?CardsData.slice(0,1).map((data,index)=>
                    <div key={index}>
                      <Cards data={data}/>
                    </div>
                  ):CardsData.map((data,index)=>
                    <div key={index}>
                      <Cards data={data}/>
                    </div>
                  )
                }
                  <button className='text-white ' onClick={handleSeemore}>{!isSeeMore?"See More...":"See Less"}</button>
              </div>
      </div>
     </FullWidthContainer>
    </Section>
    )
}


export default CoreValuesSection;