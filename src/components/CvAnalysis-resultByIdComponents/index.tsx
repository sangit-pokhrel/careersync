"use client";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Container from "@/globals/container";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import fetchCvAnalysis from "./api/toGetAnalysisReport";

const AnalyseCvIdIndex = () => {
  const queryClient = useQueryClient();

  const params = useParams();
  const analysisId = params.id as string;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["cv-analysis", analysisId],
    queryFn: () => fetchCvAnalysis(analysisId),
    enabled: !!analysisId, // only run if ID exists
  });
  useEffect(() => {
  if (analysisId) {
    queryClient.invalidateQueries({ queryKey: ["cv-analysis", analysisId] });
  }
}, []);

  console.log(data?.data?.analysisResult);

  // Loading state
  if (isLoading) {
    return (
      <Container>
        <div role="status" className="flex justify-center items-center">
          <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="sr-only">Loading...</span>
        </div>
      </Container>
    );
  }

  // Error state
  if (isError) {
    return (
      <Container>
        <p>Error: {(error as any)?.message}</p>
      </Container>
    );
  }

  // Data loaded
  return (
    <Container>
      <div>
        Analyse cv result here!
        <pre>{JSON.stringify(data?.data?.analysisResult, null, 2)}</pre>
      </div>
    </Container>
  );
};

export default AnalyseCvIdIndex;
