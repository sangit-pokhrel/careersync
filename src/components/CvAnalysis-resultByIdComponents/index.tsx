"use client";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Container from "@/globals/container";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import fetchCvAnalysis from "./api/toGetAnalysisReport";
import { CvAnalysisResponse } from "./type";
import '@/globals/styles/style.color.css'
import Link from "next/link";
import { MdOutlineFileDownload } from "react-icons/md";
import { FiShare2 } from "react-icons/fi";
import HeroSection from "./heroSection";
import Section from "@/globals/section";
import AiRecommendationsSection from "./aiRecommendationsSection";
import ExtractedSkillsSection from "./extractedSkillSection";


const AnalyseCvIdIndex = () => {
  const queryClient = useQueryClient();

//   const params = useParams();
//   const analysisId = params.id as string;

// const { data, isLoading, isError, error } = useQuery<CvAnalysisResponse>({
//   queryKey: ["cv-analysis", analysisId],
//   queryFn: () => fetchCvAnalysis(analysisId),
//   enabled: !!analysisId,
  

// refetchInterval: (query) => {
//   const { data, status } = query.state;

//   // Stop polling if the request itself failed
//   if (status === 'error') return false;

//   // Poll if we have no data yet, or if status is processing
//   if (!data?.data || data.data.status === "processing") {
//     return 5000;
//   }

//   return false;
// }


// });


  


//   console.log(data);
//   console.log( analysisId )

//   // Loading state
//   if (isLoading || data?.data.status === "processing") {
//   return (
//     <Container>
//       <div role="status" className="flex flex-col justify-center items-center">
//         <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
//         <span className="text-xl">Loading... Please Wait!</span>
//       </div>
//     </Container>
//   );
// }


//   // Error state
//   if (isError) {
//     return (
//       <Container>
//         <p>Error: {(error as any)?.message}</p>
//       </Container>
//     );
//   }
 

  // Data loaded
  return (
    <Container>
      <Section>
        <div className="">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold">CV Analysis Results</h1>
            <p className="text-sm font-extralight">Comprehensive analysis of your resume with AI recommendations</p>
          </div>
          <div className="flex justify-center items-center gap-x-4">
            <button className="cursor-pointer rounded-lg text-xs font-extralight cta_button_secondary text-white px-10 py-3 "><Link href="/home ">Back to Home</Link></button>
            <button className="cursor-pointer  rounded-lg text-xs font-extralight bg-blue-600 text-white px-10 py-2 "><Link className="flex justify-center items-end gap-x-2" href="/home ">< MdOutlineFileDownload size={20}/><span>Download</span></Link></button>
            <button className=" cursor-pointer rounded-lg text-xs font-extralight bg-white  px-3 py-2 border-2 border-gray-300 shadow-2xs "><Link className="flex justify-center items-end gap-x-2" href="/home ">< FiShare2 size={20}/><span>Share</span></Link></button>
          </div>
        </div>
        {/* Analyse cv result here!
        <pre>{JSON.stringify(data, null, 2)}</pre> */}
      </div>
      </Section>
      <HeroSection overall_Score={75}/>
      <AiRecommendationsSection recommendations={ [
  "Immediately verify and correct all internship dates to align logically with the 2024 graduation year.",
  "Rewrite experience bullet points using the STAR method, focusing on contributions and impact (e.g., 'Optimized website SEO resulting in X metric improvement').",
  "Add a brief (3-4 sentence) Professional Summary/Objective statement highlighting MERN expertise and career aspirations.",
  "Categorize the Technical Skills section clearly (e.g., Frontend Technologies, Backend/Database, Core CS/Tools, ML/Data Analysis).",
  "Remove the excessive underscore separators and adopt standard, clean section headings for better ATS and human readability.",
]}/>
<ExtractedSkillsSection Skills={[
                "HTML5",
                "CSS",
                "JavaScript",
                "C/C++",
                "DBMS",
                "Data Structure and Algorithms",
                "Data analysis",
                "Machine Learning",
                "Google Colab",
                "Operating System",
                "Computer Networks",
                "Mongo DB",
                "Express",
                "React",
                "Node Js",
                "Next.Js",
                "TypeScript",
                "Time management",
                "Communication",
                "Problem-Solving",
                "Leadership",
                "English",
                "Nepali",
                "Hindi",
                "API integration",
                "Admin dashboard design",
                "backend schema design",
                "Google Analytics",
                "Strapi CMS",
                "SEO optimization",
                "Tailwind CSS",
                "Framer Motion",
                "Random Forest Regression"
            ]}/>
    </Container>
  );
};

export default AnalyseCvIdIndex;
