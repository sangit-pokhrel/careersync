'use-client'
import axios from "axios";

const fetchCvAnalysis = async (analysisId: string) => {


 const res = await axios.get(
  `http://localhost:5000/api/v1/cv/analyses/${analysisId}`,
  {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2OTUzNTdkOWIzNzBmMjRjNzY0ZDgzOGYiLCJyb2xlIjoidXNlciIsInRva2VuVmVyc2lvbiI6MCwiaWF0IjoxNzY3MTg5NDkxLCJleHAiOjE3NjcyMDc0OTF9.F-IAvXWaLtBSoyBupEsUv1k7CtTh8399rmXAE6ttvsg`,
    },
  }
);
console.log(res.data);
  return res.data;


};


export default fetchCvAnalysis;