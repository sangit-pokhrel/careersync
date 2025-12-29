'use-client'
import axios from "axios";

const fetchCvAnalysis = async (analysisId: string) => {


 const res = await axios.get(
  `http://localhost:5000/api/v1/cv/analyses/${analysisId}`,
  {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2OTUwMDEwZDcxM2NkODVkMDFiNjk3MmMiLCJyb2xlIjoidXNlciIsInRva2VuVmVyc2lvbiI6MCwiaWF0IjoxNzY3MDI1NDMxLCJleHAiOjE3NjcwNDM0MzF9.3IXxMzxG3Z8aVlngvqCulJ5vLbQKW0uwDNxnxmIohHQ`,
    },
  }
);
  return res.data;
};

export default fetchCvAnalysis;