'use client'
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
function getCookie(name: string) {
  return document.cookie
    .split("; ")
    .find(row => row.startsWith(name + "="))
    ?.split("=")[1];
}

const ResumeAnlysisMutationFunc =async (data:any)=>{
  // console.log(data.get('cv'));
  const res = await axios.post('http://localhost:5000/api/v1/cv/analyze',data, {
    headers: {
       Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2OTUwMDEwZDcxM2NkODVkMDFiNjk3MmMiLCJyb2xlIjoidXNlciIsInRva2VuVmVyc2lvbiI6MCwiaWF0IjoxNzY3MDI1NDMxLCJleHAiOjE3NjcwNDM0MzF9.3IXxMzxG3Z8aVlngvqCulJ5vLbQKW0uwDNxnxmIohHQ`,
      "Content-Type": "multipart/form-data",
    },
  });

  console.log(res.data);
  localStorage.setItem('CvAnalysisId',res.data.analysisId)
  return res.data

  // console.log((await auth.currentUser?.getIdTokenResult(true))?.token);
}

export const useResumeAnalysisMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: ResumeAnlysisMutationFunc,
    onSuccess:()=>{
      router.push(`cv/analysis-result/${localStorage.getItem('CvAnalysisId')}`)
    }
  });
};


export default useResumeAnalysisMutation;
 