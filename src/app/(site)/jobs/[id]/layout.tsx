import ProtectRoute from "@/globals/toProtectRoute";

const JobsByIdLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectRoute>
      {children}
    </ProtectRoute>
  )
}
export default JobsByIdLayout ;