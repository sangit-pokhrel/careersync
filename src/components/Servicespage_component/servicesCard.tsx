import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import "@/globals/styles/style.color.css"
import { RiGeminiLine } from "react-icons/ri";
const ServiceCard = () => {
  return (
    <div className=" flex flex-col gap-y-6 border-2 rounded-lg Our_Services_Card_border w-fit px-8 py-10">
      <div className=" w-fit px-2 py-2 rounded-md Job_category_bg">
        <RiGeminiLine size={30} />
      </div>
      <div className="flex flex-col gap-y-4 ">
        <div>
          <h5 className="font-bold">AI-CV Analysis</h5>
          <p className="font-extralight text-xs">
            Get detailed insight on your CV with AI-powered analysis
          </p>
        </div>
        <div>
          <ul>
            <li className="flex justify-start items-center gap-x-2">
              <span>
                <IoMdCheckmarkCircleOutline size={15} />
              </span>
              <span className="font-normal text-sm">Content review</span>
            </li>
            <li className="flex justify-start items-center gap-x-2">
              <span>
                <IoMdCheckmarkCircleOutline size={15} />
              </span>
              <span className="font-normal text-sm">Content review</span>
            </li>
            <li className="flex justify-start items-center gap-x-2">
              <span>
                <IoMdCheckmarkCircleOutline size={15} />
              </span>
              <span className="font-normal text-sm">Content review</span>
            </li>
            <li className="flex justify-start items-center gap-x-2">
              <span>
                <IoMdCheckmarkCircleOutline size={15} />
              </span>
             <span className="font-normal text-sm">Content review</span>
            </li>
          </ul>
        </div>
      </div>
      <button className="cta_button  py-2 rounded-lg cursor-pointer ">
        <span className=" text-white font-semibold">Get Started</span>
      </button>
    </div>
  );
};
export default ServiceCard;
