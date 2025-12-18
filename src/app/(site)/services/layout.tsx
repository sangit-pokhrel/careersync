import Navabar from "@/globals/navbar";
import Footer from "@/globals/footer";

const ServicesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="services-layout">
      <Navabar />
      {children}
      <Footer/>
    </div>
  );
}
export default ServicesLayout;